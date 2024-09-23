# 介绍

::: tip
在日常开发中，我们经常会碰见后端接口返回的信息数据，会发现不管请求成功还是失败返回的数据格式都是一样的，这个是如何做到的呢？
:::

## 编写

使用`nest`命令`nest g itc interceptor`,这个时候会生成一个文件，我们只需要在这个文件编写即可；

```ts
import {
	CallHandler,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	Logger,
	NestInterceptor,
} from "@nestjs/common";
import * as kleur from "kleur";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { getMessage } from "../utils/interceptor.utils";

@Injectable()
export class InterceptorInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const now = Date.now();
		const request = context.switchToHttp().getRequest();
		const logOptions = {
			url: request.url,
			method: request.method,
			params: request.params,
			query: request.query,
			body: request.body,
			ip: request.ip,
		};
		// 请求时将请求的一些基础信息打印在终端
		Logger.debug(
			`${kleur.yellow("[API-LOG]")} ${kleur.blue(
				JSON.stringify(logOptions)
			)} ${kleur.yellow(" +" + (Date.now() - now) + "ms")}`
		);
		return next.handle().pipe(
			catchError(error => {
				// 异常处理，异常大致分为俩种，
				// 一种是服务异常，比如你服务代码编写错误
				// 二是请求异常，比如404等
				// 返回的请求状态码也是不一样的，404，200，500等
				// http请求
				if (error instanceof HttpException) {
					let msg = error.message;
					const getMsg = (error.getResponse() as any).message || error.message;
					if (Array.isArray(getMsg)) {
						msg = getMsg[0];
					} else {
						msg = getMsg;
					}
					return throwError(
						() =>
							new HttpException(
								getMessage({
									context: null,
									message: msg,
									status: error.getStatus(),
								}),
								HttpStatus.OK
							)
					);
				}
				// 服务起内部错误
				return throwError(
					() =>
						new HttpException(
							getMessage({
								context: null,
								message: error.message,
								status: HttpStatus.INTERNAL_SERVER_ERROR,
							}),
							HttpStatus.INTERNAL_SERVER_ERROR
						)
				);
			}),
			map(data => {
				// 没有异常拦截，那么正常返回
				return getMessage({
					context: data,
					message: "操作成功",
				});
			})
		);
	}
}
```

```ts
import { Logger } from "@nestjs/common";
import * as kleur from "kleur";

interface IMessage {
	message: string;
	context: object;
	status?: number;
	timestamp?: string;
}
export function getMessage(options: IMessage) {
	options.status !== 200 &&
		Logger.debug(`${kleur.yellow("[API-LOG]")} ${kleur.red(options.message)} `);
	// 正常返回的接口信息
	return {
		message: options.message,
		status: options.status || 200,
		timestamp: new Date().toISOString(),
		context: options.context,
	};
}
```

## 使用

> 使用的方式大致分为俩种，全局使用和局部使用

### 全局使用

在`app.module.ts`中添加如下：

```ts
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: InterceptorInterceptor,
    },
  ]
})
```

### 局部使用

在需要的`controller`添加，如下：

```ts
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get("/a")
	@UseInterceptors(InterceptorInterceptor)
	getA(): string {
		// throw new Error('Something went wrong');
		return this.appService.getA();
	}
}
```
