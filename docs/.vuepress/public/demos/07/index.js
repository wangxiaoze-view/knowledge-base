const menuClose = utils.getDom(".menu-close");

const container = utils.getDom(".page-container");

const circle3 = utils.getDom(".circl-3");

const body = utils.getDom("body");

menuClose.addEventListener("click", function () {
	const type = this.getAttribute("data-close");

	const flag = type === "true";

	container.style.transform = `rotate(${flag ? -20 : 0}deg)`;

	body.className = flag ? "show-nav" : "hide-nav";

	circle3.style.animation = `${
		flag ? "left-right .5s ease-in" : "left-right2 .5s ease-in"
	}`;
	circle3.style.left = flag ? 0 : "50%";
	circle3.style.transform = `translateX(${flag ? 0 : "-50%"})`;

	this.setAttribute("data-close", type === "true" ? "false" : "true");
});
