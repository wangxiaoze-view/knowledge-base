<script setup lang="ts">
import "remote-components-lib/element/xgplayer.css";
import { ElePreviewVideo } from "remote-components-lib";
import { ref } from "vue";

const videoRef = ref<InstanceType<typeof ElePreviewVideo>>();

const toVideo = () => {
	videoRef.value?.setVisible(true, {
		url: "https://file.anbangke.com/b92cdd9e-6d42-4df1-a133-89ec33d0647a_video_1722494577568.mp4",
	});
};
</script>

<template>
	<div>
		<button @click="toVideo">查看视频</button>
		<ElePreviewVideo ref="videoRef" width="640px" height="360px" />
	</div>
</template>
