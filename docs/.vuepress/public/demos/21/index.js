const container = document.querySelector(".container");
container.addEventListener("mousemove", e => {
	// 边界判断, 50 是为了避免鼠标移到边界时，超出容器 正好是球的宽度和高度
	const w = document.documentElement.clientWidth - 50;
	const h = document.documentElement.clientHeight - 50;

	container.style.setProperty("--x", `${e.pageX >= w ? w : e.pageX}px`);
	container.style.setProperty("--y", `${e.pageY >= h ? h : e.pageY}px`);
});
