import type { AppRouteModule } from '@/router/types'
// import { LAYOUT } from '@/router/constant'

const ltgem: AppRouteModule = {
	path: '/ltgem',
	name: 'About',
	redirect: '/ltgem/introduction',
	meta: {
		icon: 'simple-icons:about-dot-me',
		title: 'Long-term Tracking of Gene Expression in Baby Macaque',
	},
	children: [
		{
			path: 'introduction',
			name: 'IntroductionPage',
			redirect: '/ltgem/introduction/inddd',
			component: () => import('@/views/ltgem/test1.vue'),
			meta: {
				title: 'test123',
				icon: 'simple-icons:about-dot-me',
			},
			children: [
				{
					path: 'inddd',
					name: 'AboutPage',
					component: () => import('@/views/ltgem/test2.vue'),
					meta: {
						title: 'test123',
						icon: 'simple-icons:about-dot-me',
						ignoreKeepAlive: true,
					},
				},
				{
					path: 'inddd2',
					name: 'AboutPag2',
					component: () => import('@/views/ltgem/test3.vue'),
					meta: {
						title: 'test123',
						icon: 'simple-icons:about-dot-me',
						ignoreKeepAlive: false,
					},
				},
			],
		},
	],
}

export default ltgem
