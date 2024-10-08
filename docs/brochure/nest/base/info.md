---
outline: deep
---

::: tip
`Nest`是什么？`Nest`是一个用于构建高效且可伸缩的服务端应用程序的框架。明明都已经有了`node`为什么还要搞其他的呢？
:::

起初`Node`是作为服务端应用的，最熟悉的一个项目就是`Node社区`，它的源码就是用的`Node + mongodb`，可以说`Node`就是`Node社区`的灵魂。

`Node社区`也是在`node`上昙花一现，也是把`Node`发挥到了最大的极致；

但是说了这么多，为什么要和`Nest`联系到一起呢？

1. 首先，`Nest`是在`Node, Express`基础上扩展的，功能要比原有的丰富的很多；
2. `Nest`作为前端中的后端，但是语法上面肯定要类似于纯后端，值得一提的是`Nest`是`ts`开发的，那么在定义接口参数的时候，`Nest`提供了`DTO`的概念，`DTO`是`Data Transfer Object`的缩写，翻译过来就是数据传输对象；
3. `Nest`在使用数据库的时候，`Nest`提供了`TypeORM`的概念，`TypeORM`是`TypeScript`的`ORM`框架，`TypeORM`是`Node`中非常流行的`ORM`框架，`Nest`使用`TypeORM`作为默认的`ORM`框架，`Nest`提供了`TypeORM`的封装，使得`Nest`的`ORM`操作更加简单；
4. `Nest`是为了构建高效可扩展的 Nodejs 服务端的应用框架，内置完全支持 ts；
5. `Nest` 框架底层 HTTP 平台默认是基于 Express 实现的，所以无需担心第三方库的缺失。 Nest 旨在成为一个与平台无关的框架。 通过平台，可以创建可重用的逻辑部件，开发人员可以利用这些部件来跨越多种不同类型的应用程序。 nest 目前有两个支持开箱即用的 HTTP 平台：express 和 fastify 可以在项目中直接引入。

既然选择`Nest`作为服务端的开发语言，那么就要简单的学习其基础知识；好在之前接触过`Node`开发经验，那上手实践就可以了；

关于如何创建项目，命令行就在这里不介绍了；像前端的命令行基本都是一致的；

项目文件的介绍在官网查阅； [Nest](https://nestjs.com/)

## 入口文件以及项目启动

有一个项目入口文件，main.ts；通过内置命令创建一个端口 3000 的服务，而引入的 module 文件指向对于项目文件的 module 文件；如下代码

```ts
import { Module } from "@nestjs/common";
import { AppController, UserController } from "./app.controller";
// 这里是我自定义写了一个简单的控制器
import { UserService } from "./app.user";
import { AppService } from "./app.service";

@Module({
	imports: [],
	// 引入controller控制器
	controllers: [AppController, UserController],
	// 引入指向controller控制器的方法
	providers: [AppService, UserService],
})
// 导出 方便在main.js 调用
export class AppModule {}
```

上面代码中引入的模块是以数组的形式存在的，可以引入不同的控制器；

当然我们在新建一个新的控制器，目的是为了查询数据库里的用户信息；

```ts
// app.controller.ts
@Controller("user")
export class UserController {
	// 指向的UserService类
	constructor(private readonly userService: UserService) {}

	@Get("findOne")
	// 这个接口需要接受的参数
	findUser(@Query() query: any) {
		return this.userService.findAll(query.id);
	}
}

// app.user.ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
	// 接受id
	findAll(sid: string): string {
		console.log(sid);
		if (sid === "123456") {
			return "123456";
		}

		return "not 123456";
	}
}
```

简单介绍一下， 后期等用到真正开发的时候具体说明； 仅仅做一个文档记录看法；

之后的文章，我将会总结一些`Nest`的概念，以及一些`Nest`的实践；

- `Nest`过滤器，将一些错误拦截统一返回结果
- `Nest`管道，将一些参数拦截统一返回结果, 统一处理参数;
- `数据库参数`拦截，摒弃之前传统的`if`判断；
- 登录，权限拦截
