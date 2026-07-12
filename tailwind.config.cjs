const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Karla', 'system-ui', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: '#fef7ee',
          100: '#fdecd7',
          200: '#fad5ae',
          300: '#f7b77a',
          400: '#f28e44',
          500: '#ee7020',
          600: '#df5716',
          700: '#b94214',
          800: '#933518',
          900: '#772e16',
          950: '#401509',
        },
        cream: {
          50: '#fbf7f0',
          100: '#f5ede0',
          200: '#ece0cb',
        },
        ink: '#2a211c',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
