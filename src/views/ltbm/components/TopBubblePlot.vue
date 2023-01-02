<template>
	<div>
		<div className="PlotTitle">
			<p>Bubble Plot</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div :id="'BubblePlot' + regulation"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, watch, provide, reactive, inject } from 'vue'
import { Scatter } from '@antv/g2plot'
import { useThemeStoreWithOut } from '@/store/modules/theme'
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
const changeNowData = () => {
	if (props.regulation === 'up') {
		return reduceData(dataPromise.getGpfUpData)
	} else if (props.regulation === 'down') {
		return reduceData(dataPromise.getGpfDownData)
	}
	return reduceData(dataPromise.getGseaData)
}

let getData = changeNowData()

watch(
	() => dataPromise.lfcPadj,
	() => {
		getData = changeNowData()
		updateBubblePlotData(plotObj.plot)
	}
)
watch(
	() => switchOption.rereMethodRadio,
	() => {
		getData = changeNowData()
		updateBubblePlotData(plotObj.plot)
	}
)

const createBubblePlot = (renderType) => {
	return new Scatter('BubblePlot' + props.regulation, {
		data: [],
		renderer: renderType,
		height: 650,
		padding: [0, 0, 0, 240],
		appendPadding: [0, 20, 120, 0],
		xField: 'rich_factor',
		yField: 'term_name',
		sizeField: 'intersection_size',
		size: [4, 16],
		shapeField: 'source',
		shape: ['circle', 'triangle', 'diamond', 'square', 'hexagon'],
		colorField: 'negative_log10_of_adjusted_p_value',
		color: ['#52ACFF', '#FBDA61', '#cd0000'],
		pointStyle: {
			opacity: 0.8,
			fillOpacity: 0.8,
			lineWidth: 0.5,
		},

		legend: {
			layout: 'horizontal',
			position: 'bottom',
			label: {
				// @ts-ignore
				formatter: (value) => {
					if (value) {
						// 返回10的值次方
						return Math.pow(10, -value).toFixed(2)
					}
					return value
				},
			},
		},
		xAxis: {
			nice: true,
			min: 0,
			title: {
				text: 'Rich Factor',
			},
			label: {
				offset: 10,
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
			tickMethod: 'r-pretty',
		},
		yAxis: {
			nice: true,
			label: {
				offset: 20,
				autoEllipsis: true,
			},
			line: null,
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
			fields: [
				'source',
				'term_id',
				'term_name',
				'rich_factor',
				'adjusted_p_value',
				'intersection_size',
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
		annotations: [],
	})
}

async function updateBubblePlotData(plot: any) {
	const rawdata = (await getData) as { data: any[] }
	// console.log(rawdata)
	let data = [] as any[]
	// 此处为自定义的数据清理
	// 在rawdata.data中添加新的字段
	if (props.regulation === 'none') {
		rawdata.data = rawdata.data.map((item) => {
			item.negative_log10_of_adjusted_p_value = -Math.log10(item.p_adjust)
			item.intersection_size = item.leading_edge_number
			return item
		})
	}
	// 先判断获取到的富集结果是否超过20个
	// 如果超过了20个则 按BP、KEGG、HP、CC、MF顺序依次抽取padj最小的

	const sourceList = { 'GO:BP': 0, KEGG: 0, HP: 0, 'GO:CC': 0, 'GO:MF': 0 }

	if (rawdata.data.length <= 20) {
		data = rawdata.data
	} else {
		while (data.length < 20) {
			for (const sourceItem in sourceList) {
				const sourceArr = rawdata.data.filter((item) => item.source === sourceItem)
				// 移除已经抽取过的data中的数据
				const tmpArr = sourceArr.filter((item) => !data.includes(item))
				// 如果当前tmpARR不为空
				if (tmpArr.length > 0) {
					tmpArr.sort((a, b) => a.adjusted_p_value - b.adjusted_p_value)
					// 抽取adjp值最小的1个
					data.push(tmpArr[0])
					sourceList[sourceItem] = sourceList[sourceItem] + 1
				}
			}
		}
	}
	// 按照source的顺序对data进行排序
	data.sort((a, b) => {
		const sourceOrder = ['GO:BP', 'KEGG', 'HP', 'GO:CC', 'GO:MF']
		return sourceOrder.indexOf(a.source) - sourceOrder.indexOf(b.source)
	})
	// console.log(sourceList)
	plot.changeData(data)
	plot.update({ theme: useThemeStoreWithOut().getTheme })
}

const plotObj: plotObjType = {
	plotName: 'BubblePlot',
	createPlotMethod: createBubblePlot,
	updateDataMethod: updateBubblePlotData,
}

onMounted(() => {
	plotObj.plot = createBubblePlot('canvas')
	updateBubblePlotData(plotObj.plot)
})

// 以下在所有plot组件默认使用，用于保存PNG/SVG 以及暗黑主题适应
provide('plotObj', plotObj)
useThemeStoreWithOut().$subscribe((mutation, state) => {
	plotObj?.plot?.update({ theme: state.themeInfo.theme })
})
</script>
