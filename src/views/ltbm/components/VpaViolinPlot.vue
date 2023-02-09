<template>
	<div>
		<div class="PlotTitle">
			<p>Violin Plot</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div id="violinPlot"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch, provide, reactive, inject } from 'vue'

import { useThemeStoreWithOut } from '@/store/modules/theme'
import { Violin } from '@antv/g2plot'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { plotObjType } from '#/g2plot'

const dataPromise = inject('dataPromise') as any
const createViolinPlot = (renderType) => {
	return new Violin('violinPlot', {
		data: [],
		renderer: renderType,
		height: 470,
		xField: 'x',
		yField: 'y',
		appendPadding: 15,
		shape: 'hollow-smooth',
		kde: {
			min: 0.0,
			width: 3,
		},
		xAxis: {
			nice: true,
			label: {
				autoRotate: true,
			},
		},
		yAxis: {
			nice: true,
			label: {
				offset: 1.5,
				autoRotate: true,
			},
		},
		legend: {
			layout: 'vertical',
			position: 'right',
		},
		meta: {
			high: {
				alias: 'max',
				formatter: (v) => `${v.toFixed(2)} %`,
			},
			low: {
				alias: 'min',
				formatter: (v) => `${v.toFixed(2)} %`,
			},
			q1: {
				alias: 'q1',
				formatter: (v) => `${v.toFixed(2)} %`,
			},
			q3: {
				alias: 'q3',
				formatter: (v) => `${v.toFixed(2)} %`,
			},
			median: {
				alias: 'median',
				formatter: (v) => `${parseFloat(v).toFixed(2)} %`,
			},
		},
		tooltip: {
			fields: ['high', 'q1', 'q3', 'low', 'median'],
		},
	})
}

async function updateViolinPlotData(plot: any) {
	const getData = new Promise((resolve, reject) => {
		dataPromise.getVpaData
			.then((res) => {
				resolve(res.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
	const rawdata = (await getData) as any[]
	// 此处为自定义的数据清理
	// 遍历数据，将数据中的除了gene_id_ENSG字段，整理为新的字典，原key为x，value为y
	const data = [] as any[]
	rawdata.forEach((item, index) => {
		for (const key in item) {
			if (key !== 'gene_id_ENSG') {
				data.push({
					x: key,
					y: item[key],
				})
			}
		}
	})
	plot.changeData(data)
	plot.update({
		theme: useThemeStoreWithOut().getTheme,
	})
}

const plotObj: plotObjType = {
	plotName: 'ViolinPlot',
	createPlotMethod: createViolinPlot,
	updateDataMethod: updateViolinPlotData,
}

onMounted(() => {
	plotObj.plot = createViolinPlot('canvas')
	updateViolinPlotData(plotObj.plot)
})

watch(
	() => dataPromise.lfcPadj,
	(newV, oldV) => {
		plotObj.updateDataMethod(plotObj.plot)
	}
)

// 以下在所有plot组件默认使用，用于保存PNG/SVG 以及暗黑主题适应
provide('plotObj', plotObj)
useThemeStoreWithOut().$subscribe((mutation, state) => {
	plotObj?.plot?.update({ theme: state.themeInfo.theme })
})
</script>
