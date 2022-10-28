import type { AppRouteModule } from '@/router/types'

export const aboutUs: AppRouteModule = {
	path: '/aboutus',
	name: 'About us',
	component: () => import('@/views/home/Help.vue'),
	meta: {
		title: '关于我们',
	},
}

export const contact: AppRouteModule = {
	path: '/contact',
	name: 'Contact us',
	component: () => import('@/views/home/Help.vue'),
	meta: {
		title: '联系我们',
	},
}

export const helpPage: AppRouteModule = {
	path: '/help',
	name: 'Help',
	component: () => import('@/views/home/Help.vue'),
	meta: {
		title: '帮助',
	},
}

export default [aboutUs, contact, helpPage]
