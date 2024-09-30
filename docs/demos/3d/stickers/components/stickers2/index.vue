<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls, vLightHelper } from "@tresjs/cientos";
import model from "./model.vue";
</script>

<template>
	<div class="container">
		<TresCanvas
			shadows
			clear-color="#82DBC5"
			preset="realistic"
			alpha
			power-preference="high-performance"
		>
			<OrbitControls />
			<TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
			<Suspense>
				<model />
			</Suspense>
			<TresDirectionalLight
				:intensity="1"
				:position="[0, 3, 3]"
				v-light-helper
			/>
		</TresCanvas>
	</div>
</template>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
