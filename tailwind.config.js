/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Map brand to Tailwind's indigo palette (50-950)
        brand: colors.indigo,
      },
      spacing: {
        '18': '4.5rem'
      }
    },
    fontFamily: {
      sans: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif'
      ]
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}

