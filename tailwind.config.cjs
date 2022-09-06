/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
	corePlugins: {
		preflight: true, // 禁止tailwindcss的默认属性base，防止和ant design vue的样式产生冲突, default true
	}
}
