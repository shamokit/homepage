function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`
		}
		return `rgb(var(${variable}) / ${opacityValue})`
	}
}
module.exports = {
	mode: 'jit',
	content: [
		'src/pages/**/*.{js,ts,jsx,tsx}',
		'src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: ['1.125rem', 1.5],
			xl: ['1.25rem', 1.5],
			'2xl': ['1.5rem', 1.5],
			'3xl': ['1.875rem', 1.5],
			'4xl': ['2rem', 1.5],
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		colors: {
			//color8
			'base-color': withOpacityValue('--color-base-color'),
			'main': withOpacityValue('--color-main'),
			'sub': withOpacityValue('--color-sub'),
			'accent': withOpacityValue('--color-accent'),
			'white': withOpacityValue('--color-white'),
			transparent: 'transparent',
			//color7
			// 'base-color': '#001F3F',
			// main: '#083358',
			// sub: '#0D63A5',
			// accent: '#FFD717',
			// white: '#fff',
			//color6
			// 'base-color': '#333',
			// main: '#3A4750',
			// sub: '#303841',
			// accent: '#00ADB5',
			// white: '#EEEEEE',
			//color5
			// 'base-color': '#1B262C',
			// main: '#0F4C75',
			// sub: '#3282B8',
			// accent: '#BBE1FA',
			// white: '#fff',
			//cat
			// 'base-color': '#39311D',
			// main: '#7E7474',
			// sub: '#C4B6B6',
			// accent: '#FFDD93',
			// white: '#fff',
			//cafe
			// 'base-color': '#2D2424',
			// main: '#5C3D2E',
			// sub: '#E0C097',
			// accent: '#B85C38',
			// white: '#fff',
			//color2
			// 'base-color': '#041C32',
			// main: '#04293A',
			// sub: '#064663',
			// accent: '#ECB365',
			// white: '#fff',
			//color1
			// 'base-color': '#1b1e32',
			// main: '#384280',
			// sub: '#332E1C',
			// accent: '#fbcb5f',
			// white: '#fff',
		},
		extend: {
			fontFamily: {
				sans: [
					'Fira Code',
					'Zen Kaku Gothic New',
					'Hiragino Sans',
					'Hiragino Kaku Gothic ProN',
					'Meiryo',
					'sans-serif',
				],
			},
		},
	},
	plugins: [],
}
