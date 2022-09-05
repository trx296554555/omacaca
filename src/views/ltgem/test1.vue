<template>
	<div style="height: 300px; background-color: #535bf2">
		<div style="height: 100px">这是第一层</div>
		<div style="height: 100px">123</div>
		<div style="height: 100px">
			123
			<router-view v-slot="{ Component }">
				<keep-alive include="test2">
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</div>
		<a-button @click="toProjrct(change)">ttt</a-button>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const change = ref(true)
const toProjrct = (xxx) => {
	if (xxx) {
		router.push('/ltgem/introduction/inddd2')
	} else {
		router.push('/ltgem/introduction/inddd')
	}
	change.value = !change.value
}
</script>
