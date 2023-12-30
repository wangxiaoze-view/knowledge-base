---
title: 简单接触鸿蒙App
date: 2023-12-20
categories:
  - Demos
tags:
    - HarmonyOS
---

## 前言

最近在网上刷到过相关鸿蒙的视频，说是鸿蒙即将告别`Android`，于是就萌生了学习鸿蒙的想法。但我本身就是干前端的，鸿蒙的`rts`对我来说并没有很大的难度；

没有任何的想法，就是自己的好奇心, 只是想接触一下开发玩一玩；就和当时接触`flutter`一样；


## 开始

要想接触鸿蒙，那么就要有开发文档，于是自己就花了几个小时间看了一下鸿蒙的官方文档，值得表扬的是竟然还有相对应部分文档的开始视频；这是为了小白更好的上手吗？


于是自己就开始接触了鸿蒙，如何下载`idea, sdk`可以去官方查阅相关资料

因为之前接触过`flutter`，所以上手很快，很快自己就搭建好了开发环境；和`flutter`有点区别是：鸿蒙是函数式编程，所以开发的时候会觉得很简单，因为之前我没有接触过`Android, Ios`开发，我不清楚是移动端都是这样冗余长度的代码吗？总感觉像是`promise`地狱嵌套；


如果之前接触过相关项目搭建的过程，那么就会对项目的构造有一定的认识；



## 开始编写

每个项目都会有一个入口文件, `flutter`是`main.dart` ，`鸿蒙`是`entry/src/main/ets/entryability/EntryAbility.ts`；每个入口文件都会有应用的生命周期；

例如：创建，销毁，隐藏，显示，进入后台，进入前台等等；

鸿蒙的入口文件中，是如何打开的首页呢?

``` ts
onWindowStageCreate(windowStage: window.WindowStage): void {
    // Main window is created, set main page for this ability
    // 这里是内置的日志
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

    
    // 加载首页
    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
    });
}
```

不过这里也可以做一个活动倒计时页面或者开屏页面，`3s时间`跳转到登陆页面或者首页; 

首页需要做那些内容呢？ 
1. 需要一个`tabbar`，这个`tabbar`,需要对应的`tab`页面；
2. 要与`tabbar`进行交互，需要一个`tabbar`的`controller`，这个`controller`需要与`tabbar`进行交互；

``` ts
@Entry
@Component
struct Index {
  @State currentIndex: number = 0
  private controller: TabsController = new TabsController()
  private app_bottom_nav: BottomNavType[] = [
    { name: '首页', icon: $r('app.media.icon_home'), active_icon: $r('app.media.icon_home_active') },
    { name: '商城', icon: $r('app.media.icon_mall'), active_icon: $r('app.media.icon_mall_active') },
    { name: '订单', icon: $r('app.media.icon_order'), active_icon: $r('app.media.icon_order_active') },
    { name: '消息', icon: $r('app.media.icon_msg'), active_icon: $r('app.media.icon_msg_active') },
    { name: '我的', icon: $r('app.media.icon_my'), active_icon: $r('app.media.icon_my_active') },
  ]

//  可以理解为前端的组件， 不过对于移动端来说 是builder
  @Builder
  TabBuilder(item: BottomNavType, index: number) {
    Column({ space: 6 }) {
      Image(this.currentIndex === index ? item.active_icon : item.icon)
        .width(22)
        .width(22)
      Text(item.name)
        .fontColor(this.currentIndex === index ? $r('app.color.tab_bottom_color_active') : $r('app.color.tab_bottom_color'))
        .fontSize(10)
        .fontWeight(this.currentIndex === index ? 500 : 400)
    }
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Center)
  }

  build() {
    Tabs({ barPosition: BarPosition.End, controller: this.controller }) {
      TabContent() {
        Home()
      }
      .tabBar(this.TabBuilder(this.app_bottom_nav[0], 0))

      TabContent() {
        Mall()
      }
      .tabBar(this.TabBuilder(this.app_bottom_nav[1], 1))

      TabContent() {
        Order()
      }.tabBar(this.TabBuilder(this.app_bottom_nav[2], 2))

      TabContent() {
        Message() 
      }.tabBar(this.TabBuilder(this.app_bottom_nav[3], 3))

      TabContent() {
        My()
      }.tabBar(this.TabBuilder(this.app_bottom_nav[4], 4))
    }
    // .scrollable(false)
    .barMode(BarMode.Fixed)
    .barHeight(70)
    .animationDuration(400)
    .backgroundColor($r('app.color.bg_color'))
    .onChange((index: number) => {
      this.currentIndex = index
    })
  }
}
```

因为`github`上这个项目已经进行了开源，现在不会过多介绍相关内容，像一些鸿蒙的组件., api等等还是需要去官网查阅文档；


---

github地址: https://github.com/wangxiaoze-view/HarmonyOs-App

---


具体的效果如下：

<video id="video" controls="" preload="none" poster="封面">
      <source id="mp4" src="https://github.com/wangxiaoze-view/HarmonyOs-App/assets/48245867/53ac1aa0-11cd-4d18-8e3b-66bf2c470c49" type="video/mp4">
</videos>


