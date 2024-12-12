# 背景

前端时间在开发个人项目过程中, 将一些工具包拆除去，以依赖的形式引入[`functional-helpers` ](https://github.com/wangxiaoze-view/functional-helpers-lib)

这样就直接在项目中`package.json`中配置就好了；关于如何配置请看[`sim-admin-package.json`](https://github.com/wangxiaoze-view/sim-admin/blob/main/package.json#L37)

但是个人觉得不是很合适，为什么这么说呢，就是开发一个工具库，然后打包，将构建的产物分发到另外一个开源的存储库中，这样不是很智能；所以不合适；

然后今天是试了一下`github packages`，就是不需要上传到`npm`, 只需要上传到`github package`同样也可以使用；

## 如何做？

### 修改配置

首先，你需要申请`token`， 如下图所示：

![x](https://www.wangzevw.com/cdn-file/images/image.7p3nljb7yw.webp)

申请成功之后不要刷新页面，因为刷新了页面`token`就没了，`token`的格式如`ghp_xxxxxxx`;

还需要设置全局的`.npmrc`，

```bash
//npm.pkg.github.com/:_authToken=ghp_xxxxxxx
```

其次，需要修改项目配置`pacakge.json`：

```json
{
	"name": "@wangxiaoze-view/functional-helpers",
	"publishConfig": {
		"registry": "https://npm.pkg.github.com"
	}
}
```

主要修改俩个地方,

- **name:** 格式为 `@你的github用户名/你的项目名`, `"private": true`可以去掉
- **publishConfig：** 发布的地址

配置完成之后，使用发布命令`npm publish`即可，这样等待发布成功即可；因为全局配置了`//npm.pkg.github.com/:_authToken=ghp_xxxxxxx`, 所以就不需要登录了；

### 进行安装

方式一：

```bash
# 需要指定 registry
npm install @你的github用户名/你的项目名@版本号  --registry=https://npm.pkg.github.com

# 例如， 当然这个包是不存在的
npm install @wangxiaoze-view/functional-helpers@1.0.0 --registry=https://npm.pkg.github.com
```

方式二：

在项目跟目录单独设置`.npmrc`

```bash
registry=https://npm.pkg.github.com
```

## 发现的问题？

因为我的[`functional-helpers` ](https://github.com/wangxiaoze-view/functional-helpers-lib)中用到了其他的依赖，那么有些依赖在`github`中是没有的，那么`install `的时候就会显示`404`;

我认为就是：如果你的工具有外部依赖，那么你就要查询一下`github`中有没有这个依赖，有过没有这个依赖，还是老老实实的发布到`npm`吧，如果没有，那么你可以发布`github`;

## 参考资料

- [使用 npm 注册表](https://docs.github.com/zh/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#publishing-a-package)
- [发布与安装 Github Packages](https://blog.csdn.net/u010089686/article/details/110124664)
