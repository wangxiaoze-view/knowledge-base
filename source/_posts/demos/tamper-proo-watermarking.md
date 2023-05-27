---
title: 防篡改水印的优雅方案
date: 2023-05-27
categories:
  - Demos
tags:
  - Vue
---

{% note info flat %}
对于水印在各个平台网站已经是很常见的功能点了，但是对于水印的理解，无非就是那么几种，其一：平台为了数据的安全性，在用户截图需要涵盖水印防止数据信息泄露问题，其二：系统在特定的情况下亦或是展示功能的特性从而生成特殊的水印方式，例如上传图片需要对图片进行处理，水印需要上传时间，上传者的信息等等；
{% endnote %}

虽然，水印的功能并不复杂，但是对于`开发者`来讲，一切功能点都是为了安全，稳定考虑；对此，在网页页面的显示是不是有漏洞问题？或者说水印是否在特定的情况下会隐藏或者删除？接下来对于这个问题会大致讲解：

## 水印的安全？

水印一般是为了保证数据的安全性，例如有这么一个场景：公司账户登录的平台系统，每个大大笑笑的页面都需要水印，但是水印添加了登录人的信息，登录时间等，如：`张三 2023-05-27`，一张包含个人姓名的水印就此生成，如果截图反馈用户或者解决产品问题，尽可能的避免数据信息泄露问题，但是对于个别`开发者`来讲，我截图不要水印信息，只能在`控制台`找到对应的`元素节点`进行删除于修改；

如果这时你的水印生成方式没做相对的安全性，那么大大降低了数据的安全性；

## 提高安全？

对于删除`元素节点或者属性`去手动修改水印的方式，一般情况不会有人去这么操作的，但是万一呢，所以这时的你就需要对水印提高安全性能；

那么如何知道元素进行了修改或者删除呢？我要怎么监听，或者有现成的`api`呢？

这里不得不说`js`还是很强大的，`MutationObserver`在`Mdn`上的解释为：`MutationObserver` 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。

大致意思说，该`api`监听了对`dom`树的修改，如果元素被修改或者删除的情况，就会执行内置的回调函数，而从进行对应的逻辑；可参考以下代码：

``` js
// 创建观察器，如果对应的节点有修改的迹象，那么就如回调
const observer = new MutationObserver((records) => {})

// 配置开始观察目标的节点， 观察器的配置，需要观察什么变动
observer.observe(元素的节点, {
    // 跟节点的属性
    attributes: true, 
    // 观察子节点
    childList: true,
    // 观察整个子树
    subtree: true
})

// 之后，可停止观察
observer.disconnect()
```

创建了观察器，那么如果提高安全呢？

可以这么理解，我在观察器检测到修改或者删除的情况，重新生成水印并在元素添加；就相当于管用户是什么样的操作，删除或者修改都会在短时间内生成并重新渲染，那么水印的安全就会大大提高；

现在还有一个问题，就是在什么情况下才会重新生成水印呢？

![水印逻辑](https://qiniu.wangxiaoze.wang/hexo-blog/temper_waterremark.png)

这里可参考设计模式`订阅发布`，搜集对应的依赖，如果有就发布新的资源，功能点类似于`检测网站发布版本是否更新`；对于`vue3`如何监听依赖的变动呢？`watch`和`watchEffect`也许适合不错的选择，但是俩者还是有区别的:

- [x] `wattch`必须要有监听的对象，并且可以获取到上一次的变化值，但是在不做配置的情况下首次是不会执行的；添加`immediate`代表首次会触发
- [x] `watchEffect`没有监听的对象，只要你对应的依赖相应数据有了变化，那么就会执行该对应的回调；首次会默认执行一次；

``` js
const count = ref(0)

// 模拟的方法
const addCount = () => count.value++;

watch(() => count.value, (val, oldVal) => {
    // val: 最新值， oldVal: 上一次的值， 默认首次不执行
}, {
    immediate: true, // 首次执行
    deep: true // 深度监听
})


watchEffect(() => {
    // 如果执行addCount  回调生效，执行相对应的回调逻辑； 不过是有了变化才会执行，首次会执行；
    console.log(count.value)
})
```

相对于懒监听，对应依赖变化了才会执行，而不是每次都会执行，相对于代码的简洁`watchEffect`是个不错的选择，到时候执行在这里重新生成水印即可；大致的代码如下：

``` js

// parent ref, 生成水印父节点
const parentRef = ref()

// uid，用于监听依赖，重新生成水印
const uId = ref(0)

// bg， useWater是生成canvas的方法，
const bg = useWater(props)
// base：canvas base64， styleSize: canvas的大小
const {base, styleSize} = bg.value;

// div: 重新生成的水印
let div;
watchEffect(() => {
  // 搜集依赖， 如果依赖更新，那么执行下面的代码
  uId.value;
  if (!parentRef.value) return
  div && (div.remove())
  div = document.createElement('div')
  div.style.backgroundImage = `url(${base})`
  div.style.backgroundSize = `${styleSize}px ${styleSize}px`
  div.style.backgroundRepeat = 'repeat'
  div.style.width = '100%'
  div.style.height = '100%'
  div.style.position = 'absolute'
  div.style.inset = '0';
  parentRef.value.appendChild(div)
})

// 初始化观察器
let ob;
onMounted(() => {
  ob = new MutationObserver((records) => {
    for (const record of records) {
      // 监听删除
      for (const dom of record.removedNodes) {
        if (dom === div) {
          return uId.value++
        }
      }

      // 监听修改属性
      if (record.target === div) {
        return uId.value++
      }
    }
  })

  ob.observe(parentRef.value, {
    childList: true, // 节点的新增与删除
    attributes: true, // 节点属性值
    subtree: true // 整个子树
  });
})

// 页面加载完毕，卸载观察器，防止对应的内存泄露
onUnmounted(() => {
  ob.disconnect();
  // 清空，避免内存泄露
  div = null;
})

```

## 源码

防篡改水印案例完整代码可参考：

- [x] 源代码：[gitHub](https://github.com/wangxiaoze-view/web-demos/tree/main/src/views/vue/watermarking)
- [x] 在线预览 [防篡改水印](https://web-demos.wangxiaoze.wang/#/vue/watermarking), 友情链接个人项目中`Web Demos`点击可查看；后续会持续更新；
