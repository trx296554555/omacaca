<template>
	<div id="TsaResTable">
		<vxe-grid
			ref="xGrid"
			v-bind="gridOptions"
			class="mytable-scrollbar"
			@current-change="changeCurrentEvent"
		>
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
				</div>
			</template>
		</vxe-grid>
	</div>
</template>

<script setup lang="ts">
import { inject, reactive, ref, watch } from 'vue'
import { VxeGridInstance, VxeGridProps, VxeTableEvents } from 'vxe-table'
import XEUtils from 'xe-utils'
import { SearchOutlined } from '@ant-design/icons-vue'
import linkSvg from '@/assets/icons/link.svg'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'

// 数据获取
const dataPromise = inject('dataPromise') as any
const geneSetParamStore = useGeneSetParamStore()

watch(
	() => dataPromise.getTsaData,
	() => {
		getData = dataPromise.getTsaData
		const $grid = xGrid.value
		$grid.commitProxy('query')
		// @ts-ignore
		gridOptions.exportConfig.filename = 'TSA-RES-cluster' + geneSetParamStore.tsa_cluster
		getData.then((res) => geneSetParamStore.setTsaItem(res.data[1]))
	}
)

let getData = dataPromise.getTsaData
// 搜索基因ID
const formData = reactive({
	geneId: '',
})

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

	function filterCore(filterList) {
		if (filterList[0].values.length === 2) {
			return data
		} else if (filterList[0].values[0] === 'true') {
			return data.filter((item) => item.is_core === true)
		} else if (filterList[0].values[0] === 'false') {
			return data.filter((item) => item.is_core === false)
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
		const filterData = filterCore(filterList)
		return filterData.sort(fieldSorter(sortExpArr))
	} else if (sortList[0]) {
		return data.sort(fieldSorter(sortExpArr))
	} else if (filterList[0]) {
		return filterCore(filterList)
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

const changeCurrentEvent: VxeTableEvents.CurrentChange = () => {
	const $grid = xGrid.value
	const currentData = $grid.getCurrentRecord()
	// 设定ora对象值，key为props.regulation，值为currentData
	geneSetParamStore.setTsaItem(currentData)
	const scrollDom = document.getElementById('TsaLinePlotAnchor')
	if (scrollDom) {
		scrollDom.scrollIntoView({ behavior: 'smooth' })
	}
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
			width: '40%',
			type: 'html',
			formatter({ cellValue }, url = 'https://www.uniprot.org/uniprot/?query=') {
				const reg1 = /<span class="keyword-lighten">/g
				const reg2 = /<\/span>/g
				const a = cellValue.replace(reg1, '')
				const b = a.replace(reg2, '')
				return `<a href="${url + b}" target="_blank">
						${cellValue}
						<img src="${linkSvg}" alt="link" width="18" height="18" style="padding-bottom:4px">
					</a>`
			},
		},
		{
			field: 'cluster',
			title: 'cluster',
			visible: true,
		},
		{
			field: 'is_core',
			title: 'core',
			visible: true,
			filters: [
				{
					label: 'True',
					value: 'true',
				},
				{
					label: 'False',
					value: 'false',
				},
			],
		},
		{
			field: 'membership',
			title: 'membership',
			sortable: true,
			width: '20%',
			minWidth: '80',
			// type: 'html',
			formatter({ cellValue }) {
				return cellValue.toFixed(2)
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
		filename: 'TSA-RES-cluster' + geneSetParamStore.tsa_cluster,
		mode: 'all',
		modes: ['all', 'current'],
	},
})
</script>
