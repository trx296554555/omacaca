<template>
	<div style="height: 100px; background-color: #fff">
		这是第二层111 {{ num }} <a-button @click="num++">3</a-button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(0)
</script>

<style scoped></style>
