<template>
	<div class="h-full w-full flex flex-col justify-center items-center text-4xl">
		<div class="text-black bg-primary dark:bg-dark dark:text-gray-100">位于主框架外的页面</div>
		<router-link to="/home">
			<a-button class="mt-10" type="primary">Back</a-button>
		</router-link>
	</div>
	<div style="height: 500px">
		<RouterView />
	</div>
</template>
<script setup lang="ts"></script>

<style lang="less"></style>
