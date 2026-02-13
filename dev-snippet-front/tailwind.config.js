/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        'primary-dark': '#E85A28',
        'primary-light': '#FF8659',
        secondary: '#004E89',
        'secondary-dark': '#003D6B',
        accent: '#F7B801',
        'accent-green': '#06D6A0',
        'bg-dark': '#0A0E27',
        'bg-darker': '#05070F',
        'bg-card': '#131829',
        'bg-card-hover': '#1A2035',
        border: '#1F2937',
        'text-primary': '#F9FAFB',
        'text-secondary': '#9CA3AF',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
