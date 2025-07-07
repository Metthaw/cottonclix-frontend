// ตำแหน่ง: src/pages/HomePage/CatalogSlider.jsx

import React, { useState } from 'react';

// Import เครื่องมือสำหรับสไลด์
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import CSS ของ Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 1. Import รูปหนังสือของคุณเข้ามา
import bookImage from '../../img/Group 56.png';

// 2. เตรียมข้อมูลสำหรับแต่ละสไลด์ (ใช้รูปเดียวกัน แต่ข้อความต่างกัน)
const slideData = [
  {
    image: bookImage,
    title: "Spring Collection",
    description: "Our spring collection features light fabrics and fresh designs.",
    link: "#"
  },
  {
    image: bookImage,
    title: "Summer Collection",
    description: "Bright and vibrant, perfect for sunny days.",
    link: "#"
  },
  {
    image: bookImage,
    title: "Autumn Collection",
    description: "Warm tones and cozy textures for the autumn season.",
    link: "#"
  },
  {
    image: bookImage,
    title: "Winter Collection",
    description: "Elegant and comfortable, designed for the cold weather.",
    link: "#"
  }
];

// 3. สร้าง Component ของเรา
export default function CatalogSlider() {
  // สร้าง state เพื่อเก็บข้อมูลของสไลด์ที่แสดงอยู่
  const [activeSlide, setActiveSlide] = useState(slideData[0]);

  return (
    <section className="w-full flex justify-center items-center py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* ฝั่งซ้าย: สไลด์รูปภาพ */}
          <div className="w-full h-[500px] flex justify-center items-center">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation // เปิดปุ่มลูกศร
              pagination={{ clickable: true }} // เปิดจุดเปลี่ยนสไลด์
              onSlideChange={(swiper) => {
                // เมื่อสไลด์เปลี่ยน ให้อัปเดตข้อมูลใน state
                setActiveSlide(slideData[swiper.activeIndex]);
              }}
              className="w-full h-full"
            >
              {slideData.map((slide, index) => (
                <SwiperSlide key={index} className="flex justify-center items-center">
                  <img src={slide.image} alt={slide.title} className="max-w-[80%] max-h-[80%] object-contain" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ฝั่งขวา: ข้อความที่เปลี่ยนตามสไลด์ */}
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 tracking-wider">
              COTTONCLIX
            </h2>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 tracking-wider">
              {activeSlide.title}
            </h2>
            <p className="text-xl text-stone-500 mt-4">
              {activeSlide.description}
            </p>
            <a href={activeSlide.link} className="text-lg text-amber-700 mt-6 inline-block hover:underline">
              {'<<< View Collection'}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}