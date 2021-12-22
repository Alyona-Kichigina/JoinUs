const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        'min-with': '0 0 auto',

      },
      margin: {
        't-a': 'auto',
        'b-a': 'auto',
      },
      padding: {
        '-5': "5px",
        '-24': "24px",
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
