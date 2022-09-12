import { defHttp } from '@/http'

/**
 * @description: API 请求路径
 */
enum Api {
	DEMO_LIST = '/getData/get_htm_res',
}

/**
 * @description: 请求参数
 */
type DemoParams = {
	model: string
	isFull: string
	gender: string
	lfcp: string
}

/**
 * @description: 数据返回格式
 */
interface ResListItem {
	X: string
	Y: string
	down: number
	rate: number
	size: number
	up: number
}

/**
 * @description: API
 */
export const apiDemoList = (params: DemoParams) =>
	defHttp.get<ResListItem>({
		url: Api.DEMO_LIST,
		params,
		headers: {},
	})
