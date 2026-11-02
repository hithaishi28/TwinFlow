import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060A17",
          900: "#0A1128",
          850: "#0D1838",
          800: "#101F48",
          700: "#182E6B",
          600: "#244399",
        },
        surface: {
          base: "#0A1128",
          card: "#0F1936",
          cardHover: "#152248",
          cardBorder: "#1E3060",
          subtle: "#F8FAFC",
          panel: "#121F42",
        },
        electric: {
          500: "#0284C7",
          400: "#38BDF8",
          300: "#7DD3FC",
        },
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
        },
        risk: {
          critical: "#EF4444",
          high: "#F97316",
          medium: "#F59E0B",
          low: "#10B981",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "Courier New", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(2, 132, 199, 0.3)",
        "glow-cyan": "0 0 20px -5px rgba(6, 182, 212, 0.4)",
        "glow-red": "0 0 20px -5px rgba(239, 68, 68, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
