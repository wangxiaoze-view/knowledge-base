---
outline: deep
---

::: tip
`<script>`标签的`defer`和`async`的作用是什么，有什么区别呢？  
`async`和 `defer` 是两个用于控制脚本加载和执行的属性，用于 `<script>` 标签中。它们的主要区别在于脚本的加载和执行顺序。
:::

[<MDN 是如何解释的？>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)

这里一张图可以完美解释：

![x](https://wangxiaoze-view.github.io/picx-images-hosting/images/avoid-render-blocking-javascript-with-async-defer.51e79lydsy.webp)

## async

`async` 属性指定脚本应该异步加载，这意味着浏览器会在后台加载脚本，而不会阻塞页面的渲染。脚本加载完成后，会立即执行。

对于普通脚本，如果存在 `async` 属性，那么普通脚本会被并行请求，并尽快解析和执行。

对于模块脚本，如果存在 `async` 属性，那么脚本及其所有依赖都会在延缓队列中执行，因此它们会被并行请求，并尽快解析和执行。

```js
<script async src="script.js"></script>
```

优点：

- 不会阻塞页面渲染
- 加载完成后立即执行

缺点

- 脚本执行顺序不确定
- 可能会导致脚本依赖的问题

## defer

`defer` 属性指定脚本应该延迟加载，这意味着浏览器会在页面渲染完成后加载脚本。脚本加载完成后，会在 `DOMContentLoaded` 事件之前执行。但是它能保证执行顺序。

```js
<script defer src="script.js"></script>
```

优点：

- 不会阻塞页面渲染
- 脚本执行顺序确定（在 `DOMContentLoaded` 事件之前）
- 可以解决脚本依赖的问题

缺点：

- 加载完成后可能需要等待 `DOMContentLoaded` 事件才会执行

一般来说，如果脚本不依赖其他脚本或 `DOM`，可以使用 `async`。 如果脚本依赖其他脚本或`DOM`，应该使用 `defer`。
