import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        background: "hsla(var(--background))",
        accent: "hsla(var(--accent))",
        border: "hsla(var(--border))",
        input: "hsla(var(--input))",
        foreground: "hsla(var(--foreground))",
        secondary: {
          DEFAULT: "hsla(var(--secondary))",
          foreground: "hsla(var(--secondary-foreground))",
        },
        second: {
          DEFAULT: "hsla(var(--second))",
          foreground: "hsla(var(--second-foreground))",
        },
        primary: {
          DEFAULT: "hsla(var(--primary))",
          foreground: "hsla(var(--primary-foreground))",
        },
        muted: {
          foreground: "hsla(var(--muted-foreground))",
        },
        popover: "hsla(var(--popover))",
        success: "hsla(var(--success))",
        destructive: "hsla(var(--destructive))",
        accent2: "hsla(var(--accent2))",
      },
      aspectRatio: {
        "28/40": "28/40",
        "52/30": "52/30",
      },
    },
  },
  plugins: [],
};

export default config;
