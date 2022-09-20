<template>
	<div>123</div>
	<button @click="changeLocale('zh_CN')">change</button>
	<button @click="changeLocale('en')">changeen</button>

	<div>这是Home 目录</div>
	<div>{{ num }}</div>
	<a-button type="primary" @click="num++">Home-test</a-button>

	<a-button class="test" type="warning" @click="tmp(num)">Home-console</a-button>

	<div class="test">123 123</div>

	<a-button type="primary" class="bg-blue-400">Home-console</a-button>

	<a-button type="primary" @click="info">Display normal message</a-button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/locales/useLocale'
import { ref, reactive } from 'vue'
import { glob } from '@/tools/env'
import { apiDemoList } from '@/api/degres'
import { message } from 'ant-design-vue'

const num = ref(0)
function test(x: number) {
	console.log('cheshi wancheng !' + num.value)
}
console.log(glob)
const state = reactive({ count: 0 })
const get1 = apiDemoList({
	model: 'M1',
	isFull: 'T',
	gender: 'a',
	lfcp: '1-1',
})
console.log(get1)
const t1 = false
const t2 = true

const info = () => {
	message.info('This is a normal message', 60)
}

const { changeLocale } = useLocale()
</script>

<style>
.test {
	@apply rounded-md;
}
</style>
