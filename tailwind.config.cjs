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
				primary: '#5dbe8a',
				dark:'#141414'
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: true, // 禁止tailwindcss的默认属性base，防止和ant design vue的样式产生冲突, default true
	}
}
