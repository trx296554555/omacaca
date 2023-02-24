import type { AppRouteModule } from '@/router/types'

const ltbm: AppRouteModule = {
	path: '/ltbm',
	name: 'LtbmPage',
	component: () => import('@/views/ltbm/index.vue'),
	redirect: '/ltbm/introduction',
	meta: {
		title: 'Long-term Tracking of Baby Macaque',
	},
	children: [
		{
			path: 'introduction',
			name: 'IntroductionPage',
			component: () => import('@/views/ltbm/introduction/index.vue'),
			meta: {
				title: 'Ltbm Introduction',
			},
		},
		{
			path: 'ora',
			name: 'OraPage',
			component: () => import('@/views/ltbm/transcriptomics/ora/index.vue'),
			meta: {
				title: 'Ltbm Over-representation Enrichment Analysis',
			},
		},
		{
			path: 'gsea',
			name: 'GseaPage',
			component: () => import('@/views/ltbm/transcriptomics/gsea/index.vue'),
			meta: {
				title: 'Ltbm Gene Set Enrichment Analysis',
			},
		},
		{
			path: 'orares',
			name: 'OraResultPage',
			component: () => import('@/views/ltbm/transcriptomics/ora/OraResults.vue'),
			meta: {
				title: 'Ltbm Over-representation Enrichment Analysis Results',
			},
		},
		{
			path: 'gseares',
			name: 'GseaResultPage',
			component: () => import('@/views/ltbm/transcriptomics/gsea/GseaResults.vue'),
			meta: {
				title: 'Ltbm Gene Set Analysis Results',
			},
		},
		{
			path: 'vpa',
			name: 'vpaPage',
			component: () => import('@/views/ltbm/transcriptomics/vpa/index.vue'),
			meta: {
				title: 'Ltbm Variance Partition Analysis',
			},
		},
		{
			path: 'tsa',
			name: 'tsaPage',
			component: () => import('@/views/ltbm/transcriptomics/tsa/index.vue'),
			meta: {
				title: 'Ltbm Time Series Analysis',
			},
		},
		{
			path: 'wgcna',
			name: 'wgcnaPage',
			component: () => import('@/views/ltbm/transcriptomics/wgcna/index.vue'),
			meta: {
				title: 'Ltbm Weighted Gene Co-expression Network Analysis',
			},
		},
	],
}

export default ltbm
