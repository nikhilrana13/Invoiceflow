/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAFAF8",
        ink: {
          DEFAULT: "#1C1C1A",
          soft: "#4A4A45",
          muted: "#8A8A83",
        },
        line: {
          DEFAULT: "#E6E5DF",
          strong: "#D6D5CD",
        },
        forest: {
          50: "#EEF4EF",
          100: "#DCE9DE",
          400: "#3E8562",
          500: "#1F6F4A",
          600: "#175939",
          700: "#12452C",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(28, 28, 26, 0.04)",
        elevated: "0 4px 24px -4px rgba(28, 28, 26, 0.10), 0 1px 2px rgba(28, 28, 26, 0.06)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
}

