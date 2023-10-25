/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    './index.html',
    // 경로는 파일 구조에 맞게 수정 필요,
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SUIT-Regular"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blackish: '#000000',
        deepblue1: '#1b2f55',
        deepblue2: '#284377',
        blue1: '#4a5f90',
        blue2: '#7e93ba',
        blue3: '#9fb8d2',
        whitish: '#ffffff',
        grayish: '#E7E4E4',
      },
    },
  },
  plugins: [],
};
