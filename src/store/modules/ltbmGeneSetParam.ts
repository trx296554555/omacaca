import { defineStore } from 'pinia'

interface GeneSetParamInfo {
	factor: string
	vpa_default: boolean
	vpaItemInfo: any
	tsaItemInfo: any
	wgcnaItemInfo: any
}

export const useGeneSetParamStore = defineStore({
	id: 'ltbm-geneSet-parameter',
	state: (): GeneSetParamInfo => ({
		factor: 'age',
		vpa_default: false,
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
		tsaItemInfo: {},
		wgcnaItemInfo: {},
	}),
	actions: {
		setVpaItem(newParam: any) {
			this.vpaItemInfo = { ...this.vpaItemInfo, ...newParam }
		},
		setTsaItem(newParam: any) {
			this.tsaItemInfo = { ...this.tsaItemInfo, ...newParam }
		},
		setWgcnaItem(newParam: any) {
			this.wgcnaItemInfo = { ...this.wgcnaItemInfo, ...newParam }
		},
	},
})
