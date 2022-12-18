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
				<strong>Enrichment method:&nbsp;</strong>
				<span>ORA</span>
				<br />
				<strong>Organism:&nbsp;</strong>
				<i>Macaca mulatta</i>
				<br />
				<strong>Enrichment Categories:&nbsp;</strong>
				BP, CC, MF, HP, KEGG
				<br />
				<strong>Interesting list:&nbsp;</strong>
				: {{ title }}
				<strong>ID type:&nbsp;</strong>
				ensembl_id
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
				IDs can have annotation information in the selected functional categories, which are
				used for the enrichment analysis.
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
				negative related categories are identified as enriched categories and all are shown
				in this report.
			</div>
		</a-collapse-panel>
	</a-collapse>
</template>

<script>
export default {
	name: 'OraResSummary',
}
</script>
