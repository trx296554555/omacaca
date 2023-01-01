<template>
	<div id="OraResDegTable">
		<vxe-grid ref="xGrid" v-bind="gridOptions" class="mytable-scrollbar">
			<template #toolbar_buttons>
				<div class="flex hidden md:block">
					<a-input
						v-model:value="formData.geneId"
						type="search"
						placeholder="Search Gene"
						style="width: 10rem"
						@keyup="searchEvent"
					>
						<template #suffix>
							<search-outlined />
						</template>
					</a-input>
					<a-button
						type="primary"
						style="margin-left: 0.5rem; margin-right: 1rem"
						@click="searchReset"
					>
						Reset
					</a-button>
					<a-tooltip title="Copy the gene ID list to the clipboard">
						<a-radio-group>
							<a-radio-button value="a" @click="copyAllGeneId('All')">
								All
							</a-radio-button>
							<a-radio-button value="u" @click="copyAllGeneId('Up-regulation')">
								Up
							</a-radio-button>
							<a-radio-button value="d" @click="copyAllGeneId('Down-regulation')">
								Down
							</a-radio-button>
						</a-radio-group>
					</a-tooltip>
				</div>
			</template>
		</vxe-grid>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, watch } from 'vue'
import { VxeGridInstance, VxeGridProps } from 'vxe-table'
import XEUtils from 'xe-utils'
import { useClipboard } from '@vueuse/core'
import { SearchOutlined } from '@ant-design/icons-vue'
import linkSvg from '@/assets/icons/link.svg'
import { message } from 'ant-design-vue'

// 数据获取
const dataPromise = inject('dataPromise') as any
watch(
	() => dataPromise.lfcPadj,
	(nowV, prevV) => {
		getData = dataPromise.getDegData
		const $grid = xGrid.value
		$grid.commitProxy('query')
		// @ts-ignore
		gridOptions.exportConfig.filename =
			'DEG-RES-' +
			dataPromise.titlePrefix +
			'-lfc' +
			dataPromise.lfcPadj.charAt(0) +
			'padj00' +
			dataPromise.lfcPadj.charAt(2)
	}
)
let getData = dataPromise.getDegData

// 搜索基因ID
const formData = reactive({
	geneId: '',
})

// 复制粘贴配置
const copy = async (Msg, regulation) => {
	const source = ref(Msg)
	const { text, copy, copied, isSupported } = useClipboard({ source })
	try {
		// 复制
		await copy(Msg)
	} catch (e) {
		// 复制失败
		console.error(e)
	}
	if (copied) {
		message.success(regulation + ' Gene ID Copied!')
	} else {
		message.error(regulation + ' Gene ID Failed!')
	}
}

const copyAllGeneId = (regulation) => {
	const copyListUp = [] as any[]
	const copyListDown = [] as any[]

	getData.then((res) => {
		res.data.forEach((item) => {
			if (item.log2FoldChange > 0) {
				copyListUp.push(item.gene_id_ENSG)
			} else {
				copyListDown.push(item.gene_id_ENSG)
			}
		})
		if (regulation === 'Up-regulation') {
			copy(copyListUp.join('\n'), regulation)
		} else if (regulation === 'Down-regulation') {
			copy(copyListDown.join('\n'), regulation)
		} else {
			copy(copyListUp.join('\n') + '\n' + copyListDown.join('\n'), regulation)
		}
	})
}

// 表格相关配置
const sortFilterMethod = (data, sortList, filterList) => {
	function fieldSorter(fields) {
		return function (a, b) {
			return fields
				.map(function (o) {
					let dir = 1
					if (o[0] === '-') {
						dir = -1
						o = o.substring(1)
					}
					if (a[o] > b[o]) return dir
					if (a[o] < b[o]) return -dir
					return 0
				})
				.reduce(function firstNonZeroValue(p, n) {
					return p || n
				}, 0)
		}
	}

	function filterLfc(filterList) {
		if (filterList[0].values.length === 2) {
			return data
		} else if (filterList[0].values[0] === '上调') {
			return data.filter((item) => item.log2FoldChange > 0)
		} else if (filterList[0].values[0] === '下调') {
			return data.filter((item) => item.log2FoldChange < 0)
		}
	}

	const sortExpArr = [] as any[]
	for (const sortIndex in sortList) {
		const tp = `${sortList[sortIndex].order === 'asc' ? '' : '-'}${
			sortList[sortIndex].property
		}`
		sortExpArr.push(tp)
	}

	if (sortList[0] && filterList[0]) {
		const filterData = filterLfc(filterList)
		return filterData.sort(fieldSorter(sortExpArr))
	} else if (sortList[0]) {
		return data.sort(fieldSorter(sortExpArr))
	} else if (filterList[0]) {
		const filterData = filterLfc(filterList)
		return filterData
	}
}

const xGrid = ref({} as VxeGridInstance)
const searchEvent = () => {
	const $grid = xGrid.value
	$grid.commitProxy('query')
}

