import type { Config } from 'tailwindcss'

function generateDarkenColorFrom(hex: string, amount = 0.15): string {
  hex = hex.replace('#', '');
  const num = parseInt(hex, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  
  r = Math.floor(r * (1 - amount));
  g = Math.floor(g * (1 - amount));
  b = Math.floor(b * (1 - amount));
  
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function generateForegroundColorFrom(hex: string): string {
  hex = hex.replace('#', '');
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['YekanBakh', 'sans-serif'],
      },
      colors: {
        iconPrimary: {
          50: '#ff7e00',
          100: '#ff9f04'
        },
        iconSecondry: {
          50: '#007945'
        },
        current: "currentColor",
        Content: {
          25: '#a6adbb'
        },
        transparent: "transparent",
        white: "#F9F9F9",
        primary: "#007BEC",
        "primary-content": "#FFFFFF",
        "primary-focus": generateDarkenColorFrom("#007BEC"),
        secondary: "#6c5ce7",
        "secondary-content": "#FFFFFF",
        "secondary-focus": generateDarkenColorFrom("#6c5ce7"),
        accent: "#1FB2A5",
        "accent-content": "#FFFFFF",
        "accent-focus": generateDarkenColorFrom("#1FB2A5"),
        neutral: "#2a323c",
        "neutral-content": generateForegroundColorFrom("#FFFFFF"),
        "neutral-focus": generateDarkenColorFrom("#2a323c", 0.03),
        base: {
          25: "#353d47",
          50: "#2a323c",
          75: "#20272e",
          100: "#1d232a",
          200: "#191e24",
          300: "#15191e",
          content: "#A6ADBB"
        },
        info: "#3abff8",
        "info-content": generateForegroundColorFrom("#3abff8"),
        success: "#36d399",
        "success-content": generateForegroundColorFrom("#36d399"),
        warning: "#fbbd23",
        "warning-content": generateForegroundColorFrom("#fbbd23"),
        error: "#f87272",
        "error-content": generateForegroundColorFrom("#f87272"),
        "gradient-first": "#34eaa0",
        "gradient-second": "#0fa2e9",
      },
    },
  },
  plugins: [],
}

export default config 

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        iconPrimary:{
          50:'#ff7e00',
          100:'#ff9f04'
        },
        iconSecondry:{
          50:'#007945'
        },
      },
    },
  },
  plugins: [],
} 