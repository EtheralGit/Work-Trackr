/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141e46",
        secondary: "#fefaf6",
        tertiary: "#FFFBF5",
      },
    },
  },
  plugins: [require("daisyui")],
};
