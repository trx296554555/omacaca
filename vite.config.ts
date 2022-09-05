import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

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
				replacement: pathResolve('src/assets'),
			},
			{
				find: '@icon',
				replacement: pathResolve('src/assets/icons'),
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
	],
	css: {
		preprocessorOptions: {
			less: {
				additionalData: `@import '@/assets/styles/config.less';`,
				javascriptEnabled: true,
			},
		},
	},
})
