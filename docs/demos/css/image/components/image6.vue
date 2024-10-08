<script setup lang="ts">
import { onMounted, ref } from "vue";
import ColorThief from "colorthief";

const colorThief = new ColorThief();
const images: string[] = [];
for (let i = 0; i < 4; i++) {
	images.push(`https://picsum.photos/800/800?random=${i}`);
}

const getParent = () => {
	return document.querySelector(".image-6") as HTMLDivElement;
};
const initDelPad = () => {
	getParent()?.parentElement?.classList.add("del-pad");
};

const getAllImages = () => {
	return document.querySelectorAll(
		".img-container img"
	) as NodeListOf<HTMLImageElement>;
};

const setOpacity = (target: HTMLImageElement) => {
	getAllImages().forEach(item => {
		item.style.opacity = "0.4";
	});
	target.style.opacity = "1";
};

const onMouseEnter = (e: MouseEvent, index: number) => {
	const img = e.target as HTMLImageElement;
	let colors = colorThief.getPalette(img, 3);
	colors = colors.map((i: number) => `rgb(${i[0]}, ${i[1]}, ${i[2]})`);
	getParent().style.setProperty("--color1", colors[0]);
	getParent().style.setProperty("--color2", colors[1]);
	getParent().style.setProperty("--color3", colors[2]);
	setOpacity(img);
};

const onMouseLeave = () => {
	getParent().style.setProperty("--color1", "#fff");
	getParent().style.setProperty("--color2", "#fff");
	getParent().style.setProperty("--color3", "#fff");
	getAllImages().forEach(item => {
		item.style.opacity = "1";
	});
};
onMounted(initDelPad);
</script>

<template>
	<div class="image-6" @mouseleave="onMouseLeave">
		<div class="img-container" v-for="(img, index) in images" :key="index">
			<img
				crossorigin="anonymous"
				:src="img"
				alt=""
				srcset=""
				@mouseenter="onMouseEnter($event, index)"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.image-6 {
	position: relative;
	padding: 30px;
	gap: 30px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);

	.img-container {
		&::before {
			content: "";
			position: absolute;
			inset: 0;
			background: linear-gradient(
				to right,
				var(--color1),
				var(--color2),
				var(--color3)
			);
			z-index: -1;
			opacity: 0;
			transition: all 0.7s;
		}
		&:hover::before {
			opacity: 1;
		}
	}
	img {
		border-radius: 6px;
		transition: all 0.3s;
		&:hover {
			cursor: pointer;
			transition: all 0.7s;
			transform: scale(1.06);
		}
	}
}
</style>

<style lang="scss">
.del-pad {
	padding: 0 !important;
}
</style>
