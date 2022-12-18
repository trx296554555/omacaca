<template>
	<div id="OraResults" class="OraResults">
		<div class="h-12 md:h-16"></div>
		<div class="OraResTitle">
			<h2>{{ title }}</h2>
			<div>
				<a-select
					v-model:value="lfcPadj"
					:options="lfcPadjList"
					style="width: 10rem"
				></a-select>
			</div>
		</div>
		<div>
			<a-collapse :bordered="true" expand-icon-position="right">
				<a-collapse-panel key="1">
					<template #header><strong>Summary</strong></template>
					<div>
						<strong>Enrichment method</strong>
						: GSEA
						<br />
						<strong>Organism</strong>
						:
						<i>Macaca mulatta</i>
						<br />
						<strong>Enrichment Categories</strong>
						: BP,CC,MF,HP,KEGG
						<br />
						<strong>Interesting list</strong>
						: {{ title }}
						<strong>ID type</strong>
						: ensembl_id
						<br />
						&emsp;The interesting list contains
						<strong>17,262</strong>
						Ensembl IDs in which
						<strong>14,984</strong>
						Ensembl IDs are unambiguously mapped to Macaca mulatta Gene Symbols and
						<strong>2,278</strong>
						Ensembl IDs can not be mapped to any Gene Symbols.
						<br />
						<!-- The GO Slim summary are based upon the 11464 unique entrezgene IDs. -->
						&emsp;Among the
						<strong>14,984</strong>
						Ensembl IDs,
						<strong>12,974</strong>
						IDs can have annotation information in the selected functional categories,
						which are used for the enrichment analysis.
						<br />
						<br />
						<strong>Parameters for the enrichment analysis</strong>
						:
						<br />
						<strong>&emsp;Minimum number of IDs in the category</strong>
						: 10
						<br />
						<strong>&emsp;Maximum number of IDs in the category</strong>
						: 500
						<br />
						<strong>&emsp;Significance Level</strong>
						: FDR&lt;0.01
						<br />
						<strong>&emsp;Number of permutation</strong>
						: 1000
						<br />
						<br />
						&emsp;Based on the above parameters,
						<strong>{{ up_res_num }}</strong>
						positive related categories and
						<strong>{{ down_res_num }}</strong>
						negative related categories are identified as enriched categories and all
						are shown in this report.
					</div>
				</a-collapse-panel>
			</a-collapse>
		</div>
		<div>ora deg res</div>
		<div>up-enrichment res</div>
		<div>down-enrichment res</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDegParamStore, ModelType, GenderType, GroupType } from '@/store/modules/ltbmDegParam'
import { useRoute } from 'vue-router'
import type { SelectProps } from 'ant-design-vue'

const degParamStore = useDegParamStore()
// 当前页面路由
const thisRoute = useRoute()
const model = thisRoute.query.model as ModelType
const isFull = thisRoute.query.isFull
const gender = thisRoute.query.gender as GenderType
const g1 = thisRoute.query.g1 as GroupType
const g2 = thisRoute.query.g2 as GroupType
degParamStore.setDegParam({ model, full: isFull === 'T', gender, groups: [g1, g2] })
// 修改页面title
const title = ref(g1 + 'vs' + g2 + '-' + model + isFull + gender + '-OraResult')
document.title = title.value
// ora 可选参数下拉
const lfcPadj = ref('1-1')

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
</script>

<style scoped lang="less">
.OraResults {
	@apply Container;
}
.OraResTitle {
	@apply flex items-center;
	h2 {
		@apply text-3xl font-semibold py-6 pr-4;
	}
}
</style>
