/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        '200%': '200% 100%',
      },
      backgroundPosition: {
        'right': '100% 0%',
      },
    }
  },
  plugins: [],
}