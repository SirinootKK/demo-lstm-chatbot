/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        notoSansThai: ["Noto Sans Thai", "sans-serif"],
      },
      colors: {
        primary: "#242424",
        primaryLight: "#40414F",
        primaryDark: "#3A2D49",
        secondary: "#292929",
        secondaryLight: "#03DAC5",
        purple: "#312A38 "

      }
    },
  },
  plugins: [],
}