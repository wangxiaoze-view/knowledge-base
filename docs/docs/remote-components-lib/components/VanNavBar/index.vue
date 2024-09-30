<script lang="ts" setup>
import "remote-components-lib/vant/base.css";
import { ReVantNavBar } from "remote-components-lib";
import { ref } from "vue";

const title = ref("");
const onClickLeft = () => {
	title.value = "left";
};

const onClickRight = () => {
	title.value = "right";
};
</script>

<template>
	<div>
		<ReVantNavBar
			bgColor="#eee"
			:title="title"
			@click-left="onClickLeft"
			@click-right="onClickRight"
		>
			<template #left>返回</template>
			<template #right>历史记录</template>
		</ReVantNavBar>
	</div>
</template>
