---
outline: deep
---

# 介绍

近期在`review`代码的时候发现了一些关于项目的问题，项目中冗余的代码比较多，有很多都是辅助粘贴的，
一些`utils`工具以及一些方法都是多余的，这样不是一个俩个项目是这样的，基本大部分项目都是这样的；

对于企业级的项目，没有任何关于企业的一些工具，这样我想到一种可能：就是将一些工具统一封装成公司内部
专用的组件或者工具，因为公司内部都是内网开发的，不适用于将`npm`包上传到`npm`上，那么我了解到一个`nexus3`
刚好可以部署私有化的工具；

## 使用

首先还是用到之前`1Panel`部署的服务，同样在`应用商店`下载`nexus`;

![X](https://file.wangzevw.com/images/image.2obja6y7m7.webp)

然后等待安装，安装完成过之后就可以打开了，打开之后点击右上角的登录，第一次登录密码有存放的目录，找到输入然后需要
重置密码；

![X](https://file.wangzevw.com/images/image.3d4su7rvhz.webp)

### 创建 blob 存储

这里需要说明一下：

- `hosted`: 本地存储，像官方一样提供本地私库功能
- `proxy`：提供代理其他仓库的类型，如 docker 中央仓
- `group`：组类型，实质作用是组合多个仓库为一个地址

接着，为其创建一个单独的存储空间：

![x](https://file.wangzevw.com/images/image.39l6wi4ad2.webp)

![x](https://file.wangzevw.com/images/image.2a53jc3z6u.webp)

### 创建 hosted 类型的 npm

![x](https://file.wangzevw.com/images/image.5xan6v0od1.webp)
![x](https://file.wangzevw.com/images/image.7egs8m721a.webp)

- `Name`: 定义一个名称
- `Storage`：我们下拉选择前面创建好的专用 。
- `Hosted`：开发环境，我们运行重复发布，因此 Delpoyment policy 我们选择 Allow redeploy。这个很重要！

### 创建一个 proxy 类型的 npm 仓库

![X](https://file.wangzevw.com/images/image.8ojpextl98.webp)

### 创建一个 group 类型的 npm 仓库。

![X](https://file.wangzevw.com/images/image.70achr5tdh.webp)

这些配置完成之后，就可以使用了。

那就在自己电脑上测试一下：

## 测试使用

创建一个目录`demo-npm`的空白项目，然后在终端输出`npm config get registry`看一下自己电脑的源地址:
![x](https://file.wangzevw.com/images/image.2krxchyss8.webp)

接着我们需要在这个项目配置私有源
![x](https://file.wangzevw.com/images/image.3nrmndxyn3.webp)

```bash
npm config set registry http://154.37.212.237:8081/repository/npm-store-group/
```

设置成功之后，如图
![X](https://file.wangzevw.com/images/image.6t74mbt6ir.webp)
是没有任何的依赖的，我们需要在`demo-npm`执行一下`pnpm init  pnpm add express`, 执行完成之后就可以看见

![X](https://file.wangzevw.com/images/image.7egs8mszat.webp)

这样的话我们就会把一些依赖上传到`nexus`,后面就直接使用私库进行`install`,这样在内网上线进行`install`就会快很多；

当然对于不同项目的版本都是不一致的，那么它有一个好处就是不会覆盖之前的版本，而是在原来的基础上在新增一个版本；这里拿`vue`举例，如图：

![X](https://file.wangzevw.com/images/image.13lsarggrr.webp)

## 私库开发插件

就好如你开发属于公司的插件那么就需要上传到私库，首先你需要设置对应的源地址，不过这里只能设置`hosted`如图：
![X](https://file.wangzevw.com/images/image.6f0ovh6a1n.webp)

在项目中设置源地址

```bash
npm config set registry http://154.37.212.237:8081/repository/npm-store-local/
```

设置完成之后，需要设置一个角色：
![X](https://file.wangzevw.com/images/image.7i0e6dccyb.webp)

设置完成之后，需要创建一个插件的用户：

![X](https://file.wangzevw.com/images/image.8vmxaepudl.webp)

<p style="color: #ff0000">注意：可能会出现没有权限的情况：BASIC realm="Sonatype Nexus Repository Manager", 如果出现以下情况，需要设置如图</p>

![x](https://file.wangzevw.com/images/image.60u97nud0p.webp)

完成之后在需要上传插件的项目执行

```bash
npm login
```

输入刚刚创建的用户以及密码：
![X](https://file.wangzevw.com/images/image.4jo42vasbt.webp)

登录成功之后，再次执行

```bash
npm publish
```

回车之后发现一个错误，

![X](https://file.wangzevw.com/images/image.4n7q0l6hnj.webp)

这个错误的意思是：`package.json`中不能设置`"private": true`;然后删除之后重新执行`npm publish`

![x](https://file.wangzevw.com/images/image.1ap067wp4u.webp)

看，发布成功了，接着看下私库里有没有
![X](https://file.wangzevw.com/images/image.4xujtqt583.webp)
![X](https://file.wangzevw.com/images/image.8ad9o4asbw.webp)

嘿嘿，这样就成功了，接着在`demo-npm`项目中安装这个插件

运行`npm config get registry` 如果返回的是`local`， 那么就需要设置`groUp`

![x](https://file.wangzevw.com/images/image.8s3bcpkjog.webp)
