---
outline: deep
---

# Browserslist

::: tip 什么是 `Browserslist`

这个文件指定了项目的浏览器兼容性目标，用于指导自动化工具`（如Autoprefixer或Babel）`如何处理`CSS和JavaScript`，确保代码在指定的浏览器版本中正常工作。

由于各种浏览器对 `ECMAScript 和 CSS` 的支持程度不同，因此开发者需要根据使用场景，为 `Web` 应用设置正确的浏览器范围。

`Browserslist` 可以指定 `Web` 应用能够在哪些浏览器中正常运行，它提供了统一的配置格式，并且已经成为了前端社区中的标准。`Browserslist 被 SWC, Lightning CSS, Babel, ESLint, PostCSS 和 webpack` 等库所使用。

:::

## Browserslist 文件是什么样子的

```bash
[production]
chrome >= 87
edge >= 88
firefox >= 78
safari >= 14

[development]
last 1 chrome version
last 1 firefox version
last 1 safari version
```

规定了哪些浏览器版本， 哪些浏览器版本可以运行。

**注意：有些项目是与 App 相关的，比如 iOS，那么就需要在 Browserslist 中添加 iOS 的版本号。安卓同样如此；这样才能保证项目在各种设备上都能运行。**

## 使用

### 单独.browserslistrc

可以在项目根目录创建文件`.browserslistrc`, 代码格式如下：

```bash
iOS >= 9
Android >= 4.4
last 2 versions
> 0.2%
not dead
```

### package.json 中

通过 `package.json` 的 `browserslist` 设置：

```json
{
	"browserslist": [
		"iOS >= 9",
		"Android >= 4.4",
		"last 2 versions",
		"> 0.2%",
		"not dead"
	]
}
```
