/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addComponents }) =>  {
      addComponents({
        '.body_container': {
          minHeight: 'calc(100vh - 201px)',
          width: '80%',
          margin: 'auto'
        },
        '.ellipsis': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      })
    })
  ],
}
