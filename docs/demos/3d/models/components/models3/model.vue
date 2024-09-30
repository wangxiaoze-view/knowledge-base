<script setup lang="ts">
import { ref } from "vue";
import { useGLTF, useAnimations } from "@tresjs/cientos";
const { scene, animations } = await useGLTF(
	`https://file.wangzevw.com/3d/models/03/scene.gltf`,
	{ draco: true }
);
const { actions } = useAnimations(animations, scene);
const currentAction = ref(actions.ArmatureAction);

currentAction.value.play();
</script>

<template>
	<primitive :object="scene" />
</template>
