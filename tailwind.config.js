/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF385C',
        dark: '#222222',
      }
    },
  },
  plugins: [],
}
