<template>
	<div class="VpaItem">
		<h4 class="title">Source of gene expression variation</h4>
		<div class="VpaItemInfo">
			<div>
				<div class="VpaItemDescription">
					<p class="subtitle">
						Gene
						<a href="" target="_blank">
							{{ nowGeneId }}
							<img
								src="@/assets/icons/link.svg"
								alt="link"
								width="24"
								height="24"
								style="padding-bottom: 4px"
							/>
						</a>
					</p>

					<p class="folded_corner">
						Factor {{ geneSetParamStore.factor }} explained
						{{
							XEUtils.toFixed(
								geneSetParamStore.vpaItemInfo[geneSetParamStore.factor] * 100,
								2
							)
						}}% of the variation in gene expression in total 143 samples of baby monkeys
					</p>
				</div>
				<div class="VpaItemSeleection">
					<a-radio-group v-model:value="geneSetParamStore.factor">
						<a-radio value="individual">Individual</a-radio>
						<a-radio value="age">Age</a-radio>
						<a-radio value="breeding_condition">Condition</a-radio>
						<a-radio value="hemoglobin">Hemoglobin</a-radio>
						<a-radio value="sex">Sex</a-radio>
						<a-radio value="is_health">State</a-radio>
						<a-radio value="custom">
							More...
							<a-input
								v-if="geneSetParamStore.factor === 'custom'"
								v-model:value="customParams.model_type"
								style="width: 40%"
								placeholder="model_type"
							/>
							<a-input-search
								v-if="geneSetParamStore.factor === 'custom'"
								v-model:value="customParams.groupby"
								placeholder="factor"
								style="width: 40%"
								@search="getCustomData"
							/>
						</a-radio>
					</a-radio-group>
				</div>
			</div>
		</div>
		<div class="VpaExpResGroupBy">
			<div><VpaBoxPlot></VpaBoxPlot></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'
import { useLocaleStore } from '@/store/modules/locale'
import { computed, provide, reactive, ref, watch } from 'vue'
import VpaBoxPlot from '@/views/ltbm/components/VpaBoxPlot.vue'
import { getExpGroupByRes } from '@/api/geneSetRes'
import XEUtils from 'xe-utils'

// 因子AGE解释了基因A表达变化30%的变异，在小猴的178个样本中
const geneSetParamStore = useGeneSetParamStore()
const nowGeneId = computed(() => {
	//  ENSMMUG0000<span class="keyword-lighten">001</span>6323
	// 移除特定字符串
	const reg1 = /<span class="keyword-lighten">/g
	const reg2 = /<\/span>/g
	const a = geneSetParamStore.vpaItemInfo.gene_id_ENSG.replace(reg1, '')
	return a.replace(reg2, '')
})

interface dataPromiseType {
	getGeneExpData?: Promise<any>
}

const dataPromise = reactive<dataPromiseType>({})

provide('dataPromise', dataPromise)

function renewData() {
	dataPromise.getGeneExpData = getExpGroupByRes({
		model_type: 'M1Ta',
		gene_id_ENSG: nowGeneId.value,
		groupby: geneSetParamStore.factor,
		lang: useLocaleStore().getLocale,
	})
}

watch(
	() => geneSetParamStore.factor,
	() => {
		renewData()
	}
)
watch(
	() => geneSetParamStore.vpaItemInfo,
	() => {
		renewData()
	}
)

// 自定义参数请求
const customParams = ref({
	model_type: 'M1Ta',
	gene_id_ENSG: nowGeneId.value,
	groupby: '',
	lang: useLocaleStore().getLocale,
})

function getCustomData() {
	customParams.value.groupby = customParams.value.groupby.toLowerCase()
	dataPromise.getGeneExpData = getExpGroupByRes(customParams.value)
	geneSetParamStore.vpa_default = !geneSetParamStore.vpa_default
}
</script>

<style scoped lang="less">
.VpaItem {
	@apply grid grid-cols-3 gap-6 justify-center 2xl:justify-start px-6;
	.title {
		@apply col-span-3 font-sans text-center 2xl:text-left py-4 text-2xl;
	}
	.VpaItemInfo {
		@apply col-span-3 md:col-span-1;
		.subtitle {
			@apply text-left text-xl mt-10;
		}
	}
	.VpaExpResGroupBy {
		@apply col-span-3 md:col-span-2;
	}
}
.folded_corner {
	position: relative;
	width: 85%;
	margin: 1rem 0 4rem 0;
	padding: 2rem;
	color: @white-color;
	font: 1rem 'Rosario', sans-serif;
	line-height: 1.5;
	background: @primary-trans;
	background: linear-gradient(to left bottom, transparent 50%, rgba(0, 0, 0, 0.4) 0) no-repeat
			100% 0 / 2em 2em,
		linear-gradient(-135deg, transparent 1.5em, @primary-trans 0);

	-webkit-filter: drop-shadow(20px 30px rgba(0, 0, 0, 0.1));
	filter: drop-shadow(20px 30px rgba(0, 0, 0, 0.1));
}
.folded_corner::before {
	content: ' ';
	position: absolute;
	top: 2em;
	right: 0;
	background: linear-gradient(to left bottom, transparent 50%, rgba(0, 0, 0, 0.1) 0) 100% 0
		no-repeat;
	width: 2em;
	height: 2em;
	transform: rotate(180deg);
}
:deep(.ant-radio-wrapper) {
	font-size: 1rem; /* 18px */
	line-height: 1.5rem; /* 28px */
	padding: 1rem 1rem 1rem 0;
}
</style>
