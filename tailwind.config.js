// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
         sans: ['IBM Plex Sans Thai', ...defaultTheme.fontFamily.sans],
        // เราจะตั้งให้ฟอนต์ sans-serif หลักของเว็บคือ IBM Plex Sans Thai
        // พร้อมมีฟอนต์สำรองเป็น sans-serif ทั่วไป
        // sans: ['IBM Plex Sans Thai', 'sans-serif'],

        // // ฟอนต์ serif ที่เราเคยคุยกันไว้ก็ยังอยู่
        // serif: ['Playfair Display', 'serif'],
        // sans: ['"IBM Plex Sans Thai"', "sans-serif"],

        // ฟอนต์ serif ที่เราเคยคุยกันไว้ก็ยังอยู่
        serif: ['"Playfair Display"', "serif"],
      },
      
    },
  },
  plugins: [],
};
