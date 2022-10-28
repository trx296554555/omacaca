import type { AppRouteModule } from '@/router/types'
// import { LAYOUT } from '@/router/constant'

const ltgem: AppRouteModule = {
	path: '/ltgem',
	name: 'LtgemPage',
	component: () => import('@/views/ltgem/index.vue'),
	redirect: '/ltgem/introduction',
	meta: {
		title: 'Long-term Tracking of Gene Expression in Baby Macaque',
	},
	children: [
		{
			path: 'introduction',
			name: 'IntroductionPage',
			component: () => import('@/views/ltgem/Introduction.vue'),
			meta: {
				title: 'Ltgem Introduction',
			},
		},
	],
}

export default ltgem
