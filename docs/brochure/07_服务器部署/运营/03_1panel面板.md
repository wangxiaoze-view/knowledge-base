---
outline: deep
---

::: tip
上篇文章说了一下如何使用`宝塔`在服务器部署前端的项目，但是这种做法虽然也是可以的，但是比较麻烦，每次迭代更新打包都需要手动上传`dist`文件到服务器下，那么接下来说一下使用`jenkins`在服务器上发布项目；
:::

`1panel`需要使用`docker`环境安装，具体[看官网](https://1panel.cn/)

接下来具体说一下如何使用`jenkins`部署前端项目

## 安装 Jenkins

首先在`应用商店`搜索`jenkins`，然后进行安装，接着傻瓜式安装，当然要勾选外部端口，这样才能访问`http:xxxx:8080`,等待其安装完成，安装成功之后，如下图:

![x](https://file.wangzevw.com/images/image.pfcitpy1g.webp)

找到图中的`服务端口`按钮，打开网页如图：
![X](https://file.wangzevw.com/images/image.45hoax4ywn.webp)
这里需要输入密码，密码的存放地址在网页中已经标明，只需要在服务器上找到即可，但是这里我们在`1panel`中找到图一中的`日志`按钮，如图：
![X](https://file.wangzevw.com/images/image.m2ytak8q.webp)
接着在`jenkins`傻瓜式安装即可，如图：
![X](https://file.wangzevw.com/images/image.6t74la2a1r.webp)

然后等待`jenkins`安装完成
![X](https://file.wangzevw.com/images/image.5c0zjj3435.webp)
自行配置用户名
![X](https://file.wangzevw.com/images/image.99td07jjq5.webp)
安装对应的插件, `Nodejs, Git Parameter, Publish Over SSH`当然您也就可以安装需要的插件
![X](https://file.wangzevw.com/images/image.7lk030znhw.webp)

## 添加流水线

在左侧菜单`新建Item`构建，大致流程就是

1. 添加`git`地址，配置你的账号密码
2. 配置对应的操作，如：选择分支，选择发布环境
3. 配置构建命令等，将打包后的文件上传到服务对应的域名
4. 配置发布之后发送的邮件信息，这样就能收到成功或者失败的邮件

![X](https://file.wangzevw.com/images/image.7sn7yhfzn8.webp)
![X](https://file.wangzevw.com/images/image.1ap0565tsc.webp)
![X](https://file.wangzevw.com/images/image.5j47ezwx9u.webp)

## 创建网站

![X](https://file.wangzevw.com/images/image.7i0e5d1o0o.webp)

最后在`jenkins`配置`shell`
![X](https://file.wangzevw.com/images/image.9rjeoul3sr.webp)
解释上图：

1. 系统运用的是`docker`, 那么就用`docker cp`当前的目录或者的 dist 的目录
2. 复制到对应容器的网站
3. `1Panel-openresty-qVw7`是`docker`容器，也是`1panel`容器
4. `/www/sites/154.37.212.237`是刚刚创建的网站, `index`是这个网站的根目录；

![X](https://file.wangzevw.com/images/image.9nzsr4zaeb.webp)

那么设置完成之后，就可以重新打开网页就可以了；
![X](https://file.wangzevw.com/images/image.39l6vjlekc.webp)

关于`jenkins`的简单使用就到这里了，如果喜欢`1Panel`那就自己花时间研究一下吧！
