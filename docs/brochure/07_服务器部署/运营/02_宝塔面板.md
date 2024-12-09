---
outline: deep
---

# 介绍

搭建属于自己的网站, 前几天自己动手购买了一台腾讯云轻量级服务器，自己写代码，node 作为服务端去写接口, 简单部署一下网站的搭建到服务器的部署再到数据库的操作。 整体下来感觉还是有点坑，今天正好有时间，记录一下搭建环境时需要注意的， 自己也总结一下搭建的步骤。

## 首先拥有属于自己的域名

这里不做过多的介绍, ,

- [腾讯云](https://dnspod.cloud.tencent.com/)注册域名及使用, 介绍了域名的使用及备案。
- `DNS` 解析域名
- 其他的可以再官网或者百度上进行查阅

## 接下来购买属于自己的服务器

- 其实还是很简单的,首先我们先在腾讯云购买属于自己的 `轻量级服务器(较便宜,适合新手)`, 直接登录自己的微信号, 如果找不到, 直接搜索 `轻量级服务器` 就在左上角的云产品里。
  ![x](https://file.wangzevw.com/images/20211112203053.7p3kp8d4ry.webp)
- 接着, 我们选择镜像， 选择 宝塔镜像就可以了。
- 安装宝塔，避免了去操作大量操作 Linux， 宝塔自带可视化面板。
- 其他的根据自己需要去购买配置即可。
- 服务器创建之后，在应用管理找到登录，根据要求就可以有自己的宝塔面板的登录链接和账号密码了。
- 登录过后，关联自己的云服务器，根据要求就可以， 这里我略过 (官方有说明文档)
  ![x](https://file.wangzevw.com/images/20211112205120.6f0niwxflg.webp)
- 点击左侧的网站，部署自己的域名网站，添加站点 是你的购买域名, 下面直接做 DNS 解析就可以了。直接在浏览器输入自己的域名 就可以访问，
  ![x](https://file.wangzevw.com/images/20211112205257.92q3t9rehv.webp)
- 发现自己的网站是可以打开的， 觉得页面空空如也， 只有默认的页面， 那就只有自己手动去敲代码, 写页面了。

## 需要注意的地方

- 服务器安全组和宝塔面板的端口要暴露出去
- 就像 `mongodb 27017` 端口暴露, 这样自己本地就可以访问服务器的数据库了， 服务器的数据库 数据只是存在自己的网站上面， 要定时备份数据
  ![x](https://file.wangzevw.com/images/image.3uut6a0hhv.webp)
  在这里添加自己的定时任务.

## 部署 node 服务

- 在软件商城下载 `pm2`管理器, 根据自己的需要 去安装 `yarn`, 默认的是`nm`, 我个人喜欢`yarn`， 速度快一些。
  ![x](https://file.wangzevw.com/images/server_bs_5.6m3veco42b.webp)
- 根据自己的需要去配置一下自己的 node 服务的项目， 这时这个端口号 是你 `node bin/www` 文件里面的 `port`， 同时安全组也要放开端口, 我们在 `web` 项目中可以访问 服务器中的 `api` 接口地址了
- 接下来就可以启动 `node` 服务了， 可以在你的浏览器访问你的 `node` 接口了

## 部署前端项目

- 在宝塔面板左侧网站中找到自己的网站，可以再网站里面手动添加文件，文件夹等等，通过 url 的方式去访问，同时也可以设置权限。
  ![x](https://file.wangzevw.com/images/20211112210036.13lqy7hdeo.webp)
- 这里就是我上传的前端页面了， 当然你可以手动打包前端项目， 通过手动上传，也可以使用工具 `xftp7`去上传, 都是可以的， 根据个人喜好去上传。

## 部署 MongoDB 数据库

- 左侧软件商城下载 `mongodb`软件， 下载之后打开设置,
  ![x](https://file.wangzevw.com/images/20211112210336.175cvxc7oj.png)
- 接着设置数据库用户密码，保证其安全性
- 进入目录

```sh
// 进入目录
cd /www/server/mongodb/bin

// 切换 mongo环境
mongo

// 切换到admin数据库
use admin

// 给admin数据库设置用户密码
db.createUser({user: '你的用户名', pwd: '你的密码', roles: ['root']})

// 验证是否添加成功
db.auth('你的用户名', '你的密码')

// 如果返回 ‘1’表示验证成功， 如果是 ‘0’ 表示验证失败。
```

- [宝塔面板使用 MongoDB](https://blog.csdn.net/qq_39314291/article/details/112561177)

## 远程连接服务器的数据库

- 其实就一行代码就可以了

```sh
// mongodb://你的用户名:你的密码@服务器公网ip:27017/数据库名?authSource=admin
mongodb://myName:123456@xx.xxx.xxx.xx:27017/myMall?authSource=admin
```

- 具体使用可以参考文章： [Node 如何通过账号密码连接远程服务器的 MongoDB 数据库？](http://www.qianduan8.com/1794.html)

## 所有的步骤操作完成之后，上传自己写的网站，效果如下：

![x](https://file.wangzevw.com/images/20211112211239.7ax4ydiekt.webp)
![x](https://file.wangzevw.com/images/20211112211302.4qralqikfz.webp)
