import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types'

import { mainOutRoutes } from './mainOut'
import { PageEnum } from '@/enums/pageEnum'

const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
const routeModuleList: AppRouteModule[] = []

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
	// @ts-ignore
	const mod = modules[key]?.default || {}
	const modList = Array.isArray(mod) ? [...mod] : [mod]
	routeModuleList.push(...modList)
})

export const asyncRoutes = [...routeModuleList]

// 根路由
export const RootRoute: AppRouteRecordRaw = {
	path: '/',
	name: 'Root',
	redirect: PageEnum.BASE_HOME,
	meta: {
		title: 'Root',
	},
}

// home路由
export const HomeRoute: AppRouteRecordRaw = {
	path: '/home',
	name: 'Home',
	component: () => import('@/views/home/index.vue'),
	meta: {
		title: 'Home',
	},
}

// 404路由
export const ErrorRoute: AppRouteRecordRaw = {
	path: '/error',
	name: 'PageNotFound',
	component: () => import('@/views/sys/exception/PageNotFound.vue'),
	meta: {
		title: 'PageNotFound',
	},
}

// 错误路由重定向
export const RedirectRoute: AppRouteRecordRaw = {
	path: '/:path(.*)*',
	name: 'Redirect',
	redirect: '/error',
	meta: {
		title: 'Redirect',
	},
}

// All known routes
// 所有已知路由
export const basicRoutes = [
	RootRoute,
	HomeRoute,
	...mainOutRoutes,
	...asyncRoutes,
	ErrorRoute,
	RedirectRoute,
]
