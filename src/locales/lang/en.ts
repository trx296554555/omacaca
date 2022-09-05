import { genMessage } from '../helper'
import antdLocale from 'ant-design-vue/es/locale/en_US'

const modules = import.meta.glob('./en/**/*.ts', { eager: true })
export default {
	message: {
		...genMessage(modules),
		antdLocale,
	},
	dateLocale: null,
	dateLocaleName: 'en',
}
