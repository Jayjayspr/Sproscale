import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SPROSCALE Custom Colors
        // Backgrounds
        slate: {
          100: "#F1F5F9",
          200: "#E2E8F0",
          600: "#475569",
          900: "#0F172A",
        },
        // Accent
        blue: {
          600: "#2563EB",
        },
        // Hover/Status
        lime: {
          DEFAULT: "#CCFF00",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
