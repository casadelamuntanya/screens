module.exports = {
	extends: 'stylelint-config-standard',
	plugins: ['stylelint-scss'],
	rules: {
		'no-descending-specificity': null,
		indentation: 'tab',
		'unit-whitelist': ['px', 'em', 'vh', 'vw', 'rem', '%', 's', 'deg', 'fr'],
		'at-rule-no-unknown': null,
		'at-rule-empty-line-before': null,
		'scss/at-rule-no-unknown': true,
	},
};
