---
outline: deep
---

# 什么是单例模式？

单例模式（Singleton Pattern）是简单的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

简单的说就是不管实例多少次,最终返回的是首次的实例对象; 单例模式不仅减少了内存的开销, 并且解决了一部分在全局变量中冲突的问题。

单例模式确保一个类只有一个实例存在。举个例子说: 一个班只有一名班主任, 而对于这个问题就是一个简单的介绍,同一个班级可以有多个老师,但是只有一个班主任,所以这个班主任就是单例模式。

## 简单的单例模式

```js
const time_tool = {
	title: "时间处理方法",
	getTime: function () {},
	getDate: function () {},
	getYear: function () {},
};
```

上面的例子就是以为`字面量`的形式创建一个封装时间的处理工具,同时暴露出一个全局的变量`time_tool`,在使用的时候只需要调用`time_tool.getTime()`即可。`time_tool`就是单例模式的体现,在创建对象的方式实例化了一个对象, 并且`const`定义的变量是不能修改以及重复存在的;

## 构造函数与立即执行函数表达式

```js
const Singleton = (function () {
	let instance;

	function init() {
		function privateMethod() {
			console.log("私有");
		}
		return {
			publicMethod: function () {
				console.log("公有");
				privateMethod();
			},
		};
	}

	return {
		getInstance: function () {
			if (!instance) {
				// 创建
				instance = init();
			}
			return instance;
		},
	};
})();
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1, instance2);
console.log(instance1 === instance2);
```

## 使用模块模式

```js
const SingletonModule = (function () {
	let instance;

	function Singleton() {
		// 私有属性和方法
		const privateVar = "I am private";

		this.publicMethod = function () {
			console.log("Public Method");
			console.log(privateVar);
		};
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = new Singleton();
			}
			return instance;
		},
	};
})();

// 使用单例
const singletonInstance1 = SingletonModule.getInstance();
const singletonInstance2 = SingletonModule.getInstance();
console.log(singletonInstance1 === singletonInstance2); // 输出: true
```

## 使用 ES6 的类和静态属性

```js
class SingletonClass {
	static instance = null;

	constructor() {
		if (!SingletonClass.instance) {
			SingletonClass.instance = this;
			// 初始化操作
		}
		return SingletonClass.instance;
	}

	publicMethod() {
		console.log("Singleton Class Public Method");
	}
}

// 使用单例
const singletonInstance1 = new SingletonClass();
const singletonInstance2 = new SingletonClass();

console.log(singletonInstance1 === singletonInstance2); // 输出: true
```

单例模式的实现方式有很多种,如使用字面量,使用构造函数,使用立即执行函数表达式,使用模块模式,使用 ES6 的类和静态属性等。
