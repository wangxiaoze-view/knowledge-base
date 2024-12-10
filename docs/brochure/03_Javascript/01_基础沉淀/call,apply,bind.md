---
outline: deep
---

::: tip
在前端开发中，`call, apply, bind`是 js 三个重要的方法, 三者都是改变`this`（函数的执行上下文）的指向，但是还是有区别的；我将会以`demo`的形式展示三者的使用场景以及区别；

在一半工作任务中这三者是不常用到的，如果您的项目是纯原生 js 项目，那么使用到的几率就会大很多；这三者一般用于代码底层，例如：封装，框架等等；
:::

## 区别

### call

> `call`:方法调用函数, 执行`this`的值和参数；参数可以为多个

<demo html="html/call.html"></demo>

`func.call(thisArg, arg1, arg2, ...)`

- **thisArg**: `this`的值
- **arg1, arg2, ...**: 函数的值

### apply

> `apply`: 与`call`类似，但是参数是以数组的形式展示

<demo html="html/apply.html"></demo>

`func.apply(thisArg, arg1, arg2, ...)`

- **thisArg**: `this`的值
- **argsArray**: 函数的值

### bind

> `bind`: 创建一个新的函数，指定`this`的值和参数

<demo html="html/bind.html"></demo>

`func.apply(thisArg, arg1, arg2, ...)`

- **thisArg**: `this`的值
- **arg1, arg2, ...**: 函数的值

## 手写这三个函数

<demo html="html/write_call_apply_bind.html"></demo>
