<template>
	<div>
		<div class="PlotTitle">
			<p>GS-MM Scatter Plot</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div id="scatterPlot"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch, provide, inject } from 'vue'

import { useThemeStoreWithOut } from '@/store/modules/theme'
import { Scatter } from '@antv/g2plot'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { plotObjType } from '#/g2plot'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'

const dataPromise = inject('dataPromise') as any

const createLinePlot = (renderType) => {
	return new Scatter('scatterPlot', {
		data: [],
		renderer: renderType,
		height: 470,
		appendPadding: 15,
		xField: '',
		yField: '',
		size: 3,
		brush: {
			enabled: true,
			mask: {
				style: {
					fill: 'rgba(255,0,0,0.15)',
				},
			},
		},
	})
}

async function updateLinePlotData(plot: any) {
	const getData = new Promise((resolve, reject) => {
		dataPromise.getGsMmData
			.then((res) => {
				resolve(res.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
	const rawdata = (await getData) as any
	// 此处为自定义的数据清理
	const data = rawdata

	plot.changeData(data)
	plot.update({
		xField: `mm_${geneSetParamStore.wgcna_module}`,
		yField: `gs_${geneSetParamStore.wgcna_trait}`,
		yAxis: {
			nice: true,
			title: {
				text: `Gene significance for ${geneSetParamStore.wgcna_trait}`,
			},
			line: {
				style: {
					stroke: '#ddd',
					lineWidth: 1,
				},
			},
			tickLine: {
				style: {
					stroke: '#ddd',
					lineWidth: 1,
				},
			},
			grid: null,
		},
		xAxis: {
			title: {
				text: `Module Membership in ${geneSetParamStore.wgcna_module} module`,
			},
			line: {
				style: {
					stroke: '#ddd',
					lineWidth: 1,
				},
			},
			tickLine: {
				style: {
					stroke: '#ddd',
					lineWidth: 1,
				},
			},
		},
		tooltip: {
			enterable: true,
			fields: [
				'gene_id_ENSG',
				`mm_${geneSetParamStore.wgcna_module}`,
				`p_mm_${geneSetParamStore.wgcna_module}`,
				`gs_${geneSetParamStore.wgcna_trait}`,
				`p_gs_${geneSetParamStore.wgcna_trait}`,
			],
		},
		color: `${geneSetParamStore.wgcna_module}`,
		theme: useThemeStoreWithOut().getTheme,
	})
}

const plotObj: plotObjType = {
	plotName: 'ScatterPlot',
	createPlotMethod: createLinePlot,
	updateDataMethod: updateLinePlotData,
}

onMounted(() => {
	plotObj.plot = createLinePlot('canvas')
	// updateLinePlotData(plotObj.plot)
})

const geneSetParamStore = useGeneSetParamStore()
watch(
	() => [dataPromise.getGsMmData, geneSetParamStore.wgcna_trait],
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
