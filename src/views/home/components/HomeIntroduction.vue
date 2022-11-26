<template>
	<div id="HomeIntroduction" class="HomeIntroduction">
		<div class="title">Research Interests</div>
		<div class="content">
			The past 30 years of ageing research has transitioned from identifying ageing phenotypes
			to investigating the genetic pathways that underlie these phenotypes. The genetics of
			ageing research has revealed a complex network of interacting intracellular signalling
			pathways and higher-order processes. Many of the pathways and processes, such as dietary
			restriction, that have been identified are known to be critical in homeostatic responses
			to environmental change.
		</div>
	</div>
</template>
<style scoped lang="less">
.HomeIntroduction {
	@apply font-sans text-justify;
	@apply Container py-12;
	.title {
		@apply text-center pb-8 text-2xl;
		color: @primary-color;
	}
	.content {
		@apply md:text-lg;
	}
}
</style>
