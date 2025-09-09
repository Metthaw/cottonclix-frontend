// tailwind.config.js

import { m } from 'motion/react';
import { b } from 'motion/react-client';

/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
         
        // เราจะตั้งให้ฟอนต์ sans-serif หลักของเว็บคือ IBM Plex Sans Thai
        // พร้อมมีฟอนต์สำรองเป็น sans-serif ทั่วไป
         sans: ['IBM Plex Sans Thai', 'sans-serif'],
        medium: ['IBM Plex Sans Thai Medium', 'sans-serif'], // เพิ่มฟอนต์
         bold: ['IBM Plex Sans Thai Bold', 'sans-serif'], // เพิ่มฟอนต์ 

        // // ฟอนต์ serif ที่เราเคยคุยกันไว้ก็ยังอยู่
        serif: ['IBM Plex Sans Thai', 'serif'],
        // sans: ['"IBM Plex Sans Thai"', "sans-serif"],

        // ฟอนต์ serif ที่เราเคยคุยกันไว้ก็ยังอยู่
         
      },
    },
  },
  plugins: [],
};