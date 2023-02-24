<template>
	<a-collapse
		v-model:activeKey="activeKey"
		expand-icon-position="right"
		ghost
		style="border-radius: 4px; border: 0; margin-bottom: 24px; overflow: hidden"
	>
		<a-collapse-panel key="1">
			<template #header><div class="text-xl font-semibold">Summary</div></template>
			<div>
				<p>
					&emsp;&emsp;为了识别基因表达水平在猕猴婴儿发育过程中的动态变化趋势，我们对所有猕猴样
					本进行了时序表达分析，使用Mfuzz识别表达谱的潜在时间序列模式，并将相似模式的基因聚类，
					低表达和标准差小于0.1的基因被过滤掉，最终得到 20 类表达谱。
				</p>
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
					&emsp;&emsp;在cluster {{ tsaDataStatitics.now_cluster }}中，共有
					{{ tsaDataStatitics.total }}个基因，其中membership大于0.5的核心基因(绿色)共
					{{ tsaDataStatitics.coreGene }}个。
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
