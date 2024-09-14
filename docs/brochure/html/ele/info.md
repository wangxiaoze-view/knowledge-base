---
outline: deep
---

# 介绍

::: tip 什么是`Html`
**HTML 是创建网页的标准标记语言。**

- `HTML` 超文本标记语言;
- `HTML` 是创建网页的标准标记标签语言;
- `HTML` 描述网页的结构;
- `HTML` 由一系列元素组成;
- `HTML` 元素告诉浏览器如何显示内容;
- `HTML` 元素标记内容片段，例如“这是一个标题”、“这是一个段落”、“这是一个链接”等等。

:::

## 创建一个简单的 HTML 文件

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Page Title</title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style></style>
	</head>
	<body>
		<div id="app"></div>
		<script></script>
	</body>
</html>
```

### 代码解释

- 声明 `<!DOCTYPE html>` 定义此文档是 HTML5 文档
- 该 `<html>` 元素是 HTML 页面的根元素
- 该 `<head>` 元素包含有关 HTML 页面的元信息
- 该 `<title>` 元素指定 HTML 页面的标题（显示在浏览器的标题栏或页面的选项卡中）
- 元素 `<body>` 定义文档的主体，是所有可见内容的容器，例如标题、段落、图像、超链接、表格、列表等。
- `<script>` 定义交互逻辑主题代码
- `<style>` 元素样式主题

### 元素

`元素`就是一套标记标签语言(开始标签，结束标签)，例如：`<div>`、`<p>`、`<a>`、`<img />`、`<script>`、`<style>`、`<title>`、`<meta>`、`<body>`、`<head>`、`<html>`等。

```html
<!-- <p> 开始标签 -->
<!-- </p> 结束标签 -->
<p>这是一段文本</p>
```

---

接下来，将带您认识`元素标签`...
