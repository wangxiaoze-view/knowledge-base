<script lang="ts" setup>
import "remote-components-lib/element/base.css";
import "remote-components-lib/element/AmountText/index.css";
import { EleAmountText } from "remote-components-lib";

import { ref } from "vue";

const cost = ref(100);
</script>

<template>
	<div>
		<EleAmountText :cost="cost" :format="2" color="red" />
	</div>
</template>
