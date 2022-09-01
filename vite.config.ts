import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 5404,
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	plugins: [
		vue(),
		// 使eslint报错的信息 随vite输出到浏览器
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
			cache: false, // 禁用 eslint 缓存
		}),
	],
})
