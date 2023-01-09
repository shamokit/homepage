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
		'./src/**/*.{html,js,ts,svelte}',
	],

	theme: {
		container: {
			center: true,
			padding: 'var(--container-side-padding)'
		},
		fontSize: {
			xxxs: ['var(--text-xxxs)', {
				lineHeight: 'var(--line-height-xs)',
				letterSpacing: 'var(--letter-spacing-sm)',
				fontWeight: '400',
			}],
			xxs: ['var(--text-xxs)', {
				lineHeight: 'var(--line-height-xs)',
				letterSpacing: 'var(--letter-spacing-sm)',
				fontWeight: '400',
			}],
			xs: ['var(--text-xs)', {
				lineHeight: 'var(--line-height-xs)',
				letterSpacing: 'var(--letter-spacing-sm)',
				fontWeight: '400',
			}],
			sm: ['var(--text-sm)', {
				lineHeight: 'var(--line-height-sm)',
				letterSpacing: 'var(--letter-spacing-md)',
				fontWeight: '400',
			}],
			md: ['var(--text-md)', {
				lineHeight: 'var(--line-height-md)',
				letterSpacing: 'var(--letter-spacing-md)',
				fontWeight: '400',
			}],
			lg: ['var(--text-lg)', {
				lineHeight: 'var(--line-height-sm)',
				letterSpacing: 'var(--letter-spacing-md)',
				fontWeight: '700',
			}],
			xl: ['var(--text-xl)', {
				lineHeight: 'var(--line-height-xs)',
				letterSpacing: 'var(--letter-spacing-lg)',
				fontWeight: '700',
			}],
			xxl: ['var(--text-xxl)', {
				lineHeight: 'var(--line-height-xs)',
				letterSpacing: 'var(--letter-spacing-lg)',
				fontWeight: '700',
			}],
			xxxl: ['var(--text-xxxl)', {
				lineHeight: 'var(--line-height-xs)',
				letterSpacing: 'var(--letter-spacing-lg)',
				fontWeight: '700',
			}],
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1120px',
			xl: '1280px',
		},
		letterSpacing: {
			sm: 'var(--letter-spacing-sm)',
			md: 'var(--letter-spacing-md)',
			lg: 'var(--letter-spacing-lg)',
		},
		borderRadius: {
			sm: 'var(--border-radius-sm)',
			md: 'var(--border-radius-md)',
			lg: 'var(--border-radius-lg)',
			full: 'var(--border-radius-full)',
		},
		opacity: {
			'0': '0',
			'10': '0.1',
			'20': '0.2',
			'30': '0.3',
			'40': '0.4',
			'50': '0.5',
			'60': '0.6',
			'70': '0.7',
			'80': '0.8',
			'90': '0.9',
			'100': '1',
		},
		boxShadow: {
			sm: '0 2px 4px 0 rgb(13 80 105 / 0.2)',
			md: '0 4px 6px 0 rgb(13 80 105 / 0.2)',
			lg: '0 6px 6px 0 rgb(13 80 105 / 0.2)',
		},
		colors: {
			'surface-100': withOpacityValue('--color-surface-100'),
			'surface-300': withOpacityValue('--color-surface-300'),
			'surface-500': withOpacityValue('--color-surface-500'),
			'surface-700': withOpacityValue('--color-surface-700'),
			'surface-900': withOpacityValue('--color-surface-900'),
			'primary-100': withOpacityValue('--color-primary-100'),
			'primary-200': withOpacityValue('--color-primary-200'),
			'primary-300': withOpacityValue('--color-primary-300'),
			'primary-400': withOpacityValue('--color-primary-400'),
			'primary-500': withOpacityValue('--color-primary-500'),
			'primary-600': withOpacityValue('--color-primary-600'),
			'primary-700': withOpacityValue('--color-primary-700'),
			'primary-800': withOpacityValue('--color-primary-800'),
			'primary-900': withOpacityValue('--color-primary-900'),
			'secondary-100': withOpacityValue('--color-secondary-100'),
			'secondary-200': withOpacityValue('--color-secondary-200'),
			'secondary-300': withOpacityValue('--color-secondary-300'),
			'secondary-400': withOpacityValue('--color-secondary-400'),
			'secondary-500': withOpacityValue('--color-secondary-500'),
			'secondary-600': withOpacityValue('--color-secondary-600'),
			'secondary-700': withOpacityValue('--color-secondary-700'),
			'secondary-800': withOpacityValue('--color-secondary-800'),
			'secondary-900': withOpacityValue('--color-secondary-900'),
			'accent-100': withOpacityValue('--color-accent-100'),
			'accent-200': withOpacityValue('--color-accent-200'),
			'accent-300': withOpacityValue('--color-accent-300'),
			'accent-400': withOpacityValue('--color-accent-400'),
			'accent-500': withOpacityValue('--color-accent-500'),
			'accent-600': withOpacityValue('--color-accent-600'),
			'accent-700': withOpacityValue('--color-accent-700'),
			'accent-800': withOpacityValue('--color-accent-800'),
			'accent-900': withOpacityValue('--color-accent-900'),
			current: 'currentColor',
			transparent: 'transparent',
		},
		extend: {
			fontFamily: {
				base: [
					'Arial',
					'Hiragino Kaku Gothic ProN',
					'Hiragino Sans',
					'Meiryo',
					'sans-serif',
				],
			},
		},
	},
	plugins: [],
}
