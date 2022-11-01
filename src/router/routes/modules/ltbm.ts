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
	],
}

export default ltbm
