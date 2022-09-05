<template>123</template>
<script setup lang="ts">
import type { PropType } from 'vue'
const props = defineProps({
	foo: { type: String, required: true },
	bar: Number,
})
</script>
<style lang="less">
@prefix-cls: ~'@{app}-exception-page';

.@{prefix-cls} {
	display: flex;
	align-items: center;
	flex-direction: column;

	.ant-result-icon {
		img {
			max-width: 400px;
			max-height: 300px;
		}
	}
}
</style>
