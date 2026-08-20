/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'north-black': '#111111',
        'north-milk': '#F1EEE8',
        'north-graphite': '#252525',
        'north-olive': '#5C624E',
        'north-rust': '#A45132',
        'north-brown': '#756457',
        'north-gray': '#B9B5AD',
        'north-light-gray': '#E5E2DC',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}