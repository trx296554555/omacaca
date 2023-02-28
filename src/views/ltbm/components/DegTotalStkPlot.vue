<template>
	<div>
		<div class="PlotTitle">
			<p>Special DEG Stacked Plot</p>
			<SavePlotBtn></SavePlotBtn>
		</div>
		<div v-show="isHaveData" id="degStackedPlot"></div>
		<div v-show="!isHaveData" class="noPlot">
			<div class="noPlotText">
				{{ $t(`sys.info.noPlotInfo`) }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch, provide, ref, inject } from 'vue'

import { useDegParamStore } from '@/store/modules/ltbmDegParam'
import { useThemeStoreWithOut } from '@/store/modules/theme'
import { Column } from '@antv/g2plot'
import { each, groupBy } from '@antv/util'
import SavePlotBtn from '@/components/SavePlotBtn.vue'
import { plotObjType } from '#/g2plot'
import { router } from '@/router'

const dataPromise = inject('dataPromise') as any
const degParamStore = useDegParamStore()
const isHaveData = ref(true)

const createStackedPlot = (renderType) => {
	return new Column('degStackedPlot', {
		data: [],
		renderer: renderType,
		height: 550,
		appendPadding: [10, 50, 60, 10],
		isStack: true,
		xField: 'category',
		yField: 'value',
		seriesField: 'LogFC',
		color: '#f43b47-#fffacd-#219ebc',
		yAxis: {
			nice: true,
			title: {
				text: 'significant enrichment genes',
			},
		},
		xAxis: {
			nice: true,
			label: {
				style: {
					fontSize: 10,
				},
				autoRotate: true,
			},
		},
		connectedArea: {
			style: (oldStyle, element) => {
				return {
					fill: 'rgba(0,0,0,0.25)',
					stroke: oldStyle.fill,
					lineWidth: 0.5,
				}
			},
		},
		tooltip: {
			position: 'top',
			offset: 20,
		},
		legend: {
			title: {
				spacing: 14,
			},
			position: 'right',
			itemHeight: 0.1,
			// itemName:'',
		},
		interactions: [
			{
				type: 'axis-label-highlight',
			},
		],
	})
}

async function updateStackedPlotData(plot: any) {
	const getData = new Promise((resolve, reject) => {
		dataPromise.getStkData
			.then((res) => {
				resolve(res.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
	const rawdata = (await getData) as any[]
	// 此处为自定义的数据清理
	// 如果没有数据，就不显示图表
	if (rawdata.length === 0) {
		isHaveData.value = false
		return
	}
	isHaveData.value = true

	const data = rawdata
	const annotations = [] as any[]

	each(groupBy(data, 'category'), (values, k) => {
		const value = values.reduce((a, b) => a + b.value, 0)
		annotations.push({
			type: 'text',
			position: [k, value],
			content: `${value}`,
			style: {
				textAlign: 'center',
				fontSize: 14,
				fill: 'rgba(0,0,0,0.85)',
			},
			offsetY: -10,
		})
	})

	plot.changeData(data)
	plot.update({
		theme: useThemeStoreWithOut().getTheme,
		annotations,
	})
	plot.on('axis-label:click', (ev) => {
		const target = ev.target
		const delegateObject = target.get('delegateObject')
		const item = delegateObject.item
		const re = item.id.match(/(.*)_VS_(.*)/)
		const g1 = re[1]
		const g2 = re[2]
		const { href } = router.resolve({
			path: '/ltbm/' + degParamStore.degParams.analyse + 'res',
			query: {
				model: degParamStore.degParams.model,
				isFull: degParamStore.degParams.full ? 'T' : 'F',
				gender: degParamStore.degParams.gender,
				g1,
				g2,
			},
		})
		window.open(href, '_blank')
	})
}

const plotObj: plotObjType = {
	plotName: 'StackedPlot',
	createPlotMethod: createStackedPlot,
	updateDataMethod: updateStackedPlotData,
}

onMounted(() => {
	plotObj.plot = createStackedPlot('canvas')
	updateStackedPlotData(plotObj.plot)
})

watch(
	() => dataPromise.lfcPadj,
	() => {
		plotObj.updateDataMethod(plotObj.plot)
	}
)
watch(
	() => degParamStore.degParams,
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
