<template>
	<vxe-table
		ref="DegSelTable"
		border
		stripe
		auto-resize
		align="center"
		class="degTable-style"
		:header-cell-class-name="headerCellClassName"
		:cell-class-name="cellClassName"
		:row-config="{ isHover: true }"
		:data="tableData.data"
		:checkbox-config="TableConfig.tableCheckboxConfig"
		:tooltip-config="TableConfig.tableTooltipConfig"
		:merge-cells="TableConfig.mergeCells"
		@checkbox-change="selectChangeEvent"
	>
		<vxe-column
			v-if="degParamStore.$state.degParams.model == 'M3'"
			type="checkbox"
			field="cd"
			width="100"
			:title="t('ltbm_dega.condition')"
		></vxe-column>
		<vxe-column
			v-if="degParamStore.$state.degParams.model != 'M3'"
			type="checkbox"
			field="id"
			width="100"
			:title="t('ltbm_dega.stage')"
		></vxe-column>
		<vxe-column field="age" width="100" :title="t('ltbm_dega.age')"></vxe-column>

		<vxe-colgroup :title="`${t('ltbm_dega.sample')} (${t('ltbm_dega.female')})`">
			<vxe-column field="s1" title="01"></vxe-column>
			<vxe-column field="s2" title="02"></vxe-column>
			<vxe-column field="s3" title="03"></vxe-column>
			<vxe-column field="s4" title="04"></vxe-column>
			<vxe-column field="s5" title="05"></vxe-column>
			<vxe-column field="s6" title="06"></vxe-column>
			<vxe-column field="s7" title="07"></vxe-column>
			<vxe-column field="s8" title="08"></vxe-column>
			<vxe-column field="s9" title="09"></vxe-column>
			<vxe-column field="s10" title="10"></vxe-column>
		</vxe-colgroup>
		<vxe-colgroup :title="`${t('ltbm_dega.sample')} (${t('ltbm_dega.male')})`">
			<vxe-column field="s11" title="11"></vxe-column>
			<vxe-column field="s12" title="12"></vxe-column>
			<vxe-column field="s13" title="13"></vxe-column>
			<vxe-column field="s14" title="14"></vxe-column>
			<vxe-column field="s15" title="15"></vxe-column>
			<vxe-column field="s16" title="16"></vxe-column>
			<vxe-column field="s17" title="17"></vxe-column>
			<vxe-column field="s18" title="18"></vxe-column>
			<vxe-column field="s19" title="19"></vxe-column>
			<vxe-column field="s20" title="20"></vxe-column>
			<vxe-column field="s21" title="21"></vxe-column>
		</vxe-colgroup>
	</vxe-table>
</template>

<script setup lang="ts">
import { watch, onMounted, reactive, ref, computed } from 'vue'
import { VxeTablePropTypes, VxeTableInstance, VxeTableEvents, VxeTableDefines } from 'vxe-table'
import XEUtils from 'xe-utils'
import { useI18n } from '@/tools/useI18n'
import { useDegParamStore, GroupType } from '@/store/modules/ltbmDegParam'

// 翻译设置
const { t } = useI18n()
// 表格实例
const DegSelTable = ref<VxeTableInstance>()
// 表格配置
const TableConfig = reactive({
	tableCheckboxConfig: {
		labelField: 'id',
		checkStrictly: true,
		highlight: true,
		trigger: 'row',
	} as VxeTablePropTypes.CheckboxConfig,
	tableTooltipConfig: {
		showAll: true,
		enterable: true,
		contentMethod: ({ type, column, row, items, _columnIndex }) => {
			if (type === 'header') {
				return ''
			}
			const cell = row.id + column.title
			// 重写默认的提示内容
			if (deathSampleList.indexOf(cell) !== -1) {
				return `${cell}: ${t('ltbm_dega.table_tooltip_death')}`
			} else if (removeSampleList.indexOf(cell) !== -1) {
				return `${cell}: ${t('ltbm_dega.table_tooltip_remove')}`
			} else if (pollutionList.indexOf(cell) !== -1) {
				return `${cell}: ${t('ltbm_dega.table_tooltip_population')}`
			}
			// 返回空字符串，控制单元格不显示提示内容
			return ''
		},
	} as VxeTablePropTypes.TooltipConfig,
	mergeCells: [] as VxeTablePropTypes.MergeCells,
	maxCheckNum: 2,
})

