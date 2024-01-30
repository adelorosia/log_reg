/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      FONT_VIGA: ["Viga", "sans-serif"],
      FONT_ROBOTO: ["Roboto", "sans-serif"],
      FONT_SALSA: ["Salsa", "cursive"],
      ANTON: ["Anton", "sans-serif"],
    },
    container:{
      center:true
    },
    extend: {
      colors: {
        BLACK:"#0e2337",
        BACKGROUND: "#2e4051",
        CURRENT_LINE: "#44475a",
        FOREGROUND: "#f8f8f2",
        WHITE:"#ffffff",
        WHITE_SECONDARY:"#EBF0F7",
        BRAND_COLOR:"#ee8425",
        COMMENT: "#6272a4",
        CYAN: "#8be9fd",
        GREEN: "#166534",
        ORANGE_50: "#fff7ed",
        ORANGE_100: "#ffedd5",
        ORANGE_200: "#fed7aa",
        ORANGE_300: "#fdba74",
        ORANGE_400: "#fb923c",
        PINK: "#ff79c6",
        PURPLE: "#bd93f9",
        RED: "#7f1d1d",
        SLATE_500:"#64748b",
        SLATE_400:"#94a3b8",
        SLATE_300:"#cbd5e1",
        SLATE_200:"#e2e8f0",
        SLATE_100:"#f1f5f9",
        STONE_500:"#78716c",
        STONE_400:"#a8a29e",
        STONE_300:"#d6d3d1",

      },
    },
  },
  plugins: [],
}