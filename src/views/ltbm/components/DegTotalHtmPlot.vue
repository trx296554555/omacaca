<template>
	<div>
		<div class="PlotTitle">
			<p>DEG Heatmap</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div id="degHeatmap"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch, provide, inject } from 'vue'

import { useDegParamStore } from '@/store/modules/ltbmDegParam'
import { useThemeStoreWithOut } from '@/store/modules/theme'
import { Heatmap } from '@antv/g2plot'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { plotObjType } from '#/g2plot'
import { router } from '@/router'

const dataPromise = inject('dataPromise') as any
const degParamStore = useDegParamStore()

const createHeatmapPlot = (renderType) => {
	return new Heatmap('degHeatmap', {
		data: [],
		renderer: renderType,
		height: 550,
		appendPadding: 15,
		xField: 'x',
		yField: 'y',
		sizeField: 'size',
		sizeRatio: 0.9,
		colorField: 'rate',
		shape: 'circle',
		color: '#219ebc-#fffacd-#f43b47',
		meta: {
			size: {
				type: 'linear',
				nice: true,
			},
			rate: {
				type: 'linear',
				nice: true,
			},
		},
		label: {
			content: ({ up, down }) => {
				return `${up}/${down}`
			},
			style: {
				fontSize: 10,
				fill: '#444',
				shadowBlur: 1,
				shadowColor: 'rgba(0, 0, 0, .45)',
			},
		},
		heatmapStyle: {
			// stroke: '#fff',
			// opacity: 0.8,
		},
		xAxis: {
			nice: true,
			position: 'top',
			line: {
				style: {
					stroke: '#000',
					opacity: 1,
				},
			},
			grid: {
				line: {
					style: {
						stroke: '#ddd',
						lineWidth: 1,
						lineDash: [3, 3],
					},
				},
			},
		},
		yAxis: {
			nice: true,
			position: 'left',
			line: {
				style: {
					stroke: '#000',
					opacity: 1,
				},
			},
			grid: {
				line: {
					style: {
						stroke: '#ddd',
						lineWidth: 1,
						lineDash: [3, 3],
					},
				},
			},
		},
		tooltip: {
			title: (title, datum) => {
				return `${datum.x}_VS_${datum.y}`
			},
			enterable: true,
			showMarkers: false,
			fields: ['size', 'up', 'down'],
		},
		legend: false,
		interactions: [
			{
				type: 'axis-label-highlight',
			},
			{
				type: 'element-highlight',
			},
		],
	})
}

async function updateHeatmapPlotData(plot: any) {
	const getData = new Promise((resolve, reject) => {
		dataPromise.getHtmData
			.then((res) => {
				resolve(res.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
	const rawData = (await getData) as any[]
	// 此处为自定义的数据清理

	// 在rawdata中真复制自身第一个元素，并修改其size为0
	// 用于heatmap中最小值覆盖显示
	const data = rawData
	data.push(Object.assign({}, data[0], {}))
	data[data.length - 1].size = 0
	plot.changeData(data)
	plot.update({
		theme: useThemeStoreWithOut().getTheme,
	})
	plot.off()
	plot.on('element:click', (ev) => {
		const circleElement = ev.target.get('element')
		const data = circleElement.getModel().data
		const { href } = router.resolve({
			path: '/ltbm/' + degParamStore.degParams.analyse + 'res',
			query: {
				model: degParamStore.degParams.model,
				isFull: degParamStore.degParams.full ? 'T' : 'F',
				gender: degParamStore.degParams.gender,
				g1: data.x,
				g2: data.y,
			},
		})
		window.open(href, '_blank')
	})
}
const plotObj: plotObjType = {
	plotName: 'Heatmap',
	createPlotMethod: createHeatmapPlot,
	updateDataMethod: updateHeatmapPlotData,
}

onMounted(() => {
	plotObj.plot = createHeatmapPlot('canvas')
	updateHeatmapPlotData(plotObj.plot)
})

watch(
	() => dataPromise.lfcPadj,
	() => {
		plotObj.updateDataMethod(plotObj.plot)
	}
)
watch(
	() => degParamStore.degParams,
	() => {
		plotObj.updateDataMethod(plotObj.plot)
	}
)

// 以下在所有plot组件默认使用，用于保存PNG/SVG 以及暗黑主题适应
provide('plotObj', plotObj)
useThemeStoreWithOut().$subscribe((mutation, state) => {
	plotObj?.plot?.update({ theme: state.themeInfo.theme })
})
</script>
