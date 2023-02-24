<template>
	<div id="LtbmVPA" class="LtbmVPA">
		<div class="h-12 md:h-16"></div>
		<h3 class="pageTitle">{{ $t(`ltbm_title.vpa`) }}</h3>

		<div class="VpaAnalysis">
			<div class="theViolinPlot"><VpaViolinPlot></VpaViolinPlot></div>
			<div class="theResTable"><VpaResTable></VpaResTable></div>
			<div class="itemInfo"><VpaResInfo></VpaResInfo></div>
		</div>

		<div style="height: 5rem"></div>
	</div>
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'
import { getVpaRes } from '@/api/geneSetRes'
import VpaViolinPlot from '@/views/ltbm/components/VpaViolinPlot.vue'
import VpaResTable from '@/views/ltbm/transcriptomics/vpa/VpaResTable.vue'
import VpaResInfo from '@/views/ltbm/transcriptomics/vpa/VpaResInfo.vue'

interface dataPromiseType {
	getVpaData?: Promise<any>
}

const dataPromise = reactive<dataPromiseType>({})

provide('dataPromise', dataPromise)

dataPromise.getVpaData = getVpaRes({})
</script>

<style scoped lang="less">
.LtbmVPA {
	@apply Container;
}
.VpaAnalysis {
}
.theResTable {
	@apply my-3;
}
.itemInfo {
}
</style>
