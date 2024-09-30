<script lang="ts" setup></script>

<template>
	<div class="container">
		<nav>
			<a href="#">首页</a>
			<a href="#">关于</a>
			<a href="#">联系</a>
		</nav>
		<p v-for="item in 10" :key="item">这是一个有趣的顶部菜单导航...</p>
	</div>
</template>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 200px;
	overflow-y: auto;
	nav {
		padding: 8px 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		position: sticky;
		top: 0;
		z-index: 10;
		background-image: radial-gradient(transparent 1px, #fff 1px);
		background-size: 6px 6px;
		backdrop-filter: blur(4px);
		a {
			display: block;
			padding: 0 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 40px;
		}
	}
}
</style>
