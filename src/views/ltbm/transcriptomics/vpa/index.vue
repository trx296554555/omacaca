<template>
	<div id="LtbmVPA" class="LtbmVPA">
		<div class="h-12 md:h-16"></div>
		<div class="pageTitle">{{ $t(`ltbm_title.vpa`) }}</div>

		<div class="VpaAnalysis">
			<div class="theViolinPlot"><VpaViolinPlot></VpaViolinPlot></div>
			<div class="theResTable"></div>
			<div class="expResGroupBy"></div>
		</div>

		<div style="height: 5rem"></div>
	</div>
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'
import { getHtmRes, getStkRes } from '@/api/degRes'
import { getVpaRes } from '@/api/geneSetRes'
import VpaViolinPlot from '@/views/ltbm/components/VpaViolinPlot.vue'

interface dataPromiseType {
	getVpaData?: Promise<any>
	getGeneExpData?: Promise<any>
	selectedGene: string
}

const dataPromise = reactive<dataPromiseType>({
	selectedGene: '1-1',
})

provide('dataPromise', dataPromise)

dataPromise.getVpaData = getVpaRes({})

function renewData() {
	console.log('test')
}

renewData()
</script>

<style scoped lang="less">
.LtbmVPA {
	@apply Container;
}

.pageTitle {
	@apply text-2xl py-6;
}

.VpaAnalysis {
}

.theResTable {
}

.expResGroupBy {
}
</style>
