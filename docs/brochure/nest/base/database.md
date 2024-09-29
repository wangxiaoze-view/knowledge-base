---
outline: deep
---

# 数据库的配置

> 在`node`服务中，不论使用的`express`还是`nest`，都是有一些配置，环境的配置，数据库的配置等等； 那么俩者还是有些差别的；

这里我列举`mongodb和redis`在`nest`中的使用；

## Mongodb

### 依赖安装

首先安装依赖:

```sh
pnpm add @nestjs/mongoose mongoose
```

安装成功之后, 那么只需要在`app.module.ts`中配置：

```ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	// 不过建议可以将链接放到环境变量里，更安全
	imports: [MongooseModule.forRoot("mongodb://localhost/nest")],
})
export class AppModule {}
```

这样就可以链接数据库了，数据库名为`nest`；不过这只是能保证数据库的连接，但是想要添加数据等操作还需要配置其他；

这里我按照一个例子去讲解，**就比如添加用户**, 运行`nest-cli`命令

```sh
nest g res users
```

这样会创建`users`文件夹

### 模型注入

创建文件`user.schema.ts`, 代码如下

```ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export const ADMIN_USER_MODEL_NAME = "db_admin_users";

@Schema()
export class Admin_User_Schema {
	_id: string;
	// 用户名
	@Prop()
	username: string;
	// 密码
	@Prop()
	password: string;
}
export const AdminUserSchema = SchemaFactory.createForClass(Admin_User_Schema);
```

代码讲解：

- `@Schema` 标记为数据库的模型(简单理解就是表结构)， `ADMIN_USER_MODEL_NAME` 为数据库的表名， `AdminUserSchema` 为数据库的模型；
- `@Prop` 标记为数据库的属性， `username` 为数据库的属性名， `password` 为数据库的属性名；
- `_id` 为数据库的主键(mongodb 会自动生成主键，这里不写都没关系)， `@Prop` 标记为数据库的属性， `type` 为数据库的类型， `string` 为数据库的类型；

这样数据库的表结构就设计完成了，接下来需要连接表，这样后续才能对表进行操作(CURD)；

### 表链接

在`user`目录下操作`user.module.ts`

```ts
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ADMIN_USER_MODEL_NAME, AdminUserSchema } from "./schemas/user.schema";

@Module({
	imports: [
		// 核心代码
		MongooseModule.forFeature([
			{
				// 表名
				name: ADMIN_USER_MODEL_NAME,
				// 表模型
				schema: AdminUserSchema,
			},
		]),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
```

这样数据表是没有数据的，那么接着将一条测试数据添加在数据表里：

在`user.controller.ts`中进行模型的注入：

```ts
import { Controller, Post, Body, Get, Request } from "@nestjs/common";
import { UserService } from "./user.service";
export class UserController {
	// 服务层
	constructor(private readonly userService: UserService) {}

	// 接口地址
	@Post("create")
	// 请求的参数
	async create(@Body() body: { username: string; password: string }) {
		// 调用的服务层
		return await this.userService.create(body);
	}
}
```

`user.service.ts`代码如下：

```ts
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
	ADMIN_USER_MODEL_NAME,
	Admin_User_Schema,
} from "./schemas/user.schema";
@Injectable()
export class UserService {
	constructor(
		@InjectModel(ADMIN_USER_MODEL_NAME)
		private readonly userModel: Model<Admin_User_Schema>
	) {}
	async create(createUserDto: CreateUserDto) {
		const result = await this.userModel.create(createUserDto);
		return null;
	}
}
```

当你使用`apiFox or postman`调用`http://localhost:3000/create`就会发现数据表里有一条数据了；

## Redis

### 依赖安装

```sh
pnpm add @nestjs-modules/ioredis ioredis
```

安装成功之后，同样在`app.module.ts`中配置：

```ts
import { RedisModule } from '@nestjs-modules/ioredis';


@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        // 俩种方式
        // url: process.env.REDIS_URL,
        // 密码格式： redis"//密码@localhost:27017/nest-app
        url: `redis://${process.env.REDIS_PWD ? process.env.REDIS_PWD + '@' : ''}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`,
      }),
    }),
  ]
})
```

### 模块注入

```ts
import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class CacheService {
	constructor(@InjectRedis() private readonly redis: Redis) {}

	async get(key: string) {
		return await this.redis.get(key);
	}

	async set(key: string, value: string, expire?: number) {
		return expire
			? await this.redis.set(key, value, "EX", expire)
			: await this.redis.set(key, value);
	}

	async del(key: string) {
		return await this.redis.del(key);
	}
}
```
