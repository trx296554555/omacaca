import type { ThemeSetting, ThemeType, ThemeCol } from '#/config'

import { defineStore } from 'pinia'
import { store } from '@/store'

import { themeSetting } from '@/settings/themeSetting'

interface ThemeState {
	themeInfo: ThemeSetting
}
export const useThemeStore = defineStore({
	id: 'app-theme',
	state: (): ThemeState => ({
		themeInfo: themeSetting,
	}),
	getters: {
		getTheme(): ThemeType {
			return this.themeInfo?.theme ?? 'light'
		},
	},
	actions: {
		/**
		 * 获取当前系统颜色设置
		 */
		getColorScheme() {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				this.setThemeInfo({ theme: 'dark' })
			} else {
				this.setThemeInfo({ theme: 'light' })
			}
		},
		getThemeCol(key): ThemeCol {
			return this.themeInfo?.themeCol[this.getTheme][key]
		},
		/**
		 * Set up theme information and cache
		 * @param info multilingual info
		 */
		setThemeInfo(info: Partial<ThemeSetting>) {
			this.themeInfo = { ...this.themeInfo, ...info }
		},
		/**
		 * Initialize theme information and load the existing configuration from the local cache
		 */
		initTheme() {
			this.setThemeInfo({
				...themeSetting,
				...this.themeInfo,
			})
		},
	},
})

// Need to be used outside the setup
export function useThemeStoreWithOut() {
	return useThemeStore(store)
}
