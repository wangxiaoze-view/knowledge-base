---
outline: deep
---

<a style="display: flex; gap: 5px;">
<img src="https://img.shields.io/badge/vue-3.4.21-green"/>
<img src="https://img.shields.io/badge/node-21.1.0-yellow"/>
<img src="https://img.shields.io/badge/eslint-9.0.0-blue"/>
<img src="https://img.shields.io/badge/stylelint-16.3.1-red"/>
<img src="https://img.shields.io/badge/vite-5.2.0-orange"/>
</a>

## 初始化项目

::: code-group

```sh [npm]
npm create vite@latest
```

```sh [Yarn]
yarn create vite
```

```sh [PNPM]
pnpm create vite
```

```sh [bun]
bun create vite
```

不管用什么方式都可以安装, 不过要注意的是使用`bun`安装需要先看下官网 [Bun](https://bun.sh)

举个例子:

1. 项目名称为你的项目名字, 如: `vue-project`
2. 选择项目类型为`vue`
3. 选择`TypeScript`进行开发, 其它的不用选择即可;

不用去默认选择`Eslint`, 因为这里使用的是高版本的`Eslint（9.0.0）`和默认安装的`Eslint（8.x.x）`的语法有冲突；

## 代码规范

### EditorConfig

::: tip
`EditorConfig` 的作用是在多个编辑器和 IDE 之间维护一致的代码风格。
:::

如果使用`Vscode`进行开发的话, 那就要安装`EditorConfig for VS Code`插件, 然后在根目录下创建`.editorconfig`文件, 内容如下:

```shell
# Editor configuration, see http://editorconfig.org
# 表示是最顶层的 EditorConfig 配置文件
root = true
[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行
trim_trailing_whitespace = true # 删除一行中的前后空格
```

### eslint

::: tip
ESLint 是一个用于检测 JavaScript 代码问题的工具，帮我们发现并修复 JavaScript 代码中的问题。
:::

安装命令：`pnpm create @eslint/config`

```shell
√ How would you like to use ESLint? · (To check syntax and find problems)
√ What type of modules does your project use? · (JavaScript modules (import/export))
√ Which framework does your project use? · (Vue.js)
√ Does your project use TypeScript? · (Yes)
√ Where does your code run? · (Browser)
√ Would you like to install them now?  （Yes）
√ Which package manager do you want to use? （根据自己情况，本文使用pnpm）
```

此时根目录会自动成 eslint.config.js 文件, 内容如下：

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
	{ languageOptions: { globals: globals.browser } },
	// eslint 默认推荐规则
	pluginJs.configs.recommended,
	// ts 默认推荐规则
	...tseslint.configs.recommended,
	// vue3 基础推荐规则
	...pluginVue.configs["flat/essential"],
];
```

注意：此时我们安装的是 `Eslint` 的版本为：9.0.0, 这也是为什么不用默认脚手架安装的原因： 默认的`eslint`版本为`8.x.x`, 我们直接使用新版本`9.0.0`，不过相对于`8.X.X`写法上有很大变动，可以参考[官方文档](https://eslint.org/docs/latest/use/configure/configuration-files-new)

接着配置`.eslintrc.js`文件：

```js
module.exports = {
  import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
	{ languageOptions: { globals: globals.browser } },
	// eslint 默认推荐规则
	pluginJs.configs.recommended,
	// ts 默认推荐规则
	...tseslint.configs.recommended,
	// vue3 基础推荐规则
	...pluginVue.configs["flat/essential"],
  languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2020,
				...globals.node,
			},
			ecmaVersion: 2020,
      // 这里的parserVue 会使用插件
			// parser: parserVue,
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},
];
```

### Prettier

::: tip
Prettier 是一个代码格式化工具，可以自动格式化代码，使其符合统一的风格。
:::

安装命令：`pnpm add -D eslint-plugin-prettier eslint-config-prettier`

修改`eslint.config.js`添加`prettier`配置

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginPrettierRecommendedConfigs from "eslint-plugin-prettier/recommended";
export default [
	// eslint 默认推荐规则
	pluginJs.configs.recommended,
	// ts 默认推荐规则
	...tseslint.configs.recommended,
	// vue3 基础推荐规则
	...pluginVue.configs["flat/recommended"],
	// prettier 默认推荐规则
	pluginPrettierRecommendedConfigs,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2020,
				...globals.node,
			},
			ecmaVersion: 2020,
			parser: parserVue,
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},
];
```

