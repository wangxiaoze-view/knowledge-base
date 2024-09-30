::: tip
[**remote-components-lib**](https://github.com/wangxiaoze-view/remote-components-lib) 是一个什么？

这是一个用于加载远程组件的简单库, 只支持`vue`, 不考虑其他的框架；它做到了按需加载，并且可以支持按需加载的组件的样式。 同时还配套一些常用的工具库，hooks，enums 等等； 它最大的一个特点就是小，即用即加载即渲染的方式，从而减少渲染，文件加载的开销。

:::

## 特性

- 支持按需加载，按需加载的组件，样式也会按需加载。
- 文件小，代码较为安全，加入压缩加密死代码功能。
- 避免多次编写相同的组件，减少重复的代码。
- 配套对应的工具库，方便使用。
- 组件的参数较为完善，避免乱传参数的情况。

## 使用场景

- 多个平台/项目使用同一套组件或者代码；减少代码的重复性。后期只需维护一次远程组件即可。
- 一些公共组件拆分成远程组件，远程组件可以支持按需加载，减少文件加载的开销。从而避免浏览器卡顿。
- 配置较为完善的工具，相同的功能，可以减少重复的代码。一些常用的正则，工具等等都可以复用。

## 使用

目前使用分为俩中方式：

1. `node_modules`依赖包的形式，直接使用即可。
2. ~~`cdn`外链引入，目前支持`vite`，`webpack`推荐使用`依赖包`的形式。~~

#### 1. 依赖配置 <Badge type="tip" text="推荐" />

目前该工具没有上传至 `npm`，所以需要自己手动引入。不上传的原因很简单, 如果对于公司团队使用, 不能使用自己的账户上传, 避免中间出现特殊情况导致其他问题。对于公司团队之间使用，最简单的方式就是公开~~的或者`cdn`~~;

先说明一下如何使用`install`的方式：

首先您需要下载[**remote-components-lib**](https://github.com/wangxiaoze-view/remote-components-lib)到项目的根目录，目录名可以随意命令，但不能和项目中的其他目录重名；这里假设目录名为`remote-components-lib`

接着需要在`package.json`中添加如下配置：

```json
{
	"dependencies": {
		"remote-components-lib": "file:./remote-components-lib"
	}
}
```

然后执行`npm install`，这样你本地`node_modules`中就存在`remote-components-lib`了。

然后就可以在项目中使用如下代码：

```ts
// element-plus的基础代码
import "emote-components-lib/element/base.css";
// 组件的样式
import "emote-components-lib/element/LazyImage/index.css";
// 组件的代码
import { EleLazyImage } from "remote-components-lib";
```

如果您发现在`ts`中会出现`类型报错的情况`, 您可以在`tsconfig.app.json 或者 tsconfig.json`中`include`添加`node_modules/remote-components/**/*`即可。

#### ~~2. cdn 配置~~

**由于引入环境存在不确定性，因此 cdn 模式将不被支持**

~~`cdn`的配置要比`依赖`的配置简单的很多，只需要在对应文件中使用如下代码：~~

```ts
// element-plus的基础代码
// import "rhttps://remote-components-lib.vercel.app/element/base.css";
// 组件的样式
// import "https://remote-components-lib.vercel.app/element/LazyImage/index.css";
// 组件的代码
// import { EleLazyImage } from "https://remote-components-lib.vercel.app/";

// <template>
// <EleLazyImage />
// </template>;
```
