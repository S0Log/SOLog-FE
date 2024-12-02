/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Tailwind가 스타일을 적용할 파일 경로
  theme: {
    extend: {
      colors: {
        mainColor: '#DBEDF4', // 추가한 사용자 정의 색상
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], // Inter 글씨체 추가
      },
      flex: {
        4: '4 1 0%',
        6: '6 1 0%',
      },
    },
  },
  plugins: [tailwindScrollbarHide, tailwindScrollbar],
};
