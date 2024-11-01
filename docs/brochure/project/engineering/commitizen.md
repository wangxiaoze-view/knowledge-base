---
outline: deep
---

# Commitizen?

一个工具,用于规范代码提交信息的工具。`cz-conventional-changelog` 是一个 `Commitizen` 的适配器,用于适配 `conventional-changelog` 的提交规范。

为什么要介绍这么一个工具：
当你在提交`commit`的时候，肯定会手动输入一些`type`:

`fix(axios): 修复axios请求失败的问题 #1`

但是现在有这么一个工具，只需要根据自己的情况选择对应的条件就好了；

## 如何使用？

这里可以安装到全局,也可以安装到项目中,这里推荐安装到项目中,因为这样可以避免不同项目使用不同的 `Commitizen` 版本,导致提交信息不一致的问题。

::: tip
**官方模板**:`cz-conventional-changelog`, 特点是免配置,开箱即用,但提示全部为英文,不太友好

**自定义模板**:`cz-customizable`, 特点是可以自定义添加 `emoji` 表情,可以自定义提示语言,但需要配置,且无法自定义提交类型(`scope`)

**linpengteng**:`cz-message-helper` 修改版,特点是可以自定义 `emoji` 表情,可以自定义提示语言,可以自定义提交类型(`scope`),但需要配置
:::

### 使用官方模板`cz-conventional-changelog`

### 安装依赖

```bash
pnpm add -D commitizen cz-conventional-changelog
```

添加配置文件的方式为俩种：

#### package.json 配置

```json
{
	"scripts": {},
	"config": {
		"commitizen": {
			"path": "./node_modules/cz-conventional-changelog"
		}
	}
}
```

#### .czrc

在项目根目录创建`.czrc`文件，内容如下：

```js
{
  "path": "cz-conventional-changelog"
}
```

接着在`package.json`中添加命令”

```json
{
	"scripts": {
		"commit": "git-cz"
	}
}
```

当你执行`pnpm commit`控制台会输出如下：

```bash
ebugger attached.
cz-cli@4.3.1, cz-conventional-changelog@3.3.0

? Select the type of change that you're committing: (Use arrow keys)
❯ feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
  test:     Adding missing tests or correcting existing tests
```

这个时候就完成了。如果英文不好的可以继续看下一个方案：

### 使用自定义模板`cz-customizable`

#### 安装依赖

```bash
pnpm add -D commitizen cz-customizable
```

#### .czrc

在项目根目录创建`.czrc`文件，内容如下：

```js
{
  "path": "cz-customizable"
}
```

接着在`package.json`中添加命令”

```json
{
	"scripts": {
		"commit": "git-cz"
	}
}
```

#### 自定义模板 `.cz-config.js`

需要在项目根目录下创建一个名为`.cz-config.js`的文件,文件内容如下:

```js
// .cz-config.js
module.exports = {
	types: [
		{
			value: ":sparkles: feat",
			name: "✨ feat:         新功能",
		},
		{
			value: ":bug: fix",
			name: "🐛 fix:          修复",
		},
		{
			value: ":memo: docs",
			name: "📝 docs:         文档变更",
		},
		{
			value: ":lipstick: style",
			name: "💄 style:        代码格式 (不影响代码运行的变动)",
		},
		{
			value: ":recycle: refactor",
			name: "♻️  refactor:     重构 (既不增加 feature, 也不修复 bug)",
		},
		{
			value: ":zap: perf",
			name: "⚡️ perf:         性能优化",
		},
		{
			value: ":white_check_mark: test",
			name: "✅ test:         增加测试",
		},
		{
			value: ":wrench: chore",
			name: "🔧 chore:        构建过程或辅助工具的变动",
		},
		{
			value: ":rewind: revert",
			name: "⏪ revert:       回退",
		},
		{
			value: ":package: build",
			name: "📦 build:        打包",
		},
	],
	messages: {
		type: "请选择提交的类型: ",
		scope: "请选择此更改的范围(可选): ",
		customScope: "请输入修改的范围(可选): ",
		subject: "请简要描述提交(必填): ",
		body: "请输入详细描述(可选): ",
		breaking: "列举破坏性修改(可选): ",
		footer: "请输入要关闭的 issue(可选): ",
		confirmCommit: "确认要使用以上信息提交？(y/n): ",
	},
	// 你可以在这里预定义 Scope
	scopes: [],
	allowCustomScopes: true, // 允许输入自定义 Scope 信息
	allowBreakingChanges: [":sparkles: feat", ":bug: fix"], // 允许添加 Breaking Change 的操作
	subjectLimit: 100, // body 主题字数限制
};
```

把代码文件添加到暂存区后,使用 Commitizen 生成符合规范的代码提交信息:

```bash
All lines except first will be wrapped after 100 characters.
? 请选择提交的类型： (Use arrow keys)
❯ ✨ feat:        新功能
  🐛 fix:         修复
  📝 docs:        文档变更
  💄 style:       代码格式 (不影响代码运行的变动)
  ♻️  refactor:    重构 (既不增加 feature, 也不修复 bug)
  ⚡️ perf:         性能优化
  ✅ test:        增加测试
(Move up and down to reveal more choices)
```

