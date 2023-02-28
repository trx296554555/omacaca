import { defHttp } from '@/http'

/**
 * @description: API 请求路径
 */
enum Api {
	LTBM_VPA_RES = '/ltbm/vpatable',
	LTBM_EXP_GROUPBY_RES = '/ltbm/geneexpgroupby',
	LTBM_TSA_RES = '/ltbm/tsares',
	LTBM_WGCNA_MT_RES = '/ltbm/wgcnamttable',
	LTBM_WGCNA_RES = '/ltbm/wgcnares',
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

type WgcnaMtParams = {
	page?: number
	size?: number
}

type WgcnaParams = {
	module: string
	ordering?: string
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

interface WgcnaMtResListItem {
	x: string
	y: string
	correlation_value: number
	p_value: number
	analyse: string
	model_type: string
}

interface WgcnaResListItem {
	data: {
		module: string
		gene_num: number
		label: number
		gsmm_info: any
		enrichment: any
		network: any
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

export const getWgcnaMtRes = (params: WgcnaMtParams) =>
	defHttp.get<WgcnaMtResListItem>({
		url: Api.LTBM_WGCNA_MT_RES,
		params,
		headers: {},
	})

export const getWgcnaRes = (params: WgcnaParams) =>
	defHttp.get<WgcnaResListItem>({
		timeout: 1000 * 45,
		url: Api.LTBM_WGCNA_RES,
		params,
		headers: {},
	})
