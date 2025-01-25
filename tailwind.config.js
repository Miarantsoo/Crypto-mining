/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: ["regular"],
        bold: ["bold"]
      },
      colors: {
        'light' : {
          DEFAULT: '#fffdfa',
        }
      }
    },
  },
  plugins: [],
}

