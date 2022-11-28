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
		:data="tableData"
		:checkbox-config="TableConfig.ableCheckboxConfig"
		:tooltip-config="TableConfig.tableTooltipConfig"
		@cell-click="cellClickEvent"
		@checkbox-change="selectChangeEvent"
	>
		<vxe-column type="checkbox" width="100" title="Stage"></vxe-column>

		<vxe-colgroup title="Sample (female)">
			<vxe-column field="s1" title="01" :visible="false"></vxe-column>
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
		<vxe-colgroup title="Sample (male)">
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
import { defineComponent, onMounted, reactive, ref, computed } from 'vue'
import { VxeTablePropTypes, VxeTableInstance, VxeTableEvents } from 'vxe-table'
import XEUtils from 'xe-utils'
import { useI18n } from '@/tools/useI18n'
import { useDegParamStore } from '@/store/modules/ltbmDegParam'

// 翻译设置
const { t } = useI18n()
// 表格配置
const TableConfig = reactive({
	ableCheckboxConfig: {
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
const tableData = ref([
	{
		id: 'BCRA',
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
		id: 'BCRB',
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
		id: 'BCRC',
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
		id: 'BCRD',
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
		id: 'BCRE',
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
		id: 'BCRF',
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
		id: 'BCRG',
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
])

// 表格绑定事件
const DegSelTable = ref<VxeTableInstance>()

const cellClickEvent: VxeTableEvents.CellClick = ({ column, row }) => {
	console.log(`单元格点击${column.title}`, row.id)
}
const selectChangeEvent: VxeTableEvents.CheckboxChange = ({ checked, row }) => {
	const $table = DegSelTable.value
	const records = $table.getCheckboxRecords()
	console.log(checked ? '勾选事件' : '取消事件', records)
	if (records.length > 2) {
		alert('123')
		$table.toggleCheckboxRow(row)
	}
}
const degParamStore = useDegParamStore()
degParamStore.$subscribe((mutation, state) => {
	console.log(state, '111')
})
</script>

<style scoped lang="less"></style>
