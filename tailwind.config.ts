// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",      // Covers app directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Covers top-level components directory
    // If you have a 'src' folder (e.g., src/app, src/components), you'd need:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Primary red theme - Sankalp UPSC
        primary: {
          DEFAULT: '#7A0102',
          dark: '#630001',
          light: '#9a0102',
          50: '#fdf2f2',
          100: '#fbe8e8',
          200: '#f6d1d2',
          300: '#f0a9ab',
          400: '#e87679',
          500: '#dd4b4d',
          600: '#d32f32',
          700: '#b32425',
          800: '#941f1f',
          900: '#7A0102',
        },
        primaryBlue: '#0A2647',
        accentBlue: '#144272',
        highlightGold: '#FFD700',
      },
    },
  },
  plugins: [],
};
export default config;