/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // 경로는 파일 구조에 맞게 수정 필요
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

