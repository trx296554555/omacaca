import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {},
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
