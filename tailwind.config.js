// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8C5F31',
        'secondary': '#F8E3C3',
        'natural': '#BDBDBD',
        'brand-black': '#110000',
        'brand-white': '#FFFFFF',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"IBM Plex Sans Thai"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}