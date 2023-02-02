<template>
	<div id="LtbmGSEA" class="LtbmGSEA">
		<div class="h-12 md:h-16"></div>
		<div class="pageTitle">{{ $t(`ltbm_title.gsea`) }} (GSEA)</div>
		<div class="DegAnalysis">
			<div class="theTable"><DegSelTable></DegSelTable></div>
			<div class="theOptions"><DegOptions></DegOptions></div>
			<div class="theUmapPlot"><UmapPlot analysis="gsea"></UmapPlot></div>
		</div>
		<div style="height: 200px"></div>
	</div>
</template>

<script setup lang="ts">
import DegSelTable from '../deg/DegSelTable.vue'
import DegOptions from '../deg/DegOptions.vue'
import UmapPlot from '../../components/UmapPlot.vue'
import { useDegParamStore } from '@/store/modules/ltbmDegParam'

const gseaParamStore = useDegParamStore()
// @ts-ignore
gseaParamStore.setDegParam({ analyse: 'gsea', model: 'M1', full: true, gender: 'a', groups: [] })
</script>

<style scoped lang="less">
.LtbmGSEA {
	@apply Container;
}
.pageTitle {
	@apply text-2xl py-6;
}
.DegAnalysis {
	@apply grid grid-rows-2 grid-cols-3 gap-6;
}
.theTable {
	@apply col-span-1 sm:col-span-3 row-span-1;
}
.theOptions {
	@apply col-span-2 sm:col-span-1 row-span-1;
}
.theUmapPlot {
	@apply col-span-3 sm:col-span-2 row-span-1;
}
</style>
