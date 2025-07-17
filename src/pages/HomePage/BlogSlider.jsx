// src/pages/HomePage/BlogSlider.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// 1. นำเข้าข้อมูลจาก mockData.js และ Link จาก react-router-dom
import { blogPosts } from "../../data/mockData";
import { Link } from "react-router-dom";

export default function BlogSlider({ flowerLocatorRef }) {
  return (
    <section className="relative w-full bg-gray-50 py-20">
      {/* Flower locator - positioned in upper right corner */}
      <div
        ref={flowerLocatorRef}
        className="absolute pointer-events-none top-48 right-96 -z-50"
      />
      <div className="container mx-auto px-6 relative">
        <div className="relative z-50">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 text-center mb-12">
            From Our Journal
          </h2>

          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {/* 2. ใช้ข้อมูล "blogPosts" ชุดใหม่ที่ import เข้ามา */}
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                {/* 3. ทำให้แต่ละสไลด์เป็นลิงก์ไปยังหน้ารายละเอียดที่ถูกต้อง */}
                <Link to={`/blog/${post.id}`} className="group block">
                  <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200">
                    <img
                      // 4. ใช้ key "imageUrl" จากข้อมูลชุดใหม่
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-serif text-gray-700 mt-4 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
