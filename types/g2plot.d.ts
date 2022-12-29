import { Line, Scatter, WordCloud } from '@antv/g2plot'

export interface plotObjType {
	plotName: string
	plot?: Line | Scatter | WordCloud | Venn
	createPlotMethod: (any) => Line | Scatter | WordCloud | Venn
	updateDataMethod: (any) => void
}
