# 背景

最近在`bili`上看到了一个可视化运营面板`(go + docker)`搭建而成的； 于是我花巨资买了一台服务器, 在`Ubuntu`操作系统上安装使用`1Panel`；

首先`1Panel`的在线安装, [如使用其他安装方式，可查看官网](https://1panel.cn/docs/installation/online_installation/)

```bash
# 这里我使用的是Ubuntu
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh
```

因为面板是使用`docker`搭建的，当然就要安装`docker`;

## 问题一：安装`docker`超时失败

因为安装`docker`就像安装`npm/pnpm install`类似，是需要镜像源地址的；

因为`1Panel`默认使用的是官方的镜像源，那么在中国大陆很多关于`docker`的镜像源地址都关闭下架了；可以查看 [githubDocker Hub 镜像加速器](https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6)，可以看出很多的地址要不是内部使用要么就是关闭了；

我花时间查询了一下相关资料，就是你的先在你的服务器上安装`docker`，但是安装需要镜像地址； 之后发现了一类似问题的网页: [安装 1panel 时提示 docker 安装失败](https://bbs.fit2cloud.com/t/topic/5899)

当然您可以尝试一下， 但是我使用的是 (大陆服务器安装 docker 的临时方法（2024.6 月）（docker 安装失败的情况）)[https://bbs.fit2cloud.com/t/topic/5891/27]， 有大佬发了一个现成的`SHELL`命令：

### 安装方式一

- 自用 VPS 初始设置脚本: 自带 docker 和 docker-compose 安装

```SH
 # bash <(wget -qO- --no-check-certificate https://fastly.jsdelivr.net/gh/okxlin/ToolScript@main/tools/vps-setup.sh)
# bash <(wget -qO- --no-check-certificate https://gcore.jsdelivr.net/gh/okxlin/ToolScript@main/tools/vps-setup.sh)
# bash <(wget -qO- --no-check-certificate https://testingcf.jsdelivr.net/gh/okxlin/ToolScript@main/tools/vps-setup.sh)
# bash <(wget -qO- --no-check-certificate https://cdn.jsdelivr.net/gh/okxlin/ToolScript@main/tools/vps-setup.sh)
bash <(wget -qO- --no-check-certificate https://mirror.ghproxy.com/https://github.com/okxlin/ToolScript/raw/main/tools/vps-setup.sh)

```

### 安装方式二

```SH
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

镜像我选择的是`阿里云`， 回车之后等待安装， 安装成功之后重新执行安装`1Panel`命令； 之后等待完成即可；之后会有访问的面板地址，账户以及密码(类似宝塔)

## 问题二：下载应用加速镜像

我们需要设置一下默认的加速镜像地址

![地址](https://file.wangzevw.com/images/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20240609160644.png)

点击快速跳转，找到`镜像加速--> 设置`，添加地址`https://docker.1panel.live`这是临时使用的地址；
[应用安装失败 镜像拉取超时的临时解决方案](https://bbs.fit2cloud.com/t/topic/5886)

之后直接安装就好了，但是速度可能有点慢，等待完成安装即可；

## 问题三：证书申请

`网站 --> 证书`， 创建`Acme账户和Dns账户`， 这里主要说下`DNS账户如何申请使用`：我使用的是腾讯云：

首先进入腾讯[云控制台-访问管理](https://console.cloud.tencent.com/cam/overview)，找到 用户 -> 用户列表，点击新建用户-> 自定义创建。

依次完成以下步骤:

1. 选择类型：可访问资源并接收消息
2. 填写用户信息：用户名随便填啦，我填的是 1panel-dns-demo，勾选编程访问。

3. 设置用户权限：搜下 dns，勾选第一个云解析 DNS 全读写访问权限策略名为 QcloudDNSPodFullAccess。

4. 设置用户标签：有没有无所谓。

5. 审阅信息和权限：看下用户信息有没有问题，没问题就点完成。

完成后记得保存用户的 SecretId 与 SecretKey，只会显示一次。

可以查看参考文档

- [在 1Panel 中申请 SSL 证书](https://insectmk.cn/posts/f3cf7d8c/index.html#%E5%88%9B%E5%BB%BA%E8%85%BE%E8%AE%AF%E4%BA%91%E7%94%A8%E6%88%B7)
- [1panel 中使用 cloudflare DNS 账户申请 SSL 证书&自动续签](https://www.soulcloser.com/4075/)

> **需要注意的是，申请的域名不能带特殊字符哦；**
