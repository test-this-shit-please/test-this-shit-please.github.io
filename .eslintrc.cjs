/*eslint-env node*/
module.exports = {
	"root": true,
	"extends": [
		"prettier",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:react-hooks/recommended",
	],
	"plugins": ["jsdoc", "react", "prettier"],
	"env": {
		"es2024": true,
	},
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": "latest",
		"ecmaFeatures": { "jsx": true },
	},
	"settings": {
		"react": {
			"version": "detect",
		},
	},
	"rules": {
		// Code style
		"prettier/prettier": ["error"],
		"indent": ["error", "tab"],
		"no-multi-spaces": ["error"],
		"linebreak-style": ["error", "unix"],
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"object-curly-spacing": ["error", "always"],
		"object-curly-newline": ["error"],
		"array-element-newline": ["error", { "multiline": true, "minItems": 4 }],
		"arrow-body-style": ["error", "always"],
		"quote-props": ["error"],
		"func-names": ["error"],
		"max-len": ["warn", { "code": 120 }],
		"jsdoc/require-jsdoc": [
			"error",
			{
				"require": { "ArrowFunctionExpression": true },
			},
		],
		"jsdoc/require-description": ["error"],
		"jsdoc/informative-docs": ["error"],
		"jsdoc/require-description-complete-sentence": ["error"],
		"jsdoc/require-param": ["error"],
		"jsdoc/require-param-name": ["error"],
		"jsdoc/require-param-type": ["error"],
		"jsdoc/require-param-description": ["warn"],
		// Code complexity
		"complexity": ["error", 3],
		"max-classes-per-file": ["error", 1],
		"max-lines-per-function": [
			"error",
			{
				"max": 40,
				"skipBlankLines": true,
				"skipComments": true,
			},
		],
		"max-statements": ["error", 10, { "ignoreTopLevelFunctions": true }],
		"no-nested-ternary": ["error"],
		// Code quality
		"no-unused-vars": ["error"],
		"no-undef": ["error"],
		"no-useless-catch": ["error"],
		// Performance
		// "eslint no-await-in-loop": "error",
	},
	"ignorePatterns": ["node_modules/**", "**/*.test.*"],
};
