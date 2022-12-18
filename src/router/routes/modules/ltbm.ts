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
	],
}

export default ltbm
