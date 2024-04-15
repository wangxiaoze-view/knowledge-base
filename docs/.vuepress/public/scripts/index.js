class Dom {
	getDom(selector, all = false, target = document) {
		if (!selector) throw new Error("元素 el-selector 不能为空~");
		return all
			? target.querySelectorAll(selector)
			: target.querySelector(selector);
	}
}

const dom = new Dom();

class Utils extends Dom {
	constructor() {
		super();
	}
	trim(str) {
		return str.replace(/\s|\r|\n|\t/g, "");
	}

	logger(msg, type) {
		if (type === void 0) {
			type = "info";
		}
		return console[type]("🚀🚀🚀🚀🚀🚀🚀 ", msg);
	}

	base64(file) {
		return new Promise(function (resolve) {
			const fileReader = new FileReader();
			fileReader.onload = function (e) {
				resolve(e.target.result);
			};
			fileReader.readAsDataURL(file);
		});
	}

	downFile(url, name) {
		const _this = this;
		const a = document.createElement("a");
		a.href = url;
		a.target = "_blank";
		a.download = name;
		a.style.display = "none";
		document.querySelector("body");
		_this.getDom("body").append(a);
		a.click();
		a.remove();
	}
}

const utils = new Utils();
