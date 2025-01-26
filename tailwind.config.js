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
        regular: ["regular"],
        bold: ["bold"]
      }
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}

