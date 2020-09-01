module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es6: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-tabs': 'off',
		'indent': ['error', 'tab', {
			'SwitchCase': 1
		}],
		'max-len': ['error', {
			'code': 100,
			'ignoreTrailingComments': true,
			'ignoreUrls': true,
			'ignoreStrings': true
		}],
		'no-param-reassign': ['error', {
			props: true,
			ignorePropertyModificationsFor: [
				'acc', // for reduce accumulators
				'state', // for Vuex store
				'el', // for custom directives target element
			]
		}],
		'no-shadow': ['error', { 'allow': ['response', 'data'] }],
		'object-curly-newline': ['error', { 'multiline': true }],
		'no-nested-ternary': 'off',
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};
