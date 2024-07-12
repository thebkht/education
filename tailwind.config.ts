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

      colors: {
        background: "hsla(var(--background))",
        accent: "hsla(var(--accent))",
        border: "hsla(var(--border))",
        input: "hsla(var(--input))",
        foreground: "hsla(var(--foreground))",
        secondary: "hsla(var(--secondary))",
        second: "hsla(var(--foreground-second))",
        primary: {
          DEFAULT: "hsla(var(--primary))",
          foreground: "hsla(var(--primary-foreground))",
        },
        muted: {
          foreground: "hsla(var(--muted-foreground))",
        },
      },
    },
  },
  plugins: [],
};

export default config;
