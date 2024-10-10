---
outline: deep
---

# 代理模式？

代理模式是一种结构型设计模式，它允许你提供对另一个对象的访问点。使用代理对象，我们可以更好地控制与某些对象的交互。代理对象可以确定我们与对象交互时的行为，例如获取值或设置值时。

一般来说，代理是指其他人的替身。您无需直接与该人交谈，而是与代理人交谈，该代理人将代表您尝试联系的人。`JavaScript` 中也是如此：我们无需直接与目标对象交互，而是与代理对象交互。

## 简单案例

首先创建一个对象，

```js
const person = {
	name: "John Doe",
	age: 42,
	nationality: "American",
};
```

我们不想直接与该对象交互，而是想与代理对象交互。在 `JavaScript` 中，我们可以通过创建一个新的实例来轻松创建新的代理`Proxy`。

```js
const person = {
	name: "John Doe",
	age: 42,
	nationality: "American",
};

const personProxy = new Proxy(person, {});
```

的第二个参数是一个代表处理程序的 `Proxy` 对象。在处理程序对象中，我们可以根据交互类型定义特定行为。虽然你可以向代理处理程序添加[许多方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，但最常见的两个方法是和：`get` `set`

- `get`：当对象属性被访问时，该方法被调用。
- `set`：当对象属性被设置或更改时，该方法被调用。

让我们向`personProxy`代理添加处理程序。当尝试修改属性时，从而调用`set`上的方法`Proxy`，我们希望代理记录该属性的先前值和新值。当尝试访问属性时，从而调用`get`上的方法`Proxy`，我们希望代理记录一个更易读的语句，其中包含属性的键和值。

```js
const personProxy = new Proxy(person, {
	get: (obj, prop) => {
		console.log(`The value of ${prop} is ${obj[prop]}`);
	},
	set: (obj, prop, value) => {
		console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
		obj[prop] = value;
	},
});
```

当访问该`name`属性时，代理返回了一个听起来更好的句子：`The value of name is John Doe。`

当修改`age`属性时，代理返回该属性的先前值和新值：`Changed age from 42 to 43。`

## Reflect

JavaScript 提供了一个名为的内置对象`Reflect`，这使得我们在使用代理时可以更轻松地操作目标对象。

之前我们使用对象中括号去获取和修改对象的属性，相反，我们可以使用该`Reflect`对象。对象上的方法`Reflect`与对象上的方法同名`handler`。

简单来讲呢，就是换个用法；[张鑫旭-Proxy 是代理，Reflect 是干嘛用的？](https://www.zhangxinxu.com/wordpress/2021/07/js-proxy-reflect/), 其中有句话解释：**“一句话，Reflect 没什么用，除了装装逼，让人看起来高大上以外，并不具有什么牛逼之处。”**

关于`Reflect`用法如下：

```js
const per = {
	name: "zhangsan",
	age: 18,
	sex: "男",
	say: function () {
		console.log(this.name + " say hello");
	},
};

const pxy = new Proxy(per, {
	get(target, key, receiver) {
		return Reflect.get(target, key, receiver);
	},
	set(target, key, value, receiver) {
		return Reflect.set(target, key, value, receiver);
	},
});

console.log(pxy.name);
pxy.name = "lisi";
console.log(pxy.name);
pxy.say();
```
