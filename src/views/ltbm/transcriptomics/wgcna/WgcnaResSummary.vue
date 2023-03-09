<template>
	<a-collapse
		v-model:activeKey="activeKey"
		expand-icon-position="right"
		ghost
		style="border-radius: 4px; border: 0; margin-bottom: 24px; overflow: hidden"
	>
		<a-collapse-panel key="1">
			<template #header>
				<div class="text-xl font-semibold">{{ $t(`ltbm_wgcna.mt_title`) }}</div>
			</template>
			<div>
				<p>&emsp;&emsp;{{ $t(`ltbm_wgcna.info`) }}</p>
				<div class="">
					<WgcnaMtHtmPlot></WgcnaMtHtmPlot>
				</div>
				<p></p>
			</div>
		</a-collapse-panel>
	</a-collapse>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { useGeneSetParamStore } from '@/store/modules/ltbmGeneSetParam'
import WgcnaMtHtmPlot from '@/views/ltbm/components/WgcnaMtHtmPlot.vue'

const dataPromise = inject('dataPromise') as any
const geneSetParamStore = useGeneSetParamStore()

const activeKey = ref(['1'])
</script>
