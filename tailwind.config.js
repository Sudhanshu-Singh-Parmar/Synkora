/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050816",
          900: "#0b1020",
          800: "#111933",
        },
        teal: {
          300: "#6ee7d8",
          400: "#2dd4bf",
          500: "#14b8a6",
        },
        coral: {
          300: "#fda4af",
          400: "#fb7185",
        },
        gold: {
          300: "#fcd34d",
          400: "#fbbf24",
        },
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui"],
        body: ["Manrope", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(110, 231, 216, 0.2), 0 25px 80px rgba(20, 184, 166, 0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGrid: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.6" },
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(20px, -15px, 0) scale(1.08)" },
          "100%": { transform: "translate3d(0, 0, 0) scale(1)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-grid": "pulseGrid 5s ease-in-out infinite",
        drift: "drift 12s ease-in-out infinite",
        rise: "rise 700ms ease-out forwards",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
