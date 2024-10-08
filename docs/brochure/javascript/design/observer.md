---
outline: deep
---

# 观察者模式？

是一种一对多的关系，当一个对象发生改变时，其他依赖者都会收到对应的通知并及时更新；

就比如说：现场拍卖，台上的是观察者，当商品价格发生改变时就会更新通知所有的竞拍者，其中一件商品对应了多个竞拍者，体现了一对多的关系；

可以参考如下图片：

![x](https://file.wangzevw.com/images/2024-08-16-1140.3k7zr6l0sj.webp)

## 简单案例

```js
class Observer {
	constructor(name) {
		this.name = name;
	}

	update(price) {
		console.log(`${this.name} 您收到的价格为: $${price}`);
	}
}

class Subject {
	constructor() {
		this.observers = []; // 所有竞拍者
		this.price = 0; // 当前价格
	}

	// 添加竞拍者
	addObserver(observer) {
		this.observers.push(observer);
	}

	// 删除竞拍者
	removeObserver(observer) {
		this.observers = this.observers.filter(item => item !== observer);
	}

	// 更新价格 并通知所有竞拍者
	updatePrice(price) {
		this.price = price;
		this.observers.forEach(item => item.update(price));
	}
}

// 创建拍卖品
const subject = new Subject();

// 创建竞拍者
const ob1 = new Observer("竞拍者A");
const ob2 = new Observer("竞拍者B");
const ob3 = new Observer("竞拍者C");

// 注册竞拍者
subject.addObserver(ob1);
subject.addObserver(ob2);
subject.addObserver(ob3);

// 更新价格
subject.updatePrice(100);

// 竞拍者A离席不参与竞拍了
subject.removeObserver(ob1);

// 更新价格， 这时候只有竞拍者B,C收到通知
subject.updatePrice(200);
```
