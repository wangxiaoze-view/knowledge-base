::: tip
下方列举了一些 hooks 的使用示例
:::

## 引入

```ts
import {
	useLoading,
	useEleForm,
	useComputedNum,
	useResize,
	useNavigatorApp,
} from "remote-components-lib/hooks";
```

## useLoading

> 常用于显示加载中状态或者页面加载状态

```ts
import { useLoading } from "remote-components-lib/hooks";

const { loading, setLoading, toggleLoading, setLoadingText } = useLoading(
	// 初始化loading状态
	false,
	// loading文字
	""
);
```

## useEleForm

> 表单的 hooks, 用于 element-plus 表单

```ts
import { useEleForm } from "remote-components-lib/hooks";

const rules = {};
const {
	// form表单的ref
	formRef,
	// 表单的校验规则
	rules,
	// 校验表单
	validate,
	// 校验表单字段
	validateField,
	// 重置表单
	resetFields,
	// 滚动到指定字段
	scrollToField,
	// 清除校验
	clearValidate,
} = useEleForm(rules);
```

## useComputedNum

> 用于数字之间的计算，金额的展示等等, 内置其他插件， 插件可查看[文档](https://currency.js.org/)

```ts
import { useComputedNum } from "remote-components-lib/hooks";

type TType = "add" | "subtract" | "multiply" | "divide";

const {
	// 算法， + - * /, 返回值：{ number: ‘’, string: ‘’ }
	// 接受三个字段： (type: TType, a: string | number, b?: string | number): IResult
	//
	arithmetic,
	// 数字转为字符串
	toString,
	// 字符串转为数字
	toNumber,
	// 自定义参数配置
	custom,
} = useComputedNum();
```

## useResize

> 适用于移动端。业务场景如：底部有按钮，当输入框聚焦的时候页面弹起不显示底部按钮

```ts
import { useResize } from "remote-components-lib/hooks";

// initScrollHeight: 落差的高度, 屏幕高度落差xx不显示底部按钮
const { showBottom } = useResize({ initScrollHeight: 50 });
```

## useNavigatorApp

> 该 hooks 用于公司内部的移动端混合页面的调用

```ts
import { useNavigatorApp } from "remote-components-lib/hooks";

type IAppPageType =
	| "goOrderDetail"
	| "callPhone"
	| "goBail"
	| "updateOrderDetails"
	| "upLoadVideo"
	| "upLoadImg"
	| "downloadImg"
	| "navHead"
	| "goto"
	| "login"
	| "outLogin"
	| "customerService"
	| "gotoProduct"
	| "download"
	| "appVoice";

// goAppPage 接受的参数 (type: IAppPageType, options: Record<string, any> = {})
const { goAppPage } = useNavigatorApp();

// 例如点击按钮跳转app的订单详情
const clickBtn = () => {
	goAppPage("goOrderDetail", {
		orderDetailsId: "2024123sdf",
		title: "订单详情",
	});
};
```
