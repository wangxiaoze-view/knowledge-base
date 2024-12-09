---
outline: deep
---

# 介绍

拦截器是用 `@Injectable()` 装饰器注释并实现 `NestInterceptor` 接口的类。

拦截器具有一组有用的功能，这些功能的灵感来自 面向方面编程 (AOP) 技术。它们可以：

- 在方法执行之前/之后绑定额外的逻辑
- 转换函数返回的结果
- 转换函数抛出的异常
- 扩展基本功能行为
- 根据特定条件完全覆盖函数（例如，出于缓存目的）

在日常接口调试中，总会看到后端返回的数据格式都是一致的，例如：

```json
{
	"success": true,
	"message": "操作成功",
	"context": {},
	"code": 200
}
```

接下来我会提到俩个案例，一个是接口返回拦截，一个是接口日志记录

## 接口调用记录

### 自定义元数据

```ts
import { SetMetadata } from "@nestjs/common";
import { LOG_KEY_METADATA } from "../constants/metadata.constant";
import { BusinessTypeEnum, LogProductEnum } from "../enum/log.enum";

export class LogOption {
	projectCode: LogProductEnum;
	title: string;
	businessType?: BusinessTypeEnum = BusinessTypeEnum.OTHER;
}
export const Log = (logOption: LogOption) => {
	return SetMetadata(
		LOG_KEY_METADATA,
		Object.assign(new LogOption(), logOption)
	);
};
```

### 表结构

```ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DeviceSysCodeEnum } from "src/common/enum/device.enum";
import {
	BusinessTypeEnum,
	LogProductEnum,
	LogStatusEnum,
} from "src/common/enum/log.enum";

export const LOG_MODEL_NAME = "db_logs";

@Schema()
export class Log_Schema {
	// 模块标题
	@Prop()
	title: string;

	// 业务类型, 添加还是修改
	@Prop({ default: BusinessTypeEnum.OTHER })
	businessType: number;

	// 请求平台code
	@Prop({ default: DeviceSysCodeEnum.OTHER })
	platformCode: string;

	// 项目code
	@Prop({ default: LogProductEnum.OTHER })
	projectCode: number;

	// 请求方法
	@Prop()
	method: string;

	// 请求参数
	@Prop()
	requestParam: string;

	// 请求用户
	@Prop()
	operateUser: string;

	// 请求用户id
	@Prop()
	operateUserId: string;

	// 请求ip
	@Prop()
	ip: string;

	// 请求的地址
	@Prop()
	address: string;

	// 请求的状态
	@Prop({ default: LogStatusEnum.SUCCESS })
	status: number;

	// 请求异常原因
	@Prop()
	errorMsg: string;

	// 请求地址
	@Prop()
	url: string;

	// 操作时间
	@Prop()
	createTime: string;
}

export const LogSchema = SchemaFactory.createForClass(Log_Schema);
```

### 涉及到的枚举

```ts
export enum LogProductEnum {
	// 其他
	OTHER = 0,
	// 后台
	ADMIN = 1,
	// 商家
	MERCHANT = 2,
	// 全局
	GLOBAL = 3,
}

export enum BusinessTypeEnum {
	// 其它
	OTHER = 0,
	// 新增
	INSERT = 1,
	// 修改
	UPDATE = 2,
	// 删除
	DELETE = 3,
	// 查询
	SELECT = 4,
	// 授权
	GRANT = 5,
	// 导出
	EXPORT = 6,
	// 导入
	IMPORT = 7,
}

export enum LogStatusEnum {
	// 成功
	SUCCESS = 0,
	// 失败
	FAIL = 1,
}

export enum DeviceSysCodeEnum {
	// h5
	H5 = "H5",
	// pc
	PC = "PC",
	// 移动端
	MOBILE = "MOBILE",
	// 小程序
	MINI_PROGRAM = "MINI_PROGRAM",
	// 其他
	OTHER = "OTHER",
}
```

