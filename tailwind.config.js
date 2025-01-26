const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        body: ["Space Grotesk", "sans"],
        title: ["Fliege Mono", "sans"],
      },
      colors: {
        light: {
          DEFAULT: "#fffdfa",
        },
        dark: {
          DEFAULT: "#011502",
        },
        main: {
          DEFAULT: "#1C32C4",
          50: "#A5AFF2",
          100: "#94A0F0",
          200: "#7080EB",
          300: "#4C60E5",
          400: "#2841E0",
          500: "#1C32C4",
          600: "#152593",
          700: "#0E1962",
          800: "#070C31",
        },
        secondary: {
          DEFAULT: "#4ABFB2",
          50: "#D2EFEC",
          100: "#C3EAE5",
          200: "#A4DFD8",
          300: "#86D4CC",
          400: "#68CABF",
          500: "#4ABFB2",
          600: "#379A8F",
          700: "#287169",
          800: "#194742",
          900: "#0B1E1C",
          950: "#030909",
        },
        lavender: {
          DEFAULT: "#D8E1FF",
          50: "#ECF1FF",
          100: "#D8E1FF",
          200: "#A0B6FF",
          300: "#688BFF",
          400: "#3060FF",
          500: "#0039F7",
          600: "#002CBF",
          700: "#001F86",
          800: "#00124E",
          900: "#000516",
          950: "#000000",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
