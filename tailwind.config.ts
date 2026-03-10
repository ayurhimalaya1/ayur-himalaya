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
        ayur: {
          bg: "#F9F7F2",      // Ayur Himalaya's signature soft cream
          forest: "#1B3022",  // Deep Himalayan green
          gold: "#D4AF37",    // Muted gold accents
          charcoal: "#2D2D2D" // Soft black for readability
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      letterSpacing: {
        widest: '.25em',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
