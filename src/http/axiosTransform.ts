/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions } from '#/axios'

export abstract class AxiosTransform {
	/**
	 * @description: Process configuration before request
	 */
	beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

	/**
	 * @description: 请求失败处理
	 */
	requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

	/**
	 * @description: 请求之前的拦截器
	 */
	requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig

	/**
	 * @description: 请求之后的拦截器
	 */
	responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

	/**
	 * @description: 请求之前的拦截器错误处理
	 */
	requestInterceptorsCatch?: (error: Error) => void

	/**
	 * @description: 请求之后的拦截器错误处理
	 */
	responseInterceptorsCatch?: (error: Error) => void
}

export interface MyAxiosConfig extends AxiosRequestConfig {
	transform?: AxiosTransform
	requestOptions?: RequestOptions
}
