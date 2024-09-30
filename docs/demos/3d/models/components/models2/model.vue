<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene } = await useGLTF(
	`https://file.wangzevw.com/3d/models/02/scene.gltf`,
	{
		draco: true,
	}
);
</script>

<template>
	<primitive :object="scene" />
</template>
