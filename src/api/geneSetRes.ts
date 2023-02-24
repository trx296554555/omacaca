import { defHttp } from '@/http'

/**
 * @description: API 请求路径
 */
enum Api {
	LTBM_VPA_RES = '/ltbm/vpatable',
	LTBM_EXP_GROUPBY_RES = '/ltbm/geneexpgroupby',
	LTBM_TSA_RES = '/ltbm/tsares',
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

type ExpGroupByParams = {
	model_type?: string
	gene_id_ENSG: string
	groupby: string
	lang: string
}

type TsaParams = {
	cluster: string
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

interface ExpGroupByResListItem {
	data: any
	describe: any
}

interface TsaResListItem {
	data: {
		tsa: any
		tsa_enrichment: any
	}
}

/**
 * @description: API
 */
export const getVpaRes = (params: VpaParams) =>
	defHttp.get<VpaResListItem>({
		timeout: 1000 * 45,
		url: Api.LTBM_VPA_RES,
		params,
		headers: {},
	})

export const getExpGroupByRes = (params: ExpGroupByParams) =>
	defHttp.get<ExpGroupByResListItem>({
		url: Api.LTBM_EXP_GROUPBY_RES,
		params,
		headers: {},
	})

export const getTsaRes = (params: TsaParams) =>
	defHttp.get<TsaResListItem>({
		url: Api.LTBM_TSA_RES,
		params,
		headers: {},
	})
