module.exports = {
	singleQuote: true,
	jsxSingleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	bracketSpacing: false,
	arrowParens: 'avoid',
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: ['^next', '^react', '^@', '\\.(png|jpe?g|gif|svg|webp)$'],
};
