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
        primary: "#0A2342", // Publications page primary
        "background-light": "#F8F9FA",
        "background-dark": "#101622",
        "text-light": "#343A40",
        "text-dark": "#E1E3E6",
        "text-muted-light": "#616f89",
        "text-muted-dark": "#9095a1",
        "card-light": "#ffffff",
        "card-dark": "#1b263b",
        "border-light": "#dee2e6",
        "border-dark": "#343a40",
        "heading-dark": "#ffffff",
        "secondary-light": "#F1F5F9",
        "secondary-dark": "#1E293B",
        "accent-blue": "#0A192F",
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F0E68C",
        },
        // Additional colors for Governing Body page
        "accent": "#D4AF37",
        "text-primary-light": "#0A2342",
        "text-primary-dark": "#FFFFFF",
        "text-secondary-light": "#4A5568",
        "text-secondary-dark": "#A0AEC0",
        // Contact Us page colors
        "subtle-light": "#F0F2F5",
        "subtle-dark": "#1a2638"
      },
      fontFamily: {
        display: ["Public Sans", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        sans: ["Public Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
}