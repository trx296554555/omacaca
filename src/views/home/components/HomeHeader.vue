<template>
	<nav
		ref="HomeHeader"
		:class="viewData.navShow ? 'navOn' : 'navOff'"
		class="text-gray-900 nv-bg-carousel"
	>
		<div class="md:flex justify-between">
			<div class="flex relative py-5">
				<img class="h-8 mx-4 mt-2 md:mt-0" src="@icon/monkey.svg" />
				<h1 class="mt-2.5 md:mt-0 text-lg md:text-2xl md:font-semibold text-white z-10">
					Omics Research of Wildlife
				</h1>
				<div class="md:hidden absolute left-0 z-0">
					<a-menu
						id="mobile-dropMenu"
						:style="'width:' + viewData.viewWidth + 'px'"
						style="background: transparent; border: none"
						mode="inline"
					>
						<a-sub-menu key="sub2" expand-icon>
							<template #expandIcon
								><menu-outlined :style="{ color: '#fff' }"
							/></template>
							<a-menu-item key="5">Option 5</a-menu-item>
							<a-menu-item key="6">Option 6</a-menu-item>
							<a-sub-menu key="sub3" title="Submenu">
								<a-menu-item key="7">Option 7</a-menu-item>
								<a-menu-item key="8">Option 8</a-menu-item>
							</a-sub-menu>
						</a-sub-menu>
					</a-menu>
				</div>
			</div>

			<ul class="hidden md:flex">
				<!--Regular Link-->
				<li class="text-white dark:text-gray-300">
					<router-link
						to="/home"
						class="block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold hover:text-primary-500"
						>Home</router-link
					>
				</li>
				<li class="text-white dark:text-gray-300">
					<router-link
						to="/news"
						class="block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold hover:text-primary-500"
						>News</router-link
					>
				</li>
				<li class="text-white dark:text-gray-300">
					<router-link
						to="/member"
						class="block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold hover:text-primary-500"
						>Member</router-link
					>
				</li>
				<li class="text-white dark:text-gray-300">
					<router-link
						to="/publication"
						class="block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold hover:text-primary-500"
						>Publication</router-link
					>
				</li>
				<!--Hoverable Link-->
				<li class="hovered text-white dark:text-gray-300">
					<router-link
						to="/research"
						class="block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold hover:text-primary-500"
						>Research</router-link
					>
					<div
						ref="MegaMenu"
						class="p-6 mega-menu mb-16 sm:mb-0 shadow-xl nv-bg-carousel-r"
					>
						<div class="px-4 mx-auto w-full flex flex-wrap justify-between mx-2">
							<div class="w-full mb-4">
								<h2 class="font-bold text-primary-700 text-xl">
									Provides Interactive Visual Data Analysis
								</h2>
							</div>
							<router-link
								to="/ltgem"
								class="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3"
							>
								<div class="">
									<h3 class="font-bold text-xl text-white mb-2">
										Long-term Tracking of Baby Macaque
									</h3>
									<p class="text-gray-100 text-sm">
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
</template>

<script setup lang="ts">
import { onMounted, watch, reactive, ref } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import { MenuOutlined } from '@ant-design/icons-vue'
import { debounce } from 'xe-utils'
// 用于自适应显示的数据，包括网页可见区域宽高等
const viewData = reactive({
	top: 0,
	viewHeight: 0,
	viewWidth: 0,
	navShow: true,
})
// 获取组件对象
const HomeHeader = ref<HTMLElement | null>(null)
const MegaMenu = ref<HTMLElement | null>(null)

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
			// viewData.navShow = newValue <= oldValue
			if (HomeHeader.value && MegaMenu.value) {
				HomeHeader.value.classList.remove('nv-bg-carousel')
				MegaMenu.value.classList.remove('nv-bg-carousel-r')
				HomeHeader.value.classList.add('bg-primary-trans')
				MegaMenu.value.classList.add('bg-primary-trans')
			}
		} else {
			viewData.navShow = true
			if (HomeHeader.value && MegaMenu.value) {
				HomeHeader.value.classList.remove('bg-primary-trans')
				MegaMenu.value.classList.remove('bg-primary-trans')
				HomeHeader.value.classList.add('nv-bg-carousel')
				MegaMenu.value.classList.add('nv-bg-carousel-r')
			}
		}
	}
)
</script>

<style scoped lang="less">
.nv-bg-carousel {
	background-image: linear-gradient(to bottom, rgba(20, 20, 20, 0.5), transparent);
}
.nv-bg-carousel-r {
	background-image: linear-gradient(to top, rgba(20, 20, 20, 0.7), transparent);
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
