<template>
	<a-button ref="themeToDefault" @click="buttonMe">Reset local Setting</a-button>
	<router-link to="/main-out/test">test</router-link>
</template>

<script setup lang="ts">
// 长按后回调的函数，要执行的操作
import { message } from 'ant-design-vue/lib/components.js'
import { onLongPress } from '@vueuse/core'
import { ref } from 'vue'

const onLongPressCallback = (e: PointerEvent) => {
	localStorage.clear()
	location.reload()
}
function buttonMe() {
	message.info('Hold two seconds to reset all settings', 3)
}
// 绑定组件
const themeToDefault = ref<HTMLElement | null>(null)
// 注册长按方法
onLongPress(themeToDefault, onLongPressCallback, { delay: 2000, modifiers: { prevent: true } })
</script>

<style scoped></style>
