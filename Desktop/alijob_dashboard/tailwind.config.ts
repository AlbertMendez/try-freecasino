import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#C4683A",
          light:   "#FDF0EB",
          hover:   "#B05A2E",
        },
        page:  "#F5F4F1",
        card:  "#FFFFFF",
        border: {
          DEFAULT: "#E8E5DF",
          light:   "#F0EDE8",
        },
        ink: {
          DEFAULT:   "#1A1714",
          secondary: "#6B6560",
          muted:     "#9A9088",
        },
        sidebar: {
          DEFAULT: "#111010",
          border:  "#1E1C1A",
          hover:   "#1A1816",
          active:  "#1E1C1A",
        },
        teal: {
          DEFAULT: "#1A8080",
          light:   "#E8F5F5",
        },
        "status-green": {
          DEFAULT: "#1F7A4D",
          light:   "#E8F5EE",
        },
        "status-amber": {
          DEFAULT: "#B5691A",
          light:   "#FDF4E7",
        },
        "status-red": {
          DEFAULT: "#C0392B",
          light:   "#FDF0EE",
        },
        "status-purple": {
          DEFAULT: "#6B3FA0",
          light:   "#F3EEF9",
        },
        "status-blue": {
          DEFAULT: "#1A5FA0",
          light:   "#EBF2FC",
        },
        "landing-accent": "#1A5FA0",
        "landing-card":   "#F4F7FB",
        "landing-border": "#DCE6F0",
      },
      fontSize: {
        "2xs": ["10px", "14px"],
        xs:    ["11px", "15px"],
        sm:    ["12px", "16px"],
        base:  ["13px", "18px"],
        md:    ["14px", "20px"],
        lg:    ["15px", "22px"],
        xl:    ["17px", "24px"],
        "2xl": ["20px", "28px"],
        "3xl": ["22px", "30px"],
        display: ["52px", "1.15"],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        sm:  "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        DEFAULT: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        md:  "0 4px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)",
        lg:  "0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
        popup: "0 8px 24px rgba(0,0,0,0.4)",
      },
      letterSpacing: {
        tight:  "-0.03em",
        tighter: "-0.04em",
        wide:   "0.04em",
        wider:  "0.06em",
        caps:   "0.08em",
        xl:     "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;
