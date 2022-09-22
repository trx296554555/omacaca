import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { themePreprocessorPlugin } from '@zougt/vite-plugin-theme-preprocessor'
// vite.config.ts

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		// https: true,
		// Listening on all local IPs
		host: true,
		port: 5404,
	},
	resolve: {
		alias: [
			{
				find: 'vue-i18n',
				replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
			},
			// /@/xxxx => src/xxxx
			{
				find: /@\//,
				replacement: pathResolve('src') + '/',
			},
			// /#/xxxx => types/xxxx
			{
				find: /#\//,
				replacement: pathResolve('types') + '/',
			},
			{
				find: '@img',
				replacement: pathResolve('src/assets/img'),
			},
			{
				find: '@icon',
				replacement: pathResolve('src/assets/icons'),
			},
			{
				find: '@style',
				replacement: pathResolve('src/assets/styles'),
			},
		],
	},
	plugins: [
		vue(),
		// 使eslint报错的信息 随vite输出到浏览器
		eslintPlugin({
			include: [
				'src/**/*.js',
				'src/**/*.ts',
				'src/**/*.d.ts',
				'src/**/*.tsx',
				'src/*.vue',
				'src/**/*.vue',
				'types/*.d.ts',
				'types/*.ts',
				'build/**/*.ts',
				'build/**/*.d.ts',
			],
			cache: false, // 禁用 eslint 缓存
		}),
		// ant UI 组件按需导入
		Components({
			dts: true, // ts支持
			dirs: ['src'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
			resolvers: [
				AntDesignVueResolver({
					importStyle: 'less', // 是否需要自动随引入加载对应的组件样式，禁用，因为某些二级组件（比如 DateRangePicker）没办法准确地识别正确路径，手动引入全局样式
					resolveIcons: false, // 可使用@ant-design/icons-vue图标库
				}),
			],
		}),
		// 主题切换
		themePreprocessorPlugin({
			less: {
				// 是否启用任意主题色模式，这里不启用
				arbitraryMode: false,
				// 提供多组变量文件
				// 变量文件内容不应该夹带样式代码，设定上只需存在变量
				multipleScopeVars: [
					{
						scopeName: 'theme-light',
						path: pathResolve('src/assets/styles/theme/light.less'),
					},
					{
						scopeName: 'theme-dark',
						path: pathResolve('src/assets/styles/theme/dark.less'),
					},
					{
						scopeName: 'theme-default',
						path: pathResolve('src/assets/styles/theme/default.less'),
					},
				],
				// 【注意】includeStyleWithColors作用： css中不是由主题色变量生成的颜色，也让它抽取到主题css内，可以提高权重
				includeStyleWithColors: [
					{
						// color也可以是array，如 ["#ffffff","#000"]
						color: '#ffffff',
						// 排除属性，如 不提取背景色的#ffffff
						// excludeCssProps: ['background', 'background-color'],
						// 排除选择器，如 不提取以下选择器的 #ffffff
						// excludeSelectors: [
						//   ".ant-btn-link:hover, .ant-btn-link:focus, .ant-btn-link:active",
						// ],
					},
				],
				extract: false,
			},
		}),
	],
	css: {
		preprocessorOptions: {
			less: {
				additionalData: `@import '@/assets/styles/global.less';`,
				javascriptEnabled: true,
			},
		},
	},
	optimizeDeps: {
		// 【注意】 排除 import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"; 在vite的缓存依赖
		exclude: ['@zougt/vite-plugin-theme-preprocessor/dist/browser-utils'],
	},
})
