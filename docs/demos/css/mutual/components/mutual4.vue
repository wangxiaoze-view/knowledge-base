<script setup lang="ts">
import { ref } from "vue";
const image = ref(new URL(`../images/test.png`, import.meta.url).href);

const shadow = ref("");

const handlerResult = () => {
	const _image = new Image();
	_image.src = image.value;
	_image.crossOrigin = "anonymous";
	_image.onload = () => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		canvas.width = _image.width;
		canvas.height = _image.height;
		ctx.drawImage(_image, 0, 0);
		const { data, width, height } = ctx.getImageData(
			0,
			0,
			_image.width,
			_image.height
		);
		shadow.value = renderShadow(data, width, height);
	};
};

const renderShadow = (
	data: Uint8ClampedArray,
	width: number,
	height: number
) => {
	const w = 1;
	let shadow: string[] = [];
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			const d = (width * i + j) * 4;
			var r = data[0 + d];
			var g = data[1 + d];
			var b = data[2 + d];
			var a = data[3 + d];
			const color = `rgba(${r}, ${g}, ${b}, ${a === 255 ? 1 : a})`;
			shadow.push(`${j + w}px ${i * w}px ${color}`);
		}
	}
	return shadow.join(",");
};
</script>

<template>
	<div class="container">
		<img :src="image" alt="image" crossorigin="anonymous" />
		<button @click="handlerResult">将左侧图片转换</button>

		<div class="result">
			<div class="empty" v-if="!shadow">点击按钮进行转换</div>

			<div v-else></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
	display: flex;
	align-items: center;
	justify-content: space-around;
	img,
	.result {
		width: 100px;
		height: 100px;
		border-radius: 4px;
		border: 1px dashed #eee;
	}
	button {
		padding: 4px 8px;
		border-radius: 4px;
		border: 1px solid #ccc;
		cursor: pointer;
		background: #fff;
		&:hover {
			background: #eee;
		}
		&:active {
			background: #ddd;
		}
	}

	.result {
		.empty {
			width: 100%;
			height: 100%;
			font-size: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			text-decoration: underline;
		}

		div {
			width: 1px;
			height: 1px;
			box-shadow: v-bind(shadow);
		}
	}
}
</style>
