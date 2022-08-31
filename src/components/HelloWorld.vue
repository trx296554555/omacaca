<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<button type="button" @click="count++">count is {{ count }}</button>
		<p>
			Edit
			<code>components/HelloWorld.vue</code> to test HMR
		</p>
	</div>

	<p>
		Check out
		<a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
		starter
	</p>
	<p>
		Install
		<a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
		in your IDE for a better DX
	</p>
	<p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{ msg: string }>()
// const a = { name: '123', aw: '123', qweqwe: 12412, '123': 123123 }
// const c = { name: '123', aw: '123', qweqwe: 12412, '123': 123123 }
// const d = { name: '123', aw: '123', qweqwe: 12412, '123': '786' }

function printUser(
	firstName: string,
	lastName: string,
	number: number,
	street: string,
	code: number,
	city: string,
	country: string
): void {
	console.log(`${firstName} ${lastName} lives at ${number}, ${street}, ${code} in ${city}, ${country}`)
}

printUser('John', 'Doe', 48, '998 Primrose Lane', 53718, 'Madison', 'United States of America')

const count = ref(0)
</script>
<style scoped>
.read-the-docs {
	color: #888;
}
</style>
