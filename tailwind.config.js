module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    colors: {
      dark: "#222",
      white: "#fff",
      primary: "#2c4251",
      darkPrimary: "#dbdbdc",
    },
    fontFamily: {
      title: ["Archivo Black", "sans-serif"],
    },
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        reveal: {
          "0%": {
            "clip-path": "inset(0 0 0 100%)",
          },
          "100%": {
            "clip-path": "inset(0 0 0 0)",
          },
        },
      },
    },
    animation: {
      "fade-in": "fade-in 0.5s",
      reveal: "reveal 0.7s forwards",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