根目录下新建 `prettier.config.js` 添加如下配置：

```js
export default {
	tabWidth: 2, // 缩进
	useTabs: true, // 缩进方式
	semi: false, // 语句结尾是否加分号
	singleQuote: true, // 单引号
	printWidth: 120, // 换行长度
	arrowParens: "always", // 箭头函数参数
	bracketSpacing: true, // 对象花括号内是否加空格
	endOfLine: "auto", // 换行符
	vueIndentScriptAndStyle: true, // vue文件内script和style标签缩进
};
```

### Eslint 可能出现的问题

当打开 components/HelloWorld.vue 文件，会发现此行报错：

```js
defineProps<{ msg: string }>() // Parsing error: Unexpected token )eslint
```

解决办法： 配置 vue-eslint-parser，修改 eslint.config.js

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginPrettierRecommendedConfigs from "eslint-plugin-prettier/recommended";
import parserVue from "vue-eslint-parser";

export default [
	// eslint 默认推荐规则
	pluginJs.configs.recommended,
	// ts 默认推荐规则
	...tseslint.configs.recommended,
	// vue3 基础推荐规则
	...pluginVue.configs["flat/recommended"],
	// prettier 默认推荐规则
	pluginPrettierRecommendedConfigs,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2020,
				...globals.node,
			},
			ecmaVersion: 2020,
			parser: parserVue,
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},
];
```

添加插件 `vite-plugin-eslintpnpm add -D vite-plugin-eslint`

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), eslintPlugin()],
});
```

由于 vite-plugin-eslint 库有点落后，导致 vite 高版本不能正确的识别 cjs 模块，所以配置 src\vite-env.d.ts：

```js
/// <reference types="vite/client" />

/**
 * 由于 vite-plugin-eslint 库有点落后，导致 vite 高版本不能正确的识别 cjs 模块
 * 所以这里手动定义
 */
declare module 'vite-plugin-eslint' {
	import { Plugin } from 'vite'
	import { ESLint } from 'eslint'

	/** Plugin options, extending from ESlint options */
	interface Options extends ESLint.Options {
		/** Path to ESLint instance that will be used for linting */
		eslintPath?: string
		/** Check all matching files on project startup */
		lintOnStart?: boolean
		/** A single file, or array of files, to include when linting */
		include?: string | string[]
		/** A single file, or array of files, to exclude when linting */
		exclude?: string | string[]
		/** Custom error formatter or the name of a built-in formatter */
		formatter?: string | ESLint.Formatter['format']
		/** The waring found will be printed */
		emitWarning?: boolean
		/** The errors found will be printed */
		emitError?: boolean
		/** Will cause the module build to fail if there are any warnings, based on emitWarning */
		failOnWarning?: boolean
		/** Will cause the module build to fail if there are any errors, based on emitError */
		failOnError?: boolean
	}

	const content: (rawOptions?: Options) => Plugin
	export default content
}
```

