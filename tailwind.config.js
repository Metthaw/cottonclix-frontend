// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // ตั้งค่าให้ฟอนต์ sans-serif (ฟอนต์หลัก) ใช้ 'IBM Plex Sans Thai' เป็นอันดับแรก
        // และตามด้วยฟอนต์สำรองมาตรฐานของ Tailwind เพื่อความปลอดภัย
        sans: ['IBM Plex Sans Thai', ...defaultTheme.fontFamily.sans],
        
        // ฟอนต์ serif (ถ้าคุณต้องการใช้ในบางจุด)
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};