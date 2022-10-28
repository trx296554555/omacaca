<template>
	<nav :class="viewData.navShow ? 'navOn' : 'navOff'" class="nv-bg-body">
		<a-menu mode="horizontal" style="background-color: #2e5d44">
			<a-menu-item key="mail">
				<template #icon>
					<mail-outlined />
				</template>
				Navigation One
			</a-menu-item>
			<a-menu-item key="app" disabled>
				<template #icon>
					<appstore-outlined />
				</template>
				Navigation Two
			</a-menu-item>
			<a-sub-menu key="sub1">
				<template #icon>
					<setting-outlined />
				</template>
				<template #title>Navigation Three - Submenu</template>
				<a-menu-item-group title="Item 1">
					<a-menu-item key="setting:1">Option 1</a-menu-item>
					<a-menu-item key="setting:2">Option 2</a-menu-item>
				</a-menu-item-group>
				<a-menu-item-group title="Item 2">
					<a-menu-item key="setting:3">Option 3</a-menu-item>
					<a-menu-item key="setting:4">Option 4</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-menu-item key="alipay">
				<a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
					Navigation Four - Link
				</a>
			</a-menu-item>
		</a-menu>
	</nav>
	<div class="h-12 md:h-16">123</div>
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
