import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111111",
        accent: "#ff751a",
        surface: {
          DEFAULT: "#d6d3d5",
          paper: "#f3f1f2",
        },
      },
      fontFamily: {
        serif: ['"Times New Roman"', "Times", "serif"],
      },
      keyframes: {
        comeIn: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "75%": { transform: "scale(1.03)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blurPulse: {
          "0%, 100%": { opacity: "0.6", filter: "blur(20px) brightness(0.7)" },
          "50%": { opacity: "1", filter: "blur(30px) brightness(0.9)" },
        },
      },
      animation: {
        comeIn: "comeIn 0.5s ease",
        pulse: "pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeIn: "fadeIn 0.3s ease-out",
        blurPulse: "blurPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
