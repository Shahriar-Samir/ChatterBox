import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class", // Enable dark mode using class
  plugins: [
    heroui({
      themes: {
        light: {}, // Light theme remains as is
        dark: {
          colors: {
            primary: {
              DEFAULT: "#433A8A",
              foreground: "#000000",
            },
            focus: "#BEF264",
            background: "#18181A",
          },
        },
      },
    }),
  ],
};
