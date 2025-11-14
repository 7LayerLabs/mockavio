import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PicForge colors (playful)
        picforge: {
          primary: '#14b8a6', // teal
          secondary: '#9333ea', // purple
          accent: '#f59e0b', // amber
        },
        // Mockavio colors (professional)
        mockavio: {
          primary: '#1e40af', // deep blue
          secondary: '#475569', // slate
          accent: '#0ea5e9', // sky blue
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

