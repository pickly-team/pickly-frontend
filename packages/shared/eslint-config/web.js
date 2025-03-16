import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		files: ['src/**/*.{ts,tsx}'],
		extends: [js.configs.recommended],
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				gapi: true,
			},
		},
		rules: {
			'prefer-arrow-callback': ['warn', { allowNamedFunctions: true }],
			'object-shorthand': ['warn', 'always'],
			'no-console': ['error', { allow: ['error', 'warn'] }],
			'no-underscore-dangle': [
				'error',
				{ allow: ['_subdomain', '_shortid', '_'] },
			],
			'no-bitwise': ['error', { allow: ['~'] }],
		},
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		extends: [tseslint.configs.recommended],
		rules: {
			'@typescript-eslint/no-empty-object-type': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'@typescript-eslint/naming-convention': [
				'warn',
				{
					selector: 'variable',
					format: ['PascalCase', 'camelCase', 'snake_case', 'UPPER_CASE'],
				},
			],
		},
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		extends: [
			react.configs.flat.recommended,
			react.configs.flat['jsx-runtime'],
		],
		plugins: {
			'react-hooks': reactHooks,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react/display-name': 'off',
			'react/prop-types': 'off',
			'react/no-unknown-property': ['error', { ignore: ['css'] }],
			'react/no-danger': 'error',
			'react/no-access-state-in-setstate': 'warn',
			'react/no-array-index-key': 'warn',
			'react/no-unused-prop-types': 'warn',
			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
			'react/state-in-constructor': ['error', 'always'],
			'react/sort-comp': [
				'error',
				{
					order: [
						'static-methods',
						'instance-variables',
						'lifecycle',
						'/^on.+$/',
						'getters',
						'setters',
						'/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
						'instance-methods',
						'everything-else',
						'rendering',
					],
					groups: {
						lifecycle: [
							'displayName',
							'propTypes',
							'contextTypes',
							'childContextTypes',
							'defaultProps',
							'constructor',
							'state',
							'componentWillMount',
							'UNSAFE_componentWillMount',
							'componentDidMount',
							'componentWillReceiveProps',
							'UNSAFE_componentWillReceiveProps',
							'shouldComponentUpdate',
							'componentWillUpdate',
							'componentDidUpdate',
							'componentWillUnmount',
						],
						rendering: ['/^render.+$/', 'render'],
					},
				},
			],
			'react/jsx-curly-brace-presence': 'warn',
			'react/jsx-sort-props': [
				'warn',
				{
					callbacksLast: true,
					shorthandLast: true,
					reservedFirst: true,
				},
			],
		},
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		plugins: {
			'jsx-a11y': jsxA11y,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			'jsx-a11y/no-autofocus': 'off',
			'jsx-a11y/anchor-is-valid': [
				'error',
				{
					components: ['Link'],
					specialLink: ['to'],
				},
			],
			'jsx-a11y/label-has-associated-control': [
				'error',
				{
					required: {
						some: ['nesting', 'id'],
					},
				},
			],
			'jsx-a11y/label-has-for': [
				'error',
				{
					required: {
						some: ['nesting', 'id'],
					},
				},
			],
		},
	},
	{
		files: ['**/*.js'],
		extends: [tseslint.configs.disableTypeChecked],
	},
	prettier,
);
