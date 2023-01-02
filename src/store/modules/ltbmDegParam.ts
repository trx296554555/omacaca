import { defineStore } from 'pinia'

type AnalyseType = 'ora' | 'gsea'
export type ModelType = 'M1' | 'M2' | 'M3' | 'M4' | 'M5'
export type GenderType = 'm' | 'f' | 'a'
const grouplist = [
	'BCRA',
	'BCRB',
	'BCRC',
	'BCRD',
	'BCRE',
	'BCRF',
	'BCRG',
	'MCR',
	'OCR',
	'BCRALLF',
	'BCRALLM',
	'BCRAF',
	'BCRAM',
	'BCRBF',
	'BCRBM',
	'BCRCF',
	'BCRCM',
	'BCRDF',
	'BCRDM',
	'BCREF',
	'BCREM',
	'BCRFF',
	'BCRFM',
	'BCRGF',
	'BCRGM',
] as const
export type GroupType = typeof grouplist[number]

interface DegParams {
	analyse: AnalyseType
	model: ModelType
	full: boolean
	gender: GenderType
	groups: GroupType[]
	lfc: number
	padj: number
}

interface DegParamInfo {
	degParams: DegParams
	oraItemInfo: any
	gseaItemInfo: any
}

export const useDegParamStore = defineStore({
	id: 'ltbm-deg-parameter',
	state: (): DegParamInfo => ({
		degParams: {
			analyse: 'ora',
			model: 'M1',
			full: true,
			gender: 'a',
			groups: [],
			lfc: 1,
			padj: 0.01,
		},
		oraItemInfo: {
			up: {
				term_id: '',
				term_name: '',
				source: '',
				adjusted_p_value: 0,
				term_size: 0,
				query_size: 0,
				intersection_size: 0,
				rich_factor: 0,
				regulation: '',
				represent_term_ap: false,
				represent_term_wsc: false,
				intersections: '',
			},
			down: {
				term_id: '',
				term_name: '',
				source: '',
				adjusted_p_value: 0,
				term_size: 0,
				query_size: 0,
				intersection_size: 0,
				rich_factor: 0,
				regulation: '',
				represent_term_ap: false,
				represent_term_wsc: false,
				intersections: '',
			},
		},
		gseaItemInfo: {
			term_id: '',
			term_name: '',
			source: '',
			msigdb_id: '',
			setsize: 0,
			enrichmentscore: 0,
			nes: 0,
			pvalue: 0,
			p_adjust: 0,
			qvalues: 0,
			rank: 2014,
			leading_edge: '',
			leading_edge_number: 0,
			rich_factor: 0,
			represent_term_ap: false,
			represent_term_wsc: false,
			core_enrichment: '',
		},
	}),
	actions: {
		setDegParam(newParam: Partial<DegParams>) {
			this.degParams = { ...this.degParams, ...newParam }
		},
		setOraItem(newParam: any) {
			this.oraItemInfo = { ...this.oraItemInfo, ...newParam }
		},
		setGseaItem(newParam: any) {
			this.gseaItemInfo = { ...this.gseaItemInfo, ...newParam }
		},
		// setDegParam<S extends DegParamInfo, K extends keyof S>(key: K, data: Partial<S[K]>) {
		// 	// @ts-ignore
		// 	this.$state[key] = { ...this.$state[key], ...data }
		// },
		initDegParam() {
			this.setDegParam({
				...this.degParams,
			})
		},
	},
})
