/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(110 226 245 / 0.6)",
        secondary: "#282c34",
        "primary-500": "rgb(110 226 245 / 0.4)"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}