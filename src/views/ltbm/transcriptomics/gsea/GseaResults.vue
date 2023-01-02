<template>
	<div id="GseaResults" class="GseaResults">
		<div class="h-12 md:h-16"></div>
		<div class="GseaResTitle">
			<h2>{{ title }}</h2>
		</div>
		<GseaResSummary></GseaResSummary>
		<div class="GseaEnrichRes">
			<h2>GSEA Enrichment Results</h2>
			<GseaEnrichRes regulation="none"></GseaEnrichRes>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, provide } from 'vue'
import { useDegParamStore, ModelType, GenderType, GroupType } from '@/store/modules/ltbmDegParam'
import { useRoute } from 'vue-router'
import GseaResSummary from './GseaResSummary.vue'
import GseaEnrichRes from './GseaEnrichRes.vue'
import { getGseaRes } from '@/api/degres'

const degParamStore = useDegParamStore()
// 当前页面路由
const thisRoute = useRoute()
const model = thisRoute.query.model as ModelType
const isFull = thisRoute.query.isFull
const gender = thisRoute.query.gender as GenderType
const comp1 = thisRoute.query.g1 as GroupType
const comp2 = thisRoute.query.g2 as GroupType
degParamStore.setDegParam({
	analyse: 'gsea',
	model,
	full: isFull === 'T',
	gender,
	groups: [comp1, comp2],
})

// Gsea Deg 结果获取 子组件需要的数据
interface dataPromiseType {
	titlePrefix: string
	getGseaData?: Promise<any>
}

const dataPromise = reactive<dataPromiseType>({
	titlePrefix: comp1 + 'vs' + comp2 + '-' + model + isFull + gender,
})
provide('dataPromise', dataPromise)

// 修改页面title
const title = ref(dataPromise.titlePrefix + '-GseaResult')
document.title = title.value

function renewData() {
	const modelType = model + isFull + gender
	dataPromise.getGseaData = getGseaRes({
		model_type: modelType,
		comp1,
		comp2,
	})
}

renewData()
</script>

<style scoped lang="less">
.GseaResults {
	@apply Container;

	h2 {
		@apply text-base md:text-3xl font-semibold py-4;
	}
}

.GseaResTitle {
	@apply flex items-center;

	h2 {
		@apply pr-4;
	}
}

.GseaDegRes {
	@apply grid grid-cols-5 gap-8;
}

.GseaEnrichRes {
	@apply my-4;
}
</style>
