/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16a34a', // green-600
          light: '#4ade80',   // green-400
          dark: '#166534',    // green-800
        },
      },
    },
  },
  plugins: [],
}
