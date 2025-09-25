/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust based on your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        pinyon: ['"Pinyon Script"', "cursive"], // Pinyon Script font
        mulish: ["Mulish", "sans-serif"], // Optional: Mulish font
      },
    },
  },
  plugins: [],
};
