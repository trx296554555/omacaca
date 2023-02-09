<template>
	<div id="LtbmGSEA" class="LtbmGSEA">
		<div class="h-12 md:h-16"></div>
		<div class="pageTitle">{{ $t(`ltbm_title.gsea`) }} (GSEA)</div>
		<div class="DegAnalysis">
			<div class="theTable"><DegSelTable></DegSelTable></div>
			<div class="theOptions"><DegOptions></DegOptions></div>
			<div class="theUmapPlot"><UmapPlot analysis="gsea"></UmapPlot></div>
		</div>
		<hr class="dividingLine" />
		<div class="DegStatistics">
			<div class="statisticsTitle">
				<h2 class="pageTitle">{{ $t(`ltbm_dega.statisticalTitle`) }}</h2>
			</div>
			<div class="statisticsRes">
				<DegTotalHtmPlot class="md:col-span-1 col-span-2"></DegTotalHtmPlot>
				<DegTotalStkPlot class="md:col-span-1 col-span-2"></DegTotalStkPlot>
			</div>
		</div>
		<div style="height: 5rem"></div>
	</div>
</template>

<script setup lang="ts">
import DegSelTable from '../deg/DegSelTable.vue'
import DegOptions from '../deg/DegOptions.vue'
import DegTotalStkPlot from '../../components/DegTotalStkPlot.vue'
import DegTotalHtmPlot from '../../components/DegTotalHtmPlot.vue'

import UmapPlot from '../../components/UmapPlot.vue'
import { useDegParamStore } from '@/store/modules/ltbmDegParam'
import { provide, reactive, ref, watch } from 'vue'
import { getHtmRes, getStkRes } from '@/api/degRes'

const gseaParamStore = useDegParamStore()
// @ts-ignore
gseaParamStore.setDegParam({ analyse: 'gsea', model: 'M1', full: true, gender: 'a', groups: [] })

// Gsea Deg statistics 结果获取 子组件需要的数据
interface dataPromiseType {
	titlePrefix: string
	getStkData?: Promise<any>
	getHtmData?: Promise<any>
}

const dataPromise = reactive<dataPromiseType>({
	titlePrefix:
		gseaParamStore.degParams.model +
		(gseaParamStore.degParams.full ? 'T' : 'F') +
		gseaParamStore.degParams.gender,
})
provide('dataPromise', dataPromise)

function renewData() {
	const modelType =
		gseaParamStore.degParams.model +
		(gseaParamStore.degParams.full ? 'T' : 'F') +
		gseaParamStore.degParams.gender
	dataPromise.getHtmData = getHtmRes({
		analyse: 'gsea',
		model_type: modelType,
		lfc_threshold: 1,
		padj_threshold: 0.01,
	})
	dataPromise.getStkData = getStkRes({
		analyse: 'gsea',
		model_type: modelType,
		lfc_threshold: 1,
		padj_threshold: 0.01,
	})
}

renewData()
watch(
	() => gseaParamStore.degParams,
	() => {
		renewData()
	}
)
</script>

<style scoped lang="less">
.LtbmGSEA {
	@apply Container;
}
.pageTitle {
	@apply text-2xl py-6;
}
.DegAnalysis {
	@apply grid grid-rows-2 grid-cols-3 gap-6;
}
.theTable {
	@apply col-span-1 sm:col-span-3 row-span-1;
}
.theOptions {
	@apply col-span-2 sm:col-span-1 row-span-1;
}
.theUmapPlot {
	@apply col-span-3 sm:col-span-2 row-span-1;
}
.dividingLine {
	height: 1px;
	margin-top: 4rem;
	border: 0;
	background-image: linear-gradient(to left, @primary-color, @secondary-color);
}
.statisticsTitle {
	@apply flex justify-start items-center;
}
.statisticsRes {
	@apply grid grid-cols-2 gap-6;
}
</style>
