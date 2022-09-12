import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { RequestOptions, UploadFileParams } from '#/axios'
import type { MyAxiosConfig } from './axiosTransform'
import { ContentTypeEnum } from '@/enums/httpEnum'
import { isFunction } from '@/tools/is'
import { cloneDeep } from 'lodash-es'
import axios from 'axios'

export class MyAxios {
	private myInstance: AxiosInstance
	private readonly myConfig: MyAxiosConfig

	constructor(options: MyAxiosConfig) {
		this.myConfig = options
		this.myInstance = axios.create(options)
		this.setupInterceptors()
	}

	/**
	 * @description:  Create axios instance
	 */
	private createAxios(config: MyAxiosConfig): void {
		this.myInstance = axios.create(config)
	}

	private getTransform() {
		const { transform } = this.myConfig
		return transform
	}

	getAxios(): AxiosInstance {
		return this.myInstance
	}

	/**
	 * @description: Reconfigure axios
	 */
	configAxios(config: MyAxiosConfig) {
		if (!this.myInstance) {
			return
		}
		this.createAxios(config)
	}

	/**
	 * @description: Set general header
	 */
	setHeader(headers: any): void {
		if (!this.myInstance) {
			return
		}
		Object.assign(this.myInstance.defaults.headers, headers)
	}

	/**
	 * @description: Interceptor configuration 拦截器配置
	 */
	private setupInterceptors() {
		const transform = this.getTransform()
		if (!transform) {
			return
		}
		const {
			requestInterceptors,
			requestInterceptorsCatch,
			responseInterceptors,
			responseInterceptorsCatch,
		} = transform

		// Request interceptor configuration processing
		this.myInstance.interceptors.request.use((config: AxiosRequestConfig) => {
			if (requestInterceptors && isFunction(requestInterceptors)) {
				config = requestInterceptors(config)
			}
			return config
		}, undefined)

		// Request interceptor error capture
		requestInterceptorsCatch &&
			isFunction(requestInterceptorsCatch) &&
			this.myInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

		// Response result interceptor processing
		this.myInstance.interceptors.response.use((res: AxiosResponse<any>) => {
			if (responseInterceptors && isFunction(responseInterceptors)) {
				res = responseInterceptors(res)
			}
			return res
		}, undefined)

		// Response result interceptor error capture
		responseInterceptorsCatch &&
			isFunction(responseInterceptorsCatch) &&
			this.myInstance.interceptors.response.use(undefined, (error) => {
				// @ts-ignore
				return responseInterceptorsCatch(error)
			})
	}

	request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		let conf: MyAxiosConfig = cloneDeep(config)

		const transform = this.getTransform()

		const { requestOptions } = this.myConfig

		const opt: RequestOptions = Object.assign({}, requestOptions, options)

		const { beforeRequestHook, requestCatchHook } = transform || {}

		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			conf = beforeRequestHook(conf, opt)
		}
		conf.requestOptions = opt

		return new Promise((resolve, reject) => {
			this.myInstance
				.request<any, AxiosResponse>(conf)
				.then((res: AxiosResponse) => {
					resolve(res as unknown as Promise<T>)
				})
				.catch((e: Error | AxiosError) => {
					if (requestCatchHook && isFunction(requestCatchHook)) {
						reject(requestCatchHook(e, opt))
						return
					}
					if (axios.isAxiosError(e)) {
						// rewrite error message from axios in here
					}
					reject(e)
				})
		})
	}

	get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'GET' }, options)
	}

	post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'POST' }, options)
	}

	put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'PUT' }, options)
	}

	delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'DELETE' }, options)
	}

	/**
	 * @description:  File Upload
	 */
	uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
		const formData = new window.FormData()
		const customFilename = params.name || 'file'

		if (params.filename) {
			formData.append(customFilename, params.file, params.filename)
		} else {
			formData.append(customFilename, params.file)
		}

		if (params.data) {
			Object.keys(params.data).forEach((key) => {
				const value = params.data![key]
				if (Array.isArray(value)) {
					value.forEach((item) => {
						formData.append(`${key}[]`, item)
					})
					return
				}

				formData.append(key, params.data![key])
			})
		}

		return this.myInstance.request<T>({
			...config,
			method: 'POST',
			data: formData,
			headers: {
				'Content-type': ContentTypeEnum.FORM_DATA,
				// @ts-ignore
				ignoreCancelToken: true,
			},
		})
	}
}