// 表格自定义样式
const deathSampleList = ['BCRG03', 'BCRG20']
const removeSampleList = ['BCRA04', 'BCRA05']
const pollutionList = ['MCR04']

const headerCellClassName: VxeTablePropTypes.HeaderCellClassName = ({ column }) => {
	return 'col-primary'
}
const cellClassName: VxeTablePropTypes.CellClassName = ({ row, column }) => {
	const cell = row.id + column.title
	// console.log(column)
	if (deathSampleList.indexOf(cell) !== -1) {
		return 'col-default'
	} else if (removeSampleList.indexOf(cell) !== -1) {
		return 'col-default'
	} else if (pollutionList.indexOf(cell) !== -1) {
		return 'col-default'
	}
	return null
}

// 表格数据
const babyData = [
	{
		cd: 'C1',
		id: 'BCRA',
		age: '6 months',
		s1: '01',
		s2: '02',
		s3: '03',
		s4: '04',
		s5: '05',
		s6: '06',
		s7: '07',
		s8: '08',
		s9: '09',
		s10: '10',
		s11: '11',
		s12: '12',
		s13: '13',
		s14: '14',
		s15: '15',
		s16: '16',
		s17: '17',
		s18: '18',
		s19: '19',
		s20: '20',
		s21: '21',
	},
	{
		cd: 'C2',
		id: 'BCRB',
		age: '6.5 months',
		s1: '01',
		s2: '02',
		s3: '03',
		s4: '04',
		s5: '05',
		s6: '06',
		s7: '07',
		s8: '08',
		s9: '09',
		s10: '10',
		s11: '11',
		s12: '12',
		s13: '13',
		s14: '14',
		s15: '15',
		s16: '16',
		s17: '17',
		s18: '18',
		s19: '19',
		s20: '20',
		s21: '21',
	},
	{
		cd: 'C2',
		id: 'BCRC',
		age: '7.5 months',
		s1: '01',
		s2: '02',
		s3: '03',
		s4: '04',
		s5: '05',
		s6: '06',
		s7: '07',
		s8: '08',
		s9: '09',
		s10: '10',
		s11: '11',
		s12: '12',
		s13: '13',
		s14: '14',
		s15: '15',
		s16: '16',
		s17: '17',
		s18: '18',
		s19: '19',
		s20: '20',
		s21: '21',
	},
	{
		cd: 'C3',
		id: 'BCRD',
		age: '8.5 months',
		s1: '01',
		s2: '02',
		s3: '03',
		s4: '04',
		s5: '05',
		s6: '06',
		s7: '07',
		s8: '08',
		s9: '09',
		s10: '10',
		s11: '11',
		s12: '12',
		s13: '13',
		s14: '14',
		s15: '15',
		s16: '16',
		s17: '17',
		s18: '18',
		s19: '19',
		s20: '20',
		s21: '21',
	},
	{
		cd: 'C4',
		id: 'BCRE',
		age: '9.5 months',
		s1: '01',
		s2: '02',
		s3: '03',
		s4: '04',
		s5: '05',
		s6: '06',
		s7: '07',
		s8: '08',
		s9: '09',
		s10: '10',
		s11: '11',
		s12: '12',
		s13: '13',
		s14: '14',
		s15: '15',
		s16: '16',
		s17: '17',
		s18: '18',
		s19: '19',
		s20: '20',
		s21: '21',
	},
	{
		cd: 'C5',
		id: 'BCRF',
		age: '14.5 months',
		s1: '01',
		s2: '02',
		s3: '03',
		s4: '04',
		s5: '05',
		s6: '06',
		s7: '07',
		s8: '08',
		s9: '09',
		s10: '10',
		s11: '11',
		s12: '12',
		s13: '13',
		s14: '14',
		s15: '15',
		s16: '16',
		s17: '17',
		s18: '18',
		s19: '19',
		s20: '20',
		s21: '21',
	},
	{
		cd: 'C5',
		id: 'BCRG',
		age: '21.5 months',
		s1: '01',
		s2: '02',
		s3: '03',
		s4: '04',
		s5: '05',
		s6: '06',
		s7: '07',
		s8: '08',
		s9: '09',
		s10: '10',
		s11: '11',
		s12: '12',
		s13: '13',
		s14: '14',
		s15: '15',
		s16: '16',
		s17: '17',
		s18: '18',
		s19: '19',
		s20: '20',
		s21: '21',
	},
]
const adultData = [
	{
		cd: 'C6',
		id: 'MCR',
		age: '7 years avg',
		s1: '01',
		s2: '02',
		s3: '03',
		s4: '04',
		s5: '05',
		s6: '06',
		s7: '07',
		s8: '08',
		s9: '09',
		s10: '10',
		s11: '11',
		s12: '12',
		s13: '13',
		s14: '14',
		s15: '15',
		s16: '16',
		s17: '17',
		s18: '18',
		s19: '19',
		s20: '20',
		s21: '21',
	},
	{
		cd: 'C6',
		id: 'OCR',
		age: '8 years avg',
		s1: '01',
		s2: '02',
		s3: '03',
		s4: '04',
		s5: '05',
		s6: '06',
		s7: '07',
		s8: '08',
		s9: '09',
		s10: '10/11',
		s11: '12',
		s12: '13',
		s13: '14',
		s14: '15',
		s15: '16',
		s16: '17',
		s17: '18',
		s18: '19',
		s19: '20',
		s20: '21',
		s21: '22',
	},
]
const tableData = reactive({ data: [...babyData] })
const maleList = ['s11', 's12', 's13', 's14', 's15', 's16', 's17', 's18', 's19', 's20', 's21']
const femaleList = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10']

