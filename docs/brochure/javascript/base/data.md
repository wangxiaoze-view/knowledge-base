---
outline: deep
---

# 介绍

JavaScript 中的数据类型分为两大类：原始类型（Primitive Types）和引用类型（Reference Types）。当然也能成为基本数据类型和复杂数据类型。

当然，不论是在使用还是在读取堆栈，判断数据类型俩种数据类型还是有很大的区别的。

下面详细介绍这两种类型及其区别，并给出具体的例子。

## 数据类型

### 原始类型

原始类型包括以下几种：

- `Number`: 数字
- `String`: 字符串
- Boo`lean: 布尔值
- `Null`: 空值
- `Undefined`: 未定义
- `Symbol`: 符号
- `BigInt`: 大整数

```ts
// Number
let num = 123;
console.log(num); // 输出: 123

// String
let str = "Hello, world!";
console.log(str); // 输出: Hello, world!

// Boolean
let bool = true;
console.log(bool); // 输出: true

// Undefined
let undef;
console.log(undef); // 输出: undefined

// Null
let n = null;
console.log(n); // 输出: null

// Symbol
let sym = Symbol("unique");
console.log(sym); // 输出: Symbol(unique)

// BigInt
let bigInt = 123456789012345678901234567890n;
console.log(bigInt); // 输出: 123456789012345678901234567890n
```

### 引用类型

引用类型包括以下几种：

- `Object`: 对象
- `Array`: 数组
- `Function`: 函数
- `Date`: 日期
- `Map`: 映射
- `Set`: 集合
- `WeakMap`: 弱映射
- `WeakSet`: 弱集合
- `RegExp`: 正则表达式

```ts
// Object
let obj = { name: "Alice", age: 30 };
console.log(obj); // 输出: { name: 'Alice', age: 30 }

// Array
let arr = [1, 2, 3];
console.log(arr); // 输出: [1, 2, 3]

// Function
let func = function () {
	console.log("Hello");
};
func(); // 输出: Hello

// Date
let date = new Date();
console.log(date); // 输出: 当前日期时间

// Map
let map = new Map();
map.set("key1", "value1");
console.log(map); // 输出: Map(1) { 'key1' => 'value1' }

// Set
let set = new Set();
set.add(1).add(2).add(3);
console.log(set); // 输出: Set(3) { 1, 2, 3 }

// WeakMap
let weakMap = new WeakMap();
weakMap.set(obj, "value");
console.log(weakMap); // 输出: WeakMap { <1> entries }

// WeakSet
let weakSet = new WeakSet();
weakSet.add(obj);
console.log(weakSet); // 输出: WeakSet { <1> entries }

// RegExp
let regex = /hello/;
console.log(regex); // 输出: /hello/
```

## 堆栈使用

### 栈（Stack）

栈是一种先进后出（Last In First Out, LIFO）的数据结构。栈主要用于存储函数调用时的局部变量和执行上下文。

特性：

- 操作简单：只有两个操作：压入（push）和弹出（pop）。
- 内存分配和释放速度快。
- 通常用于函数调用和局部变量。

```ts
function stackExample() {
	let localVar = "local";
	console.log(localVar); // 输出: local
}

stackExample();
console.log(localVar); // 报错：ReferenceError: localVar is not defined
```

### 堆（Heap）

堆是一种动态内存区域，用于存储对象。堆中的内存分配和释放相对复杂，但提供了更大的灵活性。
特性：

- 动态分配：可以在运行时动态创建和销毁对象。
- 内存分配和释放较慢。
- 通常用于存储对象和全局变量。

```ts
function heapExample() {
	let obj = { name: "Alice", age: 30 };
	console.log(obj); // 输出: { name: 'Alice', age: 30 }
}

heapExample();

// 全局变量
let globalObj = { name: "Bob", age: 25 };
console.log(globalObj); // 输出: { name: 'Bob', age: 25 }
```

### 区别

- 原始类型：存储在栈中，直接存储值。
- 引用类型：存储在堆中，栈中存储的是指向堆中对象的引用。
- 栈：先进后出的数据结构，主要用于存储函数调用时的局部变量和执行上下文。
- 堆：动态内存区域，用于存储对象，提供了更大的灵活性。

如何更加清晰的理解呢？

举个例子来讲：

```ts
// 原始类型直接内存值存储
let name = "Tom";

// 引用类型会将值存储在堆中，栈中存储指向堆中对象的引用
let obj1 = { a: 1 };
let obj2 = obj1;

// 如果将 引用值 修改，那么会发现： obj1 和 obj2 的值都变了，这是为什么？
// 因为 obj1 和 obj2 的值都是引用的堆的值，改的都是堆值
obj1.a = 3;
```

可以参考下面图片：

![x](https://file.wangzevw.com/images/2024-08-16-1140.lvpaw7hne.webp)

## 判断数据类型

在 JavaScript 中，判断数据类型有多种方法，每种方法都有其适用场景和局限性。以下是几种常用的方法及其区别

### typeof

> `typeof` 是最简单的判断数据类型的方法，主要用于判断基本数据类型。它能准确地识别 `string、number、boolean、undefined` 和 `symbol。`

```ts
console.log(typeof "hello"); // "string"
console.log(typeof 123); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof Symbol("sym")); // "symbol"

// 对于 null 和 object 类型，typeof 返回 "object"
console.log(typeof null); // "object"
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
```

### instanceof

> `instanceof` 是 JavaScript 中的一个运算符，用于判断一个对象是否是某个类的实例。它主要用于判断引用类型。

```ts
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(function () {} instanceof Function); // true
console.log(new Date() instanceof Date); // true
```

### Object.prototype.toString.call()

> `Object.prototype.toString.call()` 可以准确判断所有类型的数据，包括 `null` 和 `undefined`。

```ts
console.log(Object.prototype.toString.call("hello")); // "[object String]"
console.log(Object.prototype.toString.call(123)); // "[object Number]"
console.log(Object.prototype.toString.call(true)); // "[object Boolean]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call({})); // "[object Object]"
console.log(Object.prototype.toString.call(function () {})); // "[object Function]"
console.log(Object.prototype.toString.call(new Date())); // "[object Date]"
```

### Array.isArray()

> `Array.isArray()` 专门用于判断一个值是否为数组。

```ts
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false
console.log(Array.isArray([1, 2, 3])); // true
```

### Buffer.isBuffer() (Node.js)

> `Buffer.isBuffer()` 是 Node.js 中的一个方法，用于判断一个值是否为 Buffer 对象。

```ts
const buffer = Buffer.from("hello");
console.log(Buffer.isBuffer(buffer)); // true
console.log(Buffer.isBuffer({})); // false
console.log(Buffer.isBuffer([])); // false
```

### 总结

- `typeof`：简单易用，适用于基本数据类型。
- `instanceof`：适用于复杂对象类型，但需要考虑原型链的问题。
- `Object.prototype.toString.call()`：**适用于所有类型的数据，最准确。**
- `Array.isArray()`：专门用于判断数组。
- `Buffer.isBuffer()`：仅在 `Node.js` 中使用，用于判断 `Buffer` 对象。