```ts
import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	StreamableFile,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, tap } from "rxjs";
import { CommonService } from "src/shared/common/common.service";
import { LOG_KEY_METADATA } from "../constants/metadata.constant";
import { LogOption } from "../decorator/log.decorator";
import { HttpResult } from "../class/result.class";
import { DeviceSysCodeEnum } from "../enum/device.enum";
import { LogStatusEnum } from "../enum/log.enum";
import { AllExceptionFilter } from "../filter/all-exception.filter";
import { LogService } from "src/shared/log/log.service";
import { Log_Schema } from "src/shared/log/schemas/log.schema";
import { HttpStatusCode } from "../enum/http.enum";

@Injectable()
export class LogInterceptor implements NestInterceptor {
	constructor(
		private readonly reflector: Reflector,
		private readonly commonService: CommonService,
		private readonly logService: LogService
	) {}
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			tap({
				next: data => {
					return this.log(context, data);
				},
				error: error => {
					const allExceptionFilter = new AllExceptionFilter();
					const { result } = allExceptionFilter.errorResult(error);
					return this.log(context, result);
				},
			})
		);
	}

	async log(context: ExecutionContext, data: HttpResult) {
		const logOption = this.reflector.get<LogOption>(
			// 可以看上一章路由守卫
			LOG_KEY_METADATA,
			context.getHandler()
		);
		if (!logOption) return true;
		const request = context.switchToHttp().getRequest();
		const method = request.method.toUpperCase();
		const logDto = new Log_Schema();
		// 模块标题
		logDto.title = logOption.title;
		// 业务类型
		logDto.businessType = logOption.businessType;
		// 请求平台code
		logDto.platformCode =
			request.headers["platformCode"] ?? DeviceSysCodeEnum.OTHER;
		// 项目code
		logDto.projectCode = logOption.projectCode;
		// 请求方式
		logDto.method = method;
		// 请求参数
		logDto.requestParam = JSON.stringify({
			params: request.params,
			query: request.query,
			body: request.body,
		});
		// 请求地址
		logDto.url = request.url;
		// 请求用户
		logDto.operateUser = request?.user?.username ?? "";
		// 请求用户id
		logDto.operateUserId = request?.user?._id ?? "";
		// 请求ip
		logDto.ip = this.commonService.getIp(request);
		// 请求的地址
		logDto.address = await this.commonService.getLocation(logDto.ip);
		// 操作时间
		logDto.createTime = this.commonService.formatDate();
		// 成功的请求
		if (
			(data && data.status === HttpStatusCode.OK) ||
			data instanceof StreamableFile
		) {
			//如果是流，都算成功
			logDto.status = LogStatusEnum.SUCCESS;
		} else {
			//失败的请求
			logDto.status = LogStatusEnum.FAIL;
			logDto.errorMsg = data && data.message;
		}
		// 这里自己写，就是将这条数据添加到数据库
		await this.logService.create(logDto);
	}
}
```

### 注册

在 `app.module.ts`中:

```ts
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
})
```

### 控制层使用

```ts
import { Controller, Post, Body, Get, Request } from "@nestjs/common";
export class UserController {
	constructor() {}

	// 添加这一行代码
	@Log({
		title: "添加用户",
		projectCode: LogProductEnum.ADMIN,
	})
	@Post("create")
	async create(@Body() body: { username: string; password: string }) {
		return "success";
	}
}
```

## 拦截器

### 拦截器代码

```ts
import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
import { HttpResult } from "../class/result.class";

@Injectable()
export class InterceptorInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();
		return next.handle().pipe(
			tap(() => {
				console.log(request);
			}),
			map(data => {
				return HttpResult.success(
					data?.context ?? data,
					data?.message ?? "操作成功"
				);
			})
		);
	}
}
```

### 注册

在 `app.module.ts`中:

```ts
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: InterceptorInterceptor,
    },
  ],
})
```

---

## 注意

1. [`LOG_KEY_METADATA` 在这里](/brochure/nest/base/canActive.html#常量文件)
2. [`AllExceptionFilter` 在这里](/brochure/nest/base/exceptionFilter.html#异常过滤器)
3. [`HttpResult` 在这里](/brochure/nest/base/exceptionFilter.html#异常过滤器)
