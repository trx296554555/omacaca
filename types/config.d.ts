export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'
export type ThemeType = 'light' | 'dark'
export type ThemeCol = '#5dbe8a' | '#2e5d44'

export interface LocaleSetting {
	showPicker: boolean
	// Current language
	locale: LocaleType
	// default language
	fallback: LocaleType
	// available Locales
	availableLocales: LocaleType[]
}

export interface ThemeSetting {
	// Current theme
	theme: ThemeType
	// theme color
	themeCol: {
		[key: ThemeType]: { [key: string]: ThemeCol }
	}
	// default theme
	fallback: ThemeType
	// available themes
	availableThemes: ThemeType[]
}
