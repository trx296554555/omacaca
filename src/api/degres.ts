import { defHttp } from '@/http'

/**
 * @description: API 请求路径
 */
enum Api {
	LTBM_DEG_RES = '/ltbm/degtable',
}

/**
 * @description: 请求参数
 */
type DegParams = {
	model_type: string
	comp1: string
	comp2: string
	min_lfc: number
	max_padj: number
	gene_id_ENSG?: string
	log2FoldChange__gte?: number
	log2FoldChange__lte?: number
	ordering?: string
	search?: string
	page?: number
	size?: number
}

/**
 * @description: 数据返回格式
 */
interface ResListItem {
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
export const getDegRes = (params: DegParams) =>
	defHttp.get<ResListItem>({
		url: Api.LTBM_DEG_RES,
		params,
		headers: {},
	})
