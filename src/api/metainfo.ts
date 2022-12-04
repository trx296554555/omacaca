import { defHttp } from '@/http'

/**
 * @description: API 请求路径
 */
enum Api {
	LTBM_META_INFO = '/ltbm/metainfo',
	LTBM_UMAP_INFO = '/ltbm/metaumap',
}

/**
 * @description: 请求参数
 */
type MetaParams = {
	lang?: string
	sample_id?: string
	search?: string
	ordering?: string
	page?: number
	size?: number
}

/**
 * @description: 数据返回格式
 */
interface ResListItem {
	config: string
	data: { results?: [] }
	header: {}
	request: XMLHttpRequest
	status: number
	statusText: string
}

/**
 * @description: API
 */
export const getMetaInfoList = (params: MetaParams) =>
	defHttp.get<ResListItem>({
		url: Api.LTBM_META_INFO,
		params,
		headers: {},
	})

export const getUmapInfoList = (params: MetaParams) =>
	defHttp.get<ResListItem>({
		url: Api.LTBM_UMAP_INFO,
		params,
		headers: {},
	})
