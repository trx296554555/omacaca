<template>
	<div>
		<div class="PlotTitle">
			<p>
				<a-tooltip>
					<template #title>
						{{ $t(`ltbm_wgcna.mt_info`) }}
					</template>
					Module−trait Heatmap
				</a-tooltip>
			</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div id="mtHeatmap"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, provide, inject } from 'vue'

import { useThemeStoreWithOut } from '@/store/modules/theme'
import { Heatmap } from '@antv/g2plot'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { plotObjType } from '#/g2plot'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'

const dataPromise = inject('dataPromise') as any
const geneSetParamStore = useGeneSetParamStore()

const createHeatmapPlot = (renderType) => {
	return new Heatmap('mtHeatmap', {
		data: [],
		renderer: renderType,
		height: 650,
		appendPadding: [15, 15, 65, 15],
		xField: 'x',
		yField: 'y',
		colorField: 'correlationValue',
		color: '#219ebc-#fffacd-#f43b47',
		label: {
			content: ({ correlationValue, pValue }) => {
				if (pValue > 0.05) {
					return ''
				}
				return `${correlationValue}\n${pValue}`
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
			label: {
				autoRotate: true,
			},
		},
		yAxis: {
			nice: true,
			position: 'left',
		},
		tooltip: {
			title: (title, datum) => {
				return `module ${datum.y} with trait ${datum.x}`
			},
			enterable: true,
			showMarkers: false,
			fields: ['correlationValue', 'pValue'],
		},
		legend: {
			layout: 'vertical',
			position: 'right',
		},
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
const toScientificNotation = (value) => {
	if (Math.abs(value) < 0.0001) {
		return value.toExponential(2)
	}
	return parseFloat(value.toFixed(4))
}

async function updateHeatmapPlotData(plot: any) {
	const getData = new Promise((resolve, reject) => {
		dataPromise.getWgcnaMtData
			.then((res) => {
				resolve(res.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
	const rawdata = (await getData) as any[]
	// 此处为自定义的数据清理
	// 对于correlation_value和p_value的处理，保留4位小数，小于0.00001使用科学计数法
	const data = rawdata.map((d) => {
		return {
			x: d.y,
			y: d.x,
			correlationValue: toScientificNotation(d.correlation_value),
			pValue: toScientificNotation(d.p_value),
		}
	})
	const scrollDom = document.getElementById('WgcnaGsmmResAnchor')
	plot.changeData(data)
	plot.update({
		theme: useThemeStoreWithOut().getTheme,
	})
	plot.on('element:click', (ev) => {
		const circleElement = ev.target.get('element')
		const data = circleElement.getModel().data
		geneSetParamStore.wgcna_module = data.y.replace('ME', '')
		geneSetParamStore.wgcna_trait = data.x.toLowerCase()
		if (scrollDom) {
			scrollDom.scrollIntoView({ behavior: 'smooth' })
		}
	})
	plot.on('axis-label:click', (ev) => {
		const textElement = ev.target.cfg.attrs.text
		if (textElement.startsWith('ME')) {
			geneSetParamStore.wgcna_module = textElement.replace('ME', '')
		} else {
			geneSetParamStore.wgcna_trait = textElement.toLowerCase()
		}
		if (scrollDom) {
			scrollDom.scrollIntoView({ behavior: 'smooth' })
		}
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

// 以下在所有plot组件默认使用，用于保存PNG/SVG 以及暗黑主题适应
provide('plotObj', plotObj)
useThemeStoreWithOut().$subscribe((mutation, state) => {
	plotObj?.plot?.update({ theme: state.themeInfo.theme })
})
</script>
