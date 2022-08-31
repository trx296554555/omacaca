// .eslintrc.js 文件
module.exports = {
	root:true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'standard',
		'plugin:vue/vue3-recommended',
		'plugin:prettier/recommended'
	],
	// 新的内容
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			modules: true
		},
		requireConfigFile: false,
		parser: '@typescript-eslint/parser'
	},
	plugins: [
		'vue',
		'eslint-plugin-prettier'
	],
	rules: {
		'prettier/prettier': 'error',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/no-multiple-template-root': 'off',
		'vue/multi-word-component-names': 'off',
		'no-mutating-props': 'off',
		'vue/no-v-html': 'off'
	}
}
