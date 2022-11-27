import { defineStore } from 'pinia'

type AnalyseType = 'ora' | 'gsea'
type ModelType = 'M1' | 'M2' | 'M3' | 'M4'
type GroupType = 'BCRA' | 'BCRB' | 'BCRC' | 'BCRD' | 'BCRE' | 'BCRF' | 'BCRG' | 'MCR' | 'OCR' | ''
type GenderType = 'm' | 'f' | 'a'

interface DegParams {
	analyse: AnalyseType
	model: ModelType
	groups: GroupType[]
	gender: GenderType
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
			groups: [],
			gender: 'a',
		},
	}),
	actions: {
		setDegParam(newParam: Partial<DegParams>) {
			this.degParams = { ...this.degParams, ...newParam }
		},
		initDegParam() {
			this.setDegParam({
				...this.degParams,
			})
		},
	},
})
