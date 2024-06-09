class MyElement extends HTMLElement {
	constructor() {
		super();
	}

	static get observedAttributes() {
		return ["data-text"];
	}

	// 自定义元素添加至页面
	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });

		const box = document.createElement("div");
		box.setAttribute("class", "box");

		const span = document.createElement("span");
		span.setAttribute("class", "span");
		span.textContent = "hover 显示";

		const info = document.createElement("div");
		info.setAttribute("class", "info");
		const text = this.getAttribute("data-text");
		info.textContent = text;

		const style = document.createElement("style");
		style.textContent = `
      .box {
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .span {
        padding: 6px 20px;
        border-radius: 6px;
        color: #409eff;
        text-shadow: 10px 4px 30px red;
      }

      .info {
        font-size: 12px;
        width: 260px;
        display: inline-block;
        border: 1px solid #eee;
        padding: 10px;
        background: white;
        border-radius: 4px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        top: 20px;
        left: 50%;
        z-index: 3;
        transform: translateX(-50%);
      }

      .span:hover + .info {
        opacity: 1;
      }
    `;

		shadow.appendChild(style);
		box.append(span, info);
		shadow.appendChild(box);
	}

	// 自定义元素从页面中移除
	disconnectedCallback() {}

	// 自定义元素移动至新页面
	adoptedCallback() {}

	// 响应属性变化
	attributeChangedCallback(name, oldValue, newValue) {
		const shadow = this.shadowRoot;
		shadow && (shadow.querySelector(".info").textContent = newValue);
	}
}
window.customElements.define("my-element", MyElement);
