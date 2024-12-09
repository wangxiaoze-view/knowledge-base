---
outline: deep
---

# stylelint

`stylelint` 是一个用于检测 CSS 代码风格和错误的工具，它有点类似于 `ESlint`，但是它专注于 `CSS。` `stylelint` 不仅可以帮助你在团队中保持一致的 CSS 代码风格，发现潜在的错误，并且确保代码符合最佳实践。

`Stylelint` 需要一个配置对象，并在以下位置寻找一个[配置](https://stylelint.io/user-guide/configure)：

- `stylelint.config.js` 或`.stylelintrc.js` 文件使用哪个模块系统取决于 `Node.js` 的默认模块系统配置（例如`"type":"module"`在 `package.json`）。
- `stylelint.config.mjs` 或`.stylelintrc.mjs `使用文件 `export default（ES 模块）`
- `stylelint.config.cjs` 或使用(`CommonJS`) 的`.stylelintrc.cjs` 文件 `module.exports`
- `.stylelintrc.json`、`.stylelintrc.yml` 或`.stylelintrc.yaml `文件

## 配置

[相关资料-stylelint 规范](http://www.yanhongzhi.com/post/project_specification3.html)

### es 模块配置

```js
// .stylelintrc.mjs
// 如果没有下面的依赖，请自行安装
export default {
	extends: [
		// 配置  scss 样式格式化
		"stylelint-config-recommended-scss",
		// 配置  vue 样式格式化
		"stylelint-config-recommended-vue",
		// 配置 stylelint css 属性书写顺序插件,
		"stylelint-config-recess-order",
	],
	rules: {},
};
```

### Commonjs 配置

```js
// .stylelintrc.js
module.exports = {
	extends: [
		"stylelint-config-recommended-scss",
		"stylelint-config-recommended-vue",
		"stylelint-config-recess-order",
	],
	rules: {},
};
```

## .stylelintignore

`.stylelintignore` 文件用于忽略某些文件或文件夹，这些文件或文件夹不会被 `stylelint` 检测。

举个例子：

```sh
/node_modules/*
/dist/*
/public/*
```

## .stylelintcache

默认生成的 `.stylelintcache` 文件放置于执行目录中

## 在`package.json`配置

```json
{
	"scripts": {
		// --cache 会生成 .stylelintcache
		"lint:style": "stylelint {src,mock,library}/**/*.{vue,css,sass,scss} --cache --fix"
	}
}
```
