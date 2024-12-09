---
outline: deep
---

# release-it?

是一个用于自动化软件发布的命令行工具。它可以帮助开发团队自动化版本控制、生成更新日志（CHANGELOG）、创建 Git 标签、发布到 npm 等任务。

## 主要功能

- 自动版本号递增 (遵循语义化版本规范 Semantic Versioning)
- 自动生成/更新 CHANGELOG
- Git 提交、打标签和推送
- 发布到 npm 仓库
- 支持 hooks 来执行自定义脚本
- 支持插件扩展功能

## 基本使用

### 1. 安装:

```bash
npm install --save-dev release-it
```

### 2.添加发布脚本到 package.json:

```json
{
	"scripts": {
		"release": "release-it"
	}
}
```

### 3. 运行发布:

可以在项目根目录创建 `.release-it.json` 进行配置:

```json
{
	"plugins": {
		"@release-it/conventional-changelog": {
			"preset": {
				"name": "conventionalcommits",
				"types": [
					{
						"type": "feat",
						"section": "✨ Features | 新功能"
					},
					{
						"type": "fix",
						"section": "🐛 Bug Fixes | Bug 修复"
					},
					{
						"type": "chore",
						"section": "🎫 Chores | 其他更新"
					},
					{
						"type": "docs",
						"section": "📝 Documentation | 文档"
					},
					{
						"type": "style",
						"section": "💄 Styles | 风格"
					},
					{
						"type": "refactor",
						"section": "♻ Code Refactoring | 代码重构"
					},
					{
						"type": "perf",
						"section": "⚡ Performance Improvements | 性能优化"
					},
					{
						"type": "test",
						"section": "✅ Tests | 测试"
					},
					{
						"type": "revert",
						"section": "⏪ Reverts | 回退"
					},
					{
						"type": "build",
						"section": "👷‍ Build System | 构建"
					},
					{
						"type": "ci",
						"section": "🔧 Continuous Integration | CI 配置"
					},
					{
						"type": "config",
						"section": "🔨 CONFIG | 配置"
					}
				]
			},
			"infile": "CHANGELOG.md",
			"ignoreRecommendedBump": true,
			"strictSemVer": true
		}
	},
	"git": {
		"commitMessage": "chore: Release v${version}"
	},
	"github": {
		"release": true,
		"draft": false
	}
}
```

一键发布, 同时生成`change.md`文件，直接会生成对应的`tag`当然也是一件发布线上版本的；
