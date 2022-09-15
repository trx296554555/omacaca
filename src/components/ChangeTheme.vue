<template>
	<div>
		<label ref="themeToDefault" class="swap swap-rotate">
			<!-- this hidden checkbox controls the state -->
			<input v-model="switchTheme" type="checkbox" class="swap-input" />
			<!-- sun icon -->
			<icon id="theme-light" class="swap-on">
				<template #component>
					<svg
						viewBox="0 0 1024 1024"
						xmlns="http://www.w3.org/2000/svg"
						width="100%"
						height="100%"
						fill="currentColor"
					>
						<path
							d="M512 320c105.87 0 192 86.13 192 192s-86.13 192-192 192-192-86.13-192-192 86.13-192 192-192m0-64c-141.39 0-256 114.62-256 256s114.61 256 256 256 256-114.62 256-256-114.61-256-256-256zM160 544H96c-17.67 0-32-14.33-32-32s14.33-32 32-32h64c17.67 0 32 14.33 32 32s-14.33 32-32 32zM928 544h-64c-17.67 0-32-14.33-32-32s14.33-32 32-32h64c17.67 0 32 14.33 32 32s-14.33 32-32 32z"
						></path>
						<path
							d="M512 960c-17.67 0-32-14.33-32-32v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64c0 17.67-14.33 32-32 32zM512 192c-17.67 0-32-14.33-32-32V96c0-17.67 14.33-32 32-32s32 14.33 32 32v64c0 17.67-14.33 32-32 32z"
						></path>
						<path
							d="M253.72 285.72c-8.19 0-16.38-3.12-22.62-9.38l-35.88-35.88c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l35.88 35.88c12.5 12.5 12.5 32.75 0 45.25a31.926 31.926 0 0 1-22.63 9.38zM806.16 838.16c-8.19 0-16.38-3.12-22.62-9.38l-35.88-35.88c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l35.88 35.88c12.5 12.5 12.5 32.75 0 45.25a31.943 31.943 0 0 1-22.63 9.38z"
						></path>
						<path
							d="M217.84 838.16c-8.19 0-16.38-3.12-22.62-9.38-12.5-12.5-12.5-32.75 0-45.25l35.88-35.88c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-35.88 35.88a31.909 31.909 0 0 1-22.63 9.38zM770.28 285.72c-8.19 0-16.38-3.12-22.62-9.38-12.5-12.5-12.5-32.75 0-45.25l35.88-35.88c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-35.88 35.88a31.909 31.909 0 0 1-22.63 9.38z"
						></path>
					</svg>
				</template>
			</icon>
			<!-- moon icon -->
			<icon id="theme-dark" class="swap-off" :style="{ color: 'white' }">
				<template #component>
					<svg
						viewBox="0 0 1024 1024"
						xmlns="http://www.w3.org/2000/svg"
						width="100%"
						height="100%"
						fill="currentColor"
					>
						<path
							d="M696.832 215.552c98.816 62.976 162.304 173.056 162.304 294.912 0 192.512-156.672 349.184-349.184 349.184-121.856 0-232.448-63.488-294.912-162.816h5.12c263.168 0 477.184-214.016 477.184-477.184-0.512-1.536-0.512-3.072-0.512-4.096m-78.336-103.936c9.216 34.304 14.336 70.656 14.336 108.032 0 228.352-184.832 413.184-413.184 413.184-37.376 0-73.728-5.12-108.544-14.336 47.616 175.616 207.872 305.152 398.848 305.152 228.352 0 413.184-184.832 413.184-413.184 0-190.976-129.024-351.232-304.64-398.848z"
						></path>
					</svg>
				</template>
			</icon>
		</label>
	</div>
</template>

<script setup lang="ts">
import Icon from '@ant-design/icons-vue'
import { ref, watch } from 'vue'
import { useThemeStoreWithOut } from '@/store/modules/theme'

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
// 以下代码兼容了随系统切换和让用户主动切换日间、暗夜模式的功能
// 默认是跟随系统的颜色模式，通过getColorScheme设置

// 如果手动修改过主题颜色，则会在本地生成记录之后都使用本地颜色
const localTheme: any = localStorage.getItem('theme')
if (localTheme) {
	changeTheme(localTheme)
	useThemeStoreWithOut().setThemeInfo({ theme: localTheme })
} else {
	useThemeStoreWithOut().getColorScheme()
	changeTheme(useThemeStoreWithOut().getTheme)
}

// 调整切换图标类型，以显示当前颜色模式
const iconDefault: boolean = useThemeStoreWithOut().getTheme === 'dark'
const switchTheme = ref(iconDefault)

watch(switchTheme, (now) => {
	if (now) {
		useThemeStoreWithOut().setThemeInfo({ theme: 'dark' })
		changeTheme('dark')
		localStorage.theme = 'dark'
	} else {
		useThemeStoreWithOut().setThemeInfo({ theme: 'light' })
		changeTheme('light')
		localStorage.theme = 'light'
	}
})

function changeTheme(theme: string) {
	if (theme === 'dark') {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}
}
</script>

<style scoped lang="less">
.swap {
	@apply relative inline-grid select-none place-content-center cursor-pointer hover:scale-105;
}

.swap > * {
	@apply duration-300 ease-in-out col-start-1 row-start-1;
	transition-property: transform, opacity;
}

.swap-input {
	@apply appearance-none;
}

.swap-on {
}

.swap-input:checked ~ .swap-on {
	@apply opacity-0 rotate-45;
}

.swap-off {
	@apply opacity-0 -rotate-45;
}

.swap-input:checked ~ .swap-off {
	@apply opacity-100 rotate-0;
}
</style>
