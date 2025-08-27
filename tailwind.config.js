// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // เราจะตั้งให้ฟอนต์ sans-serif หลักของเว็บคือ IBM Plex Sans Thai
        // พร้อมมีฟอนต์สำรองเป็น sans-serif ทั่วไป
        sans: ['"IBM Plex Sans Thai"', "sans-serif"],

        // ฟอนต์ serif ที่เราเคยคุยกันไว้ก็ยังอยู่
        serif: ['"Playfair Display"', "serif"],
      },
      // ... (โค้ดสีที่คุณอาจจะเคยเพิ่มไว้)
    },
  },
  plugins: [],
};
