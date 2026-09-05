/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c084fc',
          400: '#a855f7',
          500: '#634897', // Morado EduQuest
          600: '#523b7e',
          700: '#432f67',
          800: '#342451',
          900: '#251a3b',
          DEFAULT: '#4c35de',
          light: '#6b57e3',
          dark: '#3d2bc2',
          container: '#e9e5fb',
          fixed: '#e3dcff',
        },
        secondary: {
          500: '#1d71b8', // Azul EduQuest
          600: '#155c97',
          DEFAULT: '#ffd166',
          container: '#ffe9b8',
          on: '#5a3700',
          onContainer: '#5a3700',
          fixed: '#5a3700',
        },
        accent: {
          500: '#f7a82d', // Anaranjado EduQuest
          600: '#d98c1e',
          yellow: '#ffc107',
          orange: '#ff9800',
          green: '#4caf50',
          lightBlue: '#03a9f4',
        },
        eduprimary: '#634897',
        edusecondary: '#1d71b8',
        eduorange: '#f7a82d',
        eduyellow: '#ffdc04',
        tertiary: '#5a3700',
        on: {
          primary: '#ffffff',
          primaryContainer: '#351e97',
          secondary: '#5a3700',
          secondaryContainer: '#5a3700',
          tertiary: '#ffffff',
          surface: '#1b1b1f',
          surfaceVariant: '#44464f',
        },
        surface: {
          DEFAULT: '#f7f9fb',
          container: '#ffffff',
          containerLow: '#f2f4f6',
          containerHigh: '#e6e8ea',
          containerLowest: '#ffffff',
          dim: '#dadbe6',
          bright: '#f7f9fb',
          variant: '#e3e1ec',
        },
        outline: {
          DEFAULT: '#767680',
          variant: '#c6c4cf',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Poppins', 'sans-serif'],
        handwritten: ['Beth Ellen', 'cursive'],
      },
      fontSize: {
        'label-sm': ['12px', '16px'],
        'label-lg': ['14px', '20px'],
        'body-md': ['14px', '20px'],
        'body-lg': ['16px', '24px'],
        'headline-md': ['20px', '28px'],
        'headline-lg': ['28px', '36px'],
        'display': ['40px', '48px'],
      },
      spacing: {
        'card-gap': '1.5rem',
        'container-padding': '1.25rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
    }
  },
  plugins: [],
}
