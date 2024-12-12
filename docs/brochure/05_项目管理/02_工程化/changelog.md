---
outline: deep
---

# Changelo.md 是什么

`Changelog.md` 是一个用于记录项目变更历史的文件，通常以 `Markdown` 格式编写。这个文件会详细列出所有版本的更新内容，包括新增功能、修复的 bug、改进的地方以及其他重要变更。这对于开发者和用户来说非常重要，因为它可以帮助他们了解软件的演化过程以及每个版本的具体变化。

特点：

- 版本号明确：每个更新都会带有版本号，便于追踪。
- 日期标记：每次更新都附有日期，帮助用户了解变更的时间。
- 变更分类：如新增功能、问题修复、性能提升等，让阅读者快速定位关心的信息。
- 简洁明了：内容通常直接切入要点，避免冗长描述。

## 怎么使用？

我们使用`CHANGELOG`不需要手动创建，手动创建需要吧`commit`的消息显示在`CHANGELOG`；并且太麻烦了。这里推荐使用一些第三方的工具或者依赖；

```bash
pnpm add -D conventional-changelog conventional-changelog-cli
```

安装完成之后不需要配置任何文件，只需要在项目`package.json`中添加一行命令即可：

```json
{
	"scripts": {
		"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
	}
}
```

当你执行这条命令的时候就会自动生成`CHANGELOG.md`文件, 如下：

![x](https://www.wangzevw.com/cdn-file/images/image.45o6bf0ut.webp)

## 自定义格式

`conventional-changelog` 默认的格式是 `Angular` 的，但是也可以自定义格式。

创建文件`scripts/changelog.option.mjs`

```js
// 记得安装对应的依赖
import compareFunc from "compare-func";
import { cloneDeep } from "lodash-es"; // 引入 lodash 库用于深拷贝

const typeMapping = {
	feat: "✨ Features | 新功能",
	fix: "🐛 Bug Fixes | Bug 修复",
	perf: "⚡ Performance Improvements | 性能优化",
	revert: "⏪ Reverts | 回退",
	docs: "📝 Documentation | 文档",
	style: "💄 Styles | 风格",
	refactor: "♻ Code Refactoring | 代码重构",
	test: "✅ Tests | 测试",
	build: "👷‍ Build System | 构建",
	ci: "🔧 Continuous Integration | CI 配置",
	chore: "🎫 Chores | 其他更新",
};
export default {
	writerOpts: {
		transform: (commit, context) => {
			let discard = true;
			const issues = [];
			let _commit = cloneDeep(commit); // 使用 lodash 的深拷贝

			_commit.notes = _commit.notes.map(note => {
				if (note.title === "BREAKING CHANGES") {
					note.title = "BREAKING CHANGES";
					discard = false;
				}
				return note;
			});

			_commit.type = typeMapping[_commit.type] || _commit.type;

			if (_commit.scope === "*") {
				_commit.scope = "";
			}

			if (typeof _commit.hash === "string") {
				_commit.shortHash = _commit.hash.substring(0, 7);
			}

			if (typeof _commit.subject === "string") {
				let url = context.repository
					? `${context.host}/${context.owner}/${context.repository}`
					: context.repoUrl;

				if (url) {
					url = `${url}/issues/`;
					_commit.subject = _commit.subject.replace(
						/#([0-9]+)/g,
						(_, issue) => {
							issues.push(issue);
							return `[#${issue}](${url}${issue})`;
						}
					);
				}

				if (context.host) {
					_commit.subject = _commit.subject.replace(
						/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
						(_, username) => {
							if (username.includes("/")) {
								return `@${username}`;
							}
							return `[@${username}](${context.host}/${username})`;
						}
					);
				}
			}

			_commit.references = _commit.references.filter(reference => {
				return issues.indexOf(reference.issue) === -1;
			});

			return _commit;
		},
		groupBy: "type",
		commitGroupsSort: "title",
		commitsSort: ["scope", "subject"],
		noteGroupsSort: "title",
		notesSort: compareFunc,
	},
};
```

在项目`package.json`中添加命令

```json
{
	"scripts": {
		"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 -n ./scripts/changelog-option.mjs && git add CHANGELOG.md"
	}
}
```

效果如下：

![x](https://www.wangzevw.com/cdn-file/images/image.8l02pz4vrj.webp)
