class Var extends Utils {
	// tabs 数据
	tabsData = [];
	// 基础，底图，后面是当前图片, 用于判断是否设置了底图
	baseImgUrl = "";
	// 图片层级
	defaultIndex = 0;
	// 图层数据
	layerData = [];
	// 拖拽的元素
	dragging = null;
	// 图片
	draggingImg = null;

	// 测试用图地址
	testZipUrl =
		"https://qiniu.wangxiaoze.wang/demos/%E6%B5%8B%E8%AF%95%E7%94%A8%E5%9B%BE.zip";

	constructor() {
		super();
	}

	// 设置底图按钮
	get getSetBtn() {
		return this.getDom("#set_bg");
	}

	// 上传目录按钮
	get getUpFileBtn() {
		return this.getDom("#up_file");
	}

	// 下载目录文件
	get getDownDirBtn() {
		return this.getDom("#down_dir");
	}

	// 下载最终图片
	get getDownImageBtn() {
		return this.getDom("#down_image");
	}

	// 预览图片
	get getPreImage() {
		return this.getDom("#pre_image");
	}

	// 结果图片
	get getResultImage() {
		return this.getDom("#result_image");
	}

	// 左侧tabs
	get getContainerLeft() {
		return this.getDom(".view-container--left");
	}

	// y右侧控制图层
	get getContainerRight() {
		return this.getDom(".view-container--right");
	}

	// 左侧tabs
	get getTabsItems() {
		return this.getDom(".tabs-item", true);
	}

	// 目录名
	get getDirName() {
		return this.getDom("#dir_name");
	}

	// 文件数
	get getFileNum() {
		return this.getDom("#file_num");
	}

	// 设置左侧tabs数据
	setTabsData(tabsData = []) {
		this.tabsData = tabsData;

		if (tabsData.length > 0) {
			const webkitRelativePath = tabsData[0].webkitRelativePath;
			const charIndex = webkitRelativePath.lastIndexOf("/");
			this.getDirName.innerHTML = webkitRelativePath.substring(0, charIndex);
			this.getFileNum.innerHTML = tabsData.length;
		}
	}

	layerMove() {
		const _this = this;
		const layerDom = _this.getDom(".view-container--right");

		// 拖拽开始 记录当前拖拽的元素
		layerDom.addEventListener("dragstart", function (e) {
			e.dataTransfer.setData("Text", e.target);
			_this.dragging = e.target;
			const images = _this.getDom(".center-right img", true);
			const index = e.target.getAttribute("data-zIndex");
			if (index) {
				_this.draggingImg = images[Number(index)];
			}
		});

		// 拖拽移动
		layerDom.addEventListener("drop", function (e) {
			e.preventDefault();
		});

		layerDom.addEventListener("dragover", function (e) {
			e.preventDefault();
			const target = e.target;
			const images = _this.getDom(".center-right img", true);

			// 底图不允许拖拽

			if (target.nodeName === "LI" && target !== _this.dragging) {
				let preIndex = _this.dragging.getAttribute("data-zIndex");
				let nowIndex = target.getAttribute("data-zIndex");

				preIndex && (preIndex = Number(preIndex));
				nowIndex && (nowIndex = Number(nowIndex));

				// 上至下拖拽，修改操作和图片
				if (preIndex < nowIndex) {
					target.parentNode.insertBefore(
						_this.dragging,
						target.nextElementSibling
					);

					images[nowIndex].parentNode.insertBefore(
						_this.draggingImg,
						images[nowIndex].nextElementSibling
					);
				} else {
					// 下至上
					target.parentNode.insertBefore(_this.dragging, target);
					images[nowIndex].parentNode.insertBefore(
						_this.draggingImg,
						images[nowIndex]
					);
				}
			}
		});

		// 拖拽结束
		layerDom.addEventListener("dragend", function () {
			const items = _this.getDom(".layer-item", true);
			const images = _this.getDom(".center-right img", true);
			for (let i = 0; i < items.length; i++) {
				items[i].setAttribute("data-zIndex", i);
				images[i].style.zIndex = i.toString();
			}
		});
	}

	// 设置图层数据
	setLayerData(data) {
		if (!data) return;
		const div = document.createElement("li");
		div.classList.add("layer-item");
		div.setAttribute("draggable", "true");

		div.setAttribute("data-zIndex", data.zIndex);
		div.innerHTML =
			'<div class="layer-item--left">' +
			`<div class="layer-title" title="${data.name}">${data.name}</div>` +
			`<span class="layer-tip">蒙层${data.zIndex}</span>` +
			"</div>" +
			'<div class="layer-item--right" ></div>';

		this.getContainerRight.append(div);
		this.layerData.push(data);
		this.layerMove();
	}

