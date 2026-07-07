/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B2430",
        bone: "#F6F3EC",
        moss: {
          DEFAULT: "#5B7553",
          light: "#7C9471",
          dark: "#3F5539",
        },
        mustard: "#D9A441",
        clay: "#B7590A",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
