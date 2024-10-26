/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    //used mostly to handle video sizing in the walkthrough page
    "relative",
    "w-10/12",
    "w-8/12",
    "mx-auto",
    "my-10",
    "mb-24",
  ],
  theme: {
    backgroundImage: {
      hero: "url('/images/backgrounds/background.webp')",
    },
    colors: {
      ...colors,
      transparent: "transparent",
      nearWhite: "#ccc",
      nearBlack: "#111111",
      eggshell: "#fafafa",
      theme: {
        DEFAULT: "#3c7cff",
        lighter: "#36C1FF",
        darker: "hsl(240, 25%, 35%)",
        darkest: "hsl(240, 100%, 13%)",
        secondary: "#76d4e4",
      },
    },
    fontFamily: {
      sans: ["Helvetica Now Display", "Helvetica", "Arial", "sans-serif"],
      space: ["Space Grotesk"],
    },
    variants: {
      animation: ["motion-safe"],
      extend: {},
    },
    extend: {
      spacing: {
        "3/12h": "25vh",
        "4/12h": "33vh",
        "5/12h": "calc(100vh*5/12)",
        "6/12h": "50vh",
        "7/12h": "calc(100vh*7/12)",
      },
      height: (theme) => ({
        "screen-3/12": "calc(100vh * 3 / 12)",
        "screen-4/12": "calc(100vh * 4 / 12)",
        "screen-5/12": "calc(100vh * 5 / 12)",
        "screen-7/12": "calc(100vh * 7 / 12)",
        "screen-8/12": "calc(100vh * 8 / 12)",
        "screen-9/12": "calc(100vh * 9 / 12)",
        "screen-10/12": "calc(100vh * 10 / 12)",
        "screen-11/12": "calc(100vh * 11 / 12)",
        "screen-13/12": "calc(100vh * 13 / 12)",
        "screen-14/12": "calc(100vh * 14 / 12)",
        "screen-1/2": "50vh",
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
