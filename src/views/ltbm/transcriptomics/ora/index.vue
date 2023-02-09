<template>
	<div id="LtbmORA" class="LtbmORA">
		<div class="h-12 md:h-16"></div>
		<div class="pageTitle">{{ $t(`ltbm_title.deg`) }} (ORA)</div>
		<div class="DegAnalysis">
			<div class="theTable"><DegSelTable></DegSelTable></div>
			<div class="theOptions"><DegOptions></DegOptions></div>
			<div class="theUmapPlot"><UmapPlot analysis="ora"></UmapPlot></div>
		</div>
		<hr class="dividingLine" />
		<div class="DegStatistics">
			<div class="statisticsTitle">
				<h2 class="pageTitle">{{ $t(`ltbm_dega.statisticalTitle`) }}</h2>
				<div class="pl-3">
					<a-select
						v-model:value="dataPromise.lfcPadj"
						:options="lfcPadjList"
						style="width: 10rem"
					></a-select>
				</div>
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
import { SelectProps } from 'ant-design-vue'
import { getHtmRes, getStkRes } from '@/api/degRes'

const oraParamStore = useDegParamStore()
// @ts-ignore
oraParamStore.setDegParam({ analyse: 'ora', model: 'M1', full: true, gender: 'a', groups: [] })

// ora 可选参数下拉
const lfcPadjList = ref<SelectProps['options']>([
	{
		label: 'Log2FoldChange 1',
		options: [
			{ label: 'LogFC1 padj0.05', value: '1-5' },
			{ label: 'LogFC1 padj0.01', value: '1-1' },
		],
	},
	{
		label: 'Log2FoldChange 2',
		options: [
			{ label: 'LFC2 padj0.05', value: '2-5' },
			{ label: 'LFC2 padj0.01', value: '2-1' },
		],
	},
])
// Ora Deg statistics 结果获取 子组件需要的数据
interface dataPromiseType {
	titlePrefix: string
	getStkData?: Promise<any>
	getHtmData?: Promise<any>
	lfcPadj: string
}

const dataPromise = reactive<dataPromiseType>({
	titlePrefix:
		oraParamStore.degParams.model +
		(oraParamStore.degParams.full ? 'T' : 'F') +
		oraParamStore.degParams.gender,
	lfcPadj: '1-1',
})
provide('dataPromise', dataPromise)

function renewData() {
	const modelType =
		oraParamStore.degParams.model +
		(oraParamStore.degParams.full ? 'T' : 'F') +
		oraParamStore.degParams.gender
	dataPromise.getHtmData = getHtmRes({
		analyse: 'ora',
		model_type: modelType,
		lfc_threshold: parseFloat(dataPromise.lfcPadj.split('-')[0]),
		padj_threshold: parseFloat(dataPromise.lfcPadj.split('-')[1]) / 100,
	})
	dataPromise.getStkData = getStkRes({
		analyse: 'ora',
		model_type: modelType,
		lfc_threshold: parseFloat(dataPromise.lfcPadj.split('-')[0]),
		padj_threshold: parseFloat(dataPromise.lfcPadj.split('-')[1]) / 100,
	})
}

renewData()
watch(
	() => dataPromise.lfcPadj,
	() => {
		renewData()
	}
)
watch(
	() => oraParamStore.degParams,
	() => {
		renewData()
	}
)
</script>

<style scoped lang="less">
.LtbmORA {
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
