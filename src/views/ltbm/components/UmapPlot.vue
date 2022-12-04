<template>
	<div>
		<div class="PlotTitle">
			<p>Umap Chart</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div id="umapPlot"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch, provide, reactive } from 'vue'

import { useThemeStoreWithOut } from '@/store/modules/theme'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { useDegParamStore } from '@/store/modules/ltbmDegParam'
import { Scatter } from '@antv/g2plot'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { plotObjType } from '#/g2plot'
import { getUmapInfoList } from '@/api/metainfo'

const degParamStore = useDegParamStore()

const createUmapPlot = (renderType) => {
	return new Scatter('umapPlot', {
		data: [],
		renderer: renderType,
		height: 450,
		appendPadding: 15,
		xField: 'm1_umap_dimension_1',
		yField: 'm1_umap_dimension_2',
		shapeField: 'sex',
		colorField: 'stage',
		size: 4,
		tooltip: {
			enterable: true,
			fields: [
				'sample_iD',
				'sampling_time',
				'age',
				'sex',
				'breeding_condition',
				'envs',
				'envs_info',
				'diet',
				'state',
				'state_info',
			],
		},
		brush: {
			enabled: true,
			mask: {
				style: {
					fill: 'rgba(255,0,0,0.15)',
				},
			},
		},
		yAxis: {
			nice: true,
			max: 4,
			title: {
				text: 'UMAP dimension 2',
			},
			grid: {
				line: {
					style: {
						stroke: '#eee',
					},
				},
			},
		},
		xAxis: {
			title: {
				text: 'UMAP dimension 1',
			},
			grid: {
				line: {
					style: {
						stroke: '#eee',
					},
				},
			},
		},
		shape: ({ sex }) => {
			if (sex === 'Male') {
				return 'circle'
			}
			return 'square'
		},
		interactions: [{ type: 'legend-highlight' }],
		annotations: [],
	})
}

async function updateUmapPlotData(plot: any) {
	const getData = new Promise((resolve, reject) => {
		getUmapInfoList({ lang: useLocaleStoreWithOut().getLocale })
			.then((res) => {
				resolve(res.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
	const rawdata = (await getData) as any[]
	let data: any[]
	// 此处为自定义的数据清理
	if (degParamStore.degParams.model === 'M4') {
		data = rawdata.filter((item: any) => {
			return item.m4_umap_dimension_1 !== null
		})
	} else {
		data = rawdata.filter((item: any) => {
			return item.m4_umap_dimension_1 !== null && item.stage !== 'MCR' && item.stage !== 'OCR'
		})
	}
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

watch(
	() => degParamStore.degParams.model,
	(newV, oldV) => {
		plotObj.updateDataMethod(plotObj.plot)
		if (newV === 'M1' || newV === 'M2') {
			plotObj.plot?.update({
				colorField: 'stage',
				xField: 'm1_umap_dimension_1',
				yField: 'm1_umap_dimension_2',
			})
		} else if (newV === 'M3') {
			plotObj.plot?.update({
				colorField: 'breeding_condition',
				xField: 'm1_umap_dimension_1',
				yField: 'm1_umap_dimension_2',
			})
		} else {
			plotObj.plot?.update({
				colorField: 'stage',
				xField: 'm4_umap_dimension_1',
				yField: 'm4_umap_dimension_2',
			})
		}
	}
)
useLocaleStoreWithOut().$subscribe((mutation, state) => {
	plotObj.updateDataMethod(plotObj.plot)
})

// 以下在所有plot组件默认使用，用于保存PNG/SVG 以及暗黑主题适应
provide('plotObj', plotObj)
useThemeStoreWithOut().$subscribe((mutation, state) => {
	plotObj?.plot?.update({ theme: state.themeInfo.theme })
})
</script>
