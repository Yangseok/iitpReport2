/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements-react/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      padding: {
        2.75: '0.6875rem',
        4.5: '1.125rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tw-elements-react/dist/plugin.cjs')]
};

