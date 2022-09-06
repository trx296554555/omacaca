<template>
	<div>这是Home 目录</div>
	<div>{{ num }}</div>
	<a-button type="primary" @click="num++">Home-test</a-button>

	<a-button type="warning" @click="test(num)">Home-console</a-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(0)
function test(x: number) {
	console.log('cheshi wancheng !' + num.value)
}
</script>