// 根据options调整表格显示情况
const degParamStore = useDegParamStore()

// 调整表格的核心逻辑
const changeTable = () => {
	if (DegSelTable.value === undefined) {
		console.log('没找到表格对象实例!')
		return null
	}
	const $table = DegSelTable.value
	const columns = $table?.getTableColumn().fullColumn
	const sex = degParamStore.$state.degParams.gender
	const mod = degParamStore.$state.degParams.model
	degParamStore.setDegParam({ groups: [] })
	TableConfig.maxCheckNum = 2
	// 模式切换逻辑
	if (mod === 'M1') {
		tableData.data = [...babyData]
		TableConfig.tableCheckboxConfig.labelField = 'id'
	} else if (mod === 'M2') {
		tableData.data = [...babyData]
		TableConfig.tableCheckboxConfig.labelField = 'id'
		if (degParamStore.$state.degParams.full) {
			TableConfig.maxCheckNum = 5
			$table?.setCheckboxRow(tableData.data, true)
			degParamStore.setDegParam({ groups: ['BCRALLF', 'BCRALLM'] })
		} else {
			$table?.clearCheckboxRow()
			TableConfig.maxCheckNum = 1
		}
	} else if (mod === 'M3') {
		tableData.data = [...babyData]
		TableConfig.tableCheckboxConfig.labelField = 'cd'
		TableConfig.mergeCells = [
			{ row: 1, col: 0, rowspan: 2, colspan: 1 },
			{ row: 5, col: 0, rowspan: 2, colspan: 1 },
		]
	} else if (mod === 'M4') {
		tableData.data = [...babyData, ...adultData]
		TableConfig.tableCheckboxConfig.labelField = 'id'
	} else {
		console.log('新的model，待扩展')
	}
	// 性别切换逻辑
	columns.forEach((col) => {
		col.visible = true
	})
	if (sex === 'm') {
		columns.forEach((col) => {
			if (femaleList.includes(col.field)) {
				col.visible = false
			}
		})
	} else if (sex === 'f') {
		columns.forEach((col) => {
			if (maleList.includes(col.field)) {
				col.visible = false
			}
		})
	}
	$table?.refreshColumn()
}
// 表格绑定事件
// const cellClickEvent: VxeTableEvents.CellClick = ({ column, row }) => {
// 	console.log(`单元格点击${column.title}`, row.id)
// }
// 表格checkBox选中事件
const selectChangeEvent: VxeTableEvents.CheckboxChange = ({ checked, row }) => {
	if (DegSelTable.value === undefined) {
		console.log('没找到表格对象实例!')
		return null
	}
	const $table = DegSelTable.value
	const mod = degParamStore.$state.degParams.model
	const ful = degParamStore.$state.degParams.full
	const records = $table?.getCheckboxRecords()
	console.log(checked ? '勾选事件' : '取消事件', records, row)
	// 超出当前可选最大数量触发提示
	if (mod !== 'M3') {
		if (records.length > TableConfig.maxCheckNum) {
			alert(TableConfig.maxCheckNum)
			$table?.toggleCheckboxRow(row)
			return null
		}
	} else if (
		checked &&
		degParamStore.$state.degParams.groups.length === TableConfig.maxCheckNum
	) {
		alert(TableConfig.maxCheckNum)
		$table?.toggleCheckboxRow(row)
		return null
	}
	// 具体每个选择更新groups逻辑
	if (mod === 'M1' || mod === 'M4') {
		// M1和M4最大可选两个，填入对应stage
		checked
			? degParamStore.$state.degParams.groups.push(row.id)
			: XEUtils.remove(degParamStore.$state.degParams.groups, (item) => item === row.id)
	} else if (mod === 'M2' && !ful) {
		// M2T不考虑，M2F最大可选1个，填入对应stage+M/F
		const t1 = `${row.id}F` as GroupType
		const t2 = (row.id + 'M') as GroupType
		degParamStore.setDegParam({ groups: [t1, t2] })
	} else if (mod === 'M3') {
		// M3选两个但是要合并显示
		if (row.id === 'BCRB') {
			$table?.toggleCheckboxRow(tableData.data[2])
		} else if (row.id === 'BCRC') {
			$table?.toggleCheckboxRow(tableData.data[1])
		} else if (row.id === 'BCRF') {
			$table?.toggleCheckboxRow(tableData.data[6])
		} else if (row.id === 'BCRG') {
			$table?.toggleCheckboxRow(tableData.data[5])
		}
		checked
			? degParamStore.$state.degParams.groups.push(row.cd)
			: XEUtils.remove(degParamStore.$state.degParams.groups, (item) => item === row.cd)
	}
}

// 组件渲染时默认触发一次
onMounted(() => {
	changeTable()
})

// 监听degParam状态变化，改变触发changeOptions
// degParamStore.$subscribe((mutation, state) => {
// 	changeTable()
// })
watch(
	() => degParamStore.degParams.model,
	(newV, oldV) => {
		changeTable()
	}
)
watch(
	() => degParamStore.degParams.gender,
	(newV, oldV) => {
		changeTable()
	}
)
watch(
	() => degParamStore.degParams.full,
	(newV, oldV) => {
		changeTable()
	}
)
watch(
	() => degParamStore.degParams.groups,
	(newV, oldV) => {
		// 清空groups时取消勾选
		if (DegSelTable.value === undefined) {
			console.log('没找到表格对象实例!')
			return null
		}
		const $table = DegSelTable.value
		if (degParamStore.$state.degParams.groups.length === 0) {
			$table?.clearCheckboxRow()
		}
	}
)
</script>
