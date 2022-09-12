<template>
	<div id="HomePage" style="height: 880px">
		<HomeHeader></HomeHeader>
	</div>
	<a-button @click="toggleDark">123</a-button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
