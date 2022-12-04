<template>
	<div>
		<div class="PlotTitle">
			<p>Umap Chart</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div id="testlinePlot"></div>
		<button @click="test1">123123</button>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch, provide, reactive } from 'vue'
import { Line, LineOptions } from '@antv/g2plot'
import { Chart } from '@antv/g2'
import { useThemeStoreWithOut } from '@/store/modules/theme'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { GroupType } from '@/store/modules/ltbmDegParam'
import { plotObjType } from '#/g2plot'

const data = [
	{ year: '1991', value: 3 },
	{ year: '1992', value: 4 },
	{ year: '1993', value: 3.5 },
	{ year: '1994', value: 5 },
	{ year: '1995', value: 4.9 },
	{ year: '1996', value: 6 },
	{ year: '1997', value: 7 },
	{ year: '1998', value: 9 },
	{ year: '1999', value: 13 },
]

const createUmapPlot = (renderType) => {
	return new Line('testlinePlot', {
		data: [],
		renderer: renderType,
		xField: 'year',
		yField: 'value',
		label: {},
		point: {
			size: 5,
			shape: 'diamond',
			style: {
				fill: 'white',
				stroke: '#5B8FF9',
				lineWidth: 2,
			},
		},
		tooltip: { showMarkers: false },
		state: {
			active: {
				style: {
					shadowBlur: 4,
					stroke: '#000',
					fill: 'red',
				},
			},
		},
		interactions: [{ type: 'marker-active' }],
	})
}

function updateUmapPlotData(plot: any) {
	plot.changeData(data)
	plot.update({ theme: useThemeStoreWithOut().getTheme })
}

const plotObj: plotObjType = {
	createPlotMethod: createUmapPlot,
	updateDataMethod: updateUmapPlotData,
}

onMounted(() => {
	plotObj.plot = createUmapPlot('canvas')
	updateUmapPlotData(plotObj.plot)
})

// 以下在所有plot组件默认使用，用于保存PNG/SVG 以及暗黑主题适应
provide('plotObj', plotObj)
useThemeStoreWithOut().$subscribe((mutation, state) => {
	plotObj?.plot?.update({ theme: state.themeInfo.theme })
})
</script>
