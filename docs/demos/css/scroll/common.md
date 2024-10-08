---
outline: deep
---

## 滚动 timeline 相关

> 简单介绍一下如何使用？

1. 使用`scroll-timeline`具备俩个属性，name 和 滚动的方向(x/y)
2. 给滚动元素绑定`scroll-timeline`，name 是时间轴的名称，可以理解为时间轴的 id。
3. 给需要动画的元素绑定`animation-timeline`, value 是时间轴的名称/id。

### 滚动进度条

<preview path="./components/scroll1.vue" title="滚动进度条的实现方式" description="利用滚动时间轴实现，需要定义时间轴名称，给滚动元素绑定时间轴动画(动画名称与时间轴名称一致)<a style=color:red>需要注意的是兼容性不是很好</a>，关于<a href=https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-timeline target=_blank>如何使用？看文档</a>"></preview>

### 滚动视区内的动画

<preview path="./components/scroll2.vue" title="滚动视区内的动画" description="页面发生滚动时，给元素添加滚动效果。<a style=color:red>需要注意的是兼容性不是很好</a>关于<a href=https://developer.mozilla.org/en-US/docs/Web/CSS/view-timeline target=_blank>如何使用？看文档</a>"></preview>

### 滚动视区外的动画

<preview path="./components/scroll3.vue" title="滚动视区外的动画" description="页面发生滚动时，给滚动区域外元素添加滚动效果。<a style=color:red>需要注意的是兼容性不是很好</a>关于<a href=https://developer.mozilla.org/en-US/docs/Web/CSS/timeline-scope target=_blank>如何使用？看文档</a>"></preview>

### 时间线溢出隐藏

<preview path="./components/scroll4.vue" title="时间线溢出隐藏" ></preview>

### 滚动文字颜色

<preview path="./components/scroll5.vue" title="滚动文字颜色" ></preview>

### 滚动文字蒙层

<preview path="./components/scroll6.vue" title="滚动文字蒙层" ></preview>
