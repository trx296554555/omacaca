import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'

// app router
// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
	// 创建一个 hash 历史记录。
	history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
	// 应该添加到路由的初始路由列表。
	routes: basicRoutes as unknown as RouteRecordRaw[],
	// 是否应该禁止尾部斜杠。默认为假
	strict: true,
	scrollBehavior: () => ({ left: 0, top: 0 }),
})

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
	app.use(router)
}

// 路由跳转，默认push 用replace的话是替换当前页面，不能再返回
// 也可以使用router-link的方式
export function routerGo(path: string, isReplace: boolean = false) {
	const { push, replace } = router
	function handleError(e: Error) {
		console.error(e)
	}
	isReplace ? replace(path).catch(handleError) : push(path).catch(handleError)
}
