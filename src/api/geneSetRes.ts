import { defHttp } from '@/http'

/**
 * @description: API 请求路径
 */
enum Api {
	LTBM_VPA_RES = '/ltbm/vpatable',
}

/**
 * @description: 请求参数
 */
type VpaParams = {
	gene_id_ENSG?: string
	ordering?: string
	search?: string
	page?: number
	size?: number
}

/**
 * @description: 数据返回格式
 */
interface VpaResListItem {
	gene_id_ENSG: string
	baseMean: number
	log2FoldChange: number
	lfcSE: number
	stat: number
	pvalue: number
	padj: number
}

/**
 * @description: API
 */
export const getVpaRes = (params: VpaParams) =>
	defHttp.get<VpaResListItem>({
		url: Api.LTBM_VPA_RES,
		params,
		headers: {},
	})
