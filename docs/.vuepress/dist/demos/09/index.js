const driver_data = [
	{ selector: "#grid-3", title: "第一步", subTitle: '选择元素"#grid-3"' },
	{ selector: "#grid-1", title: "第二步", subTitle: '选择元素"#grid-1"' },
	{ selector: "#span-1", title: "第三步", subTitle: '选择元素"#span-1"' },
];

class Driver {
	body = dom.getDom("body", false);
	index = 0;
	constructor() {
		this.init();
	}

	init() {
		if (driver_data.length === 0) return;
		this.create_mark();
		const { selector } = driver_data[this.index];
		this.create_box(dom.getDom(selector, false));
		this.create_popover(driver_data[this.index]);
	}

	create_mark() {
		let div = document.createElement("div");
		div.id = "mark";
		div.style.position = "fixed";
		div.style.inset = "0";
		div.style.backgroundColor = "rgba(0, 0, 0, .6)";
		this.body.appendChild(div);
	}

	create_box(domNode) {
		const { left, top, bottom, right, width, height } =
			domNode.getBoundingClientRect();

		dom.getDom(".fix-element", true).forEach(child => {
			child.classList.remove("fix-element");
		});

		const div = document.createElement("div");
		div.id = "box";
		div.style.position = "fixed";
		div.style.zIndex = 99999;
		div.style.left = left + "px";
		div.style.right = right + "px";
		div.style.top = top + "px";
		div.style.bottom = bottom + "px";
		div.style.width = width + "px";
		div.style.height = height + "px";
		this.body.appendChild(div);
		domNode.classList.add("fix-element");
	}

	finish_done() {
		dom.getDom("#mark", false).remove();
		dom.getDom("#box", false).remove();
		dom.getDom("#popover", false).remove();
	}

	create_popover(dataItem) {
		if (!dataItem) return;
		const _this = this;
		const { selector, title, subTitle } = dataItem;
		const { left, top, bottom, right, width, height } = dom
			.getDom(selector, false)
			.getBoundingClientRect();
		const div = document.createElement("div");
		div.id = "popover";

		div.style.top = top + height + 10 + "px";
		div.style.left = left + 10 + "px";

		const btn_txt_1 = this.index > 0 ? "上一步" : "跳过";
		const btn_txt_2 = this.index < driver_data.length - 1 ? "下一步" : "完成";

		div.innerHTML = `
      <div id="popover_top"></div>
      <div id="popover_title">${title}</div>
      <div id="popover_sub_title">${subTitle}</div>
      <div id="popover_handler">
        <button id="pre">${btn_txt_1}</button>
        <button id="next">${btn_txt_2}</button>
      </div>
    `;

		this.body.appendChild(div);

		dom.getDom("#next", false).addEventListener("click", function () {
			_this.index++;
			if (_this.index > driver_data.length - 1) {
				_this.finish_done();
				_this.index = 0;
				return false;
			}
			_this.finish_done();
			_this.init();
		});

		dom.getDom("#pre", false).addEventListener("click", function () {
			_this.index--;

			if (_this.index < 0) {
				_this.finish_done();
				_this.index = 0;
				return false;
			}
			_this.finish_done();
			_this.init();
		});
	}
}

new Driver();
