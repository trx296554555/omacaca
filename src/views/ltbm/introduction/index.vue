<template>
	<div id="LtbmIntroduction" class="LtbmIntroduction">
		<div class="h-12 md:h-16"></div>
		<div class="homeTitle">
			<transition appear enter-active-class="animate__animated animate__jackInTheBox">
				<h2>
					<strong>L</strong>ong-term <strong>T</strong>racking of <strong>B</strong>aby
					<strong>M</strong>acaque
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

document.title = 'Long-term Tracking of Baby Macaque'
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
