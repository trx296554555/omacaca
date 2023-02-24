<template>
	<div>
		<div class="PlotTitle">
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div :id="'vennPlot' + regulation"></div>
	</div>
</template>

<script setup lang="ts">
import { Venn } from '@antv/g2plot'
import { computed, inject, onMounted, provide, watch } from 'vue'
import { useThemeStoreWithOut } from '@/store/modules/theme'
import { plotObjType } from '#/g2plot'
import { useDegParamStore } from '@/store/modules/ltbmDegParam'

const props = defineProps({
	regulation: {
		type: String,
		default: 'up',
		required: true,
	},
})

const createVennPlot = (renderType) => {
	return new Venn('vennPlot' + props.regulation, {
		data: [],
		renderer: renderType,
		height: 200,
		setsField: 'sets',
		sizeField: 'size',
		legend: false,
		pointStyle: { fillOpacity: 0.85 },
		label: {
			style: {
				fontSize: 10,
			},
			formatter: (datum) => {
				return `${datum.size}`
			},
		},
	})
}

const dataPromise = inject('dataPromise') as any

const termDetailInfo = computed(() => dataPromise.ItemStore[dataPromise.ItemStoreInfo])
watch(
	() => termDetailInfo.value,
	() => {
		updateVennPlotData(plotObj.plot)
	}
)
async function updateVennPlotData(plot: any) {
	const data = [
		{
			sets: ['Query Size'],
			size: termDetailInfo.value.query_size,
			label: 'Query Size',
		},
		{
			sets: ['Term Size'],
			size: termDetailInfo.value.term_size,
			label: 'Term Size',
		},
		{
			sets: ['Query Size', 'Term Size'],
			size: termDetailInfo.value.intersection_size,
			label: 'Intersection Size',
		},
	]
	// const rawdata = (await getData) as any[]
	// let data: any[]
	// 此处为自定义的数据清理
	plot.changeData(data)
	plot.update({ theme: useThemeStoreWithOut().getTheme })
}

const plotObj: plotObjType = {
	plotName: 'VennPlot',
	createPlotMethod: createVennPlot,
	updateDataMethod: updateVennPlotData,
}

onMounted(() => {
	plotObj.plot = createVennPlot('canvas')
	updateVennPlotData(plotObj.plot)
})

// 以下在所有plot组件默认使用，用于保存PNG/SVG 以及暗黑主题适应
provide('plotObj', plotObj)
useThemeStoreWithOut().$subscribe((mutation, state) => {
	plotObj?.plot?.update({ theme: state.themeInfo.theme })
})
</script>

<style scoped></style>
