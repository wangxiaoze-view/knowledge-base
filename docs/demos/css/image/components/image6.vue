<script setup lang="ts">
import { onMounted, ref } from "vue";
import ColorThief from "colorthief";

const colorThief = new ColorThief();
const hoverIndex = ref(-1);
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

const onMouseEnter = (e: MouseEvent, index: number) => {
	hoverIndex.value = index;
	const img = e.target as HTMLImageElement;
	let colors = colorThief.getPalette(img, 3);
	colors = colors.map((i: number) => `rgb(${i[0]}, ${i[1]}, ${i[2]})`);
	getParent().style.setProperty("--color1", colors[0]);
	getParent().style.setProperty("--color2", colors[1]);
	getParent().style.setProperty("--color3", colors[2]);
};

const onMouseLeave = () => {
	hoverIndex.value = -1;
	getParent().style.setProperty("--color1", "#fff");
	getParent().style.setProperty("--color2", "#fff");
	getParent().style.setProperty("--color3", "#fff");
};
onMounted(initDelPad);
</script>

<template>
	<div class="image-6" @mouseleave="onMouseLeave">
		<div
			class="img-container"
			:class="[hoverIndex === index ? 'hover' : '']"
			v-for="(img, index) in images"
			:key="index"
		>
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
	background: linear-gradient(
		90deg,
		var(--color1),
		var(--color2),
		var(--color3)
	);
	background-position: center;
	img {
		border-radius: 6px;
	}
}
</style>

<style lang="scss">
.del-pad {
	padding: 0 !important;
}
</style>
