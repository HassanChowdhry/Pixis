/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6ee2f5",
        secondary: "#282c34",
        "primary-500": "rgb(110 226 245 / 0.75)"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}