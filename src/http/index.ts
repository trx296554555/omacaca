import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { AxiosTransform } from './axiosTransform'
import { RequestEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { MyAxios } from './myAxios'
import { checkStatus } from './checkStatus'
import { joinTimestamp, formatRequestDate } from './helper'
import { deepMerge, setObjToUrlParams } from '@/tools'
import { glob } from '@/tools/env'
import { isString } from '@/tools/is'
import { clone } from 'lodash-es'
import { useI18n } from '@/tools/useI18n'
import { Modal, message as Message } from 'ant-design-vue'
/**
 * @description: 自定义拦截器，方便区分多种处理方式
 */
const transform: AxiosTransform = {
	// 请求之前处理config
	beforeRequestHook: (config, options) => {
		const { joinParamsToUrl, formatDate, joinTime = true } = options

		const params = config.params || {}
		const data = config.data || false

		formatDate && data && !isString(data) && formatRequestDate(data)

		if (config.method?.toUpperCase() === RequestEnum.GET) {
			if (!isString(params)) {
				// 给 get 请求加上时间戳参数，避免从缓存中拿数据。
				config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
			} else {
				// 兼容restful风格
				config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
				config.params = undefined
			}
		} else if (!isString(params)) {
			formatDate && formatRequestDate(params)
			if (
				Reflect.has(config, 'data') &&
				config.data &&
				(Object.keys(config.data).length > 0 || config.data instanceof FormData)
			) {
				config.data = data
				config.params = params
			} else {
				// 非GET请求如果没有提供data，则将params视为data
				config.data = params
				config.params = undefined
			}
			if (joinParamsToUrl) {
				config.url = setObjToUrlParams(
					config.url as string,
					Object.assign({}, config.params, config.data)
				)
			}
		} else {
			// 兼容restful风格
			config.url = config.url + params
			config.params = undefined
		}
		return config
	},

	/**
	 * @description: 请求拦截器处理
	 */
	requestInterceptors: (config) => {
		// 请求之前处理config
		return config
	},

	/**
	 * @description: 响应拦截器处理
	 */
	responseInterceptors: (res: AxiosResponse<any>) => {
		return res
	},

	/**
	 * @description: 响应错误处理
	 */
	responseInterceptorsCatch: (error: any) => {
		const { t } = useI18n()
		const { response, code, message, config } = error || {}
		const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
		const msg: string = response?.data?.error?.message ?? ''
		const err: string = error?.toString?.() ?? ''
		let errMessage = ''

		try {
			if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
				errMessage = t('sys.api.apiTimeoutMessage')
			}
			if (err?.includes('Network Error')) {
				errMessage = t('sys.api.networkExceptionMsg')
			}

			if (errMessage) {
				if (errorMessageMode === 'modal') {
					Modal.error({ title: t('sys.api.errorTip'), content: errMessage })
				} else if (errorMessageMode === 'message') {
					Message.error(errMessage, 10)
				}
				return Promise.reject(error)
			}
		} catch (error) {
			throw new Error(error as unknown as string)
		}

		checkStatus(error?.response?.status, msg, errorMessageMode)
	},
}

function createAxios(opt?: Partial<AxiosRequestConfig>) {
	return new MyAxios(
		// 深度合并 使新实例的配置的参数可以覆盖默认参数
		deepMerge(
			{
				timeout: 10 * 1000,
				// 基础接口地址
				baseURL: glob.baseurl,
				headers: { 'Content-Type': ContentTypeEnum.JSON },
				// 如果是form-data格式
				// headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
				// 自定义拦截器
				transform: clone(transform),
				// 自定义的一些选项，结合拦截器在对应位置使用，按需修改
				requestOptions: {
					// 消息提示类型
					errorMessageMode: 'message',
					//  是否加入时间戳
					joinTime: false,
					// post请求的时候添加参数到url
					joinParamsToUrl: false,
					// 格式化提交参数时间
					formatDate: false,
					// 是否携带token
					withToken: false,
				},
			},
			opt || {}
		)
	)
}
export const defHttp = createAxios()

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
