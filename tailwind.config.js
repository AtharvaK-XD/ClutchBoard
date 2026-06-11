/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#0A0A0A",
        "surface": "#121417",
        "surface-dim": "#121417",
        "surface-bright": "#181C20",
        "surface-container-lowest": "#0b0e14",
        "surface-container-low": "#121417",
        "surface-container": "#181C20",
        "surface-container-high": "#1C2025",
        "surface-container-highest": "#22272D",
        "surface-variant": "#22272D",
        "on-background": "#E8ECEF",
        "on-surface": "#E8ECEF",
        "on-surface-variant": "#98A2AD",
        "outline": "#4B5563",
        "outline-variant": "#2D333B",
        "primary": "#39FF14",
        "on-primary": "#0A0A0A",
        "primary-container": "#39FF14",
        "on-primary-container": "#0A0A0A",
        "primary-fixed": "#39FF14",
        "primary-fixed-dim": "#2ECC0F",
        "secondary": "#E8ECEF",
        "on-secondary": "#0A0A0A",
        "secondary-container": "#1C2025",
        "on-secondary-container": "#39FF14",
        "tertiary": "#39FF14",
        "tertiary-container": "#39FF14",
        "on-tertiary": "#0A0A0A",
        "tertiary-fixed": "#39FF14",
        "error": "#FF4D67",
        "on-error": "#0A0A0A",
        "inverse-surface": "#E8ECEF",
        "inverse-on-surface": "#0A0A0A",
        "inverse-primary": "#2ECC0F"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        unit: "4px",
        gutter: "16px",
        "margin-mobile": "16px",
        "margin-desktop": "32px"
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        headline: ["Sora", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: [],
}
