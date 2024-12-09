# 介绍

近期在开发`rust + vite`(tauri)项目的时候，发现了一个问题；就是沙箱隔离模式的环境变量继承问题；

在`rust`本地开发中，可以通过`std::env::var("PATH")`或者全局变量`$PATH`获取环境变量的值，当然您也可以通过`std::env::vars()`获取所有的全局变量；

当然在开发环境中是可以获取到的，但是在`build`之后，`rust`编译器会自动将`PATH`环境变量设置为`/usr/bin`，所以无法获取到全局变量；

所以当您运行`环境变量`的某个命令时，是不会执行的；

因为在您的应用程序中`%PATH`中根本获取不到对应的变量；

## 案例

我在本地电脑安装了`fnm`，在`dev`之后是可以获取到`where fnm`命令的，如下代码：

```rust
fn is_installed(program: &str) -> bool {
  let mut cmd = Command::new(if cfg!(target_os = "windows") {
      "cmd"
  } else {
      "bash"
  });
  let arg = if cfg!(target_os = "windows") {
      format!("where {}", program)
  } else {
      format!("which {}", program)
  };
  cmd.arg("-c").arg(arg);

  #[cfg(target_os = "windows")]
  {
      cmd.creation_flags(0x08000000);
  }
  let output = cmd.output().expect("Failed to execute command");
  let stdout = GBK.decode(&output.stdout);

  let result: bool = output.status.success() && !output.stdout.is_empty();

  info!(
      "{} 是否已经安装 {}, 安装结果为: {}",
      program, result, stdout.0
  );
  result
}
// result 的结果就是你电脑安装的 路径， 当然如果有路径 那返回布尔值
```

当您执行之后，那么您就能获取到对应的值，当然您同时也可以在`终端`中执行`which fnm`命令来获取到对应的路径。

只要您打包之后，就会返回空；那么它永远获取不到您电脑安装过的环境；

我试了好几种方案都是不行的， <font color="#ff0000">下面四种方案都是不可行的</font>：

1. 通过`which`命令获取到对应的路径；
2. 通过`fnm`命令获取版本号；
3. 通过获取环境变量；
4. 安装`shell`插件，再去获取；

## 解决方案

在`google`上搜了好多资料，方案都是不可行的；于是我尝试着去`github`上找一找；

结果运气不错，还真的找到了一个解决方案；[**“构建后，shell 命令失败”**](https://github.com/tauri-apps/tauri/issues/8400)

里面有句话大概解释为什么在`build`之后获取不到环境变量了：

**“I think that's because on macOS/Linux the PATH environment variable is not inherited by default from your .bashrc and similar shell files,can you try using this crate https://github.com/tauri-apps/fix-path-env-rs and see if it fixes the issue?”**

大概意思就是：**我认为这是因为在 macOS/Linux 上，PATH 环境变量默认不会从您的.bashrc 和类似的 shell 文件中继承**

当然人家已经整理出了[解决方案](https://github.com/tauri-apps/fix-path-env-rs);

按照对应的步骤进行操作，那么`build`之后就可以获取到对应的环境变量了；
