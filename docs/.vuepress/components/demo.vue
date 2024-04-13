<template>
	<p @click="clickColor">{{ msg }}</p>
</template>

<script>
export default {
	data() {
		return {
			msg: "123",
		};
	},
	methods: {
		clickColor() {
			console.log(123);
		},
	},
};
</script>
