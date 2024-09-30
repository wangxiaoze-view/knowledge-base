<template>
	<div class="container">颗粒, 文字 ！</div>
</template>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 50px;
	font-weight: bold;
	position: relative;
	&::before {
		content: "";
		display: block;
		position: absolute;
		inset: 0;
		background-image: linear-gradient(to right, #fff 1px, transparent 0);
		background-size: 4px 4px;
		backdrop-filter: blur(1px);
	}
}
</style>
