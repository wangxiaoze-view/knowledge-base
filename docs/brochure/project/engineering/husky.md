---
outline: deep
---

# husky

`Husky` 作为一个强大的`Git`钩子管理器，通过自动化代码质量检查和测试流程，极大地提升了软件开发团队的工作效率和代码质量。 通过合理配置，它能够帮助开发者在提交代码之前发现并修正潜在的问题，从而减少后续的修复成本和沟通成本。

在项目中，经常使用`husky + lint-staged`再提交代码之前做一系列代码格式操作，因为项目中安装的`eslint + stylelint + perttier`有可能会出现如果代码没有进行格式化，那么在钩子管理器中检测执行对应的格式化命令；这样保证代码的规范性；

## 安装对应的依赖

```bash
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```

- `husky`: `Git hooks` 工具，对`git`执行的一些命令，通过对应的`hooks`钩子触发，执行自定义的脚本程序
- `lint-staged`: 检测文件插件，只检测`git add .` 中暂存区的文件，对过滤出的文件执行脚本
- `@commitlint/cli`与`@commitlint/config-conventional`是提交规范配置

## lint-staged 配置

```json
{
	"scripts": {},
	// 注意：和scripts是同级
	"lint-staged": {
		"*.{js,ts,vue,json}": [
			"pnpm run lint:fix",
			"pnpm run lint:format",
			"pnpm run lint:style",
			"git add"
		]
	}
}
```

关于`lint:fix, lint:format, lint:style`是什么？

- [`link:fix`](/brochure/project/engineering/eslint#在package-json配置)
- [`link:format`](/brochure/project/engineering/prettier#在package-json配置)
- [`link:style`](/brochure/project/engineering/stylelint#在package-json配置)

## commitlint 配置

安装成功`@commitlint/cli`与`@commitlint/config-conventional`之后，需要在项目根目录中添加配置文件`commitlint.config.cjs`

```js
module.exports = {
	extends: ["@commitlint/config-conventional"],
	// 校验规则
	rules: {
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"docs",
				"style",
				"refactor",
				"perf",
				"test",
				"chore",
				"revert",
				"build",
			],
		],
		"type-case": [0],
		"type-empty": [0],
		"scope-empty": [0],
		"scope-case": [0],
		"subject-full-stop": [0, "never"],
		"subject-case": [0, "never"],
		"header-max-length": [0, "always", 72],
	},
};
```

接着需要在`package.json`中配置命令：

```json
{
	// commitlint.config.cjs需要在项目根目录添加这个配置文件
	"scripts": {
		"commitlint": "commitlint --config commitlint.config.cjs -e -V"
	}
}
```

## 使用

### 添加命令

```json
{
	"scripts": {
		"prepare": "husky install"
	}
}
```

在执行`pnpm install`的时候, 就会执行`prepare`, 当然注意的是： `husky install`是需要你的项目是有`.git`配置的，如果没有则使用`git init`初始化即可；

### 配置对应的钩子

#### pre-commit

在项目根目录找到`.husky`, 在这个目录中添加`pre-commit`文件，代码如下：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm exec lint-staged
```

在提交之前会执行`lint-staged`, 这样默认就会把代码格式修复一下

### commit-msg

在项目根目录找到`.husky`, 在这个目录中添加`commit-msg`文件，代码如下：

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm commitlint

```

**commitlint 是什么？**

> `commitlint`就是`package.json--->script--->commitlint命令`
