/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1A1A2E',
          light: '#252542',
          dark: '#0F0F1A'
        },
        slate: {
          hotel: '#16213E',
          light: '#1E3A5F'
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#D4B76A',
          dark: '#B89A3D',
          shimmer: '#E5C96A'
        },
        cream: {
          DEFAULT: '#F5F0E8',
          dark: '#E8E0D0'
        }
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif']
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite'
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '-200% 0' },
          '50%': { backgroundPosition: '200% 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    }
  },
  plugins: []
};
