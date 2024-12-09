---
outline: deep
---

# 介绍

> Nest 带有一个内置的异常层，负责处理应用中所有未处理的异常。当你的应用代码未处理异常时，该层会捕获该异常，然后自动发送适当的用户友好响应。
>
> 开箱即用，此操作由内置的全局异常过滤器执行，该过滤器处理 HttpException 类型（及其子类）的异常。当异常无法识别时（既不是 HttpException 也不是继承自 HttpException 的类），内置异常过滤器会生成以下默认 JSON 响应：

```json
{
	"statusCode": 500,
	"message": "Internal server error"
}
```

## 内置异常

例如，在 `CatsController` 中，我们有一个 `findAll()` 方法（一个 GET 路由处理程序）。假设此路由处理程序出于某种原因抛出异常。为了证明这一点，我们将硬编码如下：

```ts
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

`HttpException`参数说明:

- `response` 参数定义 JSON 响应主体。它可以是 `string 或 object`，如下所述。
- `status` 参数定义了 [HTTP 状态代码](https://web.nodejs.cn/en-us/docs/web/http/status/)。
- 默认情况下，JSON 响应主体包含两个属性：
  - `statusCode`：默认为 `status` 参数中提供的 `HTTP` 状态代码
  - `message`：基于 `status` 的 `HTTP` 错误的简短描述

## 自定义异常

```ts
// 常用的状态枚举
export enum HttpStatusCode {
	// 2xx 状态码表示请求已成功处理
	OK = 200, // 请求成功
	CREATED = 201, // 请求已成功创建新的资源
	ACCEPTED = 202, // 请求已经接受，但未处理完成
	NO_CONTENT = 204, // 服务器已成功处理请求，但没有返回任何内容
	PARTIAL_CONTENT = 206, // 服务器已成功处理了部分范围请求

	// 3xx 状态码表示重定向
	MULTIPLE_CHOICES = 300, // 请求的目标有多个重定向地址
	MOVED_PERMANENTLY = 301, // 请求的资源已被永久移动到新的URI
	FOUND = 302, // 请求的资源临时移动到新的URI
	SEE_OTHER = 303, // 临时重定向，且应使用GET方法获取新的URI
	NOT_MODIFIED = 304, // 自上次请求以来，请求的资源未修改
	USE_PROXY = 305, // 访问资源应通过代理进行
	TEMPORARY_REDIRECT = 307, // 临时重定向
	PERMANENT_REDIRECT = 308, // 永久重定向

	// 4xx 状态码表示客户端错误
	BAD_REQUEST = 400, // 请求的语法错误或请求无法理解
	UNAUTHORIZED = 401, // 未授权访问
	PAYMENT_REQUIRED = 402, // 暂未使用，保留给将来可能的需求
	FORBIDDEN = 403, // 客户端没有足够的权限访问请求的资源
	NOT_FOUND = 404, // 未找到请求的资源
	METHOD_NOT_ALLOWED = 405, // 不允许使用此方法请求资源
	NOT_ACCEPTABLE = 406, // 无法使用请求的内容特性响应请求
	PROXY_AUTHENTICATION_REQUIRED = 407, // 通过代理服务器访问资源需要进行代理认证
	REQUEST_TIMEOUT = 408, // 请求超时
	CONFLICT = 409, // 请求的资源存在冲突

	// 更多的4xx状态码，表示客户端错误
	GONE = 410, // 之前可用的资源现已不可用，且将来也不会可用
	LENGTH_REQUIRED = 411, // 服务器拒绝在没有定义Content-Length头的情况下接受请求
	PRECONDITION_FAILED = 412, // 请求头中给出的条件不满足
	PAYLOAD_TOO_LARGE = 413, // 请求的实体太大
	URI_TOO_LONG = 414, // 请求的URI太长
	UNSUPPORTED_MEDIA_TYPE = 415, // 请求的媒体类型不受支持
	RANGE_NOT_SATISFIABLE = 416, // 请求的范围无效
	EXPECTATION_FAILED = 417, // 服务器无法满足期望头字段的要求

