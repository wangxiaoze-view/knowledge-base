<script setup lang="ts">
import "remote-components-lib/element/base.css";
import { ElePreviewImage } from "remote-components-lib";
import { ref } from "vue";

const initImg = "https://file.wangzevw.com/images/default_top_img_5.jpeg";

const previewImageRef = ref<InstanceType<typeof ElePreviewImage>>();
const onPreview = () => {
	previewImageRef.value?.reviewImages(true, {
		urlList: [initImg],
		initIndex: 0,
	});
};
</script>

<template>
	<div>
		<img :src="initImg" width="100" height="100" alt="" @click="onPreview" />
		<ElePreviewImage ref="previewImageRef" />
	</div>
</template>
