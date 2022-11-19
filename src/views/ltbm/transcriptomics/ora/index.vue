<template>
	<div id="LtbmORA" class="LtbmORA">
		<div class="h-12 md:h-16"></div>
		<div class="pageTitle">{{ $t(`ltbm_title.deg`) }} (ORA)</div>
		<div class="OraAnalysis">
			<div class="OraSelTable"><OraSelTable></OraSelTable></div>
			<div class="OraOptions">2</div>
			<div class="OraUmapPlot"><UmapPlot></UmapPlot></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import OraSelTable from './OraSelTable.vue'
import UmapPlot from '../../components/UmapPlot.vue'
</script>

<style scoped lang="less">
.LtbmORA {
	@apply container mx-auto px-6;
}
.pageTitle {
	@apply text-2xl py-6;
}
.OraAnalysis {
	@apply grid grid-rows-2 grid-cols-3 gap-4;
}
.OraSelTable {
	@apply col-span-3 row-span-1;
}
.OraOptions {
	@apply col-span-1 row-span-1;
}
.OraUmapPlot {
	@apply col-span-2 row-span-1;
}
</style>
