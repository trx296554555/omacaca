import { defineStore } from 'pinia'

type AnalyseType = 'ora' | 'gsea'
type ModelType = 'M1' | 'M2' | 'M3' | 'M4' | 'M5'
type GenderType = 'm' | 'f' | 'a'
type GroupType = 'BCRA' | 'BCRB' | 'BCRC' | 'BCRD' | 'BCRE' | 'BCRF' | 'BCRG' | 'MCR' | 'OCR' | ''

interface DegParams {
	analyse: AnalyseType
	model: ModelType
	full: boolean
	gender: GenderType
	groups: GroupType[]
}

interface DegParamInfo {
	degParams: DegParams
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
		},
	}),
	actions: {
		setDegParam(newParam: Partial<DegParams>) {
			this.degParams = { ...this.degParams, ...newParam }
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
