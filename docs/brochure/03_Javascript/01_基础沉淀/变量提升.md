---
outline: deep
---

# 介绍

在 JavaScript 中，`let`, `const`, 和` var` 用于声明变量，而 f`unction` 用于定义函数。它们之间存在一些重要的区别，尤其是在作用域和变量提升方面。

在说明变量提升之前，先理解一下三者的区别

### 区别

- `var`: 在函数或全局范围内声明变量。所有用 `var` 声明的变量都会被提升到当前作用域的顶部。
- `let`: 在块级作用域内声明变量。不会被提升。
- `const`: 与 `let` 类似，但在声明时必须初始化，并且值不能改变。

```ts
var price = 100;
price = 200; // 200， 可以正常修改

let a = 1;
a = 2; // 2， 可以正常修改

const b = "name";
b = "age"; // Assignment to constant variable. 常量不能被修改
```

### 变量提升

JavaScript 中的变量提升是指变量声明会被提升到当前作用域的顶部，但仅限于声明本身，而不包括初始化。

```ts
console.log(x); // 输出: undefined
var x = 5;

console.log(y); // 输出: ReferenceError: y is not defined
let y = 10;

console.log(z); // 输出: ReferenceError: z is not defined
const z = 15;
```

在这个例子中：

- `var x` 的声明被提升到了作用域的顶部，因此 `x` 在使用前就已经存在，但它的初始化没有被提升，所以输出 `undefined`。
- `let y` 和 `const z` 的声明都没有被提升，所以在使用前访问它们会导致 `ReferenceError`。

现在已经把`let, const, var`的区别以及变量如何提升的已经说完了，但是之前说到了`function`，这里为什么要说`function`这与变量提升有什么联系呢？

要想解释`function`变量提升，那么就要接单了解胰一下`function`

- 函数声明 (`function foo() {}`) 会进行完整的提升，即声明和初始化都会被提升。
- 函数表达式 (`var bar = function() {};`) 只有变量声明被提升，函数初始化部分不提升。

```ts
console.log(foo()); // 输出: "Hello"
function foo() {
	return "Hello";
}

console.log(bar()); // 输出: TypeError: bar is not a function
var bar = function () {
	return "World";
};
```

如果对其还是模糊不清，可以参考以下图片便于理解：
![x](https://file.wangzevw.com/images/2024-08-16-1141.7ax4zo6imu.webp)
