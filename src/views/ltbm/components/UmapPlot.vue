<template>
	<div id="ttt"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Line, LineOptions } from '@antv/g2plot'
import { Plot } from '@antv/g2plot/src/core/plot'
import { useThemeStoreWithOut } from '@/store/modules/theme'
let line: any
const initChart = () => {
	line = new Line('ttt', {
		data: [],
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
	line.changeData(data)
	line.update({ theme: useThemeStoreWithOut().getTheme })
	line.render()
}
onMounted(() => {
	initChart()
})
// const plotTheme =
watch(
	() => useThemeStoreWithOut().getTheme,
	(newValue, oldValue) => {
		console.log(newValue)
		line.update({ theme: newValue })
		console.log(newValue)
	}
)
</script>

<style scoped></style>
