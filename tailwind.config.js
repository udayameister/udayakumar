/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Merriweather", "Georgia", "serif"]
      },
      colors: {
        ink: "#172026",
        paper: "#f7f5ef",
        signal: "#0f766e",
        saffron: "#b7791f",
        plum: "#7f1d46"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 32, 38, 0.10)"
      }
    }
  },
  plugins: []
};
