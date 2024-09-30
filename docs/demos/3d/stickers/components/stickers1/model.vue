<script setup lang="ts">
import { ref } from "vue";

import { useTexture } from "@tresjs/core";

defineOptions({
	name: "texture_01",
});
const pbrTexture = await useTexture({
	map: `https://file.wangzevw.com/3d/stickers/01/Rock050_1K-JPG_Color.jpg`,
	displacementMap: `https://file.wangzevw.com/3d/stickers/01/Rock050_1K-JPG_Displacement.jpg`,
	roughnessMap: `https://file.wangzevw.com/3d/stickers/01/Rock050_1K-JPG_Roughness.jpg`,
	normalMap: `https://file.wangzevw.com/3d/stickers/01/Rock050_1K-JPG_NormalGL.jpg`,
	ambientOcclusion: `https://file.wangzevw.com/3d/stickers/01/Rock050_1K-JPG_AmbientOcclusion.jpg`,
});

const sphereRef = ref(null);
</script>

<template>
	<TresMesh ref="sphereRef" cast-shadow>
		<TresSphereGeometry :args="[1, 100, 100]" />
		<TresMeshStandardMaterial v-bind="pbrTexture" :displacement-scale="0.2" />
	</TresMesh>
</template>
