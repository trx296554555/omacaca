<template>
	<div :id="'GseaErcTable' + regulation">
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
import { reactive, ref, inject, watch } from 'vue'
import { VxeGridInstance, VxeGridProps, VxeTableEvents } from 'vxe-table'
import XEUtils from 'xe-utils'
import { SearchOutlined } from '@ant-design/icons-vue'
import linkSvg from '@/assets/icons/link.svg'
import { useDegParamStore } from '@/store/modules/ltbmDegParam'

const props = defineProps({
	regulation: {
		type: String,
		default: 'none',
		required: true,
	},
})
// 设置当前选中项
const degParamStore = useDegParamStore()

// 数据获取
const dataPromise = inject('dataPromise') as any
const switchOption = inject('switchOption') as any
watch(
	() => switchOption.rereMethodRadio,
	() => {
		getData = reduceData(dataPromise.getGseaData)
		const $grid = xGrid.value
		$grid.commitProxy('query')
		// @ts-ignore
		gridOptions.exportConfig.filename =
			'Gsea-Enrichment-' + switchOption.rereMethodRadio + '-' + dataPromise.titlePrefix
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

let getData = reduceData(dataPromise.getGseaData)

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
		const filterData = filterMethod(filterList)
		return filterData
	}
}
const xGrid = ref({} as VxeGridInstance)
const searchEvent = () => {
	const $grid = xGrid.value
	$grid.commitProxy('query')
}
// 设置选中行数据用于显示Info
const getBarcodeUrl = (RowData) => {
	return `https://www.omacaca.com/resource/GSEA/${
		dataPromise.titlePrefix.split('-')[1]
	}/${dataPromise.titlePrefix.split('-')[0].replace('vs', '_VS_')}/BarcodePlots/${
		RowData.msigdb_id
	}.png`
}
getData.then((res) =>
	degParamStore.setGseaItem({ ...res.data[0], barcodePngUrl: getBarcodeUrl(res.data[0]) })
)
const changeCurrentEvent: VxeTableEvents.CurrentChange = () => {
	const $grid = xGrid.value
	const currentData = $grid.getCurrentRecord()
	degParamStore.setGseaItem({ ...currentData, barcodePngUrl: getBarcodeUrl(currentData) })
}

const searchReset = () => {
	formData.geneId = ''
	const $grid = xGrid.value
	$grid.commitProxy('query')
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
		pageSizes: [15, 50, 100, 200, 500],
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
				} else if (cellValueNew.indexOf('hsa') !== -1) {
					const url = 'https://www.genome.jp/entry/pathway+'
					return `<a href=${url + cellValueNew} target=_blank>
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
			field: 'msigdb_id',
			title: 'MSigDB ID',
			visible: false,
			type: 'html',
		},
		{
			field: 'setsize',
			title: 'setsize',
			width: '8%',
			sortable: true,
			visible: true,
		},
		{
			field: 'leading_edge_number',
			title: 'LE Size',
			visible: true,
			sortable: true,
			width: '8%',
			type: 'html',
		},
		{
			field: 'enrichmentscore',
			title: 'ES',
			sortable: true,
			visible: false,
			type: 'html',
		},
		{
			field: 'nes',
			title: 'NES',
			sortable: true,
			width: '10%',
			filters: [
				{
					label: 'Up-regulation',
					value: 'up',
				},
				{
					label: 'Down-regulation',
					value: 'down',
				},
			],
			type: 'html',
			formatter({ cellValue }) {
				return Number(cellValue).toFixed(4)
			},
		},
		{
			field: 'pvalue',
			title: 'pvalue',
			visible: false,
			type: 'html',
		},
		{
			field: 'p_adjust',
			title: 'FDR',
			sortable: true,
			width: '8%',
			formatter({ cellValue }) {
				return cellValue.toExponential(3)
			},
			type: 'html',
		},
		{
			field: 'qvalues',
			title: 'qvalues',
			visible: false,
		},
		{
			field: 'rank',
			title: 'rank',
			visible: false,
		},
		{
			field: 'leading_edge',
			title: 'leading_edge',
			visible: false,
		},
		{
			field: 'core_enrichment',
			title: 'core_enrichment',
			visible: false,
		},
		{
			field: 'rich_factor',
			title: 'rich_factor',
			width: '10%',
			sortable: true,
			visible: true,
			formatter({ cellValue }) {
				return Number(cellValue).toFixed(4)
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
		filename: 'Gsea-Enrichment-' + switchOption.rereMethodRadio + '-' + dataPromise.titlePrefix,
		mode: 'all',
		modes: ['all', 'current'],
	},
}) // 结束表格配置
</script>
