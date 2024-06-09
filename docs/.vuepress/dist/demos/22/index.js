let balData = [];

// 最大限制小球的生成数
const maxBal = 10;

// 最大限制小球x/y移动的距离
const max_m_x = 10;
const max_m_y = 10;

const w = document.documentElement.clientWidth;
const h = document.documentElement.clientHeight;

for (let i = 0; i < maxBal; i++) {
	const bal = document.createElement("div");
	bal.classList.add("bal");
	let w_h = Math.random() * 50 + 10;
	bal.style.width = `${w_h}px`;
	bal.style.height = `${w_h}px`;

	bal.style.transform = `translate(${Math.random() * 100}}px, ${
		Math.random() * 100
	}}px)`;

	document.body.appendChild(bal);

	balData.push({
		el: bal,
		x: Math.random() * w,
		y: Math.random() * h,
		w: w_h,
		h: w_h,
		m_x: Math.random() * max_m_x + 1,
		m_y: Math.random() * max_m_y + 1,
	});
}

function move() {
	for (let i = 0; i < balData.length; i++) {
		let bal = balData[i];

		const bal_container = document.querySelectorAll(".bal")[i];

		const off_w = bal_container.offsetWidth;
		const off_h = bal_container.offsetHeight;

		bal.x += bal.m_x;
		bal.y += bal.m_y;

		if (bal.x < 0) {
			bal.m_x *= -1;
			bal.x = 0;
		} else if (bal.x >= w - off_w) {
			bal.m_x *= -1;
			bal.x = w - off_w;
		} else if (bal.y < 0) {
			bal.m_y *= -1;
			bal.y = 0;
		} else if (bal.y >= h - off_h) {
			bal.m_y *= -1;
			bal.y = h - off_h;
		}
		bal.el.style.transform = `translate(${bal.x}px, ${bal.y}px)`;
		bal.el.style.backgroundColor = `hsl(${bal.x}, 100%, 50%)`;
	}
	requestAnimationFrame(move);
}

move();
