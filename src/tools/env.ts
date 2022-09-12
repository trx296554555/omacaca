// 获取自定义的环境配置
function getAppEnvConfig() {
	const ENV = import.meta.env

	const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME } = ENV

	return {
		title: VITE_GLOB_APP_TITLE,
		baseurl: VITE_GLOB_API_URL,
		shortName: VITE_GLOB_APP_SHORT_NAME,
	}
}

export const glob = getAppEnvConfig()
