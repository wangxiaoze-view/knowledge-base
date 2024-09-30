<template>
	<div class="container">
		<p class="text">文字与图片交融</p>
	</div>
</template>

<style lang="scss" scoped>
.container {
	position: relative;
	width: inherit;
	height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
	.text {
		margin: 0;
		cursor: pointer;
		font-size: 40px;
		font-weight: bold;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: url("https://file.wangzevw.com/images/default_top_img.webp");
		color: transparent;
		background-size: cover;
		/* 背景以文字的形式裁剪 */
		-webkit-background-clip: text;
		background-clip: text;
	}
}
</style>
