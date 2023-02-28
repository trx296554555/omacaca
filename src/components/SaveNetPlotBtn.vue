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
import { GraphObjType } from '#/g6graph'

const plotObj = inject('plotObj') as GraphObjType

async function savePlot(saveType) {
	if (plotObj.plot) {
		if (plotObj.plot.get('renderer') === saveType) {
			plotObj.plot.downloadFullImage(plotObj.plotName, 'image/png', {
				padding: [30, 15, 15, 15],
			})
		} else {
			plotObj.plot.destroy()
			plotObj.plot = plotObj.createPlotMethod({
				renderType: saveType,
				height: 500,
				width: 500,
			})
			await plotObj.updateDataMethod(plotObj.plot)
			setTimeout(() => {
				// @ts-ignore
				plotObj.plot.downloadFullImage(plotObj.plotName, 'image/png', {
					padding: [30, 15, 15, 15],
				})
			}, 1000)
		}
	}
}
</script>
