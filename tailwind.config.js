/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#030303',
        surface: {
          900: '#09090b',
          800: '#121215',
          700: '#1a1a1f',
          600: '#27272e',
        },
        crimson: {
          DEFAULT: '#ff1e27',
          hover: '#e50914',
          dark: '#b30d17',
          subtle: 'rgba(255, 30, 39, 0.12)',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa',
          muted: '#71717a',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Syne', 'Cabinet Grotesk', 'Space Grotesk', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        mega: '0.4em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}
