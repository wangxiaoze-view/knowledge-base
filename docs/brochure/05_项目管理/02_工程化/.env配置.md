---
outline: deep
---

# Env

::: tip 什么是 `env`

`env`代表`环境`，不论是在前端还是后端开发，都有不同的环境，每个环境对应的一些配置都是不同的，例如：请求的地址，一些加密的字符等等；

通常在`node`中会获取环境变量`process.env.NODE_ENV`等等；

这样的一个好处就是：在前端项目本地开发对应本地的配置环境，而打包对应着生产环境，俩个环境独立且分开，不会造成其中的冲突。
:::

## 文件是什么样子？

```bash
# vite 中使用需要带有VITE_APP前缀
VITE_APP_BASE_URL = '/'

# webpack 中使用。需要带有VUE_APP前缀
VUE_APP_BASE_URL = ''

# rsbuid中使用 分为俩种情况：
#一种是rsbuild.config.ts读取，
#一种是客户端读取,vue文件中可以读取
# rsbuild,config.ts读取, 没有前缀，可以自定义
APP_MODE='dev'
APP_NAME='app'

# 客户端读取，需要加PUBLIC前缀，例如：
PUBLIC_API_URL='/'
```

## 配置说明

通常项目中会配置多个环境文件，

```bash
# 每个环境都会加载
.env
# 生产环境
.env.production
# 预备发布环境
.env.preview
# 测试环境
.env.test
# 开发环境
.env.development
```

现在有个问题，不清楚使用的是哪个环境，那么就需要你在`package.json`中使用了

## 命令配置

以下命令说明:

- `build:release`: 生产环境
- `build:pre`: 预发布环境
- `build:test`: 测试环境
- `build:dev`: 开发环境

### vite

```json
{
	"scripts": {
		"build:release": "vite build",
		"build:pre": "vite build --mode preview",
		"build:test": "vite build --mode test",
		"build:dev": "vite build --mode development"
	}
}
```

### webpack

```json
{
	"scripts": {
		"build:release": "vue-cli-service build",
		"build:pre": "vue-cli-service build --mode preview",
		"build:test": "vue-cli-servic build --mode test",
		"build:dev": "vue-cli-servic build --mode development"
	}
}
```

### node

这里我拿`nest`举例， 需要安装`cross-env`：

```sh
pnpm add -D cross-env
```

```json
{
	"scripts": {
		"build:release": "nest build",
		"build:pre": "cross-env NODE_ENV=preview nest build",
		"build:test": "cross-env NODE_ENV=test nest build",
		"build:dev": "cross-env NODE_ENV=development nest build"
	}
}
```

### rsbuild

```json
{
	"scripts": {
		"build:release": "rsbuild build",
		"build:pre": "rsbuild build --env-mode preview",
		"build:test": "rsbuild build --env-mode test",
		"build:dev": "rsbuild build --env-mode development"
	}
}
```
