/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        cream: '#F8F5F0',
        'soft-purple': '#7B6BE8',
        'soft-lavender': '#C4B4D8',
        'soft-mint': '#8EC4A4',
        'soft-peach': '#E8B4A0',
        'text-dark': '#3D3758',
        'text-mid': '#6E6A8A',
        'text-light': '#9E9AB8',
        border: '#EDE8F8',
      }
    }
  },
  plugins: []
}
