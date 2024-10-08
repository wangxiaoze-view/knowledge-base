---
outline: deep
---

::: tip
在 JavaScript 中，`订阅发布（Publish-Subscribe）模式`和`观察者（Observer）模式`都是用于实现对象间解耦通信的设计模式。虽然这两种模式有相似之处，但它们之间存在一些关键的区别：
:::

## 概念上的不同：

- 观察者模式：是一种对象行为模式，它定义了对象之间的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知并被自动更新。
- 订阅发布模式：是一种消息通信模式，对象之间通过事件或消息进行通信，发送者（发布者）不会直接调用接收者（订阅者）的方法，而是将消息发布到一个中介（通常是事件总线或消息队列），订阅者可以订阅这些消息。

## 实现方式的不同

- 在观察者模式中，通常有一个具体的 Subject 类，它可以注册、移除观察者（Observer），并且在状态发生变化时通知所有的观察者。
- 在订阅发布模式中，并没有明确的 Subject 和 Observer 角色，任何对象都可以作为发布者或者订阅者，通信是通过事件名称来进行的。

## 应用场景的不同

- 观察者模式更适合于一对多的关系，即一个主题对象管理所有观察者对象，并且任何给定的观察者对象都只依赖于一个具体主题。
- 订阅发布模式适用于更广泛的情况，包括多对多的关系，即多个发布者可以向多个订阅者发送消息，订阅者可以根据自己的需求选择订阅哪些消息。

## 灵活性与扩展性

- 观察者模式在添加新的观察者时相对简单，但是当主题对象的状态变化频繁时，可能会导致大量的通知消息。
- 订阅发布模式由于其基于事件的机制，在处理复杂的消息传递场景时更加灵活，也更容易扩展。
