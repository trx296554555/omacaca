<template>
	<div>
		<h4 class="title">
			Gene Set:
			<a :href="getTermLink(termDetailInfo.term_id)" target="_blank">
				{{ termDetailInfo.term_id }}
				<img
					src="@/assets/icons/link.svg"
					alt="link"
					width="24"
					height="24"
					style="padding-bottom: 4px"
				/>
			</a>
			{{ termDetailInfo.term_name }}
		</h4>
		<div class="ItemInfo">
			<div class="ItemStatistic">
				<a-statistic title="Database Source" :value="termDetailInfo.source" />

				<a-statistic
					title="FDR"
					:value="termDetailInfo.p_adjust"
					:formatter="({ value }) => toScientificNotation(value)"
				/>
				<a-statistic
					title="Q-value"
					:value="termDetailInfo.qvalues"
					:formatter="({ value }) => toScientificNotation(value)"
				/>
				<a-statistic
					title="Enrichment Score"
					:value="termDetailInfo.enrichmentscore"
					:precision="5"
				/>
				<a-statistic
					title="Normalized Enrichment Score"
					:value="termDetailInfo.nes"
					:precision="5"
				/>
				<a-statistic title="Term Size" :value="termDetailInfo.setsize" />
				<a-statistic
					title="Leading Edge Number"
					:value="termDetailInfo.leading_edge_number"
				/>
				<a-statistic
					title="Rich Factor"
					:value="termDetailInfo.rich_factor"
					:formatter="({ value }) => toScientificNotation(value)"
				/>
				<a-statistic
					title="Retained After AP"
					:value="termDetailInfo.represent_term_ap ? 'True' : 'False'"
				/>
				<a-statistic
					title="Retained After WSC"
					:value="termDetailInfo.represent_term_wsc ? 'True' : 'False'"
				/>
				<a
					:href="
						'https://www.gsea-msigdb.org/gsea/msigdb/cards/' + termDetailInfo.msigdb_id
					"
					target="_blank"
				>
					MsigDB
					<img src="/src/assets/icons/link.svg" width="24" height="24" />
				</a>
			</div>
			<div class="ItemFigure">
				<a-image :src="termDetailInfo.barcodePngUrl" alt="barcodePNG" />
			</div>
		</div>
		<div class="ItemGeneList">
			<p class="title">Core Enrichment Genes</p>
			<template
				v-for="(item, index) in degParamStore.gseaItemInfo.core_enrichment.split(',')"
				:key="index"
			>
				<a-tag class="ItemGene" color="success">
					<a :href="'https://www.uniprot.org/uniprot/?query=' + item" target="_blank">
						{{ item }}
					</a>
				</a-tag>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDegParamStore } from '@/store/modules/ltbmDegParam'
import { computed } from 'vue'
const props = defineProps({
	regulation: {
		type: String,
		default: 'none',
		required: true,
	},
})
// 使用一个全局的pinia store，保存记录当前选中的enrichment term，用于子组件中数据公用
const degParamStore = useDegParamStore()
const termDetailInfo = computed(() => degParamStore.gseaItemInfo)

const getTermLink = (termId) => {
	if (termId) {
		if (termId.split(':')[0] === 'GO') {
			const url = 'https://www.ebi.ac.uk/QuickGO/term/'
			return url + termId
		} else if (termId.split(':')[0] === 'HP') {
			const url = 'https://hpo.jax.org/app/browse/term/'
			return url + termId
		}
		const url = 'https://www.genome.jp/entry/pathway+'
		return url + termId
	}
	return null
}
// 转换为科学计数法
const toScientificNotation = (value) => {
	if (value < 0.00001) {
		return value.toExponential(3)
	}
	return value.toFixed(5)
}
</script>

<style scoped lang="less">
.title {
	@apply font-sans text-center 2xl:text-left py-6 text-2xl;
}
.ItemInfo {
	@apply grid grid-cols-2 gap-6 justify-center 2xl:justify-start px-6;
	.ItemStatistic {
		@apply grid grid-cols-3 grid-rows-3 gap-3 col-span-2 md:col-span-1;
	}
	.ItemFigure {
		@apply col-span-2 md:col-span-1;
	}
}
.ItemGeneList {
	@apply px-6;
	> span {
		@apply mb-2;
	}
	a {
		color: @primary-color;
	}
}
</style>
