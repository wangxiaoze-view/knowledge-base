---
outline: deep
---

::: tip
项目中的配置文件太多了，除了规范性的配置文件，还有一些其他的配置文件
:::

## .node-version

在项目根目录创建文件`.node-version`, 这个文件就是固定`node`版本的，代码如下：

```bash
# .node-version
18
```

当项目 A 我设置之后, 如果电脑安装的有`18`的版本，打开编辑器之后终端会显示`Using Node v18.18.0`， 如果没有，那么会显示
`Can't find an installed Node version matching v18.x.x.
Do you want to install it? answer [y/N]: `

你可以输入`y`进行安装，当然也可以退出，使用当前的`node`版本运行项目；

## .npmrc

设置的是`npm`的相关配置

```bash
# 设置install 源
registry=https://registry.npmmirror.com/
# 设置为 true 时，会提升（hoist）某些依赖到更高层级，以优化依赖树结构。
shamefully-hoist=true
# 设置为 false 时，表示放宽对 peer dependencies 的严格检查，避免安装时出现错误。
strict-peer-dependencies=false
```

## .nvmrc

设置`nvm`的配置信息

```bash
# 设置node版本
v16.14.0
```
