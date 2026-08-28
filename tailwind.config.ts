import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 앱 포인트 컬러 (보라빛 네온 계열 — 몰입감 있는 다크 테마와 잘 어울림)
        brand: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
      },
      keyframes: {
        'bubble-blink': {
          '0%, 60%, 100%': { opacity: '0.25', transform: 'translateY(0)' },
          '30%': { opacity: '1', transform: 'translateY(-3px)' },
        },
      },
      animation: {
        'bubble-blink': 'bubble-blink 1.2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
