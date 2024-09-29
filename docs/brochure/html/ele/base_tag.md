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

## 标题 `H1-H6`

::: tip
`HTML` 标题是您想要在网页上显示的标题或副标题。

常常用于网页的标题展示，标题分为 `1-6`，然而权重是不一样的，各有个的用法； `<h1></h1>`定义最为重要的标题，也是权重最高的，而 `<h6></h6>`定义最不重要的标题，同时也是权重最小的。
:::

### 用法

```html
<h1>标题1</h1>
<h2>标题2</h2>
<h3>标题3</h3>
<h4>标题4</h4>
<h5>标题5</h5>
<h6>标题6</h6>
```

::: warning
值得注意的是：

浏览器会在标题的前后添加一些间距（空白距离）；同时仅仅最作为题，不建议用标题将文本**加粗或者放大**；因为浏览器默认的样式已经足够，当然权重不太一样，导致的字体大小也是不用的，当然文本加粗**是默认的**；
:::

## 段落 `P`

::: tip
段落标签是最常用的标签，用于将文本分成段落，段落之间用 `<p></p>` 标签包裹起来。新行开始，并且通常是一块文本。经常用于文章的展示；

同样，段落总是从新行开始，并且浏览器会自动在段落前后添加一些空白（边距）。
:::

### 用法

```html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
```

当然，`P`标签在网页中，会自动删除多余的空行与空格；

### 水平规则 `hr`

水平规则标签，用于在网页中添加水平分割线，例如：

```html
<p>这时一段内容</p>
<hr />
<p>这时一段内容</p>
<hr />
```

该`<hr>`标签为空标签，也就是说它没有结束标签。

### 换行符 `br`

br 标签，用于在网页中添加换行符，例如：

```html
<p>这是第一行</p>
<br />
<p>这是第二行</p>
<br />
<p>这是第三行</p>
<br />
```

该`<br>`标签为空标签，也就是说它没有结束标签。

## 格式化标签

### 含义

1. `b`标签，用于将文本标记为**粗体**，例如：
2. `i`标签，用于将文本标记为**斜体**，例如：
3. `u`标签，用于将文本标记为**下划线**，例如：
4. `s`标签，用于将文本标记为**删除线**，例如：
5. `em`标签，用于将文本标记为**斜体**，例如：
6. `strong`标签，用于将文本标记为**粗体**，例如：
7. `mark`标签，用于将文本标记为**标记**，例如：
8. `del`标签，用于将文本标记为**删除线**，例如：
9. `ins`标签，用于将文本标记为**下划线**，例如：
10. `sub`标签，用于将文本标记为**下标**，例如：
11. `sup`标签，用于将文本标记为**上标**，例如：
12. `abbr`标签，用于将文本标记为**缩写**，例如：
13. `code`标签，用于将文本标记为**代码**，例如：
14. `kbd`标签，用于将文本标记为**键盘**，例如：
15. `var`标签，用于将文本标记为**变量**，例如：
16. `samp`标签，用于将文本标记为**示例**，例如：
17. `cite`标签，用于将文本标记为**引用**，例如：
18. `dfn`标签，用于将文本标记为**定义**，例如：
19. `q`标签，用于将文本标记为**引用**，例如：
20. `blockquote`标签，用于将文本标记为**引用**，例如：
21. `address`标签，用于将文本标记为**地址**，例如：
22. `pre`标签，用于将文本标记为**预格式文本**，例如：
23. `small`标签，用于将文本标记为**小号**，例如：

### 案例

```html
<p><b>粗体</b></p>
<p><strong>粗体</strong></p>
<p><em>斜体</em></p>
<p><i>斜体</i></p>
<p><u>下划线</u></p>
<p><ins>下划线</ins></p>
<p><s>删除线</s></p>
<p><del>删除线</del></p>
<p><mark>标记</mark></p>
<p><sub>下标</sub></p>
<p><sup>上标</sup></p>
<p><small>小号</small></p>
<p><abbr title="Hyper Text Markup Language">HTML</abbr></p>
<p><code>代码</code></p>
<p><kbd>键盘</kbd></p>
<p><var>变量</var></p>
<p><samp>示例</samp></p>
<p><cite>引用</cite></p>
<p><dfn>定义</dfn></p>
<p><q>引用</q></p>
<p><blockquote>引用</blockquote></p>
<p><cite>引用</cite></p>
<p><address>地址</address></p>
<p><ins>引用</ins></p>
<p><del>引用</del></p>
<p><s>引用</s></p>
<p><s>引用</s></p>
<pre>
  My Bonnie lies over the ocean.
</pre>
```

