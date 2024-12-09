---
outline: deep
---

::: tip
当然还有很多`nest`的配置，队列，任务调度，缓存，验证等，这里只介绍最常用的。
:::

## 验证

[文档](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe)

**举个例子来说，后端添加用户功能，肯定有很多字段是必填的，那不能每个字段都去校验吧，那么这一功能的判断就很多很多了，并且后面维护起来相当麻烦， 为了解决这一麻烦那么刚好可以使用内置的校验**

```sh
pnpm add  class-validator class-transformer
```

### 注册

在 `app.module.ts`中:

```ts
import { Module, ValidationPipe } from '@nestjs/common';
@Module({
  providers: [
    provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true, // 自动将请求体转换为 DTO 类型
        whitelist: true, // 忽略未定义的属性
        forbidNonWhitelisted: true, // 禁止未知字段
      }),
  ],
})
```

### 使用

```ts
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
	@IsEmail()
	email: string;

	@IsNotEmpty({ message: "密码不能为空" })
	password: string;
}
```

```ts
import { Body } from "@nestjs/common";
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post("/create")
	create(@Body() user: CreateUserDto) {
		return "success";
	}
}
```

这样就避免了大量的判断了；

## 速率限制

[文档](https://nest.nodejs.cn/security/rate-limiting)

保护应用免受暴力攻击的常用技术是限速。首先，你需要安装 @nestjs/throttler 包。

### 安装

```sh
pnpm add @nestjs/throttler
```

### 使用

安装完成后，可以使用 `forRoot` 或 `forRootAsync` 方法将 `ThrottlerModule` 配置为任何其他 `Nest` 包。

```ts
@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 10,
			},
		]),
	],
})
export class AppModule {}
```

## 任务调度

[文档](https://nest.nodejs.cn/techniques/task-scheduling)

> 任务调度允许你安排任意代码（方法/函数）在固定日期/时间、重复间隔或在指定间隔后执行一次

### 安装

```ts
pnpm add @nestjs/schedule
```

### 使用

```ts
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
	imports: [ScheduleModule.forRoot()],
})
export class AppModule {}
```

### 定时任务

```ts
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class TasksService {
	private readonly logger = new Logger(TasksService.name);

	@Cron("45 * * * * *")
	handleCron() {
		this.logger.debug("Called when the current second is 45");
	}
}
```
