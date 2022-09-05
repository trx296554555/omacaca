import type { LocaleType } from '#/config'

import { merge } from 'lodash-es'

export const loadLocalePool: LocaleType[] = []

export function setHtmlPageLang(locale: LocaleType) {
	document.querySelector('html')?.setAttribute('lang', locale)
}

export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
	cb(loadLocalePool)
}

export function genMessage(langs: any) {
	const obj = {}
	Object.keys(langs).forEach((key) => {
		const langFileModule = langs[key].default
		merge(obj, langFileModule)
	})
	return obj
}
