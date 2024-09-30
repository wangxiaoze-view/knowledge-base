<script lang="ts" setup>
import "remote-components-lib/element/base.css";
// 这里用到了视频，需要加载视频的样式，如果没有视频就不需要加载了
import "remote-components-lib/element/xgplayer.css";
import "remote-components-lib/element/LazyImage/index.css";
import { EleLazyImage } from "remote-components-lib";
const mockImageList = [
	"https://file.anbangke.com/2024/08/01/jpeg/6255c96b-f9c8-4064-97a0-6dbf2fba6012.png",
	"https://file.anbangke.com/b92cdd9e-6d42-4df1-a133-89ec33d0647a_video_1722494577568.mp4",
	"https://file.anbangke.com/2024/08/01/jpeg/6ffb40f0-a419-481c-b1b3-9dc323ddb254.png",
	"https://file.anbangke.com/2024/08/01/jpeg/26054c90-07d6-4903-9ee3-5b4f494fcfa9.png",
];
</script>

<template>
	<div>
		<!-- 默认 -->
		<EleLazyImage
			:image="mockImageList"
			:is-lazy="true"
			:style="{ width: '80px', height: '80px' }"
			:limit="2"
		/>
		<br />

		<!-- 展示数字 -->
		<EleLazyImage
			:image="mockImageList"
			:is-lazy="true"
			:style="{ width: '80px', height: '80px' }"
			:limit="2"
			:exceedType="'number'"
		/>
		<br />

		<!-- 自定义插槽 -->
		<EleLazyImage
			:image="mockImageList"
			:is-lazy="true"
			:style="{ width: '80px', height: '80px' }"
			:limit="2"
		>
			<template #exceedType>🀄️</template>
		</EleLazyImage>
	</div>
</template>
