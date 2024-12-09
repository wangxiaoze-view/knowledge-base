---
outline: deep
---

# Nest 中间件

> 中间件实在路由处理程序之前调用的函数；同时可以访问请求和响应对象，以及程序请求响应周期中的`next()`中间函数；
>
> 简单理解就是：前端路由守卫，做拦截处理；

常见的中间件使用方式大致为：`class, 函数`

## 使用

使用`cli`命令自动生成中间件模板：`nest g mi logger`

```ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log(req.baseUrl);
		console.log(`Request received at ${new Date()}`);
		next();
	}
}

export const loggerMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(req.baseUrl);
	console.log(`Request received at ${new Date()}`);
	next();
};

// app.module.ts
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		// class和函数中间件
		consumer.apply(LoggerMiddleware, loggerMiddleware).forRoutes("/a", "/b");
	}
}

// main.ts
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);
	// 全局中间件
	app.use(loggerMiddleware);
}
```

## 跨域案例

```ts
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class CorsMiddleware implements NestMiddleware {
	use(req: any, res: any, next: any) {
		const allowedOrigin = process.env.CORS_ORIGIN ?? "*";
		res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET,HEAD,PUT,PATCH,POST,DELETE"
		);
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Content-Type,Authorization, Content-Length, X-Requested-With"
		);
		next();
	}
}

// app.module.ts
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		// 设置中间件
		consumer.apply(CorsMiddleware).forRoutes("*");
	}
}
```
