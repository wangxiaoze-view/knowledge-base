---
outline: deep
---

# 介绍

守卫是一个用 `@Injectable()` 装饰器注释的类，它实现了 `CanActivate` 接口。

守卫有单一的责任。它们根据运行时存在的某些条件（如权限、角色、ACL 等）确定给定请求是否将由路由处理程序处理。这通常称为授权。授权（及其通常与之合作的身份验证）通常由传统 `Express` 应用中的 中间件 处理。中间件是身份验证的不错选择，因为诸如令牌验证和将属性附加到 `request` 对象之类的事情与特定路由上下文（及其元数据）没有紧密联系。

但是中间件，就其本质而言，是愚蠢的。它不知道调用 `next()` 函数后将执行哪个处理程序。另一方面，Guards 可以访问 `ExecutionContext` 实例，因此确切地知道接下来要执行什么。它们的设计与异常过滤器、管道和拦截器非常相似，可让你在请求/响应周期的正确位置插入处理逻辑，并以声明方式进行。这有助于使你的代码保持干爽和声明式。

**为了让程序更加智能，这里使用装饰器功能，例如在某一个请求接口上添加一个装饰器，限制重复请求等等， 接下来以俩个案例：**

## 重复请求限制

### 常量文件

为什么要使用常量文件？好处就是统一管理；首先创建文件作为常量：

```ts
// 记录日志的key
export const LOG_KEY_METADATA = "__log__";
// 重复提交的key
export const REPEAT_SUBMIT_KEY_METADATA = "__repeat_submit__";
// public: 不需要token校验
export const PUBLIC_KEY_METADATA = "__public__";
// 权限的key
export const PERMISSION_KEY_METADATA = "__permission__";

// ===== Redis缓存
// Redis 重复提交的key, 目录的形式， 例如： __redis_repeat__:/api/user/list
export const REDIS_REPEAT_SUBMIT_KEY = "__redis_repeat__:";
// 存储验证码图片
export const REDIS_CAPTCHA_KEY = "__captcha__:";
// 存储用户的token或者userId
export const REDIS_TOKEN_KEY = "__token__:";
// 存储用户的信息
export const REDIS_USER_INFO_KEY = "__user_info__:";
```

### 自定义元数据

```ts
import { SetMetadata } from "@nestjs/common";
import { REPEAT_SUBMIT_KEY_METADATA } from "../constants/metadata.constant";

export class RepeatSubmitOption {
	interval?: number = 1; //默认1s
	message?: string = "操作过于频繁"; // 可以自定义
}
export const RepeatSubmit = (option?: RepeatSubmitOption) => {
	return SetMetadata(
		REPEAT_SUBMIT_KEY_METADATA,
		Object.assign(new RepeatSubmitOption(), option)
	);
};
```

### 自定义守卫

```ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RepeatSubmitOption } from "../decorator/repeat-submit.decorator";
import {
	REDIS_REPEAT_SUBMIT_KEY,
	REPEAT_SUBMIT_KEY_METADATA,
} from "../constants/metadata.constant";
import { ApiException } from "../exception/api.exception";
import { InjectRedis } from "@nestjs-modules/ioredis";
import Redis from "ioredis";
import { Request } from "express";
import { CommonService } from "src/shared/common/common.service";

@Injectable()
export class RepeatSubmitGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		@InjectRedis() private readonly redis: Redis,
		private readonly commonService: CommonService
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const repeatSubmitOption: RepeatSubmitOption = this.reflector.get(
			REPEAT_SUBMIT_KEY_METADATA,
			context.getHandler()
		);
		if (!repeatSubmitOption) return true;
		const request: Request = context.switchToHttp().getRequest();
		const _key = `${REDIS_REPEAT_SUBMIT_KEY}${request.url}`;
		const cache = await this.redis.get(_key);
		const data = {
			ip: this.commonService.getIp(request),
			body: request.body,
			prams: request.params,
			query: request.query,
		};
		const dataStr = JSON.stringify(data);
		if (!cache) {
			if (dataStr) {
				// 以url作为key去做缓存，缓存时间设置为元信息传递的时间 默认时间1s
				this.redis.set(_key, dataStr, "EX", repeatSubmitOption.interval);
			}
		} else {
			if (dataStr && dataStr === cache) {
				// ApiException是什么可以查看 异常过滤器
				throw new ApiException(repeatSubmitOption.message);
			}
		}
		return true;
	}
}
```

### 注册

`app.module.ts`使用:

```ts
@Module({
  imports: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RepeatSubmitGuard,
    },
  ]
})
```

### 控制层使用

```ts
import { Controller, Post, Body, Get, Request } from "@nestjs/common";
export class UserController {
	constructor() {}

	// 添加这一行代码。如果2s请求频繁那么就会提示 “操作过于频繁”
	@RepeatSubmit({
		interval: 2,
		message: "操作过于频繁",
	})
	@Post("create")
	async create(@Body() body: { username: string; password: string }) {
		return "success";
	}
}
```

