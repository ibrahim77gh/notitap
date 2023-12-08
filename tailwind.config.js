/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      darkMode: 'class', // Enable dark mode
    },
  },
  plugins: [require("@tailwindcss/typography")],
  safelist: [
    {
      pattern: /justify-(start|end)/
    }
  ]
};
