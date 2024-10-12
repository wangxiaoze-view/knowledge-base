---
outline: deep
---

# Editor Config

::: tip 什么是[EditorConfig](https://editorconfig.org/)

EditorConfig 有助于为在不同编辑器和 IDE 中处理同一项目的多个开发人员维护一致的编码风格

EditorConfig 项目由一个用于定义编码样式的文件格式和一组文本编辑器插件组成，这些插件使编辑器能够读取文件格式并遵守定义的样式

EditorConfig 文件很容易阅读，并且可以很好地与版本控制系统配合使用

:::

## EditorConfig 文件是什么样子的

```bash
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

## 属性配置

[文档](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)

### indent_style

缩进样式; 这些值不区分大小写。核心库将它们转换为小写。
可以选择：

- `tab`
- `space`

### indent_size

缩进大小（以单间距字符为单位） 这些值不区分大小写。它们将被核心库降为小写
可以选择：

- `tab`
- `整数`

如果 indent_size 等于 tab，则 indent_size 将设置为 tab 大小。如果指定了 tab_width，则应为 tab_width；如果未指定 tab_width，则应设置为编辑器设置的 tab 大小

### tab_width

单个制表符的宽度
可以选择：

- 正整数（当 indent_size 是一个数字时，默认为 indent_size）

### end_of_line

行尾文件格式（Unix、DOS、Mac）

这些值不区分大小写。它们将被核心库降为小写

注意：如果您想在不同的操作系统之间使用行结尾，最好不要设置此选项，而是将该任务留给 VCS！在未来，我们可能会为这种情况添加像 native 这样的值[（cf #226）](https://github.com/editorconfig/editorconfig/issues/226)

可能的值

- `lf`
- `crlf`
- `cr`

### charset

文件字符编码（请参阅字符集支持）

这些值不区分大小写。它们将被核心库降为小写

可能的值

- `latin1`
- `utf-8`
- `utf-16be`
- `utf-16le`
- `utf-8-bom`

### trim_trailing_whitespace

表示是否从行尾删除空白

这些值不区分大小写。它们将被核心库降为小写

可能的值

- `true`：删除换行符之前的任何空白字符
- `false`：确保编辑器保留空白字符

### insert_final_newline

表示文件是否应以换行结束

这些值不区分大小写。它们将被核心库降为小写

可能的值

- `true`
- `false`

### max_line_length

在指定的字符数之后强制换行。off 可关闭此功能（使用编辑器设置）

可能的值

- `正整数`
- `off`

## vscode 插件

[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

此插件尝试使用文件中找到的设置覆盖用户/工作区设置`.editorconfig`。无需其他文件或特定于 `vscode` 的文件。与任何 `EditorConfig` 插件一样，如果` root=true` `未指定，EditorConfig` 将继续.`editorconfig` 在项目外寻找文件 .

## 优先级问题

项目中，我们会经常安装`eslint + stylelint + prettier`去规范项目开发，但是在`prettier`中的配置和`editorconfig`中一些配置是相同的，那么问题来了？项目中都有这些配置，优先级问题如何选择？

配置文件优先级：`.editorconfig > settings.json (Workspace工作区) > settings.json (User全局) > .eslintrc 和 .prettierrc`
