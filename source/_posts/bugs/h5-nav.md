---
title: 移动端返回触发俩次
date: 2023-05-20
categories:
  - Bugs
---

## 背景

{% note info flat %}
前端时间移动APP与h5的一个混合式开发项目中，遇到了一个比较搞笑的bug；刚开始有点纳闷，后来静下心来才觉得这个问题有点可笑；
h5的项目采用的vue3 + vant3开发的，h5页面的顶部`tabBar`结构为左中右，是对vant的二次封装；
{% endnote %}

## 复盘

### **是一个怎样的问题？**

在开发项目中，因为是混合式开发， h5会调用原生app的一些方法，例如文件上传，返回上级页面，跳转app页面等等；

一级页面为h5页面, 二级页面也是h5页面，在二级页面返回直接跳出，直接到了app原生页面首页；按理说这应该返回的是一级h5的页面；

### **浏览器打开h5一级页面模拟bug复现**

采用`vue-router`中的`router.back()` 和 `router.go(page)`方法，均在浏览器中返回的是一级页面；但是在`app webview`中直接跳出。执行了俩次；

使用调试手段. `console日志 和 debugger` 都会发现执行了俩次；

### **寻找问题来源**

![效果图](http://qiniu.wangxiaoze.wang/hexo-blog/vue-tabbar.svg)

### **解决方案**

这个问题确实是粗心造成的；不过这个bug的解决方案也很简单，既然知道了问题的来源，那么对于解决方案，无非以下俩点：

- [x] 方案一： 去掉子组件自带的api方法 和 导出的`emit`
- [x] 方案二： 那就是将`emit` 的name进行修改，不要修改和子组件一致的`event name`； 当然父组件的`event name` 要和 子组件的
`emit` 中的`event name`一致即可；
