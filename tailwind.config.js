/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // all files in the app folder
    "./pages/**/*.{js,ts,jsx,tsx}", // if you have pages
    "./components/**/*.{js,ts,jsx,tsx}", // all components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
