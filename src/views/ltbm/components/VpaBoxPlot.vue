<template>
	<div>
		<div class="PlotTitle">
			<p>Box Plot</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div id="boxPlot"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch, provide, inject } from 'vue'

import { useThemeStoreWithOut } from '@/store/modules/theme'
import { Box } from '@antv/g2plot'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { plotObjType } from '#/g2plot'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'

const dataPromise = inject('dataPromise') as any
const createBoxPlot = (renderType) => {
	return new Box('boxPlot', {
		data: [],
		renderer: renderType,
		height: 470,
		appendPadding: 15,
		xField: 'group',
		yField: ['min', 'q1', 'median', 'q3', 'max'],
		boxStyle: {
			stroke: '#545454',
			fill: '#5dbe8a',
			fillOpacity: 0.3,
		},
		meta: {
			max: {
				alias: 'Max',
				formatter: (v) => `${v.toFixed(4)}`,
			},
			q1: {
				alias: 'Lower quartile',
				formatter: (v) => `${v.toFixed(4)}`,
			},
			median: {
				alias: 'Median',
				formatter: (v) => `${v.toFixed(4)}`,
			},
			q3: {
				alias: 'Upper quartile',
				formatter: (v) => `${v.toFixed(4)}`,
			},
			min: {
				alias: 'Min',
				formatter: (v) => `${v.toFixed(4)}`,
			},
		},
		tooltip: {
			fields: ['max', 'q1', 'q3', 'min', 'median'],
		},
	})
}

async function updateBoxPlotData(plot: any) {
	const getData = new Promise((resolve, reject) => {
		dataPromise.getGeneExpData
			.then((res) => {
				resolve(res.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
	const rawdata = (await getData) as any
	// 此处为自定义的数据清理
	// 取出rawdata中的describe信息
	const data = [] as any[]
	// rawdata['describe']是个对象，遍历生成新数组，并把key作为group
	for (const key in rawdata.describe) {
		const item = rawdata.describe[key]
		// 保留4位小数
		data.push({
			group: key,
			max: item.max,
			q1: item['25%'],
			median: item['50%'],
			q3: item['75%'],
			min: item.min,
		})
	}
	// 获取data min 的最小值 以及 max的最大值
	const min = Math.floor(Math.min(...data.map((item) => item.min)))
	const max = Math.ceil(Math.max(...data.map((item) => item.max)))
	plot.changeData(data)
	plot.update({
		yAxis: {
			max: max + 0.5,
			min: min - 0.5,
			nice: true,
		},
		theme: useThemeStoreWithOut().getTheme,
	})
}

const plotObj: plotObjType = {
	plotName: 'BoxPlot',
	createPlotMethod: createBoxPlot,
	updateDataMethod: updateBoxPlotData,
}

onMounted(() => {
	plotObj.plot = createBoxPlot('canvas')
	// updateBoxPlotData(plotObj.plot)
})

const geneSetParamStore = useGeneSetParamStore()
watch(
	() => geneSetParamStore.factor,
	() => {
		plotObj.updateDataMethod(plotObj.plot)
	}
)
watch(
	() => geneSetParamStore.vpaItemInfo,
	() => {
		plotObj.updateDataMethod(plotObj.plot)
	}
)
watch(
	() => geneSetParamStore.vpa_default,
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
