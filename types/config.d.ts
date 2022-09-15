export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'
export type ThemeType = 'light' | 'dark'

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
	// default theme
	fallback: ThemeType
	// available themes
	availableThemes: ThemeType[]
}
