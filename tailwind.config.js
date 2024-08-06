/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        "table": "40px 500px 1fr",
        "table-2": "40px 1fr",
        "table-3": "40px 250px 1fr"
      }
    },
  },
  plugins: [],
}