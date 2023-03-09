<template>
	<div :id="'DegResErcTable' + regulation">
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
						placeholder="Search Term/Gene"
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
import { useDegParamStore } from '@/store/modules/ltbmDegParam'

const props = defineProps({
	regulation: {
		type: String,
		default: 'up',
		required: true,
	},
})
// 设置当前选中项
const degParamStore = useDegParamStore()

// 数据获取
const dataPromise = inject('dataPromise') as any
const switchOption = inject('switchOption') as any
watch(
	() => dataPromise.lfcPadj,
	() => {
		getData = changeNowData()
		const $grid = xGrid.value
		$grid.commitProxy('query')
		// @ts-ignore
		gridOptions.exportConfig.filename =
			'Enrichment-' +
			switchOption.rereMethodRadio +
			'-' +
			dataPromise.titlePrefix +
			'-lfc' +
			dataPromise.lfcPadj.charAt(0) +
			'padj0.0' +
			dataPromise.lfcPadj.charAt(2)
	}
)
watch(
	() => switchOption.rereMethodRadio,
	() => {
		getData = changeNowData()
		const $grid = xGrid.value
		$grid.commitProxy('query')
		// @ts-ignore
		gridOptions.exportConfig.filename =
			'Enrichment-' +
			switchOption.rereMethodRadio +
			'-' +
			dataPromise.titlePrefix +
			'-lfc' +
			dataPromise.lfcPadj.charAt(0) +
			'padj0.0' +
			dataPromise.lfcPadj.charAt(2)
	}
)
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
	}
	return reduceData(dataPromise.getGpfDownData)
}

let getData = changeNowData()

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
// 设置选中行数据用于显示Info
getData.then((res) => degParamStore.setOraItem({ [props.regulation]: res.data[0] }))
const changeCurrentEvent: VxeTableEvents.CurrentChange = () => {
	const $grid = xGrid.value
	const currentData = $grid.getCurrentRecord()
	// 设定ora对象值，key为props.regulation，值为currentData
	degParamStore.setOraItem({ [props.regulation]: currentData })
	const scrollDom = document.getElementById(props.regulation + 'EnrichItemAnchor')
	if (scrollDom) {
		scrollDom.scrollIntoView({ behavior: 'smooth' })
	}
}

const searchReset = () => {
	formData.geneId = ''
	const $grid = xGrid.value
	$grid.commitProxy('query')
}
const gridOptions = reactive<VxeGridProps>({
	border: false,
	size: 'small',
	height: 608,
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
		pageSize: 12,
		pageSizes: [12, 50, 100, 200, 500],
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
			field: 'source',
			title: 'source',
			width: '10%',
			minWidth: '80',
			sortable: true,
			filters: [
				{ label: 'GO:BP', value: 'GO:BP' },
				{ label: 'GO:CC', value: 'GO:CC' },
				{ label: 'GO:MF', value: 'GO:MF' },
				{ label: 'KEGG', value: 'KEGG' },
				{ label: 'HP', value: 'HP' },
			],
		},
		{
			field: 'term_id',
			title: 'term_id',
			sortable: true,
			width: '12%',
			type: 'html',
			formatter({ cellValue }) {
				const reg1 = /<span class="keyword-lighten">/g
				const reg2 = /<\/span>/g
				const a = cellValue.replace(reg1, '')
				const cellValueNew = a.replace(reg2, '')

				if (cellValueNew.split(':')[0] === 'GO') {
					const url = 'https://www.ebi.ac.uk/QuickGO/term/'
					return `<a href=${url + cellValueNew} target=_blank>
									${cellValue}
									<img src="${linkSvg}" alt='link' width="18" height="18" style="padding-bottom:4px">
								</a>`
				} else if (cellValueNew.split(':')[0] === 'HP') {
					const url = 'https://hpo.jax.org/app/browse/term/'
					return `<a href=${url + cellValueNew} target=_blank>
									${cellValue}
									<img src="${linkSvg}" alt='link' width="18" height="18" style="padding-bottom:4px">
								</a>`
				} else if (cellValueNew.split(':')[0] === 'KEGG') {
					const url = 'https://www.genome.jp/dbget-bin/www_bget?pathway:map'
					return `<a href=${url + cellValueNew.split(':')[1]} target=_blank>
									${cellValue}
									<img src="${linkSvg}" alt='link' width="18" height="18" style="padding-bottom:4px">
								</a>`
				}
				return cellValue
			},
		},
		{
			field: 'term_name',
			title: 'term_name',
			sortable: true,
			type: 'html',
		},
		{
			field: 'adjusted_p_value',
			title: 'padj(BH)',
			width: '8%',
			sortable: true,
			formatter({ cellValue }) {
				return cellValue.toExponential(3)
			},
		},
		{
			field: 'effective_domain_size',
			title: 'effective_domain_size',
			visible: false,
		},
		{
			field: 'term_size',
			title: 'term_size',
			width: '8%',
			sortable: true,
			visible: true,
		},
		{
			field: 'query_size',
			title: 'query_size',
			sortable: true,
			visible: false,
		},
		{
			field: 'intersection_size',
			title: 'intersection_size',
			width: '14%',
			sortable: true,
			filters: [
				{ label: 'size > 2', value: '2' },
				{ label: 'size > 5', value: '5' },
				{ label: 'size > 10', value: '10' },
			],
			visible: true,
		},
		{
			field: 'rich_factor',
			title: 'rich_factor',
			width: '10%',
			sortable: true,
			visible: true,
			formatter({ cellValue }) {
				return XEUtils.round(cellValue, 3)
			},
		},
		{
			field: 'intersections',
			title: 'intersections',
			type: 'html',
			showOverflow: false,
			visible: false,
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
						const searchProps = ['term_id', 'term_name', 'intersections']
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
			'Enrichment-' +
			switchOption.rereMethodRadio +
			'-' +
			dataPromise.titlePrefix +
			'-lfc' +
			dataPromise.lfcPadj.charAt(0) +
			'padj0.0' +
			dataPromise.lfcPadj.charAt(2),
		mode: 'all',
		modes: ['all', 'current'],
	},
}) // 结束表格配置
</script>
