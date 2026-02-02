import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
      geist: ["var(--font-geist-sans)"],
      azeret: ["var(--font-azeret-mono)"],
    },
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#030712",
        primary: "#002060",
        "primary-foreground": "#f9fafb",
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#002060", // same as primary
        secondary: "#edb500",
        "secondary-foreground": "#111827",
        destructive: "#dd224f",
        "destructive-foreground": "#f9fafb",
        muted: "#f3f4f6",
        "muted-foreground": "#6b7280",
        accent: "#f3f4f6",
        "accent-foreground": "#111827",
        popover: "#ffffff",
        "popover-foreground": "#030712",
        tooltip: "#374151",
        "tooltip-foreground": "#ffffff",
        card: "#ffffff",
        "card-foreground": "#030712",
        white: "#ffffff",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
