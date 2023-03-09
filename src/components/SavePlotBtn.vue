<template>
	<div>
		<a href="" @click.prevent="savePlot('canvas')">
			<download-outlined />
			<span class="px-2 text-xs">PNG</span>
		</a>
		<a href="" @click.prevent="savePlot('svg')">
			<download-outlined />
			<span class="px-2 text-xs">SVG</span>
		</a>
	</div>
</template>

<script setup lang="ts">
import { DownloadOutlined } from '@ant-design/icons-vue'
import { inject } from 'vue'
import { plotObjType } from '#/g2plot'
import { downloadImage } from '@/tools/exportPlot'

const plotObj = inject('plotObj') as plotObjType

async function savePlot(saveType) {
	if (plotObj.plot) {
		if (plotObj.plot.chart.renderer === saveType) {
			downloadImage(plotObj.plot.chart, plotObj.plotName)
		} else {
			plotObj.plot.destroy()
			plotObj.plot = plotObj.createPlotMethod(saveType)
			await plotObj.updateDataMethod(plotObj.plot)
			setTimeout(() => {
				downloadImage(plotObj.plot.chart, plotObj.plotName)
			}, 1000)
		}
	}
}
</script>
