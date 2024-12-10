---
outline: deep
---

# 什么是发布订阅

发布订阅是一种软件设计模式和通信范式，它旨在促进不同软件组件间的松散耦合通信。在订阅发布模式中，有如下两个核心概念：

1. **发布者**: 负责发布信息或事件。发布者并不直接将消息发送给特定的接收者，而是将其发布到一个共享的通信媒介——通常是被称为“主题”（Topic）、“频道”（Channel）或“事件总线”（Event Bus）的中介。
2. **订阅者**: 对特定类型的信息或事件感兴趣。订阅者向中介（主题或频道）表达其关注的事件类型，并提供一个回调函数（或处理器）以便在相关事件发生时得到通知。订阅者并不关心发布者是谁，也不需要了解其他订阅者的存在。

就好比：

订阅者就好比手机开了个提醒，只关注感兴趣的那块新闻，比如你想知道关于足球比赛的结果，于是你对手机说: "只要有关足球比赛结果出来，就立刻告诉我" 这就是你向手机订阅了足球比赛的结果。

发布者就好比手机的短信，你发布一个消息，比如: "今天足球比赛结果出来了，结果是：胜负平"，然后手机就会把消息发送给订阅者，订阅者收到消息后，就会收到短信，然后你就知道了。

订阅者就是指定了自己关心的内容类型，然后等待这个类型的消息出现时，会收到专门的通知，而无需理会消息从哪里来，还有谁也在关注同样的消息。

![图片](https://file.wangzevw.com/images/d_20240426094751.png)

订阅发布模式，也叫发布订阅模式，是观察者模式的一种变种，观察者模式是订阅一个主题，主题会通知所有观察者，而发布订阅模式是订阅一个主题，主题会通知所有订阅者。

- 发布者：通过事件中心派发事件
- 订阅者：通过事件中心进行事件的订阅
- 事件中心：负责存放事件和订阅者的关系.

## 代码理解

```js
// 事件中心
class EventChannel {
	constructor() {
		this.subscribers = {};
	}
}

// 订阅中心
EventChannel.prototype.subscribe = function (eventType, handler) {
	if (!this.subscribers[eventType]) {
		this.subscribers[eventType] = [];
	}
	this.subscribers[eventType].push(handler);
};

// 发布中心
EventChannel.prototype.publish = function (eventType, data) {
	const handlers = this.subscribers[eventType];
	if (handlers) {
		handlers.forEach(handler => handler(data));
	}
};

// 取消订阅
EventChannel.prototype.unsubscribe = function (eventType, handler) {
	const handlers = this.subscribers[eventType];
	if (handlers) {
		const index = handlers.indexOf(handler);
		if (index !== -1) {
			handlers.splice(index, 1);
		}
	}
};
```

### 如何操作?

```js
// 初始化
const eventChannel = new EventChannel();

// z这里模仿用户订阅足球比赛结果，等比赛结束之后将结果发布给订阅者
function user_1({ result }) {
	console.log(`用户1接受到短信：比赛结果为${result}`);
}
function user_2({ result }) {
	console.log(`用户2接受到短信：比赛结果为${result}`);
}
// 用户1订阅了比赛结果
eventChannel.subscribe("result", user_1);
// 用户2订阅了比赛结果
eventChannel.subscribe("result", user_2);

// 模拟官方的结果
setTimeout(() => {
	eventChannel.publish("result", {
		result: "胜",
	});
}, 2000);

// 突然有一天，用户1 不想订阅了，不想每次都收到短信了
setTimeout(() => {
	eventChannel.unsubscribe("result", user_1);
	// 等到下次比赛结果公布  只有用户2就收到了短信
	eventChannel.publish("result", {
		result: "负",
	});
}, 3000);
```
