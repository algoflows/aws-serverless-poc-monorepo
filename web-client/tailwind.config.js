module.exports = {
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        540: "540px",
      },
      boxShadow: {
        form: "0 15px 35px 0 rgba(60, 66, 87, .08), 0 5px 15px 0 rgba(0, 0, 0, .12)",
        inputfocus: "0 0 0 2px #F472B6",
      },
      borderRadius: {
        xxl: "1.8rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
