<template>
	<a-collapse
		v-model:activeKey="activeKey"
		expand-icon-position="right"
		ghost
		style="border-radius: 4px; border: 0; margin-bottom: 24px; overflow: hidden"
	>
		<a-collapse-panel key="1">
			<template #header>
				<div class="text-xl font-semibold">{{ $t(`ltbm_tsa.summary`) }}</div>
			</template>
			<div>
				<p>&emsp;&emsp;{{ $t(`ltbm_tsa.gaol`) }}</p>
				<div class="grid grid-cols-5 grid-rows-4 gap-4 py-6">
					<div v-for="i in 20" :key="i" class="col-span-1 row-span-1">
						<a href="" @click.prevent="selectCluster(i)">
							<img
								:src="'https://omacaca.com/resource/TSA/cluster' + i + '.png'"
								:alt="'tsa_cluster_' + i + '_profile'"
							/>
							<div class="text-center pt-4 font-semibold">cluster {{ i }}</div>
						</a>
					</div>
				</div>

				<p>
					&emsp;&emsp;{{ $t(`ltbm_tsa.statistical_1`) }}
					{{ tsaDataStatitics.now_cluster }} {{ $t(`ltbm_tsa.statistical_2`) }}
					{{ tsaDataStatitics.total }} {{ $t(`ltbm_tsa.statistical_3`) }}
					{{ tsaDataStatitics.coreGene }} {{ $t(`ltbm_tsa.statistical_4`) }}
				</p>
			</div>
		</a-collapse-panel>
	</a-collapse>
</template>

<script setup lang="ts">
import { inject, watch, reactive, ref } from 'vue'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'

const dataPromise = inject('dataPromise') as any
const geneSetParamStore = useGeneSetParamStore()

const activeKey = ref(['1'])
const tsaDataStatitics = reactive({
	now_cluster: '0',
	total: 0,
	coreGene: 0,
})

function selectCluster(cluster: number) {
	geneSetParamStore.tsa_cluster = cluster.toString()
}

watch(
	() => geneSetParamStore.tsa_cluster,
	() => {
		// 挂载后更新统计数据
		dataPromise.getTsaData.then((res) => {
			tsaDataStatitics.now_cluster = geneSetParamStore.tsa_cluster
			tsaDataStatitics.total = res.data.length
			tsaDataStatitics.coreGene = res.data.filter((item: any) => item.is_core === true).length
		})
	}
)
</script>
