# 背景

昨天在逛[node 官网](https://nodejs.org/en)的时候，发现下载页面多了一`fnm`的包管理器；

于是，我开始研究一下。 发现它与 `nvm` 相似，但是它同时支持 `node` 的 `arm` 平台。也可以说是跨端的。不过它是`rust`开发的，性能得到进一步提升

## 官网介绍

1. 🌎 跨平台支持（macOS、Windows、Linux）
2. ✨ 单文件，轻松安装，即时启动
3. 🚀 以速度为中心
4. 📂 适用于.node-version 和.nvmrc 文件

**🚀 快速、简单的 Node.js 版本管理器，采用 Rust 构建**

## 使用

### macOS/Linux

对于 bash、zsh 和 fishshell，有一个[自动安装脚本](https://github.com/Schniz/fnm/blob/master/.ci/install.sh)。

首先确保 curl 和 unzip 已安装在您的操作系统上。然后执行：

```sh
curl -fsSL https://fnm.vercel.app/install | bash
```

不过我在用`macos`安装的时候老是拉去不下来，也不清楚是什么问题；我在想既然通过命令自动安装不行，那么就通过 **Homebrew** 手动安装吧；

- [Homebrew 官网](https://brew.sh/)
- [github](https://github.com/Homebrew/brew)

安装成功之后 `-v` 查看版本号。如果有版本那就安装成功了；

```sh
brew install fnm
```

执行 `install`, 同样`fnm -v`查看是否安装成功；

安装成功之后需要手动设置一下环境配置, 具体的可看[shell-setup 配置](https://github.com/Schniz/fnm?tab=readme-ov-file#shell-setup)

```sh
eval "$(fnm env --use-on-cd)"
```

### windows

`fnm`默认的安装位置在`c盘`，由于习惯问题，我将`fnm`安装在`D盘`；

```sh
winget install Schniz.fnm --location D:\fnm
```

同时将`fnm`添加到环境变量中；

在用户变量中新建一条：

```sh
变量名为：FNM_DIR
变量值为：D:\fnm
```

这个变量是后面安装的`node`用到的目录，一些缓存值, 所有的` node`版本以及当前使用的`node`版本都在这个文件夹中；

在`cmd或者powershell`中执行

```sh
fnm env --use-on-cd | Out-String | Invoke-Expression
```

同样的方式查看是否安装成功； `fnm`的大部分命令和`nvm`是一样的，例如：`fnm ls, fnm install, fnm use`等；

<font color="#ff0000">需要注意的是：想要设置全局的 node 版本，需要使用 `fnm default 16.14.0`，在不同项目不同 node 版本使用`fnm use `给不同的项目设置不同的 node 版本</font>
