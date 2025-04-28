module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3f0ff',
          100: '#b3d1ff',
          200: '#80b1ff',
          300: '#4d91ff',
          400: '#1a71ff',
          500: '#0057e7',
          600: '#0046b4',
          700: '#003581',
          800: '#00244e',
          900: '#00121c',
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}; 