<template>
	<div id="VarPartTable">
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
import { reactive, ref, inject } from 'vue'
import { VxeGridInstance, VxeGridProps, VxeTableEvents } from 'vxe-table'
import XEUtils from 'xe-utils'
import { SearchOutlined } from '@ant-design/icons-vue'
import linkSvg from '@/assets/icons/link.svg'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'

const dataPromise = inject('dataPromise') as any

const changeNowData = () => {
	return dataPromise.getVpaData
}

const getData = changeNowData()

// 搜索基因ID
const formData = reactive({
	geneId: '',
})
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

	function filterMethod(filterList) {
		const filterExpr = [] as any[]
		for (const filterIndex in filterList) {
			const property = filterList[filterIndex].property
			const filterArr = [] as any[]
			if (property === 'source') {
				for (const eachFilterIndex in filterList[filterIndex].values) {
					filterArr.push(
						`item.${property} === "${filterList[filterIndex].values[eachFilterIndex]}"`
					)
				}
				filterExpr.push(filterArr.join('|'))
			} else if (property === 'intersection_size') {
				for (const eachFilterIndex in filterList[filterIndex].values) {
					filterArr.push(
						`item.${property} > ${filterList[filterIndex].values[eachFilterIndex]}`
					)
				}
				filterExpr.push(filterArr.join('&&'))
			}
		}
		return data.filter(function (item) {
			// eslint-disable-next-line no-eval
			return eval(filterExpr.join('&&'))
		})
	}

	const sortExpArr = [] as any[]
	for (const sortIndex in sortList) {
		sortExpArr.push(
			`${sortList[sortIndex].order === 'asc' ? '' : '-'}${sortList[sortIndex].property}`
		)
	}

	if (sortList[0] && filterList[0]) {
		const filterData = filterMethod(filterList)
		return filterData.sort(fieldSorter(sortExpArr))
	} else if (sortList[0]) {
		return data.sort(fieldSorter(sortExpArr))
	} else if (filterList[0]) {
		return filterMethod(filterList)
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

// 设置当前选中项
const geneSetParamStore = useGeneSetParamStore()
getData.then((res) => geneSetParamStore.setVpaItem(res.data[1]))
const changeCurrentEvent: VxeTableEvents.CurrentChange = () => {
	const $grid = xGrid.value
	const currentData = $grid.getCurrentRecord()
	// 设定ora对象值，key为props.regulation，值为currentData
	geneSetParamStore.setVpaItem(currentData)
}

const gridOptions = reactive<VxeGridProps>({
	border: false,
	size: 'small',
	height: 728,
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
		pageSize: 15,
		pageSizes: [15, 100, 200, 500],
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
			width: '5%',
		},
		{
			field: 'gene_id_ENSG',
			title: 'gene_id_ENSG',
			width: '21%',
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
			field: 'individual',
			title: 'individual',
			sortable: true,
			formatter({ cellValue }, digits = 2) {
				return XEUtils.toFixed(cellValue * 100, digits) + '%'
			},
		},
		{
			field: 'age',
			title: 'age',
			sortable: true,
			formatter({ cellValue }, digits = 2) {
				return XEUtils.toFixed(cellValue * 100, digits) + '%'
			},
		},
		{
			field: 'condition',
			title: 'condition',
			sortable: true,
			formatter({ cellValue }, digits = 2) {
				return XEUtils.toFixed(cellValue * 100, digits) + '%'
			},
		},
		{
			field: 'hemoglobin',
			title: 'hemoglobin',
			sortable: true,
			formatter({ cellValue }, digits = 2) {
				return XEUtils.toFixed(cellValue * 100, digits) + '%'
			},
		},
		{
			field: 'rin',
			title: 'rin',
			sortable: true,
			visible: false,
			formatter({ cellValue }, digits = 2) {
				return XEUtils.toFixed(cellValue * 100, digits) + '%'
			},
		},
		{
			field: 'sex',
			title: 'sex',
			sortable: true,
			formatter({ cellValue }, digits = 2) {
				return XEUtils.toFixed(cellValue * 100, digits) + '%'
			},
		},
		{
			field: 'state',
			title: 'state',
			sortable: true,
			formatter({ cellValue }, digits = 2) {
				return XEUtils.toFixed(cellValue * 100, digits) + '%'
			},
		},
		{
			field: 'residuals',
			title: 'residuals',
			sortable: true,
			visible: false,
			formatter({ cellValue }, digits = 2) {
				return XEUtils.toFixed(cellValue * 100, digits) + '%'
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
		filename: 'VPA-RES',
		mode: 'all',
		modes: ['all', 'current'],
	},
}) // 结束表格配置
</script>
