<template>
	<div id="OraResults" class="OraResults">
		<div class="h-12 md:h-16"></div>
		<div class="OraResTitle">
			<h2>{{ title }}</h2>
			<div>
				<a-select
					v-model:value="dataPromise.lfcPadj"
					:options="lfcPadjList"
					style="width: 10rem"
				></a-select>
			</div>
		</div>
		<OraResSummary></OraResSummary>
		<div class="OraDegRes">
			<OraDegTable class="col-span-5 md:col-span-3"></OraDegTable>
			<OraDegChart class="col-span-5 md:col-span-2"></OraDegChart>
		</div>
		<div class="OraEnrichRes">
			<h2>Up-regulation Gene Enrichment Results</h2>
			<OraEnrichRes regulation="up"></OraEnrichRes>
		</div>
		<div class="OraEnrichRes">
			<h2>Down-regulation Gene Enrichment Results</h2>
			<OraEnrichRes regulation="down"></OraEnrichRes>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, provide } from 'vue'
import { useDegParamStore, ModelType, GenderType, GroupType } from '@/store/modules/ltbmDegParam'
import { useRoute } from 'vue-router'
import type { SelectProps } from 'ant-design-vue'
import OraResSummary from './OraResSummary.vue'
import OraDegTable from './OraDegTable.vue'
import OraDegChart from '../../components/VolcanoPlot.vue'
import OraEnrichRes from './OraEnrichRes.vue'
import { getDegRes, getGpfRes } from '@/api/degres'

const degParamStore = useDegParamStore()
// 当前页面路由
const thisRoute = useRoute()
const model = thisRoute.query.model as ModelType
const isFull = thisRoute.query.isFull
const gender = thisRoute.query.gender as GenderType
const comp1 = thisRoute.query.g1 as GroupType
const comp2 = thisRoute.query.g2 as GroupType
degParamStore.setDegParam({ model, full: isFull === 'T', gender, groups: [comp1, comp2] })

// ora 可选参数下拉
const lfcPadjList = ref<SelectProps['options']>([
	{
		label: 'Log2FoldChange 1',
		options: [
			{ label: 'LogFC1 padj0.05', value: '1-5' },
			{ label: 'LogFC1 padj0.01', value: '1-1' },
		],
	},
	{
		label: 'Log2FoldChange 2',
		options: [
			{ label: 'LFC2 padj0.05', value: '2-5' },
			{ label: 'LFC2 padj0.01', value: '2-1' },
		],
	},
])
// Ora Deg 结果获取 子组件需要的数据
interface dataPromiseType {
	titlePrefix: string
	getDegData?: Promise<any>
	getGpfUpData?: Promise<any>
	getGpfDownData?: Promise<any>
	lfcPadj: string
}

const dataPromise = reactive<dataPromiseType>({
	titlePrefix: comp1 + 'vs' + comp2 + '-' + model + isFull + gender,
	lfcPadj: '1-1',
})
provide('dataPromise', dataPromise)

// 修改页面title
const title = ref(dataPromise.titlePrefix + '-OraResult')
document.title = title.value

function renewData() {
	const modelType = model + (isFull ? 'T' : 'F') + gender
	dataPromise.getDegData = getDegRes({
		model_type: modelType,
		comp1,
		comp2,
		min_lfc: parseFloat(dataPromise.lfcPadj.split('-')[0]),
		max_padj: parseFloat(dataPromise.lfcPadj.split('-')[1]) / 100,
	})
	dataPromise.getGpfUpData = getGpfRes({
		model_type: modelType,
		comp1,
		comp2,
		lfc_threshold: parseFloat(dataPromise.lfcPadj.split('-')[0]),
		padj_threshold: parseFloat(dataPromise.lfcPadj.split('-')[1]) / 100,
		regulation: 'up',
	})
	dataPromise.getGpfDownData = getGpfRes({
		model_type: modelType,
		comp1,
		comp2,
		lfc_threshold: parseFloat(dataPromise.lfcPadj.split('-')[0]),
		padj_threshold: parseFloat(dataPromise.lfcPadj.split('-')[1]) / 100,
		regulation: 'down',
	})
}
renewData()

watch(
	() => dataPromise.lfcPadj,
	() => {
		renewData()
		console.log(dataPromise)
	}
)
</script>

<style scoped lang="less">
.OraResults {
	@apply Container;
	h2 {
		@apply text-base md:text-3xl font-semibold py-4;
	}
}
.OraResTitle {
	@apply flex items-center;
	h2 {
		@apply pr-4;
	}
}
.OraDegRes {
	@apply grid grid-cols-5 gap-8;
}
.OraEnrichRes {
	@apply my-4;
}
</style>
