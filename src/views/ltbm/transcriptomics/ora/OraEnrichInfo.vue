<template>
	<div :id="props.regulation + 'EnrichItemAnchor'">
		<h4 class="title">
			Gene Set:
			<a :href="getTermLink(nowGeneId)" target="_blank">
				{{ nowGeneId }}
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
					:value="termDetailInfo.adjusted_p_value"
					:formatter="({ value }) => toScientificNotation(value)"
				/>
				<a-statistic title="Term Size" :value="termDetailInfo.term_size" />
				<a-statistic title="Query Size" :value="termDetailInfo.query_size" />
				<a-statistic title="Intersection Size" :value="termDetailInfo.intersection_size" />
				<a-statistic
					title="Rich Factor"
					:value="termDetailInfo.rich_factor"
					:formatter="({ value }) => toScientificNotation(value)"
				/>
				<a-statistic
					title="Regulation Type"
					:value="termDetailInfo.regulation.toUpperCase()"
				/>
				<a-statistic
					title="Retained After AP"
					:value="termDetailInfo.represent_term_ap ? 'True' : 'False'"
				/>
				<a-statistic
					title="Retained After WSC"
					:value="termDetailInfo.represent_term_wsc ? 'True' : 'False'"
				/>
			</div>
			<div class="ItemFigure">
				<OraVennPlot :regulation="regulation"></OraVennPlot>
			</div>
		</div>
		<div class="ItemGeneList">
			<p class="title">Intersection Genes</p>
			<template
				v-for="(item, index) in degParamStore.oraItemInfo[
					props.regulation
				].intersections.split(',')"
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
import OraVennPlot from '@/views/ltbm/transcriptomics/ora/OraVennPlot.vue'
const props = defineProps({
	regulation: {
		type: String,
		default: 'up',
		required: true,
	},
})
// 使用一个全局的pinia store，保存记录当前选中的enrichment term，用于子组件中数据公用
const degParamStore = useDegParamStore()
const termDetailInfo = computed(() => degParamStore.oraItemInfo[props.regulation])

// 选中时移除高亮的html标签
const nowGeneId = computed(() => {
	//  ENSMMUG0000<span class="keyword-lighten">001</span>6323
	// 移除特定字符串
	const reg1 = /<span class="keyword-lighten">/g
	const reg2 = /<\/span>/g
	const a = termDetailInfo.value.term_id.replace(reg1, '')
	return a.replace(reg2, '')
})

const getTermLink = (termId) => {
	if (termId) {
		if (termId.split(':')[0] === 'GO') {
			const url = 'https://www.ebi.ac.uk/QuickGO/term/'
			return url + termId
		} else if (termId.split(':')[0] === 'HP') {
			const url = 'https://hpo.jax.org/app/browse/term/'
			return url + termId
		}
		const url = 'https://www.genome.jp/dbget-bin/www_bget?pathway:map'
		return url + termId.split(':')[1]
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