修改配置 tsconfig.json

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"useDefineForClassFields": true,
		"module": "ESNext",
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "preserve",

		/* Linting */
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true,
		"types": [
			// 编译过程中被包含进来的类型声明文件
			"vite/client"
		]
	}
}
```

### stylint

::: tip
stylelint 是一个 CSS 语法检查工具，可以检测 CSS 代码的错误和风格问题。
:::

安装： `pnpm add -D stylelint stylelint-config-html stylelint-config-prettier stylelint-config-standard stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-recommended-vue`

```shell
stylelint    核心库
stylelint-config-html    解析 HTML 文件中的样式
stylelint-config-prettier    结合 Prettier 使用
stylelint-config-standard    StyleLint 的标准可共享配置
stylelint-config-recess-order    提供优化样式顺序的配置
stylelint-config-recommended-scss    扩展 stylelint-config-recommended 共享配置并为 SCSS 配置其规则
stylelint-config-recommended-vue    扩展 stylelint-config-recommended 共享配置并为 Vue 配置其规则
```

根目录创建.stylelintrc.js 并配置：

```js
export default {
	// 继承推荐规范配置
	extends: [
		"stylelint-config-standard",
		"stylelint-config-recommended-scss",
		"stylelint-config-recommended-vue/scss",
		"stylelint-config-html/vue",
		"stylelint-config-recess-order",
	],
	// 指定不同文件对应的解析器
	overrides: [
		{
			files: ["**/*.{vue,html}"],
			customSyntax: "postcss-html",
		},
		{
			files: ["**/*.{css,scss}"],
			customSyntax: "postcss-scss",
		},
	],
	// 自定义规则
	rules: {
		// 允许 global 、export 、v-deep等伪类
		"selector-pseudo-class-no-unknown": [
			true,
			{
				ignorePseudoClasses: ["global", "export", "v-deep", "deep"],
			},
		],
	},
};
```

根目录创建 `.stylelintignore` 文件，配置忽略文件如下：

```shell
dist
node_modules
public
.husky
.vscode
```

## 命令配置

配置根目录文件`package.json`的配置：

```json
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint:eslint": "eslint --fix",
		"lint:format": "prettier --write --log-level warn \"src/**/*.{js,ts,json,tsx,css,less,vue,html,md}\"",
		"lint:stylelint": "stylelint \"**/*.{css,scss,vue,html}\" --fix"
  },
```

代码检查和格式化命令

```shell
pnpm lint:eslint
pnpm lint:format
pnpm lint:stylelint
```

## vscode 编译器保存自动化配置

修改根目录.vscode 文件夹下的`settings.json`(没有的话新建一个)：

```json
{
	"files.eol": "\n", // 文件结束符
	"eslint.format.enable": true, // 开启保存时自动修复
	"editor.codeLens": true, // 显示行号
	"editor.tabSize": 2, // 重新设定tabsize
	"editor.detectIndentation": false, // 禁用自动检测缩进
	// 将prettier设置为默认格式化程序(在编辑器中有可能被其他Formatter占用，所以将prettier设置为默认Formatter)
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	// 关闭js/ts的默认format,统一用eslint进行格式化（tslint已经不维护了，所以转eslint吧）
	"javascript.format.enable": false,
	"typescript.format.enable": false,
	// 保存时自动格式化 (根据根目录下‘.prettierrc文件配置项’)
	"editor.formatOnSave": true,
	// Enable per-language
	"[html]": {
		"editor.defaultFormatter": "vscode.html-language-features",
		"editor.formatOnSave": true
	},
	"[vue]": {
		"editor.formatOnSave": true, // 交给 eslint
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[javascript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	// 什么类型的文件需要遵守stylelint规则
	"stylelint.validate": ["css", "less", "postcss", "scss", "sass", "vue"],
	// 为ESLint启用“保存时自动修复”，并且仍然具有格式和快速修复功能
	"editor.codeActionsOnSave": {
		"source.fixAll": "always",
		"source.fixAll.stylelint": "always"
	},
	"[markdown]": {
		"editor.defaultFormatter": null,
		"editor.formatOnSave": false
	},
	"[json]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[scss]": {
		"editor.defaultFormatter": "stylelint.vscode-stylelint"
	}
}
```

## 参考文献

- [原文](https://mp.weixin.qq.com/s/AF2go62o8ueV2rGA1pF-_A)
- [eslint](https://eslint.org/)
- [vite](https://vitejs.dev/)
- [stylelint](https://stylelint.io/)
- [prettier](https://prettier.io/)
- [shields](https://shields.io/badges)
