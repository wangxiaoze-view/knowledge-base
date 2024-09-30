<script setup>
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
</script>

<template>
	<div class="demo-container">
		<TresCanvas shadows clear-color="#82DBC5" preset="realistic" alpha>
			<OrbitControls />
			<TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
			<TresMesh>
				<TresTorusGeometry :args="[1, 0.5, 16, 32]" />
				<TresMeshBasicMaterial color="orange" />
			</TresMesh>
			<TresAmbientLight :intensity="1" />
		</TresCanvas>
	</div>
</template>

<style lang="scss" scoped>
.demo-container {
	width: 100%;
	height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
