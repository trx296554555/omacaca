<template>
	<a-collapse
		expand-icon-position="right"
		style="
			border-radius: 4px;
			border: 0;
			margin-bottom: 24px;
			overflow: hidden;
			box-shadow: 0 1px 3px rgba(68, 68, 68, 0.6);
		"
	>
		<a-collapse-panel key="1">
			<template #header><div class="text-xl font-semibold">Summary</div></template>
			<div>
				<strong>Interesting list:&nbsp;</strong>
				{{ dataPromise.titlePrefix }}
				<br />
				<strong>ID type:&nbsp;</strong>
				ensembl_id
				<br />
				<strong>Organism:&nbsp;</strong>
				<i>Macaca mulatta</i>
				<br />
				&emsp;The interesting list contains
				<strong>17,262</strong>
				Ensembl IDs in which
				<strong>14,984</strong>
				Ensembl IDs are unambiguously mapped to Macaca mulatta Gene Symbols and
				<strong>2,278</strong>
				Ensembl IDs can not be mapped to any Gene Symbols.
				<br />
				&emsp;Among the
				<strong>14,984</strong>
				Ensembl IDs,
				<strong>12,974</strong>
				IDs can have annotation information in the selected functional categories, which are
				used for the enrichment analysis.
				<br />
				<br />
				<strong>Log fold change calculated by:&nbsp;</strong>
				Deseq2
				<br />
				<strong>Gene Functional Enrichment method:&nbsp;</strong>
				<span>{{ degParamStore.degParams.analyse.toUpperCase() }}</span>
				<br />

				<strong>Parameters for the enrichment analysis:&nbsp;</strong>
				<br />
				<strong>&emsp;Enrichment Categories:&nbsp;</strong>
				BP, CC, MF, HP, KEGG
				<br />
				<strong>&emsp;Statistical domain scope:&nbsp;</strong>
				Only annotated genes
				<br />
				<strong>&emsp;Significance Level:&nbsp;</strong>
				FDR &lt; 0.01
				<br />
				<strong>&emsp;FDR Method:&nbsp;</strong>
				BH
				<br />
				<strong>&emsp;GSEA Pathway database version:&nbsp;</strong>
				MSigDB (v7.5) (not the latest)
				<br />
				<br />
				&emsp;Based on the above parameters, In the comparison of
				<strong>{{ degParamStore.degParams.groups[0] }}</strong>
				and
				<strong>{{ degParamStore.degParams.groups[1] }}</strong>
				, After the GSEA enrichment analysis,
				<strong>{{ resultList.enrich_up }}</strong>
				positive related categories and
				<strong>{{ resultList.enrich_down }}</strong>
				negative related categories are identified as enriched categories and all are shown
				in this report.
			</div>
		</a-collapse-panel>
	</a-collapse>
</template>

<script setup lang="ts">
// 数据获取
import { inject, onMounted, reactive, ref, watch } from 'vue'
import { useDegParamStore } from '@/store/modules/ltbmDegParam'

const degParamStore = useDegParamStore()

const dataPromise = inject('dataPromise') as any

const resultList = reactive({ enrich_up: 1, enrich_down: 1 })

onMounted(() => {
	// 挂载后更新deg 和 enrich的统计数据
	dataPromise.getGseaData.then((res: any) => {
		// 统计 res.data 中 nes > 0 的个数
		resultList.enrich_up = res.data.filter((item: any) => item.nes > 0).length
		resultList.enrich_down = res.data.filter((item: any) => item.nes < 0).length
	})
})
</script>
