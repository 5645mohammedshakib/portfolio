/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: "#1a1308",
          accent: "#C9A84C",
          text: "#e8dcc8",
          card: "rgba(26, 19, 8, 0.45)",
          border: "rgba(201, 168, 76, 0.25)",
        }
      },
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        'newspaper': '0.3em',
        'newspaper-wide': '0.4em',
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        }
      }
    },
  },
  plugins: [],
}
