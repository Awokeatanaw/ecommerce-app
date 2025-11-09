// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      // Add custom animations and keyframes
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      // Existing customizations (e.g., colors)
      colors: {
        primary: '#414141', // Used in Hero
        accent: '#F59E0B', // For buttons, prices, etc.
      },
    },
  },
  plugins: [],
};