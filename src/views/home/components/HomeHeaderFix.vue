<template>
	<nav :class="viewData.navShow ? 'navOn' : 'navOff'" class="nv-bg-body">
		<div class="md:flex justify-between">
			<div class="flex relative py-2.5 md:py-4">
				<img class="h-7 mx-4 mt-0 z-10" src="@icon/monkey.svg" />
				<h1 class="HomeTitle">欧我的猴子惹</h1>
				<div class="md:hidden absolute left-0 top-0 z-0">
					<a-menu
						id="mobile-dropMenu"
						:style="'width:' + viewData.viewWidth + 'px'"
						style="border: none"
						mode="inline"
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
								{{ useThemeStoreWithOut().getThemeCol('primaryCol') }}
							</a-menu-item>
							<a-menu-item key="3">Option 6</a-menu-item>
							<a-menu-item key="4">Option 6</a-menu-item>
							<a-menu-item key="5">Option 6</a-menu-item>
							<a-sub-menu key="sub2" title="Submenu">
								<a-menu-item key="6">Option 7</a-menu-item>
								<a-menu-item key="7">Option 8</a-menu-item>
							</a-sub-menu>
						</a-sub-menu>
					</a-menu>
				</div>
			</div>

			<ul class="hidden md:flex">
				<!--Regular Link-->
				<li>
					<router-link to="/home" class="HeadLink">Home</router-link>
				</li>
				<li>
					<router-link to="/news" class="HeadLink">News</router-link>
				</li>
				<li>
					<router-link to="/member" class="HeadLink">Member</router-link>
				</li>
				<li>
					<router-link to="/publication" class="HeadLink">Publication</router-link>
				</li>
				<!--Hoverable Link-->
				<li class="hovered">
					<router-link to="/research" class="HeadLink">Research</router-link>
					<div class="p-6 mega-menu mb-16 sm:mb-0 shadow-xl nv-bg-body">
						<div class="px-4 mx-auto w-full flex flex-wrap justify-between mx-2">
							<div class="w-full mb-4">
								<p class="font-bold text-primary-700 text-xl">
									Provides Interactive Visual Data Analysis
								</p>
							</div>
							<router-link
								to="/ltbm"
								class="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3"
							>
								<div>
									<p class="font-bold text-xl white-text mb-2">
										Long-term Tracking of Baby Macaque
									</p>
									<p class="white-text text-sm">
										We performed a long-term tracking on captivity macaques,
										monitored the indicators and environmental information
										during its growth and development.
									</p>
								</div>
							</router-link>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</nav>
	<div class="h-12 md:h-16"></div>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive } from 'vue'
import { MenuOutlined } from '@ant-design/icons-vue'
import { useThemeStoreWithOut } from '@/store/modules/theme'

// 用于自适应显示的数据，包括网页可见区域宽高等
const viewData = reactive({
	top: 0,
	viewHeight: 0,
	viewWidth: 0,
	navShow: true,
})

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
		if (newValue > viewData.viewHeight) {
			viewData.navShow = newValue <= oldValue
		} else {
			viewData.navShow = true
		}
	}
)
</script>

<style scoped lang="less">
.HomeTitle {
	@apply mt-0 md:mt-0 text-lg md:text-2xl md:font-semibold z-10;
	@apply md:text-white dark:md:text-dark-w-first;
}

.HeadLink {
	@apply block py-6 px-2 lg:p-5 text-sm lg:text-base font-bold text-white hover:text-primary-700;
	@apply dark:text-dark-w-first dark:hover:text-primary-700;
}

.nv-bg-body {
	background-color: @primary-trans;
}

.navOn {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
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

/* #Mega Menu Styles
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
.mega-menu {
	display: none;
	left: 0;
	top: 100%;
	position: absolute;
	text-align: left;
	width: 100%;
	transition: all 0.2s ease-in-out 0.2s;
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

.hovered:hover .mega-menu {
	display: block;
}
</style>
