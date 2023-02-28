<template>
	<div id="LtbmWGCNA" class="LtbmWGCNA">
		<div class="h-12 md:h-16"></div>
		<h3 class="pageTitle">{{ $t(`ltbm_title.wgcna`) }}</h3>
		<div class="WgcnaSummary">
			<WgcnaResSummary></WgcnaResSummary>
		</div>
		<h4 class="pageSubTitle">
			Module {{ geneSetParamStore.wgcna_module }}
			<span class="dash-underline">GS</span>
			-
			<span class="dash-underline">MM</span>
			Result
		</h4>
		<div class="WgcnaProfile">
			<WgcnaGsMmTable class="WgcnaProfileTable"></WgcnaGsMmTable>
			<WgcnaGsMmChart class="WgcnaProfileChart"></WgcnaGsMmChart>
		</div>
		<h4 class="pageSubTitle">Module {{ geneSetParamStore.wgcna_module }} HubGene Network</h4>
		<div class="WgcnaNetwork">
			<WgcnaNetwork></WgcnaNetwork>
		</div>
		<h4 class="pageSubTitle">
			Module {{ geneSetParamStore.wgcna_module }} {{ $t(`ltbm_tsa.enrichment_res`) }}
		</h4>
		<div class="WgcnaEnrichRes">
			<EnrichRes regulation="wgcna"></EnrichRes>
		</div>
	</div>
</template>

<script setup lang="ts">
import { provide, reactive, watch } from 'vue'
import { getWgcnaMtRes, getWgcnaRes } from '@/api/geneSetRes'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'
import WgcnaResSummary from '@/views/ltbm/transcriptomics/wgcna/WgcnaResSummary.vue'
import WgcnaGsMmTable from '@/views/ltbm/transcriptomics/wgcna/WgcnaGsMmTable.vue'
import WgcnaGsMmChart from '@/views/ltbm/transcriptomics/wgcna/WgcnaGsMmChart.vue'
import WgcnaNetwork from '@/views/ltbm/transcriptomics/wgcna/WgcnaNetwork.vue'
import EnrichRes from '@/views/ltbm/components/enrich/EnrichRes.vue'

const geneSetParamStore = useGeneSetParamStore()

interface dataPromiseType {
	getWgcnaMtData?: Promise<any>
	getGsMmData?: Promise<any>
	enrichResData?: Promise<any>
	networkData?: Promise<any>
	titleSuffix?: string
	ItemStore?: any
	ItemStoreInfo?: string
	ItemStoreSet?: any
	category?: string
}

const dataPromise = reactive<dataPromiseType>({
	ItemStore: geneSetParamStore,
	ItemStoreInfo: 'wgcnaEnrichItemInfo',
	ItemStoreSet: geneSetParamStore.setWgcnaEnrichItem,
	category: 'module',
})

// 获取wgcna MT 数据
dataPromise.getWgcnaMtData = getWgcnaMtRes({})

provide('dataPromise', dataPromise)

function processData(params?: any) {
	dataPromise.titleSuffix = params.module
	// 把getWgcnaRes获取的数据分成两个新的Promise，分别放在dataPromise中
	getWgcnaRes(params).then((res) => {
		dataPromise.getGsMmData = new Promise((resolve) => {
			resolve({ data: res.data[0].gsmm_info })
		})
		dataPromise.enrichResData = new Promise((resolve) => {
			resolve({ data: res.data[0].enrichment })
		})
		dataPromise.networkData = new Promise((resolve) => {
			resolve({ data: res.data[0].network })
		})
	})
}

processData({ module: 'pink' })

watch(
	() => geneSetParamStore.wgcna_module,
	() => {
		processData({ module: geneSetParamStore.wgcna_module })
	}
)
</script>

<style scoped lang="less">
.LtbmWGCNA {
	@apply Container;
}

.WgcnaProfile {
	@apply grid grid-cols-5 gap-8;

	.WgcnaProfileTable {
		@apply col-span-5 md:col-span-3;
	}
	.WgcnaProfileChart {
		@apply col-span-5 md:col-span-2;
	}
}
.dash-underline {
	border-bottom: 1px dashed #b5b5b5;
}
</style>
