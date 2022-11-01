<template>
	<div id="HomeNews" class="HomeNews">
		<div class="highLight">
			<div class="line">Recent Highlights</div>
			<router-link to="/news" class="hover-icon more">
				<right-circle-outlined class="icon-show" :style="{ fontSize: '1.5rem' }" />
				<right-circle-filled class="icon-hidden" :style="{ fontSize: '1.5rem' }" />
				<span class="icon-info">Read more</span>
			</router-link>
		</div>
		<div class="newsFigs">
			<div v-for="(item, index) in NewsInfo" :key="index" class="figs">
				<div
					class="fig"
					:class="{ 'fig-active': index === hoverIndex }"
					:style="'background-image:url(' + getStaticImageUrl(item.newsFigure) + ')'"
				></div>
			</div>
		</div>
		<div class="newsContent">
			<ul v-for="(item, index) in NewsInfo" :key="index">
				<li
					class="news"
					:class="{ 'news-active': index === hoverIndex }"
					@mouseover="changeNews(index)"
					@mouseout="hoverIndex = index"
				>
					<div class="newsTitle">
						{{ item.newsTitle }}
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { RightCircleOutlined, RightCircleFilled } from '@ant-design/icons-vue'
import { getStaticImageUrl } from '@/tools'
import { reactive, ref } from 'vue'
import { CarouselRef } from 'ant-design-vue/es/carousel'

const hoverIndex = ref(0)
function changeNews(page: number) {
	hoverIndex.value = page
}

interface NewsType {
	newsTitle: string
	newsAbstract: string
	newsFigure: string
}

const NewsInfo: NewsType[] = reactive([
	{
		newsTitle: '宏基因组测序揭示慢性腹泻猕猴肠道微生物及其耐药性的显著变化',
		newsAbstract:
			'四川大学灵长类动物研究团队通过对一个圈养猕猴种群的长期调查，筛选出11只长期慢性腹泻猕猴，' +
			'基于11只腹泻个体和18只无症状个体的粪便宏基因组测序，结合肠道微生物的耐药性研究，' +
			'揭示了肠道微生物的组成、功能和耐药性对慢性腹泻的影响机制',
		newsFigure: 'homeNews/newsFig1.png',
	},
	{
		newsTitle: '刘少英研究员团队综合基因组学和形态学研究合作揭示鼠兔的适应性进化',
		newsAbstract:
			'为了研究鼠兔从青藏高原迁徙过程中对不同生态环境的适应性进化，' +
			'对226只成年且头骨完整鼠兔的20项形态特征数据进行了测量，' +
			'并对其中81个具有代表性的样本（共计27种鼠兔）进行了基因组测序，' +
			'再结合生境数据和细胞水平功能验证，揭示了鼠兔的系统发育关系、形态特征演化历史、环境的适应性进化。',
		newsFigure: 'homeNews/newsFig2.png',
	},
	{
		newsTitle: '恭喜四川大学吕明壹团队在Nature上发表文章揭示邪恶小明的一天',
		newsAbstract:
			'这是一条新闻的内容这是一条新闻的内容这是一条新闻的内容这是一条新闻，的内容这是一条新闻的内容这是一条新闻的内容这是一条新闻的内容，这是一条新闻的内容这是一条新闻的内容这是，内容这是一条新闻的内容这是一条新闻的内容',
		newsFigure: 'homeNews/newsFig3.png',
	},
	{
		newsTitle: '恭喜四川大学吕明壹团队在Science上发表文章深入探究小明今天吃什么',
		newsAbstract:
			'这是一条新闻的内容这是一条新闻的内容这是一条新闻的内容这是一条新闻的内容这是，一条新闻的内容这是一条新闻的内容这是一条新闻的内容这是一条新闻的内容这是一条新闻的，内容这是一条新闻的内容这是一条新闻的内容这是一条新闻的内容',
		newsFigure: 'homeNews/newsFig4.png',
	},
])
</script>

<style scoped lang="less">
.HomeNews {
	@apply font-sans;
	@apply pt-0 pb-12 md:pt-12 pl-6 pr-6 md:pl-12 lg:pl-16 xl:pl-32 2xl:pl-64 md:pr-0;
	@apply md:grid md:grid-rows-3 md:grid-cols-3 md:gap-0;

	@media screen and (min-width: 1080px) {
		height: 110vh;
	}

	//ipad pro && ipad mini 768px
	@media screen and (max-width: 1080px) {
		height: auto;
	}

	.highLight {
		@apply block md:row-span-1 md:col-span-1;
		color: @primary-color;
		z-index: 3;

		.line {
			@apply pb-4 md:py-8 text-2xl inline-block;
		}
		.more {
			height: 2rem;
			color: #bbb;
		}
		a {
			width: 50%;
			color: #bbb;
		}
	}
	.newsFigs {
		@apply hidden md:block;
		@apply md:row-span-3 md:col-span-2 relative;
		&:before {
			content: '';
			position: absolute;
			top: -2rem;
			right: 0;
			width: 80%;
			height: 2rem;
			display: block;
			margin: auto 0;
			background-image: linear-gradient(to left, @primary-color, @secondary-color);
		}
		.figs {
			position: absolute;
			width: 100%;
			height: 100%;
		}
		.fig {
			opacity: 0;
			height: 100%;
			width: 100%;
			background-position: top;
			background-size: cover;
			background-repeat: no-repeat;
			transition: all 0.5s ease;
		}
		.fig-active {
			opacity: 100%;
			height: 100%;
			transition: all 0.5s ease;
		}
	}
	.newsContent {
		@apply md:row-span-2 md:col-span-1;
		transition: all 0.5s ease;
		.news {
			position: relative;
			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				width: 0.2rem;
				height: 50%;
				transform: translateY(-50%);
				background: @primary-color;
				opacity: 0;
				transition: all 0.5s ease;
			}
			.newsTitle {
				@apply font-semibold text-xl p-4 mr-8;
				border-bottom: 1px solid #eee;
				transition: all 0.5s ease;
			}
		}
		.news-active {
			&:before {
				opacity: 100%;
				transition: all 0.5s ease;
			}
			.newsTitle {
				color: @primary-color;
				transform: translateX(5%);
				transition: all 0.5s ease;
			}
		}
	}
}
</style>