## 操作权限

### 自定义元数据

```ts
export enum PermissionRelationEnum {
	AND = "AND",
	OR = "OR",
}
```

```ts
import { SetMetadata } from "@nestjs/common";
import { PermissionRelationEnum } from "../enum/permission.enum";
import { PERMISSION_KEY_METADATA } from "../constants/metadata.constant";

export class PermissionOption {
	permissionArr: string[];
	relation: PermissionRelationEnum;
}
export const Permission = (
	permissions: string | string[],
	relation: PermissionRelationEnum = PermissionRelationEnum.OR // 权限的关系， 是并且还是或者的关系
) => {
	const permissionObj: PermissionOption = {
		permissionArr: [],
		relation,
	};
	if (typeof permissions === "string") {
		permissionObj.permissionArr = [permissions];
	} else if (permissions instanceof Array) {
		permissionObj.permissionArr = permissions;
	}
	return SetMetadata(PERMISSION_KEY_METADATA, permissionObj);
};
```

### 自定义守卫

```ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PermissionOption } from "../decorator/permission.decorator";
import { PERMISSION_KEY_METADATA } from "../constants/metadata.constant";
import { PermissionRelationEnum } from "../enum/permission.enum";
import { ApiException } from "../exception/api.exception";
import { HttpStatusCode } from "../enum/http.enum";

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const permissionObj = this.reflector.getAllAndOverride<PermissionOption>(
			PERMISSION_KEY_METADATA,
			[context.getHandler(), context.getClass()]
		);
		if (!permissionObj || !permissionObj.permissionArr.length) return true;

		const request = context.switchToHttp().getRequest();
		// 权限挂载在用户信心之上
		const user = request.user;
		const permissions = user?.permissions || [];
		if (permissions.includes("*")) return true;
		let result = false;
		if (permissionObj.relation === PermissionRelationEnum.OR) {
			result = permissionObj.permissionArr.some(userPermission => {
				return permissions.includes(userPermission);
			});
		} else if (permissionObj.relation === PermissionRelationEnum.AND) {
			result = permissionObj.permissionArr.every(userPermission => {
				return permissions.includes(userPermission);
			});
		}
		if (!result)
			throw new ApiException(
				"暂无权限访问，请联系管理员",
				HttpStatusCode.UNAUTHORIZED
			);
		return result;
	}
}
```

### 注册

`app.module.ts`使用:

```ts
@Module({
  imports: [],
  providers: [
    // 权限守卫
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ]
})
```

### 控制层使用

```ts
import { Controller, Post, Body, Get, Request } from "@nestjs/common";
export class UserController {
	constructor() {}

	// 添加这一行代码。如果没有权限 会提示'暂无权限访问，请联系管理员'
	@Permission(["v1:order:create"], PermissionRelationEnum.OR)
	@Post("create")
	async create(@Body() body: { username: string; password: string }) {
		return "success";
	}
}
```

## 是否登录

### 自定义元数据

```ts
import { SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY_METADATA } from "../constants/metadata.constant";

export const Public = () => SetMetadata(PUBLIC_KEY_METADATA, true);
```

### 自定义守卫

```ts
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { PUBLIC_KEY_METADATA } from "../constants/metadata.constant";
import { ApiException } from "../exception/api.exception";
import { HttpStatusCode } from "../enum/http.enum";

@Injectable()
// https://github.com/jaredhanson/passport
export class JwtAuthGuard extends AuthGuard("jwt") {
	constructor(private reflector: Reflector) {
		super();
	}
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const noInterception = this.reflector.getAllAndOverride(
			PUBLIC_KEY_METADATA,
			[context.getHandler(), context.getClass()]
		);
		if (noInterception) return true;
		return super.canActivate(context);
	}

	handleRequest(err: any, user: any) {
		if (err || !user) {
			throw err || new ApiException("登录状态已过期", HttpStatusCode.FORBIDDEN);
		}
		return user;
	}
}
```

### 注册

`app.module.ts`使用:

```ts
@Module({
  imports: [],
  providers: [
    // jwt守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ]
})
```

### 控制层使用

```ts
import { Controller, Post, Body, Get, Request } from "@nestjs/common";
export class UserController {
	constructor() {}

	// 添加这一行代码。说明不需要token校验
	@Public()
	@Post("create")
	async create(@Body() body: { username: string; password: string }) {
		return "success";
	}
}
```

注意：

1. [`ApiException是什么可以查看 异常过滤器`](/brochure/nest/base/exceptionFilter.html#自定义异常)
2. [`Redis使用`](/brochure/nest/base/database.html#redis)
3. [`JWT使用`](/brochure/nest/base/jwt)
