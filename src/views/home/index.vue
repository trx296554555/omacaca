<template>
	<div id="HomePage" class="bg-white dark:bg-dark" style="height: 1880px">
		<HomeHeader></HomeHeader>
		<HomeCarousel></HomeCarousel>

		<a-button type="primary" @click="toggleTheme({ scopeName: 'theme-dark' })">dark</a-button>
		<a-button type="primary" @click="toggleTheme({ scopeName: 'theme-light' })">light</a-button>
		<a-button type="primary">Primary Button</a-button>
		<a-button class="trtr">Default</a-button>
		<a-button type="dashed">Dashed</a-button>
		<a-button type="text">Text</a-button>
		<a-button type="link">Link</a-button>

		<button class="tett">123</button>

		123 123 123
		<div>123 123 123 123</div>
	</div>
</template>

<script setup lang="ts">
import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils'
// toggleTheme({ scopeName: 'theme-dark' })
</script>
<style scoped lang="less">
.tett {
	background-color: @primary-color;
}
</style>
