import { defineStore } from 'pinia'

interface GeneSetParamInfo {
	factor: string
	vpa_default: boolean
	tsa_cluster: string
	vpaItemInfo: any
	tsaItemInfo: any
	tsaEnrichItemInfo: any
	wgcnaItemInfo: any
	wgcnaEnrichItemInfo: any
}

export const useGeneSetParamStore = defineStore({
	id: 'ltbm-geneSet-parameter',
	state: (): GeneSetParamInfo => ({
		factor: 'age',
		vpa_default: false,
		tsa_cluster: '1',
		vpaItemInfo: {
			age: 0,
			condition: 0,
			gene_id_ENSG: 'ENSMMUG00000000001',
			hemoglobin: 0,
			id: '',
			individual: 0,
			residuals: 0,
			rin: 0,
			sex: 0,
			state: 0,
		},
		tsaItemInfo: {
			gene_id_ENSG: 'ENSMMUG00000000001',
		},
		tsaEnrichItemInfo: {
			adjusted_p_value: 0,
			cluster: 'cluster_1',
			effective_domain_size: 0,
			intersection_size: 0,
			intersections: '',
			model_type: 'TSA',
			negative_log10_of_adjusted_p_value: 0,
			query_size: 0,
			represent_term_ap: true,
			represent_term_wsc: true,
			rich_factor: 0.07,
			source: 'GO:BP',
			term_id: 'GO:0007006',
			term_name: 'mitochondrial membrane organization',
			term_size: 7,
		},
		wgcnaItemInfo: {},
		wgcnaEnrichItemInfo: {},
	}),
	actions: {
		setVpaItem(newParam: any) {
			this.vpaItemInfo = { ...this.vpaItemInfo, ...newParam }
		},
		setTsaItem(newParam: any) {
			this.tsaItemInfo = { ...this.tsaItemInfo, ...newParam }
		},
		setTsaEnrichItem(newParam: any) {
			this.tsaEnrichItemInfo = { ...this.tsaEnrichItemInfo, ...newParam }
		},
		setWgcnaItem(newParam: any) {
			this.wgcnaItemInfo = { ...this.wgcnaItemInfo, ...newParam }
		},
		setWgcnaEnrichItem(newParam: any) {
			this.wgcnaEnrichItemInfo = { ...this.wgcnaEnrichItemInfo, ...newParam }
		},
	},
})
