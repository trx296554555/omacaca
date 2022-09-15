<template>
	<nav :class="viewData.navShow ? 'navOn' : 'navOff'" class="nv-bg-light text-gray-900">
		<div class="flex justify-between">
			<div class="flex p-6">
				<img class="h-8 mx-4" src="@icon/monkey.svg" />
				<h1 class="md:text-2xl text-white">Omics Research of Wild Animal</h1>
			</div>
			<div class="ml-auto md:hidden text-gray-500 cursor-pointer">
				<menu-outlined />
			</div>
			<ul class="flex">
				<!--Regular Link-->
				<li class="hover:bg-blue-800 text-white dark:text-gray-300">
					<a
						href="#"
						class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold"
						>Home</a
					>
				</li>
				<li class="hover:bg-blue-800 text-white dark:text-gray-300">
					<a
						href="#"
						class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold"
						>News</a
					>
				</li>
				<li class="hover:bg-blue-800 text-white dark:text-gray-300">
					<a
						href="#"
						class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold"
						>Member</a
					>
				</li>
				<li class="hover:bg-blue-800 text-white dark:text-gray-300">
					<a
						href="#"
						class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold"
						>Publication</a
					>
				</li>

				<!--Hoverable Link-->
				<li class="hovered hover:bg-blue-800 hover:text-white">
					<a
						href="#"
						class="relative block py-6 px-4 lg:p-6 text-sm lg:text-base font-bold hover:bg-blue-800 hover:text-white"
						>Research</a
					>
					<div class="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-primary">
						<div class="container mx-auto w-full flex flex-wrap justify-between mx-2">
							<div class="w-full text-white mb-8">
								<h2 class="font-bold text-2xl">
									Main Hero Message for the menu section
								</h2>
								<p>
									Sub-hero message, not too long and not too short. Make it just
									right!
								</p>
							</div>
							<ul
								class="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3"
							>
								<div class="flex items-center">
									<svg
										class="h-8 mb-3 mr-3 fill-current text-white"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z"
										/>
									</svg>
									<h3 class="font-bold text-xl text-white text-bold mb-2">
										Heading 1
									</h3>
								</div>
								<p class="text-gray-100 text-sm">
									Quarterly sales are at an all-time low create spaces to explore
									the accountable talk and blind vampires.
								</p>
								<div class="flex items-center py-3">
									<svg
										class="h-6 pr-3 fill-current text-blue-300"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z"
										/>
									</svg>
									<a
										href="#"
										class="text-white bold border-b-2 border-blue-300 hover:text-blue-300"
										>Find out more...</a
									>
								</div>
							</ul>
							<ul
								class="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3"
							>
								<div class="flex items-center">
									<svg
										class="h-8 mb-3 mr-3 fill-current text-white"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"
										/>
									</svg>
									<h3 class="font-bold text-xl text-white text-bold mb-2">
										Heading 2
									</h3>
								</div>
								<p class="text-gray-100 text-sm">
									Prioritize these line items game-plan draw a line in the sand
									come up with something buzzworthy UX upstream selling.
								</p>
								<div class="flex items-center py-3">
									<svg
										class="h-6 pr-3 fill-current text-blue-300"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z"
										/>
									</svg>
									<a
										href="#"
										class="text-white bold border-b-2 border-blue-300 hover:text-blue-300"
										>Find out more...</a
									>
								</div>
							</ul>
							<ul
								class="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-b-0 sm:border-r md:border-b-0 pb-6 pt-6 lg:pt-3"
							>
								<div class="flex items-center">
									<svg
										class="h-8 mb-3 mr-3 fill-current text-white"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"
										/>
									</svg>
									<h3 class="font-bold text-xl text-white text-bold mb-2">
										Heading 3
									</h3>
								</div>
								<p class="text-gray-100 text-sm">
									This proposal is a win-win situation which will cause a stellar
									paradigm shift, let's touch base off-line before we fire the new
									ux experience.
								</p>
								<div class="flex items-center py-3">
									<svg
										class="h-6 pr-3 fill-current text-blue-300"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z"
										/>
									</svg>
									<a
										href="#"
										class="text-white bold border-b-2 border-blue-300 hover:text-blue-300"
										>Find out more...</a
									>
								</div>
							</ul>
							<ul
								class="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 pb-6 pt-6 lg:pt-3"
							>
								<div class="flex items-center">
									<svg
										class="h-8 mb-3 mr-3 fill-current text-white"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"
										/>
									</svg>
									<h3 class="font-bold text-xl text-white text-bold mb-2">
										Heading 4
									</h3>
								</div>
								<p class="text-gray-100 text-sm">
									This is a no-brainer to wash your face, or we need to
									future-proof this high performance keywords granularity.
								</p>
								<div class="flex items-center py-3">
									<svg
										class="h-6 pr-3 fill-current text-blue-300"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z"
										/>
									</svg>
									<a
										href="#"
										class="text-white bold border-b-2 border-blue-300 hover:text-blue-300"
										>Find out more...</a
									>
								</div>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive } from 'vue'
import { MenuOutlined } from '@ant-design/icons-vue'

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
	window.addEventListener('scroll', () => {
		viewData.top = document.documentElement.scrollTop || document.body.scrollTop
	})
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
		}
	}
)
</script>

<style scoped lang="less">
.nv-bg-light {
	background-image: linear-gradient(to bottom, rgba(20, 20, 20, 0.5), transparent);
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
