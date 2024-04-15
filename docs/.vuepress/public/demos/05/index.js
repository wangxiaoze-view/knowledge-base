class BasicEle extends HTMLElement {
	contentNode = null; // 克隆的节点

	constructor() {
		super();
	}
	get cardTmp() {
		return utils.getDom("#card-tmp");
	}

	set setContentNode(node) {
		this.contentNode = node;
	}

	get itemCardTmp() {
		return utils.getDom(".card-template", false, this.contentNode);
	}

	get cardImage() {
		return utils.getDom(".card-template--img", false, this.contentNode);
	}

	get cardTitle() {
		return utils.getDom(".card-template--title", false, this.contentNode);
	}

	get cardDesc() {
		return utils.getDom(".card-template--desc", false, this.contentNode);
	}

	get cardBtn() {
		return utils.getDom(".card-template--btn", false, this.contentNode);
	}

	get style() {
		return utils.getDom("style", false, this.contentNode);
	}

	get shadow() {
		return this.attachShadow({ mode: "closed" });
	}
}

class CustomElements extends BasicEle {
	max = 30; // 模拟数据总计
	page = 0; // 页码
	limit = 10; // 页条数
	data = []; // 模拟的数据

	constructor() {
		super();
		this.init().then(() => {
			utils.logger("页面初始化成功");
		});
	}

	async init() {
		this.data = await this.tempRequest();
		this.renderPage(this.shadow);
	}

	// 分页
	renderPage(shadow) {
		if (this.page >= this.totalPage) return;

		const data = this.data.slice(
			this.page * this.limit,
			this.page * this.limit + this.limit
		);
		setTimeout(() => {
			let domTree = [];
			for (let i = 0; i < data.length; i++) {
				const tree = data[i];
				this.setContentNode = this.cardTmp.content.cloneNode(true);
				i !== 0 && this.style.remove();
				this.cardImage.src = tree.img;
				this.cardTitle.textContent = tree.title;
				this.cardDesc.textContent = tree.desc;
				this.cardBtn.addEventListener("click", function () {
					alert("你点击了按钮：" + i);
				});
				this.style && domTree.push(this.style);
				domTree.push(this.itemCardTmp);
			}
			shadow.append(...domTree);
		}, this.page * 1000 * 0.7);
		++this.page;
		this.renderPage(shadow);
	}

	// 模拟数据
	tempData() {
		let arr = [];
		for (let i = 0; i < this.max; i++) {
			arr.push({
				img: "https://qiniu.wangxiaoze.wang/hexo-blog/default_top_img.webp",
				title: "标题" + i,
				desc: "描述" + i,
			});
		}
		return arr;
	}

	// 模拟请求
	tempRequest() {
		return new Promise(resolve => {
			const random = Math.floor(Math.random() * 10 + 1);
			resolve(random >= 5 ? this.tempData() : []);
		});
	}

	// 总计
	get total() {
		return this.data.length;
	}

	// 总计页
	get totalPage() {
		return Math.ceil(this.total / this.limit);
	}
}

class CardArticle extends BasicEle {
	constructor() {
		super();
		this.setContentNode = this.cardTmp.content.cloneNode(true);
		this.cardImage.src = this.getAttribute("image");
		this.cardTitle.textContent = this.getAttribute("title");
		this.cardDesc.textContent = this.getAttribute("desc");
		this.cardBtn.addEventListener("click", function () {
			alert("自定义传递组件!");
		});
		this.shadow.appendChild(this.contentNode);
	}
}

window.customElements.define("user-card", CustomElements);
window.customElements.define("card-article", CardArticle);
