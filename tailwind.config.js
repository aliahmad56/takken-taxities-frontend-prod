/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],

  theme: {
    extend: {
      screens: {
        xs: "240px",

        // sm: "660px",
      },
      fontFamily: {
        inter: ["Open Sans"],
      },
    },
  },

  plugins: [],
};
