import './style.css'
import 'ant-design-vue/dist/antd.css'

import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import { setupStore } from './store'
import { setupI18n } from '@/locales/setupI18n'
import { setupRouter } from '@/router'

async function bootstrap() {
	const app = createApp(App)
	// UI配置
	app.use(Antd)
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

	app.mount('#app')
}

bootstrap()
