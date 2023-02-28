import type { ThemeSetting, ThemeType } from '#/config'

export const THEME: { [key: string]: ThemeType } = {
	LIGHT: 'light',
	DARK: 'dark',
}

export const themeSetting: ThemeSetting = {
	// Current theme
	theme: THEME.LIGHT,
	// theme color
	themeCol: {
		light: { primaryCol: '#5dbe8a', whiteCol: '#fff', blackCol: '#262626' },
		dark: {
			primaryCol: '#2e5d44',
			whiteCol: 'rgba(255,255,255,0.85)',
			blackCol: 'rgba(255,255,255,0.85)',
		},
	},
	// default theme
	fallback: THEME.LIGHT,
	// available themes
	availableThemes: [THEME.LIGHT, THEME.DARK],
}