<preview path="../components/format.vue" ></preview>

## 链接标签

链接标签，用于在网页中添加超链接，例如：

### 用法

::: tip

```html
<a href="https://www.baidu.com">百度</a>
<a href="https://www.baidu.com" target="_blank">百度</a>
<a href="https://www.baidu.com" target="_self">百度</a>
<a href="https://www.baidu.com" target="_parent">百度</a>
<a href="https://www.baidu.com" target="_top">百度</a>
```

**几乎所有网页上都有链接。链接允许用户通过点击从一个页面到另一个页面。您可以单击链接并跳转到另一个文档。当将鼠标移到链接上时，鼠标箭头会变成一只小手。**

::: warning
注意：链接不一定是文本。链接可以是图像或任何其他 HTML 元素！
:::

默认情况下，链接在所有浏览器中都会显示如下内容：

- 未访问的链接带有下划线和蓝色
- 已访问的链接带有下划线和紫色
- 活动链接带有下划线和红色
- 当然可以使用 CSS 设置链接样式，以获得另一种外观！

### 属性

默认情况下，链接的页面将显示在当前浏览器窗口中。要更改此设置，您必须为链接指定另一个目标。
该`target`属性指定在何处打开链接的文档。

- \_self- 默认。在单击的同一窗口/选项卡中打开文档
- \_blank- 在新窗口或选项卡中打开文档
- \_parent- 在父框架中打开文档
- \_top- 在窗口中打开整个文档

### 其他用法

锚点标签，用于在网页中添加锚点，例如：

```html
<!-- 锚点标签 -->
<a name="top"></a>
<a href="#top">回到顶部</a>
<!-- 常规用法 -->
<a href="https://www.baidu.com">百度</a>
<a href="https://www.baidu.com" target="_blank">百度</a>
<a href="https://www.baidu.com" target="_self">百度</a>
<a href="https://www.baidu.com" target="_parent">百度</a>
<a href="https://www.baidu.com" target="_top">百度</a>
<!-- 电子邮件 -->
<a href="mailto:admin@example.com">发送电子邮件</a>
<!-- 拨打电话 -->
<a href="tel:+1-555-555-5555">拨打电话</a>
<!-- 事件触发 -->
<a href="javascript:void(0);" onclick="alert('Hello World!');">点击我</a>
<a href="https://www.baidu.com" onclick="return confirm('确定要访问百度吗？');">
	百度
</a>
```

## 图像

使用`<img/>`可以在网页中嵌入图片，图像一般有俩个必填的参数

- src：图片地址, 可以是本地地址也可以是网络资源
- alt：图片描述，图片的描述，当图片不存在的时候会显示

图像还支持宽度和高度

```html
<img src="xxxx" alt="" width="100" height="100" />
```

不过不建议这样去写宽度和高度， 因为图片加载的时候，会根据宽度和高度去计算图片的宽高，导致图片加载时间过长。
可以使用 CSS 来设置图片的宽度和高度，例如：

```css
img {
	width: 100px;
	height: 100px;
	object-fit: cover;
}
```

## 表格

详细介绍请看文档：[列表](https://www.w3schools.com/html/html_tables.asp)

```html
<table>
	<!-- 定义表格标题 -->
	<caption>
		Monthly savings
	</caption>
	<!-- 规定表中一个或多个列的组以进行格式化 -->
	<colgroup>
		<col />
		<col />
		<col />
	</colgroup>
	<!-- 将表头内容分组到表中 -->
	<thead>
		<tr>
			<th>Person 1</th>
			<th>Person 2</th>
			<th>Person 3</th>
		</tr>
	</thead>
	<!-- 将正文内容分组到表格中 -->
	<tbody>
		<tr>
			<td>Emil</td>
			<td>Tobias</td>
			<td>Linus</td>
		</tr>
		<tr>
			<td>16</td>
			<td>14</td>
			<td>10</td>
		</tr>
	</tbody>
	<!-- 将页脚内容分组到表格中 -->
	<tfoot></tfoot>
</table>
```

## 列表

详细介绍请看文档：[列表](https://www.w3schools.com/html/html_lists.asp)

```html
<ol>
	<li>Coffee</li>
	<li>Tea</li>
</ol>

<ul>
	<li>Coffee</li>
	<li>Tea</li>
</ul>

<dl>
	<dt>Coffee</dt>
	<dd>- black hot drink</dd>
	<dt>Milk</dt>
	<dd>- white cold drink</dd>
</dl>
```
