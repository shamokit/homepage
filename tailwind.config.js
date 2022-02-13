module.exports = {
  mode: 'jit',
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    colors: {
      'base-color': '#1b1e32',
      main: '#384280',
      'main-bg': '#525880',
      sub: '#332E1C',
      accent: '#fbcb5f',
      'glass-blue': '#38c7ff',
      white: '#fff',
    },
    extend: {
      fontFamily: {
        sans: ['Zen Kaku Gothic New', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Meiryo', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
