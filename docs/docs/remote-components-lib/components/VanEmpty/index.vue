<script lang="ts" setup>
import "remote-components-lib/vant/base.css";
import { ReVantEmpty, RePlateIcon } from "remote-components-lib";
</script>

<template>
	<div>
		<ReVantEmpty description="页面不存在哦～">
			<template #image>
				<RePlateIcon icon="404" />
			</template>
			<template #default>
				<button>返回首页</button>
			</template>
		</ReVantEmpty>
	</div>
</template>
