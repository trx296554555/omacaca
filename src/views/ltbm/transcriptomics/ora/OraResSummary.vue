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
				<strong>DEG Detection method:&nbsp;</strong>
				Deseq2
				<br />
				<strong>Parameters for DEG Detection:&nbsp;</strong>
				<br />
				<strong>&emsp;Design Formula:&nbsp;</strong>
				{{ designFormulaList[degParamStore.degParams.model] }}
				<br />
				<strong>&emsp;log2 Fold Change Threshold:&nbsp;</strong>
				{{ dataPromise.lfcPadj.charAt(0) }}
				<br />
				<strong>&emsp;Significance Threshold:&nbsp;</strong>
				FDR &lt; 0.0{{ dataPromise.lfcPadj.charAt(2) }}
				<br />
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
				FDR &lt; {{ degParamStore.degParams.padj }}
				<br />
				<strong>&emsp;FDR Method:&nbsp;</strong>
				BH
				<br />
				<strong>&emsp;g:Profiler database version:&nbsp;</strong>
				e107_eg54_p17_4c13d1d
				<br />
				<br />
				&emsp;Based on the above parameters, In the comparison of
				<strong>{{ degParamStore.degParams.groups[0] }}</strong>
				and
				<strong>{{ degParamStore.degParams.groups[1] }}</strong>
				,
				<strong>{{ resultList.deg_up }}</strong>
				up-regulated genes and
				<strong>{{ resultList.deg_down }}</strong>
				down-regulated genes were found. After the enrichment analysis,
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

const designFormulaList = ref({
	M1: '~ sex + stage',
	M2: '~ stage + sex',
	M3: '~ sex + condition',
	M4: '~ sex + stage',
})

const resultList = reactive({ deg_up: 1, deg_down: 2, enrich_up: 1, enrich_down: 2 })

onMounted(() => {
	// 挂载后更新deg 和 enrich的统计数据
	dataPromise.getDegData.then((res: any) => {
		// 统计res.data 中log2FoldChange > 0 的个数
		resultList.deg_up = res.data.filter((item: any) => item.log2FoldChange > 0).length
		resultList.deg_down = res.data.filter((item: any) => item.log2FoldChange < 0).length
	})
	dataPromise.getGpfUpData.then((res: any) => {
		resultList.enrich_up = res.data.length
	})
	dataPromise.getGpfDownData.then((res: any) => {
		resultList.enrich_down = res.data.length
	})
})

watch(
	() => dataPromise.lfcPadj,
	() => {
		// degParamStore.degParams 更新后更新deg 和 enrich的统计数据
		dataPromise.getDegData.then((res: any) => {
			// 统计res.data 中log2FoldChange > 0 的个数
			resultList.deg_up = res.data.filter((item: any) => item.log2FoldChange > 0).length
			resultList.deg_down = res.data.filter((item: any) => item.log2FoldChange < 0).length
		})
		dataPromise.getGpfUpData.then((res: any) => {
			resultList.enrich_up = res.data.length
		})
		dataPromise.getGpfDownData.then((res: any) => {
			resultList.enrich_down = res.data.length
		})
	}
)
</script>
