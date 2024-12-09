---
outline: deep
---

# 介绍

身份验证是大多数应用的重要组成部分。有许多不同的方法和策略来处理身份验证。任何项目所采用的方法都取决于其特定的应用需求。本章介绍了几种可以适应各种不同要求的身份验证方法。

让我们充实我们的要求。对于此用例，客户端将首先使用用户名和密码进行身份验证。一旦通过身份验证，服务器将发送一个 `JWT`，该 `JWT` 可以在后续请求的授权标头中作为 不记名令牌 发送以证明身份验证。我们还将创建一个仅供包含有效 `JWT` 的请求访问的受保护路由。

我们将从第一个要求开始：验证用户。然后我们将通过发布 `JWT` 来扩展它。最后，我们将创建一个受保护的路由来检查请求中的有效 `JWT。`

## JWT 令牌

首先安装依赖:

```ts
pnpm add --save @nestjs/jwt

```

安装成功之后，我们需要在`auth.module.ts`中注册：

```ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // 添加这一行
    JwtModule.register({
      global: true,
      secret: "xxxxxxxxxxxxxxxx",
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
```

::: warning 注意
`secret` 当然你可以添加在环境变量中, 如果添加到环境变量中写法如下：
:::

```ts
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    // 添加这一行
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
```

## 通行证/身份验证

身份验证用的第三方`@nestjs/passport`, 可以看文档[通行证整合](https://nest.nodejs.cn/security/authentication#%E9%80%9A%E8%A1%8C%E8%AF%81%E6%95%B4%E5%90%88)

```ts
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Payload } from "./auth.interface";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
			passReqToCallback: true,
		});
	}

	// 身份校验器
	async validate(request: Request, payload: Payload) {
		const authorization = request.headers.authorization || "";
		const token = authorization.slice(7);
		// 这一步根据自己的业务逻辑来写，我这里是读取redis的token作为比较
		const user = await this.authService.validateToken(payload, token);
		return user || { userId: payload.userId };
	}
}
```

```ts
export class AuthService {
	// 验证token是否失效
	async validateToken(payload: Payload, resToken: string) {
		const token = await this.cacheService.get(
			`${REDIS_TOKEN_KEY}${payload.userId}`
		);
		if (resToken !== token)
			throw new ApiException("登录状态已过期", HttpStatusCode.FORBIDDEN);
		// 存在读取缓存
		const userString = await this.cacheService.get(
			`${REDIS_USER_INFO_KEY}${payload.userId}`
		);
		return userString ? JSON.parse(userString) : null;
	}
}
```

最后将这个`module`挂载在`app.module.ts`中：

```ts
@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
```
