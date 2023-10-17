/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements-react/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      width: {
        15: '3.75rem',
        120: '30rem',
        180: '45rem',
        340: '85rem',
      },
      minWidth: {
        10: '2.5rem',
        16: '4rem',
        17: '4.25rem',
        20: '5rem',
        23: '5.75rem',
        24: '6rem',
        25: '6.25rem',
        30: '7.5rem',
        31: '7.75rem',
        84: '21rem',
        360: '90rem',
        370: '92.5rem',
      },
      maxWidth: {
        '4.5xl': '60rem', 
        '5.25xl': '70rem', 
      },
      minHeight: {
        12: '3rem',
        177: '44.25rem',
      },
      margin: {
        15: '3.75rem',
      },
      padding: {
        1.75: '0.4375rem',
        2.5: '0.625rem',
        2.75: '0.6875rem',
        4.5: '1.125rem',
        6.5: '1.625rem',
        15: '3.75rem',
        64: '16rem',
        86: '21.5rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tw-elements-react/dist/plugin.cjs')]
};

