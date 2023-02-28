<template>
	<div id="LtbmTSA" class="LtbmTSA">
		<div class="h-12 md:h-16"></div>
		<h3 class="pageTitle">{{ $t(`ltbm_title.tsa`) }}</h3>
		<div class="TsaSummary">
			<TsaResSummary></TsaResSummary>
		</div>
		<h4 class="pageSubTitle">{{ $t(`ltbm_tsa.profile`) }}</h4>
		<div class="TsaProfile">
			<div class="TsaProfilePlot">
				<a-image
					:src="
						'https://omacaca.com/resource/TSA/cluster' +
						geneSetParamStore.tsa_cluster +
						'.png'
					"
					:alt="'tsa_cluster_' + geneSetParamStore.tsa_cluster + '_profile'"
				/>
			</div>
			<TsaResTable class="TsaProfileTable"></TsaResTable>
		</div>
		<h4 class="pageSubTitle">
			{{ $t(`ltbm_tsa.trajectory`) }}
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
		</h4>
		<div class="TsaLinePlot">
			<TsaLinePlot></TsaLinePlot>
		</div>
		<h4 class="pageSubTitle">
			Cluster {{ geneSetParamStore.tsa_cluster }} {{ $t(`ltbm_tsa.enrichment_res`) }}
		</h4>
		<div class="TsaEnrichRes">
			<EnrichRes regulation="tsa"></EnrichRes>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, watch } from 'vue'
import { getExpGroupByRes, getTsaRes } from '@/api/geneSetRes'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'
import TsaResSummary from '@/views/ltbm/transcriptomics/tsa/TsaResSummary.vue'
import TsaResTable from '@/views/ltbm/transcriptomics/tsa/TsaResTable.vue'
import TsaLinePlot from '@/views/ltbm/components/TsaLinePlot.vue'
import EnrichRes from '@/views/ltbm/components/enrich/EnrichRes.vue'
import { useLocaleStore } from '@/store/modules/locale'

const geneSetParamStore = useGeneSetParamStore()

interface dataPromiseType {
	getTsaData?: Promise<any>
	getGeneExpData?: Promise<any>
	enrichResData?: Promise<any>
	titleSuffix?: string
	ItemStore?: any
	ItemStoreInfo?: string
	ItemStoreSet?: any
	category?: string
}

const dataPromise = reactive<dataPromiseType>({
	ItemStore: geneSetParamStore,
	ItemStoreInfo: 'tsaEnrichItemInfo',
	ItemStoreSet: geneSetParamStore.setTsaEnrichItem,
	category: 'cluster',
})

provide('dataPromise', dataPromise)

// 选中时移除高亮的html标签
const nowGeneId = computed(() => {
	const reg1 = /<span class="keyword-lighten">/g
	const reg2 = /<\/span>/g
	const a = geneSetParamStore.tsaItemInfo.gene_id_ENSG.replace(reg1, '')
	return a.replace(reg2, '')
})

function renewData() {
	dataPromise.getGeneExpData = getExpGroupByRes({
		model_type: 'M1Ta',
		gene_id_ENSG: nowGeneId.value,
		groupby: 'individual',
		lang: useLocaleStore().getLocale,
	})
}

function processData(params?: any) {
	dataPromise.titleSuffix = params.cluster
	// 把getTsaRes获取的数据分成两个新的Promise，分别放在dataPromise中
	getTsaRes(params).then((res) => {
		dataPromise.getTsaData = new Promise((resolve) => {
			resolve({ data: res.data.tsa })
		})
		dataPromise.enrichResData = new Promise((resolve) => {
			resolve({ data: res.data.tsa_enrichment })
		})
	})
}

processData({ cluster: 'cluster_1' })

watch(
	() => geneSetParamStore.tsa_cluster,
	(newVal) => {
		processData({ cluster: 'cluster_' + newVal })
	}
)
watch(
	() => geneSetParamStore.tsaItemInfo,
	() => {
		renewData()
	}
)
</script>

<style scoped lang="less">
.LtbmTSA {
	@apply Container;
}

.TsaProfile {
	@apply grid grid-cols-2 gap-4;

	.TsaProfilePlot {
		@apply col-span-2 md:col-span-1;
	}

	.TsaProfileTable {
		@apply col-span-2 md:col-span-1;
	}
}
</style>
