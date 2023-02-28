import { Graph } from '@antv/g6'

export interface GraphObjType {
	plotName: string
	plot?: Graph
	createPlotMethod: (any) => any
	updateDataMethod: (any) => void
}
