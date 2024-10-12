---
outline: deep
---

# eslint

`ESLint` 是一个可配置的 `JavaScript linter`。它可以帮助您发现并修复 `JavaScript` 代码中的问题。问题可以是任何问题，从潜在的运行时错误，到不遵循最佳实践，再到样式问题

## 配置文件

配置文件的名字有很多，版本的不同会导致不同的导出语法：

首先说明文件名的变动

- 8.x 版本

  - `module.exports = {}`

  1. .eslintrc.js
  2. .eslintrc.cjs
  3. .eslintrc.yaml
  4. .eslintrc.yml
  5. .eslintrc.json

- 9.x 版本

  - `export default []`

  1. eslint.config.js
  2. eslint.config.mjs
  3. eslint.config.cjs

### 8.x 版本配置

```js
// .eslintrc.js
module.exports = {
	// 配置根目录
	root: true,
	// 配置环境,支持的环境
	env: {
		node: true,
		browser: true,
		es2021: true,
	},
	// 继承的插件
	extends: [
		// https://github.com/antfu/vue-global-api
		"vue-global-api",
		// eslint:recommended 或者 eslint:all
		// 开启eslint规则，eslint:all 代表开启所有的规则（官方不推荐此规则）
		"eslint:recommended",
		// eslint-plugin-vue 插件
		"plugin:vue/vue3-recommended",
		// 是一个专为 Vue.js 项目设计的 TypeScript ESLint 配置包。它旨在帮助开发者在使用 TypeScript 和 Vue.js 时
		// https://www.npmjs.com/package/@vue/eslint-config-typescript
		"@vue/eslint-config-typescript/recommended",
		// 启用prettier/prettier规则
		"plugin:prettier/recommended",
		// https://www.npmjs.com/package/@vue/eslint-config-prettier
		// 主要需要安装8.0的版本
		"@vue/eslint-config-prettier",
	],
	// 配置规则
	rules: {},
};
```

### 9.x 版本配置

关于`9.0`的说明，在[vue 项目创建](/brochure/project/product/init_vuel#eslint)中就提到了

```js
import js from "@eslint/js";
import globals from "globals";
import ts from "typescript-eslint";

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";

export default [
	{ languageOptions: { globals: globals.browser } },
	// eslint 默认推荐规则
	js.configs.recommended,
	// ts 默认推荐规则
	...ts.configs.recommended,
	// vue3 基础推荐规则
	// https://www.npmjs.com/package/@vue/eslint-config-typescript
	...pluginVue.configs["flat/essential"],
	...vueTsEslintConfig(),
	// prettier 默认推荐规则
	// https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file
	eslintPluginPrettierRecommended,
	// 忽略dist目录
	{ ignores: ["dist/"] },
];
```

### 什么是 rules

```json
{
	"rules": {
		"semi": ["error", "always"],
		"quotes": ["error", "double"]
	}
}
```

名称“semi”和“quotes”是 ESLint 中规则的名称。第一个值是规则的错误级别，可以是以下值之一：

- `"off"` 或则 `0` - 关闭规则
- `"warn"` or `1` - 显示警告 (不会影响 exit code)
- `"error"` or `2` - 显示错误 (exit code 会是 1)

## .eslintignore

`eslint` 忽略规则类似如下：

```bash
/library/build/unplugin/components.d.ts
node_modules
src/assets
src/icons
public
dist
```

## 在`package.json`配置

```json
{
	"scripts": {
		"lint:fix": "eslint {src,mock,library}/**/*.{vue,js,ts} --fix"
	}
}
```
