---
outline: deep
---

::: tip
`.gitignore` 和 `.gitattributes`都是为`git`提交需要配置的一些信息，例如某些文件不需要提交，提交的格式是什么等等;

- `.gitignore`: 文件是一个纯文本文件，包含了项目中所有指定的文件和文件夹的列表，这些文件和文件夹是 `Git` 应该忽略和不追踪的。 在 `.gitignore` 中，你可以通过提及特定文件或文件夹的名称或模式来告诉 `Git` 只忽略一个文件或一个文件夹。 你也可以用同样的方法告诉 `Git` 忽略多个文件或文件夹。

- `.gitattributes`: 文件是一个用来配置 `Git` 版本控制系统的文件，文件允许你对 `Git` 中的文件和操作进行更精细的控制和配置，以适应项目的特定需求和工作流程。这可以提高代码管理的灵活性和效率。[详细说明](https://www.cnblogs.com/huangtq/p/17745759.html)

:::

## 文件是什么样子的?

### .gitignore

```bash
# .gitignore
# Local
.DS_Store
*.local
*.log*

# Dist
node_modules
dist/

# IDE
.vscode/*
!.vscode/extensions.json
.idea
```

### .gitattributes

在不同的设备上拉取对应的`git`显示的行为序列都为`lf`，这样在`windows, macos`上的代码就不会爆红(`prettier报错`)

```bash
*.html text eol=lf
*.css text eol=lf
*.js text eol=lf
*.ts text eol=lf
*.scss text eol=lf
*.vue text eol=lf
*.hbs text eol=lf
*.sh text eol=lf
*.md text eol=lf
*.json text eol=lf
*.yml text eol=lf
.browserslistrc text eol=lf
.editorconfig text eol=lf
.eslintignore text eol=lf
.gitattributes text eol=lf
LICENSE text eol=lf
*.conf  text eol=lf
```
