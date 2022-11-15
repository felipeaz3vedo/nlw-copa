/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "#121214",
        primaryGreen: "#129E57",
        primaryGrayVeryLight: "#E1E1E6",
        primaryGrayLight: "#C4C4CC",
        primaryGrayNormal: "#8D8D99",
        primaryGrayDark: "#09090A",
        secondaryGrayNormal: "#323238",
        secondaryGrayDark: "#202024",
        primaryYellow: "#F7DD43",
        primaryYellowDark: "#E5CD3D"
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      },
      backgroundImage: {
        app: "url(/app-background.png)"
      }
    }
  },
  plugins: [],
  tailwindConfig: "./styles/tailwind.config.js"
};
