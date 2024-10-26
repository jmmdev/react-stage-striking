/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--my-font)'],
      },
      keyframes: {
        'enable': {
          '0%,': {transform: 'translateX(0)'}, 
          '100%': {transform: 'translateX(100%)'}
        },
        'disable': {
          '0%,': {transform: 'translateX(100%)'}, 
          '100%': {transform: 'translateX(0)'}
        },
      },
      animation: {
        'toggle-on': 'enable 0.15s ease forwards',
        'toggle-off': 'disable 0.15s ease forwards',
      },
    },
  },
  plugins: [],
}

