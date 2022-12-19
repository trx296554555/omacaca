<template>
	<div>
		<div class="PlotTitle">
			<p>Volcano Plot</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div id="vcnPlot"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch, provide, reactive, inject } from 'vue'

import { useThemeStoreWithOut } from '@/store/modules/theme'
import { Scatter } from '@antv/g2plot'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { plotObjType } from '#/g2plot'

const dataPromise = inject('dataPromise') as any

const createVcnPlot = (renderType) => {
	return new Scatter('vcnPlot', {
		data: [],
		renderer: renderType,
		height: 470,
		appendPadding: 15,
		xField: 're_lfc',
		yField: 'Ne_log10_padj',
		colorField: 'regulation',
		color: ({ regulation }) => {
			if (regulation === 'up-regulation') {
				return '#a4272b'
			}
			return '#12679e'
		},
		pointStyle: {
			opacity: 0.9,
			fillOpacity: 0.9,
			lineWidth: 0.5,
		},
		shape: 'circle',
		legend: {
			layout: 'horizontal',
			position: 'bottom',
		},
		meta: {
			Ne_log10_padj: {
				alias: 'Ne_log10_padj',
			},
			log2FoldChange: {
				alias: 'Log2FC',
			},
		},
		size: 3.5,
		xAxis: {
			nice: true,
			min: -10,
			max: 10,
			title: {
				text: 'Log2 Fold Change',
			},
			label: {
				offset: 10,
			},
			// line:null,
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
			title: {
				text: '-Log10 Padj',
			},
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
			enterable: true,
			fields: ['gene_id_ENSG', 'regulation', 'log2FoldChange', 'padj'],
		},
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

async function updateVcnPlotData(plot: any) {
	const getData = new Promise((resolve, reject) => {
		dataPromise.getDegData
			.then((res) => {
				resolve(res.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
	const rawdata = (await getData) as any[]
	// 此处为自定义的数据清理
	const capped = (v) => {
		if (v > 10) {
			return 10
		} else if (v < -10) {
			return -10
		}
		return v
	}
	const judgeZero = (smallp) => {
		if (smallp === 0) {
			return 1.0e-299
		}
		return smallp
	}
	const data = rawdata.map((item, index) => {
		return Object.assign({}, item, {
			regulation: item.log2FoldChange > 0 ? 'up-regulation' : 'down-regulation',
			Ne_log10_padj: -Math.log10(judgeZero(item.padj)),
			re_lfc: capped(item.log2FoldChange),
		})
	})
	const lfcLine = parseInt(dataPromise.lfcPadj.charAt(0))
	const padjLine = -Math.log10(parseInt(dataPromise.lfcPadj.charAt(2)) / 100)
	plot.changeData(data)
	plot.update({
		theme: useThemeStoreWithOut().getTheme,
		annotations: [
			{
				type: 'line',
				start: [-lfcLine, 'start'],
				end: [-lfcLine, 'end'],
				style: {
					stroke: '#888',
					lineDash: [8, 4],
					lineWidth: 1.5,
				},
			},
			{
				type: 'line',
				start: [lfcLine, 'start'],
				end: [lfcLine, 'end'],
				style: {
					stroke: '#888',
					lineDash: [8, 4],
					lineWidth: 1.5,
				},
			},
			{
				type: 'line',
				start: ['start', padjLine],
				end: ['end', padjLine],
				style: {
					stroke: '#888',
					lineDash: [8, 4],
					lineWidth: 1.5,
				},
			},
			{
				type: 'text',
				position: [10, 'start'],
				content: 'absolute value above threshold 10 are capped',
				rotate: -Math.PI / 2,
				offsetY: -10,
				offsetX: 8,
				style: {
					fontSize: 11,
				},
			},
		],
	})
}

const plotObj: plotObjType = {
	plotName: 'VolcanoPlot',
	createPlotMethod: createVcnPlot,
	updateDataMethod: updateVcnPlotData,
}

onMounted(() => {
	plotObj.plot = createVcnPlot('canvas')
	updateVcnPlotData(plotObj.plot)
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
