<script setup lang="ts">
type QueueDataType = (next: (values: number[]) => void) => void;
class Queue {
	private index: number = 0;
	constructor(private queue: QueueDataType[] = []) {}

	runTask() {
		const currentTask = this.queue[this.index];
		if (!currentTask) return;
		currentTask(this.nextTask);
	}
	nextTask(values: number[]) {
		if (this.index >= this.queue.length) return;
		Promise.resolve().then(() => {
			const el = document.createDocumentFragment();
			values.forEach((_, index) => {
				const div = document.createElement("div");
				div.textContent = index.toString();
				div.classList.add("data-item");
				el.appendChild(div);
			});
			document
				.querySelector(".data-container .content-container")
				?.appendChild(el);
		});
		this.index++;
		const currentTask = this.queue[this.index];
		if (!currentTask) return;
		currentTask(this.nextTask);
	}
}
// 20w数据
const max = 20 * 10000;
// 每页1w条数据显示
const pageSize = 1000;
// 共x页
const total = Math.ceil(max / pageSize);
// 模拟生成的数据
const data = new Array(max).fill(0).map(() => {
	return next => {
		setTimeout(() => {
			next.call(queue, new Array(pageSize).fill(0));
		}, 0);
	};
});
const queue = new Queue(data);

const onClick = () => queue.runTask();
</script>

<template>
	<div class="data-container">
		<blockquote>模拟一次性创建20w条数据</blockquote>
		<el-button type="primary" @click="onClick">创建</el-button>
		<div class="content-container"></div>
	</div>
</template>

<style scoped lang="scss">
.data-container {
	height: 500px;
	overflow-y: auto;

	.content-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 10px;

		:deep(.data-item) {
			padding: 10px;
			height: 100px;
			border-radius: 4px;
			border: 1px solid #eee;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: cadetblue;
			color: #fff;
			font-size: 30px;
		}
	}
}
</style>
