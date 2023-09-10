---
title: 系统升级问题总结
date: 2023-09-09
categories:
  - Demos
tags:
    - JavaScript
---

{% note info flat %}
续接上篇`"node系统升级vue部署"` ， 上篇问文章针对老系统升级版本总结的一些问题，但是这些问题仅仅是一部分，现在针对上篇文章继续进行总结完善；
{% endnote %}


我们大概说一下上篇文章的问题：

1. 重构`api请求， 二次ts封装`
2. `iframe`渲染老系统的页面;
3. 处理老系统的`tab, 预览图`等问题进行`message`兼容;

上篇总结了一部分问题，但是还存在一些问题，这里针对上篇总结的进行补充；


## 问题1：

对于登录页面，进行了重构。对于本次登录功能，在原有的功能基础上添加了`企业微信扫码登录的功能`，大致效果如下:

![企业微信扫码登录](https://qiniu.wangxiaoze.wang/hexo-blog/s_1.png)

登录功能没啥总结的，和平常的登录功能差不多，主要说一下`企业微信扫码登录`的功能。

不过值得幸运的是，正好官网有相关文档，有现成的组件以及代码，我们只需要引入组件，然后进行相关配置即可。

大概代码如下: 

首先我们需要一个元素，用于加载二维码；

``` HTML
<div id="wx_qrcode"></div>
```

``` ts
// 引入组件
import * as ww from '@wecom/jssdk'

// 具体的相关配置 可以查看官网文档;
const wwLogin = ww.createWWLoginPanel({
        el: '#wx_qrcode',
        params: {
        login_type: 'CorpApp',
        appid: '',
        agentid: '',
        redirect_uri: '',
        state: 'loginState',
        redirect_type: 'callback',
        lang: 'zh',
        panel_size: 'small',
    } as ww.WWLoginParams,

    async onLoginSuccess({ code }: { code: string }) {
        // 登录成功相关逻辑
    },
    onLoginFail({ errMsg }) {
        // 登录失败相关逻辑
    },
})
```

不过要注意的是`redirect_type`需要设置对应应用绑定的域名; 如果不设置对应应用绑定的域名，那么扫码登录之后，`对应的回调函数不会执行`，这个问题也是我之前忽视了，所以在文档找了半天也没找到对应的问题，后来发现是这个原因。

等奖二维码对接之后，会发现一个问题就是，会出现短暂的白屏效果，先短暂白屏之后才会生出渲染二维码，这样的效果并不是我想要的，并且如果给到用户使用，体验感并不是很好;

因为生成的二维码渲染在元素`wx_qrcode`, 子节点会生成一个`iframe`元素，对于该元素渲染会有有缓慢的渲染问题；对于该问题，我是这么解决的，给到元素添加`display: none;`，然后通过`setTimeout`延迟100毫秒，再将元素显示出来，这样就可以避免白屏问题了。

不过这样虽然可以解决，但是对于子节点的渲染还是有问题的，可能会出现该问题：计时器已经销毁了，但是二维码还没有渲染出来；针对该问题再次进行优化;

因为系统是基于`element-pblus`的，可以添加`v-laoding`属性去解决该问题:

``` html
<!-- 
    外层的盒子是现实loading的状态, 里层的盒子才是渲染的二维码
    为什么外层是loading?
    因为内层的二维码是iframe元素，该元素渲染会有缓慢的渲染问题，所以给到外层一个loading状态，这样用户体验会比较友好
-->
<div
    v-loading="loading"
    class="panel-container"
    element-loading-text="正在初始化, 请稍等..."
  >
    <div v-show="isShow" id="wx_qrcode" class="code-container"></div>
  </div>
```

``` ts

// 需要定义了俩个变量,  一个显示loading，一个显示二维码
// loading 默认显示
const loading = ref(true)
const isShow = ref(false)

const initPanel = () => {

    const refresh = (wwLogin: ww.WWLoginInstance) => {
        // 先将之前的面板销毁掉
        wwLogin.unmount()
        // 再去初始化loading 和 显示二维码状态
        setLoading(true)
        isShow.value = false
        // 再去生成二维码
        initPanel()

    }

    const wwLogin = ww.createWWLoginPanel({
            el: '#wx_qrcode',
            params: {
            login_type: 'CorpApp',
            appid: '',
            agentid: '',
            redirect_uri: '',
            state: 'loginState',
            redirect_type: 'callback',
            lang: 'zh',
            panel_size: 'small',
        } as ww.WWLoginParams,

        async onLoginSuccess({ code }: { code: string }) {
            // 登录成功相关逻辑
            // 可能这里需要请求其他接口;当接口成功才会跳转页面
            // 但是需要注意的是失败的时候二维码不会刷新，这里
            // 需要手动刷新

            // 刷新代码如下:
            // 场景：这里请求失败需要手动刷新二维码
            refresh(wwLogin)
        },
        onLoginFail({ errMsg }) {
            // 登录失败相关逻辑
        },
    })
}
```

具体的效果如下:

<div style="display:flex;">
    <img src="https://qiniu.wangxiaoze.wang/hexo-blog/s_3.png"/>
    <img src="https://qiniu.wangxiaoze.wang/hexo-blog/s_2.png"/>
</div>


## 问题2:

现在登录的问题解决了，但是接下来有一个问题；因为里面有些页面是`node iframe`页面，对于`node`有拦截`token`共存问题；就是新系统登录之后老系统那里监听获取不到对应的token和用户信息;

起初我的做法是这样的：

`node`项目使用的`redis`， 在项目拦截的时候根据`用户id或者token`在`redis`缓存中获取对应的数据;虽然这样的作法可以暂时解决但是对于`node`而言，`redis`的缓存是单机的，如果`node`项目部署了多个，那么缓存的数据就可能存在问题；

还有一个问题就是， 每次打开一个页面都会去请求`redis`数据，这样对于性能来说也是不友好的；每次都会去请求`redis`数据那么缓存的作用就不明显了;

明显在本地这样的方法虽然行得通，但是对于生产的项目数据等等也是会出现不言而喻的问题; 这样就会造成一定的损失;

然后突发奇想，有了这么一个解决思路：

如果我在node开放一个接口，用于页面传递的登录`token`或者`userId`，然后前端请求这个接口，如果请求成功就返回数据设置对应的用户信息，如果失败就提示错误信息或者跳转登录页面，这样是不是就解决了问题呢？

那么有了这个想法，还需要后端的一个接口，用户根据`userId或者token`获取权限，用户信息等等；

大概的代码逻辑如下:

``` js
const specialChars = ['_token', '_userId', '_to', '_title'];
let SsoResolve = {
    // 'http://www.xxx.com/test?name=zhangshan&age=100#hello'
    //{name: "zhangshan", age: "100"}
    getParams: function(url) {
        try {
            url = url.match(/\?([^#]+)/)[1]
            const obj = {}
            const arr = url.split('&')
            for (let i = 0; i < arr.length; i++) {
                const subArr = arr[i].split('=')
                const key = decodeURIComponent(subArr[0])
                const value = decodeURIComponent(subArr[1])
                obj[key] = value
            }
            return obj
        } catch (err) {
            return null
        }
    },
    //"name=zhangsan&age=100"
    parseParams: function(data) {
        try {
            const tempArr = []
            for (const i in data) {
                const key = encodeURIComponent(i)
                const value = encodeURIComponent(data[i])
                tempArr.push(`${key}=${value}`)
            }
            const urlParamsStr = tempArr.join('&')
            return urlParamsStr
        } catch (err) {
            return ''
        }
    },
    getRedirectUrl: function(url, params) {
        // 可能链接加密
        let redirectUrl = decodeURIComponent(url);
        specialChars.forEach(function (key) {
            delete params[key]
        })
        if (params) {
            // 转成字符串形式
            const val = SsoResolve.parseParams(params)
            redirectUrl +=  '?' + val
        }
        return redirectUrl;
    },
}

module.exports = SsoResolve

```

``` js
const express = require("express");
const router = express.Router();
router.get('/user/auth', (req, res) => {
    // 根据传递的token设置
    req.query._token && (req.session.token = req.query._token);

    // 二次处理传递的路由
    const redirectUrl =  SsoResolve.getRedirectUrl(req.query._to, JSON.parse(JSON.stringify(req.query))

    // 判断当前存储的userId 是否和当前登录人的userId一致, 一致直接跳转, 否则自动登录
    if (req.session && req.session.user &&  req.session.userId === req.query._userId) {
        res.redirect(redirectUrl);
		return;
    }

    // 获取用户信息
    http.get('/xxxxxx', req, data => {
        if (data.success) {
            req.session.token = data.context.token;
			req.session.user = data.context.user;
            req.session.userPermission = data2.userPermission;
            res.redirect(redirectUrl);
        }
    })
})

```

**上面就是一个简单的单点登录的实现, 当然, 上面只是实现了登录, 没有实现退出, 退出的话, 只需要把session清空即可, 这里就不在赘述了.**


**单点登录的实现原理其实很简单, 就是通过一个token, 把用户信息存储在服务端, 然后通过这个token,在每次请求的时候, 把token传递到服务端, 服务端根据token获取用户信息, 然后进行验证, 验证通过, 返回用户信息, 验证失败, 返回错误信息.**


那么针对与新系统`iframe`是如何处理的呢？

``` html
<iframe src="https://xxxx.com/user/auth?_token=xxx&_userId=xxxx&_title=xxxx&_to=xxxx" />
```

每次打开页面会传递一个`用户token, id, 跳转的老系统的路由`; 每次会请求老系统的路由`就是上面写的 /user/auth`, 然后把老系统的路由传递到新系统, 然后新系统根据路由跳转到老系统.


## 问题3：

老系统打开一个`tab`页面，浏览器地址为`https://xxx.com/#/iframe?url=xxxxxt_token=xxxxx`, 当退出登录之后，再次点击该`tab`页面，会提示`token`失效，无法打开，但是浏览器地址栏的地址没有变化，还是`https://xxx.com/#/iframe?url=xxxxxt_token=xxxxx`，请问如何解决？

也就是说重定向地址的token是失效状态的，当再次登录的时候当前的token是上一次失效的token, `redis`也不会有对应的存储信息; 那么问题来了， 我登陆之后`toekn`失效又推出了登录状态；来来回回，永远都登录不上这样用户体验很不好， 那么如何解决呢？

我这里有这么一个思路，无痛刷新token, 用户是察觉不到的；

大概的思路是这样的：

**当打开tab标签页的时候，再退出登录，那么浏览器的重定向地址的token还是失效状态下的, 那么再次登录的时候token是不会更换的，那么每次登录都是会获取到上一次失效的token; 那么浏览器存储的token是不一致的；**

**那么，方案是： 登录成功跳转的时候刷新浏览器地址，再刷新的同时去更新，因为只有登录成功之后才能拿到最新状态的token;**


大概的逻辑如下:

``` ts

function getTokenUrl(url: string, title = ''): string {
  // 可能链接展示这样： ro=/a/b/v?id=&userId=  下面二次拼接的情况并不符合链接格式
  url = url.replace(/\?/g, '&')
  const store = useUserStore()
  return `${import.meta.env.VITE_APP_ABK_URL}/user/auth?_token=${
    store.getToken || ''
  }&_userId=${
    store.userInfo ? store.userInfo.userId : ''
  }&_title=${title}&_to=${url}`
}


//  处理iframe路由页面token失效问题
// redirect： 重定向的地址，只是针对当前分业务场景的特殊处理；
function getEedirectUrl(redirect: string) {
    if (redirect.indexOf('/iframeView') != -1) {
        // getParams: 就是进行了特殊处理; 看个人的业务场景;
        const query = getParams(redirect)
        const url = decodeURIComponent(query!.url || '')
        const title = decodeURIComponent(query!._title || '')
        const index = url.indexOf('_to=')
        if (index != -1) {
        const queryUrl = url
            .slice(index)
            .split('_to=')
            .filter((i) => i)[0]
        const toPath = getTokenUrl(queryUrl, title)
        return {
            path: '/iframeView',
            query: {
            // 改成自动登录模式
            url: encodeURIComponent(toPath),
            _title: encodeURIComponent(title),
            },
        }
        } else {
            return ''
        }
    }
    return ''
}
```

## 问题4：(补充)

因为原有的`iframe`页面是`message`通信的，但是由于想要将原有的`dialog`弹窗升级成新版本的`vxe-model`弹窗，那就遇到了一个问题，如何动态创建组件；

为什么是要动态创建组件？

> `iframe 和 vue`通信仅仅只能通过`message消息广播`, 那么如果在`iframe message`一个事件出来那么就会遇到不同的问题，

1. 多个`message`创建不同的`dialog`, 那么总不能在`vue`页面写不同的组件引用吧，那么这样的情况如何引入组件？
2. 第二个问题就是如何在弹窗显示关闭弹窗，因为弹框 显示的业务场景是不同的，那么对于这样的情况如何处理？


那么我这里有一个短暂的解决方案，不过不推荐使用，为什么不推荐使用呢？且听我慢慢道来：

大致的解决思路如下：

``` js
    const postMessageUtils = (options = {}, targetOrigin = '*') => {
        window.parent.parent.parent.parent.postMessage(options, targetOrigin);
    }


    const openDialog = (title = '') => {
        postMessageUtils({
            // 区分不同的类型
            type: 'open-dialog',
            title: '打开新弹窗',
            // 该url是vue组件的路径
            url: '/@/views/dialog/index.vue',
        })
    }

```

``` ts
// vue相关代码

const handlerMessage = (e: any) => {
    const data = e.data
    // 打开新弹窗
    data.type === 'open-dialog' && openDIalog(data)
}


onMounted(() => {
    window.addEventListener('message', handlerMessage)
})

onUnmounted(() => {
    window.removeEventListener('message', handlerMessage)
})


const openDIalog  = (options: any) => {
    // 使用vite 的import动态引入
    import(options.url).then((data) => {
        // createApp: vue 内置hooks
        // 动态创建app
        const app = createApp(data.default, options.props)
        // 注册组件
        app.component(options.name || 'Name', data.default)
        // app.use(elementplus) 为什么会注册组件ui呢
        // 因为动态创建组件时，仅仅只是将组件添加元素中，并不会解析组件
        // 索引显示的内容为: <el-button></el-button> 而不是显示的是: <button class="el-button"></button>
        app.use(ElementPlus).mount('#vueCon')
        // 卸载对应的app
        onUnmounted(() => {
            app.unmount()
        })
    })
}
```

现在说下为什么不能使用动态创建组件:

动态组件的初衷是可以的，但是每次都会重新创建组件，这样性能消耗很大，所以vue内部做了优化，将动态组件缓存起来，这样性能消耗就小多了。

但是如果动态组件的组件名是动态的，那么vue内部就无法缓存组件了，所以动态组件的组件名不能是动态的。

这样每次动态创建都会执行`app.use(elementPlus).mount('#vueCon')`, 那么这样再去绑定其他的插件，如`vxe-table`那么每次使用插件, 会有类似的日志： `xxx重复，可能会有问题`; 大致意思就是重复使用插件`xx`可能导致原有得到功能有问题；

如果使用那么可能会在线上有一定的问题，没必要带来不必要的损失;




