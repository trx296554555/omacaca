<template>
	<a-carousel autoplay arrows :autoplay-speed="6000" effect="fade" :pause-on-hover="false">
		<template #prevArrow>
			<div class="custom-slick-arrow" style="left: 10px; z-index: 1">
				<left-outlined />
			</div>
		</template>
		<template #nextArrow>
			<div class="custom-slick-arrow" style="right: 10px">
				<right-outlined />
			</div>
		</template>
		<div v-for="(item, index) in homeCarouseImg" :key="index">
			<div
				class="block md:hidden slide-md"
				:style="'background-image:url(' + item + ')'"
			></div>
			<div class="hidden md:block slideshow slideshow-hero">
				<div class="slides">
					<div class="slide" :style="'background-image:url(' + item + ')'"></div>
				</div>
				<a class="info-text font-mono" href="https://www.baidu.com">
					<p></p>
				</a>
			</div>
			<div class="hidden md:block slideshow slideshow-contrast-before">
				<div class="slides">
					<div
						class="slide"
						:style="
							'background-image:linear-gradient(to bottom, rgba(200,200,75,0.1) 0, rgba(200,75,75,0.2) 100%),url(' +
							item +
							')'
						"
					></div>
				</div>
			</div>
			<div class="hidden md:block slideshow slideshow-contrast-after">
				<div class="slides">
					<div
						class="slide"
						:style="
							'background-image:linear-gradient(to bottom, rgba(200,200,75,0.1) 0, rgba(200,75,75,0.2) 100%),url(' +
							item +
							')'
						"
					></div>
				</div>
			</div>
		</div>
	</a-carousel>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'

function getImgUrl() {
	const modules = import.meta.glob('@img/homeCarouse/*.jpg', { eager: true })
	const imgModuleList: string[] = []
	Object.keys(modules).forEach((key) => {
		// @ts-ignore
		const mod = modules[key]?.default || {}
		const modList = Array.isArray(mod) ? [...mod] : [mod]
		imgModuleList.push(...modList)
	})
	return imgModuleList
}
const homeCarouseImg = reactive(getImgUrl())
</script>

<style scoped lang="less">
// web
@media screen and (min-width: 768px) {
	.ant-carousel :deep(.slick-slide) {
		position: relative;
		height: 100vh;
		background: #ffffff;
		overflow: hidden;
		line-height: 0;
	}
}

//ipad pro && ipad mini 768px
@media screen and (max-width: 640px) {
	.ant-carousel :deep(.slick-slide) {
		position: relative;
		height: 40vh;
		background: #ffffff;
		overflow: hidden;
		line-height: 0;
	}
}

/* 箭头样式 */
.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
	width: 25px;
	height: 25px;
	font-size: 25px;
	color: #fff;
	opacity: 0.1;
	z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
	display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
	opacity: 0.5;
}

:deep(.slideshow) {
	position: absolute;
	height: 100%;
}
:deep(.slideshow.slideshow-hero) {
	left: 50%;
	width: 67%;
	height: 100%;
	transform: translateX(-50%) skewX(-10deg);
	z-index: 3;
	overflow: hidden;
	box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
}
:deep(.info-text) {
	position: absolute;
	top: 90%;
	left: 80%;
	opacity: 0.7;
	color: white;
	font-size: 150%;
	font-weight: 200;
}
:deep(.slideshow.slideshow-contrast-before) {
	z-index: 1;
	height: 100%;
	left: 0;
	.slides {
		width: 75vw;
		animation: 10s slideshow-contrast -5s infinite;
	}
}

:deep(.slideshow.slideshow-contrast-after) {
	z-index: 1;
	height: 100%;
	right: 0;
	.slides {
		width: 75vw;
		left: auto;
		right: 0;
		animation: 10s slideshow-contrast -5s infinite;
	}
}
:deep(.slides) {
	position: absolute;
	top: 0;
	height: 100%;
	animation: 11s slideshow-hero -3s infinite;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	width: 90vw;
	left: -25%;
}
:deep(.slide) {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}
:deep(.slide-md) {
	height: 40vh;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}
@keyframes slideshow-hero {
	0% {
		transform: scale(1) skewX(10deg);
	}
	50% {
		transform: scale(1.05) skewX(10deg);
	}
	100% {
		transform: scale(1) skewX(10deg);
	}
}
@keyframes slideshow-contrast {
	0% {
		transform: scale(1.05);
	}

	50% {
		transform: scale(1);
	}

	100% {
		transform: scale(1.05);
	}
}
</style>
