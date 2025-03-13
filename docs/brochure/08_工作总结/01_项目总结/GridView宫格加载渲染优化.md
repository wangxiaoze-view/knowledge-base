---
outline: deep
---

# 背景

::: warning
公司系统首页是一个`GridView`宫格模块的界面，但是对于这样的一个界面来讲，渲染界面的时间并不会很长；接口返回的数据的耗时也是比较短的，但是整个过程加起来耗时`22s` ；很难想象为什么会花费这么长时间呢？
:::

## 分析

在优化之前，要先明确优化的地方以及怎优化；只有找到来源才好找到解决方案去优化；

本地调试页面首次打开，从渲染页面开始到资源加载完毕，共加载 20s-30s 左右，加载本地资源在 1s-2s 左右，由于原生系统引入 vue 的原因， vue 外链不是国内的导致下载资源时间将近在 15s 左右；

本地开发去除 vue 外链引入，再次打开页面加载时间在 12s 左右，查看本地资源加载完成的时间在 1.5 左右，那么渲染时间从开始到结束一共 8s-10s 左右；对于 100 个 tab 的渲染决不能渲染时间在 10s 左右，那么就是源码是可以优化的； 明确了页面渲染时间较长，接下来我们可以查看源码；更加明确页面渲染时间长的原因；

`查看源码，代码行数接近 2000 行；去除 css 样式和 html，计算每个 tab 将近 8-10 行代码；并且这些代码是可以重复利用封装的；`

> 分析图，如下图

![GridView分析图](http://wangxiaoze-view.github.io/picx-images-hosting/images/home_gridview_1.svg)

## 解决方案

- 代码提炼，代码简洁优化
- 提取公共节点元素
- 公共渲染函数封装

> 因为涉及公司源码，这里只将没有关系的图片展示出来

![GridView解决图1](http://wangxiaoze-view.github.io/picx-images-hosting/images/homeGridview_2.png)
![GridView解决图2](http://wangxiaoze-view.github.io/picx-images-hosting/images/homeGridview_3.png)
![GridView解决图3](http://wangxiaoze-view.github.io/picx-images-hosting/images/homeGridview_4.png)

**以 js 追加元素 避免了编译的渲染的过程，从而避免 8s 时间的等待；在原来的基础上 优化了近 7-8s 左右；**
