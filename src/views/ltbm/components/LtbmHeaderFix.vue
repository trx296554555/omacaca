<template>
	<nav ref="HomeHeader" :class="viewData.navShow ? 'navOn' : 'navOff'" class="nv-bg-body">
		<div class="md:flex justify-between">
			<div class="flex relative py-2.5 md:py-4">
				<img class="h-7 mx-4 mt-0 z-10" src="@icon/monkey.svg" />
				<h1 class="HomeTitle">{{ $t('ltbm_title.project') }}</h1>

				<!--移动端导航栏-->
				<div class="md:hidden absolute left-0 top-0 z-0">
					<a-menu
						id="mobile-dropMenu"
						v-model:openKeys="openKeys"
						:style="'width:' + viewData.viewWidth + 'px'"
						style="border: none"
						mode="inline"
						@click="handleClick"
					>
						<a-sub-menu key="sub1">
							<template #expandIcon>
								<menu-outlined
									:style="{
										color: useThemeStoreWithOut().getThemeCol('primaryCol'),
									}"
								/>
							</template>
							<a-menu-item key="2">
								<router-link to="/home">{{ $t('ltbm_title.home') }}</router-link>
							</a-menu-item>
							<a-menu-item key="3">
								<router-link to="/news">
									{{ $t('ltbm_title.introduction') }}
								</router-link>
							</a-menu-item>
							<a-sub-menu key="sub4" :title="$t('ltbm_title.transcriptomics')">
								<a-sub-menu key="sub4-1" :title="$t('ltbm_title.csa')">
									<a-menu-item key="sub4-1-1">
										<router-link to="/ltbm/ora">
											{{ $t('ltbm_title.ora') }}
										</router-link>
									</a-menu-item>
									<a-menu-item key="sub4-1-2">
										<router-link to="/ltbm/gsea">
											{{ $t('ltbm_title.gsea') }}
										</router-link>
									</a-menu-item>
								</a-sub-menu>
								<a-sub-menu key="sub4-2" :title="$t('ltbm_title.lma')">
									<a-menu-item>
										<router-link to="/">{{ $t('ltbm_title.tsa') }}</router-link>
									</a-menu-item>
									<a-menu-item>
										<router-link to="/">{{ $t('ltbm_title.vpa') }}</router-link>
									</a-menu-item>
									<a-menu-item>
										<router-link to="/">
											{{ $t('ltbm_title.wgcna') }}
										</router-link>
									</a-menu-item>
								</a-sub-menu>
								<a-sub-menu key="sub3" title="Others" disabled>
									<a-menu-item>wait1</a-menu-item>
									<a-menu-item>wait1</a-menu-item>
								</a-sub-menu>
							</a-sub-menu>
							<a-sub-menu key="sub5" :title="$t('ltbm_title.metagenomics')">
								<a-menu-item key="sub5-1">
									<router-link to="/ltbm">3232</router-link>
								</a-menu-item>
							</a-sub-menu>
							<a-menu-item key="6">
								<router-link to="/publication">Co-analysis</router-link>
							</a-menu-item>
						</a-sub-menu>
					</a-menu>
				</div>
			</div>

			<!--Web端导航栏-->
			<ul class="hidden md:flex">
				<li>
					<router-link to="/home" class="HeadLink">
						{{ $t('ltbm_title.home') }}
					</router-link>
				</li>
				<li>
					<router-link to="/ltbm/introduction" class="HeadLink">
						{{ $t('ltbm_title.introduction') }}
					</router-link>
				</li>
				<li class="hovered">
					<a-dropdown>
						<router-link to="/ltbm/ora" class="HeadLink">
							{{ $t('ltbm_title.transcriptomics') }}
						</router-link>
						<template #overlay>
							<a-menu>
								<a-sub-menu key="sub1" :title="$t('ltbm_title.csa')">
									<a-menu-item>
										<router-link to="/ltbm/ora">
											{{ $t('ltbm_title.ora') }}
										</router-link>
									</a-menu-item>
									<a-menu-item>
										<router-link to="/ltbm/gsea">
											{{ $t('ltbm_title.gsea') }}
										</router-link>
									</a-menu-item>
								</a-sub-menu>
								<a-sub-menu key="sub2" :title="$t('ltbm_title.lma')">
									<a-menu-item>
										<router-link to="/">{{ $t('ltbm_title.tsa') }}</router-link>
									</a-menu-item>
									<a-menu-item>
										<router-link to="/">{{ $t('ltbm_title.vpa') }}</router-link>
									</a-menu-item>
									<a-menu-item>
										<router-link to="/">
											{{ $t('ltbm_title.wgcna') }}
										</router-link>
									</a-menu-item>
								</a-sub-menu>
								<a-sub-menu key="sub3" title="Others" disabled>
									<a-menu-item>wait1</a-menu-item>
									<a-menu-item>wait1</a-menu-item>
								</a-sub-menu>
							</a-menu>
						</template>
					</a-dropdown>
				</li>
				<li class="hovered">
					<a-dropdown>
						<router-link to="/research" class="HeadLink">
							{{ $t('ltbm_title.metagenomics') }}
						</router-link>
						<template #overlay>
							<a-menu>
								<a-menu-item>1st menu item</a-menu-item>
								<a-menu-item>2nd menu item</a-menu-item>
								<a-sub-menu key="sub1" title="sub menu">
									<a-menu-item>3rd menu item</a-menu-item>
									<a-menu-item>4th menu item</a-menu-item>
								</a-sub-menu>
								<a-sub-menu key="sub2" title="disabled sub menu" disabled>
									<a-menu-item>5d menu item</a-menu-item>
									<a-menu-item>6th menu item</a-menu-item>
								</a-sub-menu>
							</a-menu>
						</template>
					</a-dropdown>
				</li>
				<li>
					<router-link to="/member" class="HeadLink">
						{{ $t('ltbm_title.co_analysis') }}
					</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive, ref } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import { MenuOutlined } from '@ant-design/icons-vue'
