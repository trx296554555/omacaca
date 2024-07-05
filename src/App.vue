<template>
	<a-config-provider>
		<RouterView />
		<FooterFix></FooterFix>
	</a-config-provider>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'

ConfigProvider.config({
	theme: {
		// primaryColor: '#5dbe8a',
	},
})
</script>
