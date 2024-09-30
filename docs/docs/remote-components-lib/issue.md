::: tip
当您出现一些问题，可以参考下方列举的一些解决方案，如果还是有问题，可以到 [Github](https://github.com/wangxiaoze-view/remote-components-lib/issues) 提 `issue`
:::

## 支持哪些格式？

只支持`formats-es`的项目，用法如

```ts
import * as Remotes from "remote-components-lib";
```

<font color="red">不支持 `require`, 下面错误的使用方式</font>

```ts

const Remotes = require("remote-components-lib"); ❌
```

## ~~webpack 引入 cdn 为什么会报错？~~
**由于引入环境存在不确定性，因此 cdn 模式将不被支持**

~~**目前`cdn`引入只支持`vite`， `vite`构建工具默认支持引入`cdn`，如果您使用的是`webpack`，那么您可以使用`install`的方式引入。**~~

## 项目中如何支持 ts 类型提示？

您想要在 `ts` 项目中使用类型提示，那么您可以使用`install`的方式引入(可查看[如何使用](/personal/remote-components-lib/info#使用)); 如果您使用的是`cdn`模式，那么它不支持类型提示。

## install 出现的一些问题

#### 1. TypeScript 类型错误

正常情况下安装依赖包不会出现类型错误，当您`install`成功之后，可以看到`node_modules`中生成了`index.d.ts`文件，请先检查该文件是否丢失; 正常的`index.d.ts`文件格式如下:

```ts
import { default as EleLazyImage } from "./element/LazyImage/index.vue";
import { default as ElePreviewImage } from "./element/PreviewImage/index.vue";
export { EleLazyImage, ElePreviewImage };
declare module "vue" {
	interface GlobalComponents {
		EleLazyImage: typeof import("./element/LazyImage/index.vue")["default"];
		ElePreviewImage: typeof import("./element/PreviewImage/index.vue")["default"];
	}
}
```

如果有该文件, 那么可以在`ts.config.json`中的`include`添加`node_modules/remote-components/**/*`即可。

#### 2. 发现不同版本的依赖

当您使用`npm install`命令安装依赖的时候，可能会出现版本不一致的情况，您可以使用`npm ls`命令查看依赖版本，如果出现版本不一致的情况，您可以使用`npm install`命令重新安装依赖。

为什么会出现这样的情况：

**`remote-components-lib`中可能会用到一些其他的插件，那么您的项目其他插件中也有这样的插件，但是版本不一致，那么在使用`pnpm install`的时候可能会出现版本不一致的情况。**

解决方案如下：

1. 如果是本地开发的差劲，那么您可以忽略它。
2. 如果是线上的插件，那么您可以在`package.json`中添加`overrides`字段，来指定版本。
3. 版本进行统一，`remote-components-lib`会有一个钩子，那么它可以解决这个问题。

对于生产`dependencies`版本不一致的情况, 主要在`ui框架`中最为体现：

例如：您项目的`element-plus`是`2.0.0`的版本，而`remote-components-lib`用到的是高版本，那么您项目中使用`remote-components-lib`组件可能有些高版本的`api`是不会生效的，这样的情况要么将项目的`element-plus`版本升级，要么将`remote-components-lib`版本降级。从而保证项目的稳定性；

对于这样的情况`remote-components-lib`会有一个钩子更为体现；不过`remote-components-lib`默认是不会去检测依赖是否需要更新，我们通常会在`pnpm run dev`的时候去检测；不需要在`install 依赖`的时候检测是因为`install`过程中可能会出现递归安装的问题；

如果您对其不管不顾，那么可能在您的项目中的一些样式会出现异常，例如：样式丢失，组件无法渲染等。

如何使用升级钩子？

```js
// 根目录常见一个 checkUpdate.js
// 依赖检测钩子
import checkUpdate from "remote-components-lib/checkUpdate";
// 您项目的package.json
import proPkg from "./package.json" assert { type: "json" };
// 依赖的package.json
import pluginPkg from "./remote-components-lib/package.json" assert { type: "json" };
checkUpdate({
	pkg: proPkg,
	dir: "./remote-components-lib",
	pluginPkg: pluginPkg,
	// 排除的依赖，有些本地开发的依赖不需要检测版本
	exclude: ["chalk"],
	// 不指定默认 ['element-plus', 'vue', 'vant']
	include: [],
});
```

```ts
// checkUpdate 对应的配置项
interface IOptions {
	// 项目package.json
	pkg: Record<string, any>;
	// 插件包package.json
	pluginPkg: Record<string, any>;
	// 插件安装的目录
	dir: string;
	// 需要更新的依赖
	include?: string[];
	// 排除的依赖
	exclude?: string[];
	// 开发环境
	mode?: string;
}
```

那么在您`package.json`中添加如下配置：

```json
{
	"scripts": {
		// 限制性检测， 后运行项目
		"dev": "node ./checkUpdate.js && vite "
	}
}
```

接着根据命令行进行操作即可；

## 为什么样式错乱丢失？

首先确定您的项目用到的是`element-plus`还是`vant`， 我们会先将`ui`的基础样式引入进来；

```ts
// element-plus的基础样式
import "emote-components-lib/element/base.css";
// vant的基础样式
import "emote-components-lib/vant/base.css";
```

接着引入您需要的对应的组件，如下：

```ts
// 组件的样式
import "emote-components-lib/element/LazyImage/index.css";
// 预览图片的时候可能会有视频，那么就需要引入视频的样式
import "emote-components-lib/element/xgplayer.css";
// 组件的代码
import { EleLazyImage } from "remote-components-lib";

// 如果直接这样，刚好您使用的是ts， //那么就会直接提示 index.vue.d.ts(5, 5) 在此处声明了 "image"。 image是必填项
<template>
	<EleLazyImage />
</template>;
```
