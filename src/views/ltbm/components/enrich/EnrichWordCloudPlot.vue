<template>
	<div>
		<div class="PlotTitle">
			<p>Word Cloud Plot</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div :id="'WordCloudPlot' + regulation"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, watch, provide, inject } from 'vue'
import { WordCloud } from '@antv/g2plot'
import { useThemeStoreWithOut } from '@/store/modules/theme'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { plotObjType } from '#/g2plot'

const props = defineProps({
	regulation: {
		type: String,
		default: 'up',
		required: true,
	},
})

// 数据获取
const dataPromise = inject('dataPromise') as any
const switchOption = inject('switchOption') as any

const reduceData = (rawDataPro) => {
	if (switchOption.rereMethodRadio === props.regulation + 'all') {
		return rawDataPro
	} else if (switchOption.rereMethodRadio === props.regulation + 'ap') {
		return new Promise((resolve) => {
			rawDataPro.then((res) => {
				resolve({ data: res.data.filter((item) => item.represent_term_ap) })
			})
		})
	} else if (switchOption.rereMethodRadio === props.regulation + 'wsc') {
		return new Promise((resolve) => {
			rawDataPro.then((res) => {
				resolve({ data: res.data.filter((item) => item.represent_term_wsc) })
			})
		})
	}
	return rawDataPro
}

let getData = reduceData(dataPromise.enrichResData)

watch(
	() => dataPromise.enrichResData,
	() => {
		getData = reduceData(dataPromise.enrichResData)
		updateWordCloudPlotData(plotObj.plot)
	}
)
watch(
	() => switchOption.rereMethodRadio,
	() => {
		getData = reduceData(dataPromise.enrichResData)
		updateWordCloudPlotData(plotObj.plot)
	}
)

const createWordCloudPlot = (renderType) => {
	return new WordCloud('WordCloudPlot' + props.regulation, {
		data: [],
		renderer: renderType,
		height: 650,
		padding: [30, 0, 30, 0],
		appendPadding: 20,
		wordField: 'word',
		weightField: 'frequency',
		colorField: 'word',
		spiral: 'archimedean',
		wordStyle: {
			fontFamily: 'Verdana',
			fontSize: [20, 80],
		},
		// 设置交互类型
		interactions: [
			{
				type: 'element-active',
			},
		],
		state: {
			active: {
				// 这里可以设置 active 时的样式
				style: {
					lineWidth: 3,
				},
			},
		},
		tooltip: {
			enterable: true,
		},
		random: () => 0.404,
	})
}

async function updateWordCloudPlotData(plot: any) {
	const rawdata = (await getData) as { data: any[] }
	const data = [] as any[]
	// 此处为自定义的数据清理
	const inSignificanceList = [
		'regulation',
		'process',
		'response',
		'activity',
		'positive',
		'negative',
		'pathway',
	]
	// 将term name中的单词提出并计算词频
	rawdata.data.forEach((item) => {
		const termName = item.term_name
		// 将,替换为空格后以空格分割
		const termNameList = termName.replace(/,/g, ' ').split(' ')
		termNameList.forEach((word) => {
			if (inSignificanceList.includes(word)) {
				return
			} else if (word.length < 4) {
				return
			}
			const index = data.findIndex((item) => item.word === word)
			if (index === -1) {
				data.push({
					word,
					frequency: 1,
				})
			} else {
				data[index].frequency += 1
			}
		})
	})
	plot.changeData(data)
	plot.update({ theme: useThemeStoreWithOut().getTheme })
}

const plotObj: plotObjType = {
	plotName: 'WordCloudPlot',
	createPlotMethod: createWordCloudPlot,
	updateDataMethod: updateWordCloudPlotData,
}

onMounted(() => {
	plotObj.plot = createWordCloudPlot('canvas')
	updateWordCloudPlotData(plotObj.plot)
})

// 以下在所有plot组件默认使用，用于保存PNG/SVG 以及暗黑主题适应
provide('plotObj', plotObj)
useThemeStoreWithOut().$subscribe((mutation, state) => {
	plotObj?.plot?.update({ theme: state.themeInfo.theme })
})
</script>
