import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,tsx,ts}",
    "./page.tsx",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#17AA9D",
        darkPrimary: "#1D6A63",
        fontColor1: "#323232",
        fontColor2: "#939494",
        secondary: "#D9D9D9",
        darkSecondary: "#8C8C8C",
        lightSecondary: "#F9F9F9",
        borderColor:"#BBBBBB",
        borderColor2:"#DCDCDC",
        backgroundColor:"#FFFDFD",
        tabColor:"#FBFBFB",
        tabBorder:"#DADEDE"
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      boxShadow: {
        NavShadow: "0px 4px 4px 0px rgba(0, 0, 0, 4%)",
        sideShadow: "4px 4px 0px 0px rgba(0, 0, 0, 4%)",
        TableShadow: "0px 4px 4px 0px rgba(0, 0, 0, 6%)",
      },
    },
    screens: {
      custom:'700px',
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
export default config;
