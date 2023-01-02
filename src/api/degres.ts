import { defHttp } from '@/http'

/**
 * @description: API 请求路径
 */
enum Api {
	LTBM_DEG_RES = '/ltbm/degtable',
	LTBM_GPF_RES = 'ltbm/gpftable',
	LTBM_GSEA_RES = 'ltbm/gseatable',
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

type GpfParams = {
	model_type: string
	comp1: string
	comp2: string
	lfc_threshold: number
	padj_threshold: number
	regulation: string
	source?: string
	ordering?: string
	search?: string
	page?: number
	size?: number
}

type GseaParams = {
	model_type: string
	comp1: string
	comp2: string
	source?: string
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

interface GpfResListItem {
	source: string
	term_name: string
	term_id: string
	adjusted_p_value: number
	negative_log10_of_adjusted_p_value: number
	term_size: number
	query_size: number
	intersection_size: number
	effective_domain_size: number
	intersections: string
	represent_term_wsc: boolean
	represent_term_ap: boolean
	rich_factor: number
}

interface GseaResListItem {
	source: string
	term_id: string
	term_name: string
	msigdb_id: string
	setsize: number
	enrichmentscore: number
	nes: number
	pvalue: number
	p_adjust: number
	qvalues: number
	rank: number
	leading_edge: string
	leading_edge_number: number
	core_enrichment: string
	represent_term_wsc: boolean
	represent_term_ap: boolean
	rich_factor: number
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

export const getGpfRes = (params: GpfParams) =>
	defHttp.get<GpfResListItem>({
		url: Api.LTBM_GPF_RES,
		params,
		headers: {},
	})

export const getGseaRes = (params: GseaParams) =>
	defHttp.get<GseaResListItem>({
		url: Api.LTBM_GSEA_RES,
		params,
		headers: {},
	})
