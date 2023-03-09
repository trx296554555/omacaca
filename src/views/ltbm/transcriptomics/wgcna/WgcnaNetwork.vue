<template>
	<div ref="parentContent" class="parentContent">
		<div class="NetPlotTitle">
			<p>Top 30 HubGene Network</p>
			<SaveNetPlotBtn></SaveNetPlotBtn>
		</div>
		<div id="wgcnaNet"></div>
	</div>
</template>

<script setup lang="ts">
import G6 from '@antv/g6'
import { inject, onMounted, watch, ref, provide } from 'vue'
import { GraphObjType } from '#/g6graph'
import { useThemeStoreWithOut } from '@/store/modules/theme'
import SaveNetPlotBtn from '@/components/SaveNetPlotBtn.vue'

const dataPromise = inject('dataPromise') as any

const parentContent = ref()

type paramType = {
	renderType: string
	height: number
	width: number
}

const createNetwork = (param: paramType) => {
	return new G6.Graph({
		container: 'wgcnaNet',
		renderer: param.renderType,
		height: param.height,
		width: param.width,
		fitView: true,
		fitViewPadding: 45,
		fitCenter: true,
		modes: {
			default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
		},
		layout: {
			type: 'force',
			linkDistance: 250,
			nodeSize: 50,
			preventOverlap: true,
		},
		defaultNode: {
			size: 20,
		},
	})
}

function middle(argsIn) {
	const args = [...argsIn] // 收集参数转为数组
	args.sort(function (a, b) {
		return a - b
	}) // 排序
	if (args.length % 2 === 0) {
		// 判断数字个数是奇数还是偶数
		return (args[args.length / 2 - 1] + args[args.length / 2]) / 2 // 偶数个取中间两个数的平均数
	}
	// 向上取整
	return args[Math.ceil(args.length / 2)] // 奇数个取最中间那个数
}

async function updateNetWorkData(graph: any) {
	const getData = new Promise((resolve, reject) => {
		dataPromise.networkData
			.then((res) => {
				resolve(res.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
	const rawData = (await getData) as any[]
	const data = {
		nodes: [] as any[],
		edges: [] as any[],
	}
	// 自定义数据处理
	const tmpNodes = [] as any[]
	const medianWight = middle(rawData.map((item) => item.weight))
	rawData.forEach((item) => {
		if (item.weight > medianWight) {
			data.edges.push({
				source: item.fromnode,
				target: item.tonode,
				weight: item.weight,
			})
		}
		if (!tmpNodes.includes(item.fromnode)) {
			tmpNodes.push(item.fromnode)
			data.nodes.push({
				id: item.fromnode,
				label: item.fromnode,
			})
		}
		if (!tmpNodes.includes(item.tonode)) {
			tmpNodes.push(item.tonode)
			data.nodes.push({
				id: item.tonode,
				label: item.tonode,
			})
		}
	})
	graph.set('defaultNode', {
		size: 20,
		style: {
			fill: useThemeStoreWithOut().getThemeCol('primaryCol'),
			stroke: useThemeStoreWithOut().getThemeCol('primaryCol'),
		},
		labelCfg: {
			style: {
				fill: useThemeStoreWithOut().getThemeCol('blackCol'),
				fontSize: 12,
			},
		},
	})
	graph.changeData(data)
	graph.render()
}

const plotObj: GraphObjType = {
	plotName: 'Wgcna Network',
	createPlotMethod: createNetwork,
	updateDataMethod: updateNetWorkData,
}

onMounted(() => {
	plotObj.plot = createNetwork({
		renderType: 'canvas',
		height: 500,
		width: parentContent.value.clientWidth,
	})
	if (typeof window !== 'undefined') {
		window.onresize = () => {
			if (!plotObj.plot || plotObj.plot.get('destroyed')) return
			if (
				!parentContent.value ||
				!parentContent.value.scrollWidth ||
				!parentContent.value.scrollHeight
			) {
				return
			}
			plotObj.plot.changeSize(
				parentContent.value.scrollWidth,
				parentContent.value.scrollHeight
			)
		}
	}
})

watch(
	() => dataPromise.networkData,
	() => {
		updateNetWorkData(plotObj.plot)
	}
)

// 以下在所有plot组件默认使用，用于保存PNG/SVG 以及暗黑主题适应
provide('plotObj', plotObj)
useThemeStoreWithOut().$subscribe((mutation, state) => {
	updateNetWorkData(plotObj.plot)
})
</script>
