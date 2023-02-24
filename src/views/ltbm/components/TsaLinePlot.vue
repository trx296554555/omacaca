<template>
	<div>
		<div class="PlotTitle">
			<p>Line Plot</p>
			<a-switch
				v-model:checked="timeChecked"
				checked-children="time"
				un-checked-children="stage"
			/>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div id="linePlot"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch, provide, inject, ref } from 'vue'

import { useThemeStoreWithOut } from '@/store/modules/theme'
import { Line } from '@antv/g2plot'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { plotObjType } from '#/g2plot'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'

const dataPromise = inject('dataPromise') as any

const timeChecked = ref(false)
const createLinePlot = (renderType) => {
	return new Line('linePlot', {
		data: [],
		renderer: renderType,
		height: 750,
		appendPadding: 15,
		yField: 'exp',
		seriesField: 'individual',
		animation: {
			appear: {
				animation: 'path-in',
				duration: 1500,
			},
		},
	})
}

async function updateLinePlotData(plot: any) {
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
	const data = [] as any[]
	// 新增一个group属性，用于后续分组 来自原属性sample_id 去除字符串中的数字和.
	const timeDict = {
		BCRA: new Date('2019-09-26'),
		BCRB: new Date('2019-10-11'),
		BCRC: new Date('2019-11-12'),
		BCRD: new Date('2019-12-06'),
		BCRE: new Date('2020-01-08'),
		BCRF: new Date('2020-06-11'),
		BCRG: new Date('2021-01-06'),
		MCR: new Date('2021-08-30'),
		OCR: new Date('2021-08-30'),
	}
	for (const item of rawdata.data) {
		const group = item.sample_id.replace(/\d+/g, '').replace(/\./g, '')
		data.push({
			group,
			// 转换成时间戳
			date: timeDict[group].getTime(),
			exp: parseFloat(item.exp.toFixed(5)),
			individual: item.individual,
		})
	}
	// 根据group 在data中计算每个group的平均exp值
	const groupData = [] as any[]
	const groupSet = new Set(data.map((item) => item.group))
	for (const group of groupSet) {
		const groupDataItem = data.filter((item) => item.group === group)
		const expSum = groupDataItem.reduce((pre, cur) => pre + cur.exp, 0)
		const expAvg = expSum / groupDataItem.length
		groupData.push({
			group,
			date: timeDict[group].getTime(),
			exp: parseFloat(expAvg.toFixed(5)),
			individual: 'Average',
		})
	}
	const femaleIndividuals = [
		'BCR01',
		'BCR02',
		'BCR03',
		'BCR04',
		'BCR05',
		'BCR06',
		'BCR07',
		'BCR08',
		'BCR09',
		'BCR10',
	]
	const maleIndividuals = [
		'BCR11',
		'BCR12',
		'BCR13',
		'BCR14',
		'BCR15',
		'BCR16',
		'BCR17',
		'BCR18',
		'BCR19',
		'BCR20',
		'BCR21',
	]
	// 取出data中individual属于femaleIndividuals的数据
	const femaleData = data.filter((item) => femaleIndividuals.includes(item.individual))
	// 计算femaleData中每个group的平均exp值
	const groupFemaleData = [] as any[]
	const groupFemaleSet = new Set(femaleData.map((item) => item.group))
	for (const group of groupFemaleSet) {
		const groupDataItem = femaleData.filter((item) => item.group === group)
		const expSum = groupDataItem.reduce((pre, cur) => pre + cur.exp, 0)
		const expAvg = expSum / groupDataItem.length
		groupFemaleData.push({
			group,
			date: timeDict[group].getTime(),
			exp: parseFloat(expAvg.toFixed(5)),
			individual: 'Avg female',
		})
	}
	// 取出data中individual属于maleIndividuals的数据
	const maleData = data.filter((item) => maleIndividuals.includes(item.individual))
	// 计算maleData中每个group的平均exp值
	const groupMaleData = [] as any[]
	const groupMaleSet = new Set(maleData.map((item) => item.group))
	for (const group of groupMaleSet) {
		const groupDataItem = maleData.filter((item) => item.group === group)
		const expSum = groupDataItem.reduce((pre, cur) => pre + cur.exp, 0)
		const expAvg = expSum / groupDataItem.length
		groupMaleData.push({
			group,
			date: timeDict[group].getTime(),
			exp: parseFloat(expAvg.toFixed(5)),
			individual: 'Avg male',
		})
	}
	// 将groupFemaleData groupMaleData groupData合并到data中
	data.push(...groupData, ...groupMaleData, ...groupFemaleData)
	// 并将data按照individual进行排序
	data.sort((a, b) => {
		if (a.individual > b.individual) {
			return 1
		} else if (a.individual < b.individual) {
			return -1
		}
		return 0
	})
	// 获取data min 的最小值 以及 max的最大值
	const min = Math.floor(Math.min(...data.map((item) => item.exp)))
	const max = Math.ceil(Math.max(...data.map((item) => item.exp)))
	plot.changeData(data)
	plot.update({
		xField: timeChecked.value ? 'date' : 'group',
		xAxis: {
			type: timeChecked.value ? 'time' : 'cat',
			nice: false,
			title: {
				text: timeChecked.value ? 'Time' : 'Stage',
			},
			tickMethod: timeChecked.value ? 'time-pretty' : undefined,
		},
		yAxis: {
			max,
			min,
			nice: true,
		},
		theme: useThemeStoreWithOut().getTheme,
	})
}

const plotObj: plotObjType = {
	plotName: 'LinePlot',
	createPlotMethod: createLinePlot,
	updateDataMethod: updateLinePlotData,
}

onMounted(() => {
	plotObj.plot = createLinePlot('canvas')
	// updateLinePlotData(plotObj.plot)
})

const geneSetParamStore = useGeneSetParamStore()
watch(
	() => geneSetParamStore.tsaItemInfo,
	() => {
		plotObj.updateDataMethod(plotObj.plot)
	}
)
watch(
	() => timeChecked.value,
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
