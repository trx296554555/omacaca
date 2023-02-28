<template>
	<a-collapse
		v-model:activeKey="activeKey"
		expand-icon-position="right"
		ghost
		style="border-radius: 4px; border: 0; margin-bottom: 24px; overflow: hidden"
	>
		<a-collapse-panel key="1">
			<template #header>
				<div class="text-xl font-semibold">Module−Trait Relationships</div>
			</template>
			<div>
				<p>
					&emsp;&emsp;为了研究多个样本中的基因表达模式，我们对所有猕猴婴儿样本进行了WGCNA，
					将表达模式相似的基因进行聚类，对于每个模块进行了基因功能富集，并分析模块与特定性状或表型之间的关联关系，
					同时计算基因表达与模块（MM）和表型数据（GS）的相关性，用以寻找这个模块中的核心基因（HubGene），并尝试构建了Top30的HubGene网络。
				</p>
				<div class="">
					<WgcnaMtHtmPlot></WgcnaMtHtmPlot>
				</div>
				<p></p>
			</div>
		</a-collapse-panel>
	</a-collapse>
</template>

<script setup lang="ts">
import { inject, watch, reactive, ref } from 'vue'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'
import WgcnaMtHtmPlot from '@/views/ltbm/components/WgcnaMtHtmPlot.vue'

const dataPromise = inject('dataPromise') as any
const geneSetParamStore = useGeneSetParamStore()

const activeKey = ref(['1'])
</script>
