<template>
	<a-collapse v-model:activeKey="activeKey" expand-icon-position="right" class="ltbm-collapse">
		<a-collapse-panel key="1" :header="$t('ltbm_introduction.background')">
			<p>{{ $t('ltbm_introduction.background1') }}</p>
			<a href="https://www.nature.com/articles/s41586-019-1365-2" target="_blank"
				><img src="@img/ltbmFig/LtbmAgeingResearch.jpg" alt="AgeingResearch"
			/></a>
			<p>{{ $t('ltbm_introduction.background2') }}</p>
			<p>{{ $t('ltbm_introduction.background3') }}</p>
			<p>{{ $t('ltbm_introduction.background4') }}</p>
		</a-collapse-panel>
		<a-collapse-panel key="2" :header="$t('ltbm_introduction.description')">
			<p>{{ $t('ltbm_introduction.description1') }}</p>
			<img src="@img/ltbmFig/LtbmWithMedicine.jpg" alt="WithMedicine" />
			<p>{{ $t('ltbm_introduction.description2') }}</p>
		</a-collapse-panel>
		<a-collapse-panel key="3" :header="$t('ltbm_introduction.user_guide')">
			<p>
				LTBM是一个开放访问的猕猴组学项目，由378个猕猴的高质量组学研究数据组成，
				可以帮助研究人员调查猕猴幼崽初生时期基因表达与肠道微生物基因表达的情况。
				这里我们集成了项目相关信息与结果数据库；提供了用户友好的界面便于对数据的检索、可视化分析以及数据下载。
			</p>
			<ul>
				<li>
					<strong>{{ $t(`ltgebm_header_menu.dega`) }}</strong
					>：允许用户浏览和检索特定的、不同组间的差异基因表达情况。同时提供了 ORA 与 GSEA
					两种方法进行功能富集，分析结果中还集成了GO term、KEGG
					pathway和HP等基因功能注释信息。
				</li>
				<li>
					<strong>{{ $t(`ltgebm_header_menu.tsa`) }}</strong
					>：允许用户
				</li>
				<li>
					<strong>{{ $t(`ltgebm_header_menu.tap`) }}</strong
					>：允许用户
				</li>
				<li>
					<strong>{{ $t(`ltgebm_header_menu.meta`) }}</strong
					>：允许用户
				</li>
			</ul>
			<p>
				我们不但提供了数据的可视化分析，同时生成的大部分图像与表格存在可交互功能，用于更好的展示结果，感谢您的使用。
			</p>
		</a-collapse-panel>
		<a-collapse-panel key="4" :header="$t('ltbm_introduction.version')">
			<a-timeline pending="Continuous updating...">
				<a-timeline-item>{{ $t('ltbm_introduction.version1') }}</a-timeline-item>
				<a-timeline-item>{{ $t('ltbm_introduction.version2') }}</a-timeline-item>
				<a-timeline-item>{{ $t('ltbm_introduction.version3') }}</a-timeline-item>
			</a-timeline>
		</a-collapse-panel>
	</a-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeKey = ref(['1', '2', '3', '4'])
</script>

<style scoped lang="less">
.ltbm-collapse {
	p {
		font-size: 1rem;
		text-indent: 2em;
		margin-bottom: 1rem;
	}
	img {
		padding: 1rem;
	}
}
:deep(.ant-collapse-header) {
	font-size: 1rem;
	font-weight: 700;
}
</style>