这样看起来是不是舒服多了? 但令人遗憾的是,`cz-customizable` 无法自定义提交类型(`scope`),所以我找到了 `linpengteng` 的 [`cz-message-helper`](https://github.com/linpengteng/cz-message-helper) 进行了修改,使其可以自定义提交类型(`scope`)

### cz-message-helper

#### 安装

```bash
pnpm add -D commitizen cz-message-helper
```

#### .czrc

在项目根目录创建`.czrc`文件，内容如下：

```js
{
  "path": "cz-message-helper"
}
```

不过我习惯将配置文件放置`package.json`

```json
{
	"config": {
		"commitizen": {
			"path": "./node_modules/cz-message-helper"
		}
	}
}
```

接着在`package.json`中添加命令”

```json
{
	"scripts": {
		"commit": "git-cz"
	}
}
```

#### 自定义模板 `.cz-message.js`

需要在项目根目录下创建一个名为`.cz-message.js`的文件,文件内容如下:

```js
module.exports = {
	questions: [
		{
			type: "list",
			name: "type",
			message: "请选择要提交的更改类型:",
			choices: [
				{ value: "fix", name: "🐛 fix: -------- 修复BUG" },
				{ value: "feat", name: "✨ feat: ------- 新功能" },
				{ value: "docs", name: "📝 docs: ------- 仅文档更改" },
				{
					value: "style",
					name: "💄 style: ------ 不影响代码运行的更改(调整空白、格式、缺少分号等)",
				},
				{
					value: "chore",
					name: "🗃️  chore: ------ 非 src 和 test 的修改",
				},
				{
					value: "refactor",
					name: "♻️  refactor: --- 重构架构或代码",
				},
				{ value: "perf", name: "⚡️ perf:  ------ 改进性能的代码更改" },
				{ value: "test", name: "🧪 test:  ------ 添加测试单元" },
				{
					value: "revert",
					name: "⏪ revert: ----- 回退至某一个版本",
				},
				{
					value: "merge",
					name: "🚚 merge: ------ 合并一个分支, 解决冲突分支",
				},
				{
					value: "ci",
					name: "👷 ci: --------- 自动化流程配置或脚本修改",
				},
				{
					value: "build",
					name: "🔧 build: ------ 修改构建流程或外部依赖",
				},
			],
		},

		{
			type: "list",
			name: "scope",
			message: "请选择更改的范围:",
			choices() {
				return [
					{ name: "无", value: false },
					{ name: "自定义", value: "custom" },
				];
			},
			filter(value, answers) {
				return value || "";
			},
		},

		{
			type: "input",
			name: "customScope",
			message: "请输入自定义的变更的范围(可选):",
			when(answers) {
				return answers.scope === "custom";
			},
			filter(value, answers) {
				answers.scope = value || "";
				return value || "";
			},
		},

		{
			type: "input",
			name: "subject",
			message: "请简明扼要的摘要描述(建议字数在50字内):",
			validate(value) {
				return value.length > 50 ? `[subject] Exceed limit: 50` : true;
			},
		},

		{
			type: "input",
			name: "body",
			message: "请提供更详细的变更说明(可选), 使用“\\n”换行:",
		},

		{
			type: "input",
			name: "breaking",
			message: "请列出任何重大变化(可选):",
			when(answers) {
				return /^(:[a-z0-9A-Z_-]+(:)(\s*))?(feat|fix)(\2\s*)?$/.test(
					answers.type.toLowerCase()
				);
			},
		},

		{
			type: "input",
			name: "footer",
			message: "请列出此更改关闭的任何问题(可选), 例如: #31,#34:",
		},
	],

	templater: (answers, wrap) => {
		let template = "";

		console.log(answers);

		template += answers.type ? `${answers.type}` : ``;
		template += answers.scope ? `(${answers.scope})` : ``;
		template += answers.subject ? `: ${answers.subject}` : ``;
		template += answers.body ? `\n\n${wrap(answers.body)}` : ``;
		template += answers.breaking
			? `\n\nBREAKING CHANGE: ${wrap(answers.breaking)}`
			: ``;
		template += answers.footer
			? `\n\nISSUES CLOSED: ${wrap(answers.footer)}`
			: ``;

		return template;
	},

	language: "cn",
};
```

```json
{
	"config": {
		"commitizen": {
			"path": "./node_modules/cz-message-helper"
		},
		"cz-message-helper": {
			"config": "./.cz-message.js"
		}
	}
}
```

把代码文件添加到暂存区后,使用 `Commitizen` 生成符合规范的代码提交信息:

```bash
版本提交规范 on  master [⇡»+] is 📦 1.0.0 via ⬢ v18.16.0
➜ pm commit

comm@1.0.0 commit /Users/bddxg/Documents/coding/tmp/版本提交规范
git-cz

cz-cli@4.3.0, cz-message-helper@1.2.2

? 请选择要提交的更改类型:
  🧪 test:  ------ 添加测试单元
  ⏪ revert: ----- 回退至某一个版本
  🚚 merge: ------ 合并一个分支, 解决冲突分支
❯ 🐛 fix: -------- 修复BUG
  ✨ feat: ------- 新功能
  📝 docs: ------- 仅文档更改
  💄 style: ------ 不影响代码运行的更改(调整空白、格式、缺少分号等)
(Move up and down to reveal more choices)

? 请选择要提交的更改类型: ✨ feat: ------- 新功能
? 请选择更改的范围: 自定义
? 请输入自定义的变更的范围(可选): main.js
? 请简明扼要的摘要描述(建议字数在50字内): 新建了main.js
? 请提供更详细的变更说明(可选), 使用“\n”换行: 初始化项目
? 请列出此更改关闭的任何问题(可选), 例如: #31,#34:

###--------------------------------------------------------###
:sparkles: feat: (main.js): 初始化项目

新建了main.js文件
###--------------------------------------------------------###

? 您确定要继续执行上面的提交吗？ (Yneh)
```

## 参考资料

- [Commitizen 快速上手](https://bddxg.top/article/expansion/%E5%89%8D%E7%AB%AF%E6%96%B9%E5%90%91/Commitizen.html#_1-commitizen-cz-conventional-changelog)
