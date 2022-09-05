<template>
	<div>123</div>
	<!--	<div>{{ $t('qqq') }}</div>-->
	<div>{{ $t('app.searchNotData') }}</div>
	<button @click="changeLocale('zh_CN')">change</button>
	<button @click="changeLocale('en')">changeen</button>

	<p>{{ $t('app.searchNotData') }}</p>
	<div>{{ $t('dajiajihuaPpd') }}</div>
	法国红酒
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/locales/useLocale'

// const mySum: (x: number, y: number) => number = function (x: number, y: number): number {
// 	return x + y
// }
// console.log(mySum(1, 2))
// const { t } = useI18n()
//
// const title = t('qqq')
//
// console.log(title)

const { changeLocale } = useLocale()
</script>
