<template>
	<div id="LtbmIntroduction" class="LtbmIntroduction">
		<div class="h-12 md:h-16"></div>
		<div class="homeTitle">
			<transition appear enter-active-class="animate__animated animate__jackInTheBox">
				<h2>
					<strong>L</strong>
					<span>ong-term&nbsp;</span>
					<strong>T</strong>
					<span>racking of&nbsp;</span>
					<strong>B</strong>
					<span>aby&nbsp;</span>
					<strong>M</strong>
					<span>acaque</span>
				</h2>
			</transition>
		</div>
		<div class="homeContent">
			<div class="col-span-2">
				<LtbmCollapse></LtbmCollapse>
			</div>
			<div class="col-span-1">
				<LtbmTimeline></LtbmTimeline>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import LtbmCollapse from '@/views/ltbm/introduction/LtbmCollapse.vue'
import LtbmTimeline from '@/views/ltbm/introduction/LtbmTimeline.vue'
</script>

<style scoped lang="less">
.LtbmIntroduction {
	background-attachment: fixed;
	background-image: url('@img/ltbmFig/LtbmBackground.jpg');
	background-size: cover;
}

.homeTitle {
	height: 12rem;
	h2 {
		@apply pt-20 text-center text-xl md:text-4xl;
		color: @white-color;
	}
}

.homeContent {
	@apply Container py-6 pb-16;
	@apply md:grid md:grid-cols-3 md:gap-8;
}
</style>
