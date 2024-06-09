const covers = document.querySelectorAll(".cover");

for (let i = 0; i < covers.length; i++) {
	// 初始化定位, 序章在最上层
	covers[i].style.zIndex = covers.length - i;

	covers[i].addEventListener("click", function () {
		this.classList.toggle("active");

		// 每次点击切换动画
		if (this.classList.contains("active")) {
			this.style.transform = "perspective(1000px) rotateY(-180deg)";
			this.style.zIndex = i;
		} else {
			this.style.transform = "perspective(1000px) rotateY(0deg)";
			this.style.zIndex = covers.length - i;
		}
	});
}
