::: tip
下方列举了一些 工具 的使用示例
:::

## 引入

```ts
import { isImage, isVideo } from "remote-components-lib/utils";
```

## 文件处理

> 涵盖了文件的一些处理方式，例如获取视频第一帧数，图片的缩略图展示等等

```ts
import {
	getHandlerImage,
	getVideoCover,
	getThumbnail,
} from "remote-components-lib/utils";

/**
 * @description 图片地址处理
 * @param src {string[] | string} 图片的地址, 支持字符串数组或者字符串
 * @returns {string[]}
 */
getHandlerImage("");

/**
 * @description 获取视频第一帧数
 * @param src 视频地址
 * @returns {Promise<string>} 视频封面地址
 */
getVideoCover("");

/**
 * @description 图片缩略图, 目前支持 阿里oss 和 七牛
 * @param src 图片地址
 * @param w 宽
 * @param h 高
 * @param q 清晰度
 * @returns {string}
 */
getThumbnail("", 100, 100, 80);
```

## 时间处理

```ts
import {
	getTime,
	getTimeFormat,
	getEnumTimePeriod,
	getQuarter,
} from "remote-components-lib/utils";

/**
 * @description 获取当前时间, 包含 年月日时分秒周
 * @returns
 */
getTime();

/**
 * @description 时间格式化
 * @param time Date
 * @param format 格式化
 * @returns  string
 */
getTimeFormat(new Date(), "yyyy-MM-dd hh:mm:ss");

/**
 * @description 获取季度
 * @param format 默认 YYYY-MM-DD
 * @returns
 */
getQuarter(new Date(), "YYYY-MM-DD");

/**
 * @description 时间周期
 * @param type 周期类型 是一个枚举ETimePeriodType， 可以在左侧菜单栏中找到枚举列表
 * @param format 默认 YYYY-MM-DD
 * @returns
 */
getEnumTimePeriod("week", "YYYY-MM-DD");
```

## 请求

```ts
import { Request } from "remote-components-lib/utils";

//这里配置您的axios配置
const http = new Request({ baseURL: "", timeout: 60000 });

//请求拦截
http.initRequestUse(config => {
	config.headers.token = "123";
	return config;
});


//响应拦截，俩个参数
http.initResponseUse(（data）=> {
  //成功拦截，例如：登录失效等
  if (response.data === '0000') {
    return response
  } else if (response.data === '0001') {
      return Promise.reject(response)
  }
  return response.data
}, error => {
  // 错误拦截
  return Promise.reject(error)
})


http.get('/api/test').then((res) => {})
http.post('/api/test').then((res) => {})
http.put('/api/test').then((res) => {})
http.delete('/api/test').then((res) => {})
http.request({
  url: '/api/test',
  method: 'GET'
}).then((res) => {})
```

## 日志

```ts
import { log } from "remote-components-lib/utils";
// 第一个参数为 日志类型或者标题，第二个值为数值
//调试
log.debug("hello world");
//日志
log.log("hello world", "123");
//错误
log.error("hello world", "123");
//警告
log.warn("hello world", "123");
//图片
log.img("https://picsum.photos/300");
```

## 正则

```ts
import {
	isImage,
	isVideo,
	isAndroid,
	isIos,
	isPhone,
	isNumber,
	isUrl,
	isEmail,
	isChina,
	isFile,
	isEnglish,
	isJson,
	isEmpty,
	isIdCard,
	isPort,
	isArray,
	isString,
	isLowerCase,
	isUpperCase,
	isIP,
} from "remote-components-lib/utils";

/**
 * @description 是否为图片
 * @param src 图片的地址
 * @returns {boolean}
 */
isImage("");

/**
 * @description 是否是视频
 * @param src 视频的地址
 * @returns {boolean}
 */
isVideo("");

/**
 * @description 判断是否为文件
 * @param src
 * @returns
 */
isFile("");

/**
 * @description 判断是否为url
 * @param src
 * @returns
 */
isUrl("");

/**
 * @description 判断是否是安卓系统
 * @returns
 */
isAndroid();

/**
 * @description 判断是否是苹果系统
 * @returns
 */
isIos();

/**
 * @description 判断是否是手机号码
 * @param str 输入的手机号
 * @returns
 */
isPhone("");

/**
 * @description 检测是否 为纯数字
 * @param number {Number | String}  数字 可以为整形数字，也可以为字符串数字
 * @returns
 */
isNumber("");

/**
 * @description 检测是否为邮箱
 * @param email 邮箱
 * @returns
 */
isEmail("");

/**
 * @description 判断是否为中文
 * @param str 待检测的字符串
 * @returns
 */
isChina("");

/**
 * @description 判断是否为英文
 * @param str 待检测的字符串
 * @returns
 */
isEnglish("");

/**
 * @description 判断是否为json字符串
 * @param str json字符串
 * @returns
 */
isJson("");

/**
 * @description 判断是否为空
 * @param value 待检测的值
 * @returns
 */
isEmpty("");

/**
 * @description 判断是否是身份证号
 * @param value
 * @returns
 */
isIdCard("");

/**
 * @description 判断是否是端口号
 * @param value
 * @returns boolean
 */
isPort("");

/**
 * @description 判断是否是数组
 * @param arg
 */
isArray([]);

/**
 * @description 判断是否是字符串
 * @param value
 * @returns
 */
isString("");

/**
 * @description 判断是否是小写字母
 * @param value
 * @returns
 */
isLowerCase("");

/**
 * @description 判断是否是大写字母
 * @param value
 * @returns
 */
isUpperCase("");

/**
 * @description 判断是否为IP
 * @param ip
 * @returns
 */
isIP("");
```
