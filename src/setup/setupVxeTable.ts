import type { App } from 'vue'
import VXETable from 'vxe-table'
import { i18n } from '@/locales/setupI18n'

export function setupVxeTable(app: App<Element>) {
	VXETable.setup({
		// 对组件内置的提示语进行国际化翻译
		// @ts-ignore
		i18n: (key, args) => i18n.global.t(key, args),
	})
	app.use(VXETable)
}
