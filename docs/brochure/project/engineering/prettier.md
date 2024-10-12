---
outline: deep
---

# prettier

`Prettier` 是一个固执己见的代码格式化程序

一般通过以下方式使用 `prettier`

- 使用 vscode 等代码编辑器的 `prettier` 插件：搭配快捷键如 ` ctrl+s`，保存时自动格式化，配置简单，使用方便，但是缺点是由于团队成员可能使用不同的编辑器，`prettier ` 版本、配置不同，从而格式化的风格迥异且难统一。所以这种使用方式个人使用没问题，团队推广不太适合
- 下载 `prettier npm` 包，在项目中配置好，统一格式化风格

## 使用

`prettier`的使用很简单, 我拿`vscode`举例：

1. 需要下载编辑器插件, 这样在在完成之后会在全局`settings.json`中配置，不论编写`html, css 还是js`，保存之后都会统一格式化；
2. 对应项目下载`prettier`依赖，并且在项目根目录添加`.prettierrc配置文件`和`.prettierignore排除文件`

对于企业项目来讲，我们都会使用第二种方式，因为有可能每个项目的一些特殊配置是不一样的(正常来讲，每个企业的规则都是一样的)；

### 安装依赖

`prettier`是需要本地开发使用的，所以只需要将依赖安装到`devDependencies`

```sh
pnpm add -D prettier
```

使用命令行格式文件：

```bash
# 格式化某个文件
npx prettier --write .\test.js
# 格式化所有文件
npx prettier --write .
```

`prettier` 默认不会处理 `node_modules` 里的文件，如果想忽略其他的文件或目录，可以在项目目录下新建.`.prettierignore` 文件，表示忽略某些文件或文件夹，具体格式跟`.gitignore` 类似

### .prettierignore

设置 prettier 格式化忽视哪些文件, 例如：

```bash
# Lock files
package-lock.json
pnpm-lock.yaml
yarn.lock
```

### .prettierrc 配置文件

具体的配置选项[prettier](https://prettier.io/docs/en/options)

```bash
{
  # 指定prettier将换行的行长<int>，默认80
  printWidth: 80,

  # 指定每个缩进级别的空格数<int>，默认2
  tabWidth: 2,

  # 用制表符而不是空格缩进行<bool>，默认false
  useTabs: false,

  # 在语句末尾添加分号<bool>，默认true
  semi: true,

  # 使用单引号而不是双引号<bool>，默认false
  singleQuote: true,

  # object对象中key值是否加引号<as-needed|consistent|preserve>，默认as-needed
  #/ as-needed-仅在需要时在对象属性周围添加引号
  # consistent-如果一个对象中至少有一个属性需要引号，所有属性添加引号
  # preserve-保留对象属性中用户输入使用的引号
  quoteProps: 'as-needed',

  # 在 JSX 中使用单引号而不是双引号<bool>，默认false
  jsxSingleQuote: false,

  # 在多行逗号分隔的句法结构中尽可能打印尾随逗号<es5|none|all>，默认es5
  # es5-在 ES5 中有效的尾随逗号（对象、数组等），TypeScript 的类型参数中没有尾随逗号
  # none-没有尾随逗号
  # all-尽可能以逗号结尾（包括函数参数和调用）。要运行以这种方式格式化的 JavaScript 代码需要一个支持 ES2017（Node.js 8+ 或现代浏览器）或下层编译的引擎。这还会在 TypeScript 的类型参数中启用尾随逗号（自 2018 年 1 月发布的 TypeScript 2.7 起支持）
  trailingComma: 'all',

  # 对象字面量中括号之间的空格<bool>，默认true
  bracketSpacing: true,

  # 将>多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自关闭元素）<bool>，默认false

  bracketSameLine: true,

  # 在唯一的箭头函数参数周围包含括号<always|avoid>
  # always-始终包含括号
  # avoid-尽可能省略括号
  arrowParens: 'always',

  # Prettier 可以限制自己只格式化在文件顶部包含特殊注释（称为 pragma）的文件。这在逐渐将大型、未格式化的代码库过渡到 Prettier 时非常有用<bool>
  requirePragma: false,

  # Prettier可以在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了。在使用 --require-pragma参数处理一连串的文件时这个功能将十分有用。如果文件顶部已经有一个doclock，这个选项将新建一行注释，并打上@format标记<bool>，默认false
  insertPragma: false,

  # 超过最大宽度是否换行<always|never|preserve>，默认preserve
  # always-如果超过最大宽度换行
  # never-不要换行
  # preserve-按原样显示
  proseWrap: 'preserve',

  # 指定 HTML、Vue、Angular 和 Handlebars 的全局空格敏感度<css|strict|ignore>，默认css
  # css-遵循CSS属性的默认值
  # strict-所有标签周围的空格（或缺少空格）被认为是重要的
  # ignore-所有标签周围的空格（或缺少空格）被认为是无关紧要的
  htmlWhitespaceSensitivity: 'css',

  # vue文件script和style标签中是否缩进<bool>，默认false
  vueIndentScriptAndStyle: false,

  # 行尾换行符<lf|crlf|cr|auto>，默认lf
  endOfLine: 'lf',

  # 控制 Prettier 是否格式化嵌入在文件中的引用代码<off|auto>，默认auto
  # auto–如果 Prettier 可以自动识别，则格式化嵌入代码
  # off-从不自动格式化嵌入代码
  embeddedLanguageFormatting: 'auto',

  # 在 HTML、Vue 和 JSX 中强制执行每行单个属性<bool>，默认false
  singleAttributePerLine: true
}
```

## 在`package.json`配置

```json
{
	"scripts": {
		"lint:format": "prettier  {src,mock,library}/**/*.{html,vue,css,sass,scss,js,ts,md} --write"
	}
}
```
