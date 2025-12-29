import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5f5f0',
        brand: {
          blue: '#2397d0',
          light: '#cde4f5',
          yellow: '#fff176',
          dark: '#1a1a1a'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          xl: '1200px'
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
