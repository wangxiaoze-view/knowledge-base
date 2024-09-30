<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import { useGLTF } from "@tresjs/cientos";
import { useRenderLoop } from "@tresjs/core";

const sceneRef = ref();

const { scene } = await useGLTF(
	`https://file.wangzevw.com/3d/models/05/scene.gltf`,
	{ draco: true }
);

const { onLoop } = useRenderLoop();
onLoop(({ elapsed }) => {
	sceneRef.value.rotation.y = Math.sin(elapsed) * 0.5;
});
</script>

<template>
	<primitive :object="scene" ref="sceneRef"> </primitive>
</template>