	// 添加底图或者蒙层
	setBaseImgUrl(url = "", name = "", zIndex = 0) {
		if (!url || !name) return;

		const hasLayer = this.layerData.find(item => item.base64 === url);
		if (hasLayer) {
			return alert("蒙层已存在");
		}

		this.baseImgUrl = url;
		const image = document.createElement("img");
		image.src = url;
		image.style.zIndex = zIndex.toString();
		this.getResultImage.append(image);

		this.setLayerData({
			base64: url,
			name,
			zIndex: this.defaultIndex,
		});
	}
}

// 预览图片
class Mark extends Var {
	constructor() {
		super();
	}

	renderMark(url = "", display = "") {
		this.getPreImage.innerHTML = "";
		if (!url || !display) return;
		const image = document.createElement("img");
		image.src = url;
		this.getPreImage.append(image);
	}
}

// tabs
class Tabs extends Mark {
	tabActiveKey = "tabs-item--active";

	constructor() {
		super();
	}

	// render
	render() {
		for (let i = 0; i < this.tabsData.length; i++) {
			const item = this.tabsData[i];
			const div = document.createElement("div");
			div.innerHTML = `<div class="tabs-item" data-base="${item.base64}" data-name="${item.name}">${item.name}</div>`;
			this.getContainerLeft.append(div);
		}
	}

	clearActive(removeClass = "") {
		if (!removeClass) return;
		for (let i = 0; i < this.getTabsItems.length; i++) {
			this.getTabsItems[i].classList.remove(removeClass);
		}
	}

	hoverTabItem() {
		const _this = this;
		for (let i = 0; i < this.getTabsItems.length; i++) {
			this.getTabsItems[i].addEventListener("mouseover", function () {
				const url = this.getAttribute("data-base");
				_this.renderMark(url, "block");
			});

			this.getTabsItems[i].addEventListener("click", function () {
				const url = this.getAttribute("data-base");
				const name = this.getAttribute("data-name");
				_this.clearActive(_this.tabActiveKey);
				this.classList.add(_this.tabActiveKey);
				if (!_this.baseImgUrl) return;
				_this.defaultIndex++;
				_this.setBaseImgUrl(url, name, _this.defaultIndex);
			});
		}
	}
}

class Handler extends Tabs {
	constructor() {
		super();
		this.upFileDirs();
		this.setBg();
		this.downTestZip();
		this.downImage();
	}

	upFileDirs() {
		const _this = this;
		_this.getUpFileBtn.addEventListener("change", async function (e) {
			const files = e.target.files;
			const tempFiles = [];

			for (let file of files) {
				tempFiles.push({
					lastModified: file.lastModified,
					lastModifiedDate: file.lastModifiedDate,
					name: file.name,
					size: file.size,
					type: file.type,
					webkitRelativePath: file.webkitRelativePath,
					base64: await _this.base64(file),
				});
			}
			_this.setTabsData(tempFiles);
			_this.render();
			_this.hoverTabItem();
		});
	}

	setBg() {
		const _this = this;

		this.getSetBtn.addEventListener("click", function () {
			if (_this.getTabsItems.length === 0) {
				return alert("请先上传目录");
			}

			if (_this.baseImgUrl) {
				return alert("已经添加过底图了");
			}

			for (let i = 0; i < _this.getTabsItems.length; i++) {
				const url = _this.getTabsItems[i].getAttribute("data-base");
				const name = _this.getTabsItems[i].getAttribute("data-name");
				const hasActive =
					_this.getTabsItems[i].className.indexOf(_this.tabActiveKey) === -1;
				if (hasActive) continue;
				_this.setBaseImgUrl(url, name, _this.defaultIndex);
			}
		});
	}

	downTestZip() {
		const _this = this;
		this.getDownDirBtn.addEventListener("click", function () {
			_this.downFile(_this.testZipUrl, "测试用图.zip");
		});
	}

	downImage() {
		const _this = this;
		this.getDownImageBtn.addEventListener("click", function () {
			if (_this.getResultImage.children.length === 0) {
				return alert(
					"请先下载测试目录，上传目录，设置底图和图层，最后进行下载!"
				);
			}
			html2canvas(_this.getResultImage).then(canvas => {
				const url = canvas.toDataURL("image/jpeg", 1);
				_this.downFile(url, "效果图.png");
			});
		});
	}
}

const {} = new Handler();