	UNPROCESSABLE_ENTITY = 422, // 请求的实体不可处理但可能是有效的
	TOO_MANY_REQUESTS = 429, // 发起的请求太多，太频繁

	// 5xx 状态码表示服务器错误
	INTERNAL_SERVER_ERROR = 500, // 服务器发生内部错误
	NOT_IMPLEMENTED = 501, // 服务器不支持请求的方法
	BAD_GATEWAY = 502, // 服务器作为网关或代理，从上游服务器收到无效响应
	SERVICE_UNAVAILABLE = 503, // 服务器目前无法使用（由于临时过载或维护）
	GATEWAY_TIMEOUT = 504, // 服务器作为网关或代理，但是没有及时从上游服务器收到请求
	HTTP_VERSION_NOT_SUPPORTED = 505, // 服务器不支持请求使用的HTTP版本

	// 表示未知的状态码
	UNKNOWN = 999,
}

import { HttpException } from "@nestjs/common";
import { HttpStatusCode } from "../enum/http.enum";

export class ApiException extends HttpException {
	private errCode: number;
	constructor(
		msg: string | Record<string, any>,
		errCode: HttpStatusCode = HttpStatusCode.OK
	) {
		switch (errCode) {
			// 没有权限访问
			case HttpStatusCode.UNAUTHORIZED:
				super(msg, HttpStatusCode.OK);
				this.errCode = HttpStatusCode.UNAUTHORIZED;
				break;
			// 登录失效
			case HttpStatusCode.FORBIDDEN:
				super(msg, HttpStatusCode.OK);
				this.errCode = HttpStatusCode.FORBIDDEN;
				break;
			// 资源不存在， 验证码，接口地址，图片资源等等
			case HttpStatusCode.NOT_FOUND:
				super(msg, HttpStatusCode.OK);
				this.errCode = HttpStatusCode.NOT_FOUND;
				break;
			// 其他归于服务器内部错误
			default:
				super(msg, errCode ?? HttpStatusCode.OK);
				this.errCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
		}
	}
	getErrCode(): number {
		return this.errCode;
	}
}
```

## 异常过滤器

具体操作可查看[文档](https://nest.nodejs.cn/exception-filters#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%BC%82%E5%B8%B8)

```ts
import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { ApiException } from "../exception/api.exception";
import { HttpResult } from "../class/result.class";

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
	catch(exception: T, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const { status, result } = this.errorResult(exception);
		response.header("Content-Type", "application/json; charset=utf-8");
		response.status(status).json(result);
	}

	errorResult(exception: unknown) {
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const code =
			exception instanceof ApiException
				? (exception as ApiException).getErrCode()
				: status;

		let message: string;
		if (exception instanceof HttpException) {
			const response = exception.getResponse();
			message = (response as any).message ?? response;
		} else {
			message = `${exception}`;
		}

		const getMsg = message;
		// 使用ValidationPipe可能会返回数组
		if (Array.isArray(message)) {
			message = getMsg[0];
		} else {
			message = getMsg;
		}

		return {
			status: ![200, 500, 401].includes(status) ? 200 : status,
			result: HttpResult.error(message, code),
		};
	}
}
```

```ts
export class HttpResult {
	readonly message: string;
	readonly status: number;
	readonly timestamp: string = new Date().toISOString();
	readonly context: unknown;
	constructor(
		context?: unknown,
		message: string = "success",
		status: number = 200
	) {
		this.context = context;
		this.message = message;
		this.status = status;
	}

	static success(context: unknown, message = "操作成功") {
		return new HttpResult(context, message, 200);
	}

	static error(message = "操作失败", status = 500) {
		return new HttpResult(null, message, status);
	}
}
```

### 使用

在`app.module.ts`中

```ts
@Module({
  imports: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ]
})
```