const searchReset = () => {
	formData.geneId = ''
	const $grid = xGrid.value
	$grid.commitProxy('query')
}

const gridOptions = reactive<VxeGridProps>({
	border: false,
	size: 'small',
	height: 528,
	stripe: true,
	rowConfig: {
		keyField: 'id',
		isCurrent: true,
		isHover: true,
	},
	columnConfig: {
		resizable: false,
	},
	pagerConfig: {
		pageSize: 10,
		pageSizes: [10, 50, 100, 200, 500],
	},
	toolbarConfig: {
		slots: {
			buttons: 'toolbar_buttons',
		},
		refresh: true,
		export: true,
		zoom: true,
		custom: true,
	},
	columns: [
		{
			title: 'No',
			type: 'seq',
			minWidth: 60,
			width: '10%',
		},
		{
			field: 'gene_id_ENSG',
			title: 'gene_id_ENSG',
			// sortable: true,
			width: '28%',
			type: 'html',
			formatter({ cellValue }, url = 'https://www.uniprot.org/uniprot/?query=') {
				const reg1 = /<span class="keyword-lighten">/g
				const reg2 = /<\/span>/g
				const a = cellValue.replace(reg1, '')
				const b = a.replace(reg2, '')
				return `<a href=${url + b} target=_blank>
						${cellValue}
						<img src="${linkSvg}" alt='link' width="18" height="18" style="padding-bottom:4px">
					</a>`
			},
		},
		{
			field: 'baseMean',
			title: 'baseMean',
			sortable: true,
			// width:"15%",
			formatter({ cellValue }, digits = 4) {
				return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits)
			},
		},
		{
			field: 'log2FoldChange',
			title: 'log2FC',
			sortable: true,
			// width:"15%",
			filters: [
				{
					label: 'Up-regulation',
					value: '上调',
				},
				{
					label: 'Down-regulation',
					value: '下调',
				},
			],
			formatter({ cellValue }, digits = 4) {
				return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits)
			},
		},
		{
			field: 'lfcSE',
			title: 'lfcSE',
			visible: false,
		},
		{
			field: 'stat',
			title: 'stat',
			visible: false,
		},
		{
			field: 'pvalue',
			title: 'pvalue',
			visible: false,
		},
		{
			field: 'padj',
			title: 'padj(BH)',
			sortable: true,
			width: '25%',
			minWidth: '80',
			// type: 'html',
			formatter({ cellValue }) {
				return cellValue.toExponential(3)
			},
		},
	],
	sortConfig: {
		trigger: 'cell',
		multiple: true,
		remote: true,
	},
	filterConfig: {
		remote: true,
	},
	showOverflow: 'tooltip',
	proxyConfig: {
		seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
		sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
		filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
		props: {
			result: 'result',
			total: 'page.total',
		},
		ajax: {
			// 接收 Promise
			query: ({ page, sorts, filters }) => {
				if (!formData.geneId) {
					return new Promise((resolve) => {
						getData.then((res) => {
							const sortfilterData =
								sorts[0] || filters[0]
									? sortFilterMethod(res.data, sorts, filters)
									: res.data
							resolve({
								page: {
									total: sortfilterData.length,
								},
								result: sortfilterData.slice(
									(page.currentPage - 1) * page.pageSize,
									page.currentPage * page.pageSize
								),
							})
						})
					})
				}
				return new Promise((resolve) => {
					getData.then((res) => {
						const sortfilterData =
							sorts[0] || filters[0]
								? sortFilterMethod(res.data, sorts, filters)
								: res.data
						const filterName = XEUtils.toValueString(formData.geneId)
							.trim()
							.toLowerCase()
						const filterRE = new RegExp(filterName, 'gi')
						const searchProps = ['gene_id_ENSG']
						const rest = sortfilterData.filter((item) =>
							searchProps.some(
								(key) =>
									XEUtils.toValueString(item[key])
										.toLowerCase()
										.indexOf(filterName) > -1
							)
						)
						let highLightList = []
						highLightList = rest.map((row) => {
							const item = Object.assign({}, row)
							searchProps.forEach((key) => {
								item[key] = XEUtils.toValueString(item[key]).replace(
									filterRE,
									(match) => `<span class="keyword-lighten">${match}</span>`
								)
							})
							return item
						})
						resolve({
							page: {
								total: highLightList.length,
							},
							result: highLightList,
						})
					})
				})
			},
			queryAll: () => {
				return new Promise((resolve) => {
					getData.then((res) => {
						resolve(res.data)
					})
				})
			},
		},
	},
	exportConfig: {
		type: 'csv',
		filename:
			'DEG-RES-' +
			dataPromise.titlePrefix +
			'-lfc' +
			dataPromise.lfcPadj.charAt(0) +
			'padj00' +
			dataPromise.lfcPadj.charAt(2),
		mode: 'all',
		modes: ['all', 'current'],
	},
})
</script>
