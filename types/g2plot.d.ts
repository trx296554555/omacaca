import { Line, Scatter } from '@antv/g2plot'

export interface plotObjType {
	plotName: string
	plot?: Line | Scatter
	createPlotMethod: (any) => Line | Scatter
	updateDataMethod: (any) => void
}
