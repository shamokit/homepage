module.exports = {
	plugins: {
		'postcss-nested': {},
		'postcss-preset-env': {
			autoprefixer: {
				flexbox: 'no-2009'
			},
			stage: 2
		},
		tailwindcss: {},
		autoprefixer: {}
	}
};
