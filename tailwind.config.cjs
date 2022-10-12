/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		container: {
			width: '100%',
			padding: {
				sm: '0rem',
				lg: '2rem',
				xl: '4rem',
				'2xl': '4rem',
			},
		},
		extend: {
			colors:{
				'primary': {
					'50': '#f7fcf9',
					'100': '#eff9f3',
					'200': '#d7efe2',
					'300': '#bee5d0',
					'400': '#8ed2ad',
					'500': '#5dbe8a',
					'600': '#54ab7c',
					'700': '#468f68',
					'800': '#387253',
					'900': '#2e5d44',
					'trans':'rgba(93,190,138,0.8)'
				},
				'secondary': {
					'50': '#fffcf9',
					'100': '#fffaf2',
					'200': '#fff1df',
					'300': '#ffe9cb',
					'400': '#ffd9a4',
					'500': '#ffc87d',
					'600': '#e6b471',
					'700': '#bf965e',
					'800': '#99784b',
					'900': '#7d623d'
				},
				dark:'#141414',
				'dark-w':{
					'first':'rgba(255,255,255,0.85)',
					'secondary': 'rgba(255,255,255,0.45)',
					'inverse': '#fff',
					'hover': 'rgba(255,255,255,0.75)',
				},
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: true, // 禁止tailwindcss的默认属性base，防止和ant design vue的样式产生冲突, default true
	}
}
