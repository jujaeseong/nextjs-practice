import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        popIn: {
          "0%": { transfrom: "scale(0.8)", opacity: "0" },
          "80%": { transfrom: "scale(1.1)", opacity: "1" },
          "100%": { transfrom: "scale(1)" },
        },
      },
      animation: {
        popIn: "popIn 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
