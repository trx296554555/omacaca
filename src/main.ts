import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupI18n } from '@/locales/setupI18n'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'

import '@style/global.less'
import '@style/main.css'
import 'animate.css'

async function bootstrap() {
	const app = createApp(App)
	// Configure store
	// 配置 store
	setupStore(app)
	// 多语言配置
	// Asynchronous case: language files may be obtained from the server side
	// 异步案例：语言文件可能从服务器端获取
	await setupI18n(app)
	// Configure routing
	// 配置路由
	setupRouter(app)
	// router-guard
	// 路由守卫
	setupRouterGuard(router)

	app.mount('#app')
}

bootstrap()
