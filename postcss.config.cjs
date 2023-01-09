module.exports = {
  plugins: {
		"postcss-custom-properties": {},
		"postcss-import": {},
		"postcss-mixins": {},
		"postcss-nested": {},
		"postcss-simple-vars": {},
		"postcss-preset-env": {
			"autoprefixer": {
				"flexbox": "no-2009"
			},
			"stage": 2,
			"features": {
				"custom-properties": true
			}
		},
    tailwindcss: {},
    autoprefixer: {},
  },
}
