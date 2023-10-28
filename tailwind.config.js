/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    './index.html',
    // 경로는 파일 구조에 맞게 수정 필요,
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements-react/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SUIT-Regular"', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        blackish: '#000000',
        whitish: '#ffffff',
        grayish: '#E7E4E4',
        danger: '#DC4C64',
        deepblue1: '#1b2f55',
        deepblue2: '#284377',
        blue1: '#4a5f90',
        blue2: '#7e93ba',
        blue3: '#9fb8d2',
      },
      width: {
        'clamp-header': 'clamp(300px, 100%, 1200px)',
        'clamp-logo': 'clamp(200px, 250px, 300px)',
        'clamp-input': 'clamp(50px, 200px, 800px)',
      },
      fontSize: {
        'clamp-input-text': 'clamp(0.8rem, 1rem, 1.2rem)',
        'clamp-p-text': 'clamp(0.5rem, 1rem, 1.3rem)',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tw-elements-react/dist/plugin.cjs')],
};
