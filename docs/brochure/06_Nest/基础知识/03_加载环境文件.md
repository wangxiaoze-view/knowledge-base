---
outline: deep
---

# 介绍

::: tip
前俩篇讲解了快速入门`nest`，接下来大致介绍一下`nest`项目如何进行改造；

项目中一般都会用到`中间件，拦截器，参数管道校验等等`，接下来分多个方向大致介绍这些如何在项目中使用；
:::

## 项目改造

类似于`vue`项目，有一些成熟的方案去管理你的项目，`提交规范，代码风格，代码规范，环境变量等等`；改造的范围大致分为以下几点：

- 不同的环境变量，设置对应不同的值
- 设置跨域已经增强`http`工具，设置全局的访问前缀；
- [`swagger文档`](https://swagger.io/)生产文档，不再需要自己编写具体的文档说明；
- `中间件，拦截器，定时任务等等`；

## 加载不同的环境文件

这里有俩种的方案可以实现，`dotenv`和`@nestjs/config`

首先需要设置环境，根据变量区分是开发环境还是生产环境；

`pnpm add -D cross-env`安装`cross-env`，然后再`package.json`中找到`scripts`, 修改`start`启动命令：

```json
{
	"scripts": {
		"start": "cross-env NODE_ENV=development nest start",
		"start:dev": "cross-env NODE_ENV=development nest start --watch",
		"start:debug": "cross-env NODE_ENV=development nest start --debug --watch"
	}
}
```

### dotenv

在项目根目录添加`.env.development`和`.env.production`；

在`main.ts`中添加如下：

```ts
import * as dotenv from "dotenv";
const { NODE_ENV } = process.env;
const envFile = `.env${NODE_ENV ? `.${NODE_ENV}` : ".production"}`;
dotenv.config({ path: envFile });
```

这样就可以使用`process.env.XXXX`了

### @nestjs/config

如果使用这种方案，那么就需要引入`pnpm add @nestjs/config`

```ts
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    // 加载环境配置文件
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.production',
    }),
  ]
})
```

不过这需要在`app.modules.ts`中添加；