import { useThemeStoreWithOut } from '@/store/modules/theme'
//
const openKeys = ref([''])
const handleClick: MenuProps['onClick'] = (menuInfo) => {
	// console.log(openKeys)
	// console.log('click ', menuInfo)
	openKeys.value = ['']
}

// 用于自适应显示的数据，包括网页可见区域宽高等
const viewData = reactive({
	top: 0,
	viewHeight: 0,
	viewWidth: 0,
	navShow: true,
})

// 获取组件对象
const HomeHeader = ref<HTMLElement | null>(null)

onMounted(() => {
	viewData.viewHeight = document.documentElement.clientHeight || document.body.clientHeight
	viewData.viewWidth = document.documentElement.clientWidth || document.body.clientWidth
	function getTop() {
		viewData.top = document.documentElement.scrollTop || document.body.scrollTop
	}
	window.addEventListener('scroll', getTop)
	if (viewData.viewWidth < 640) {
		viewData.viewHeight = viewData.viewHeight * 0.4
	}
})

// 监听top值的变化
watch(
	() => viewData.top,
	(newValue, oldValue) => {
		if (viewData.viewWidth < 640) {
			viewData.navShow = true
		} else {
			viewData.navShow = newValue <= oldValue
		}
	}
)
</script>

<style scoped lang="less">
.HomeTitle {
	@apply mt-0 md:mt-0 text-base md:text-2xl md:font-semibold z-10;
	@apply md:text-white dark:md:text-dark-w-first;
}

.HeadLink {
	@apply block py-6 px-2 lg:p-5 text-sm lg:text-base font-bold text-white hover:text-primary-700;
	@apply dark:text-dark-w-first dark:hover:text-primary-700;
}

.nv-bg-body {
	background-color: @primary-trans;
	box-shadow: 1px 1px 4px #888888;
}

.navOn {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
	transition: all 0.2s ease-in-out 0.2s;
	transform: translateZ(0);
}
.navOff {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
	transition: all 0.2s ease-in-out 0.2s;
	transform: translate3d(0, -100%, 0);
}

/* #hoverable Class Styles
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.hovered {
	position: static;
	z-index: 5;
}

.hovered > a:after {
	content: '\25BC';
	font-size: 10px;
	padding-left: 6px;
	position: relative;
	top: -1px;
}
</style>
