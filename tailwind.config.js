const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Space Grotesk", "sans"],
        title: ["Fliege Mono", "sans"],
      },
      colors: {
        'light' : {
          DEFAULT: '#fffdfa',
        },
        'dark' : {
          DEFAULT: '#011502'
        },
        'main' : {
          DEFAULT: '#1C32C4'
        },
        'secondary': {
          DEFAULT: '#4ABFB2'
        }
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}

