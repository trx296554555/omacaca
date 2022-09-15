import type { ThemeSetting, ThemeType } from '#/config'

export const THEME: { [key: string]: ThemeType } = {
	LIGHT: 'light',
	DARK: 'dark',
}

export const themeSetting: ThemeSetting = {
	// Current theme
	theme: THEME.LIGHT,
	// default theme
	fallback: THEME.LIGHT,
	// available themes
	availableThemes: [THEME.LIGHT, THEME.DARK],
}
