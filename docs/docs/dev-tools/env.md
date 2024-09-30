# 环境配置

::: info
目前该软件还做不到一体化操作，有些环境需要手动配置；主要需要配置的是 node 相关环境变量
:::

## 自动安装

![install](https://file.wangzevw.com/images/image.67xcldj0yr.webp)

如果您还未安装`fnm`, 那么您可以点击按钮就行安装，点击之后会自动进行安装，如果您安装失败了，那么需要手动安装，具体安装方法可以参考[**fnm**](https://github.com/Schniz/fnm)

![install](https://file.wangzevw.com/images/image.2vemr051xe.webp)

## 手动安装

如果您执行这一步，那么您应该是自动安装失败了，那么您需要执行以下几个步骤即可；

如果您是`mac/linux`那么请查看[这里](https://github.com/Schniz/fnm/blob/master/README.md#installation)

### 下载 fnm

您可以在点击[下载](https://github.com/Schniz/fnm/releases/tag/v1.37.1)下载不同平台版本；

下载成功之后将其解压放在`d`盘（只要不是`c`盘即可）某个目录下（不能为中文），如：`D:\tools\fnm`

这个时候您需要配置对应的环境变量

在系统变量添加

```bash
# FNM_DIR 为变量名   D:\tools\fnm\node为变量值  以下也是一样的
FNM_DIR: D:\tools\fnm\node
FNM_NODE_DIST_MIRRORs: D:\tools\fnm\node
```

这个时候需要手动重启`cmd`或者`vscode`, 输入命令`fnm -v`如果显示版本号，那么说明安装成功，可以继续往下走；

想要安装 node 只需要执行 `fnm install 版本`，如：`fnm install 16.13.0`； `fnm`的使用方式和`nvm`的使用方式一样；

安装 node 成功之后，您可以`node -v npm -v`查看是否安装成功； 如果出现`node 不是内部命令`那么你需要配置`node`环境；

在系统变量添加

```bash
# 创建 node 目录，aliases\default就是你当前使用的node版本
NODE_PATH: D:\tools\fnm\node\aliases\default
```

这个时候需要手动重启`cmd`或者`vscode`, 输入命令`node -v`如果显示版本号，那么说明安装成功；

---

到这里为止，大概的环境配置就完成了；
