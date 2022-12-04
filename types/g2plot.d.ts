import { Line, Scatter } from '@antv/g2plot'

export interface plotObjType {
	plot?: Line | Scatter
	createPlotMethod: (any) => Line | Scatter
	updateDataMethod: (any) => void
}
