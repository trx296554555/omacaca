<template>
	<div class="EnrichRes">
		<div class="EnrichSwitch">
			<a-tooltip>
				<template #title>
					Enriched gene sets were post-processed by two methods to reduce redundancy.
				</template>
				<div>
					<p class="dash-underline mr-2 inline-block">Redundancy reduction:</p>
				</div>
			</a-tooltip>
			<a-radio-group v-model:value="switchOption.rereMethodRadio">
				<a-radio :value="regulation + 'all'">
					<a-tooltip>
						<template #title>Original enrichment results.</template>
						<span class="dash-underline">All</span>
					</a-tooltip>
				</a-radio>
				<a-radio :value="regulation + 'ap'">
					<a-tooltip>
						<template #title>
							R package apcluster is used to cluster gene sets, implementation by
							WebGestalt.
						</template>
						<span class="dash-underline">Affinity propagation</span>
					</a-tooltip>
				</a-radio>
				<a-radio :value="regulation + 'wsc'">
					<a-tooltip>
						<template #title>
							Find top gene sets while maximizing gene coverage, implementation by
							WebGestalt.
						</template>
						<span class="dash-underline">Weighted set cover</span>
					</a-tooltip>
				</a-radio>
			</a-radio-group>
		</div>

		<div class="EnrichTabs">
			<a-tabs v-model:activeKey="switchOption.activeTabKey" size="large">
				<a-tab-pane key="table">
					<template #tab>
						<span>
							<table-outlined />
							Table
						</span>
					</template>
					<GseaEnrichTable :regulation="regulation"></GseaEnrichTable>
				</a-tab-pane>
				<a-tab-pane key="bubble">
					<template #tab>
						<span>
							<dot-chart-outlined />
							Bubble Plot
						</span>
					</template>
					<div class="grid grid-cols-2 gap-8">
						<TopBubblePlot
							:regulation="regulation"
							class="col-span-2 md:col-span-1"
						></TopBubblePlot>
						<div :regulation="regulation" class="col-span-2 md:col-span-1"></div>
					</div>
				</a-tab-pane>
				<a-tab-pane key="words">
					<template #tab>
						<span>
							<cloud-outlined />
							Word Cloud
						</span>
					</template>
					<WordCloudPlot :regulation="regulation"></WordCloudPlot>
				</a-tab-pane>
			</a-tabs>
		</div>

		<div class="EnrichItem"><GseaEnrichInfo :regulation="regulation"></GseaEnrichInfo></div>
	</div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue'
import { TableOutlined, CloudOutlined, DotChartOutlined } from '@ant-design/icons-vue'
import GseaEnrichTable from './GseaEnrichTable.vue'
import GseaEnrichInfo from './GseaEnrichInfo.vue'
import TopBubblePlot from '@/views/ltbm/components/TopBubblePlot.vue'
import WordCloudPlot from '@/views/ltbm/components/WordCloudPlot.vue'

const props = defineProps({
	regulation: {
		type: String,
		default: 'none',
		required: true,
	},
})

const switchOption = reactive({
	rereMethodRadio: props.regulation + 'all',
	activeTabKey: 'table',
})
provide('switchOption', switchOption)
</script>

<style scoped lang="less">
.EnrichRes {
	@apply my-4;
}
.EnrichSwitch {
	@apply flex md:flex-row flex-col;
}
.dash-underline {
	font-size: 1rem;
	font-weight: 500;
	border-bottom: 1px dashed #b5b5b5;
}
</style>
