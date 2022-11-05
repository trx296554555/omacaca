import { isObject } from './is'

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
	let key: string
	for (key in target) {
		src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
	}
	return src
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
	let parameters = ''
	for (const key in obj) {
		parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
	}
	parameters = parameters.replace(/&$/, '')
	return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

export function getStaticImage(name: string): string {
	return new URL(`../assets/img/${name}`, import.meta.url).href
}

export function getStaticImageUrl(name: string) {
	const modules = import.meta.glob(['@img/*/*.jpg', '@img/*/*.png'], {
		eager: true,
	})
	const imgModuleList: string[] = []

	Object.keys(modules).forEach((key) => {
		// @ts-ignore
		const mod = modules[key]?.default || {}
		const modList = Array.isArray(mod) ? [...mod] : [mod]
		imgModuleList.push(...modList)
	})
	function findName(file) {
		return file.indexOf(name) !== -1
	}
	return imgModuleList.find(findName) ?? ''
}
