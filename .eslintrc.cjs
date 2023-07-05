module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['plugin:svelte/recommended', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		project: "./tsconfig.json",
		extraFileExtensions: [".svelte"],
	},
	overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
