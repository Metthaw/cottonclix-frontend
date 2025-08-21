// src/pages/HomePage/BlogSlider.jsx

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import leaves2Img from "../../img/16.svg";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// 1. นำเข้าข้อมูลจาก mockData.js และ Link จาก react-router-dom
const API_URL = 'https://cms.cottonclix.com/wp-json/wp/v2/posts?per_page=6&_embed';
import { Link } from "react-router-dom";


export default function BlogSlider({ flowerLocatorRef }) {
  const mainRef = useRef(null);
  const leavesRef = useRef(null);
  const sliderRef = useRef(null);

  const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts for slider:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchPosts();
}, []);

  useGSAP(
    () => {
      const mainEl = mainRef.current;
      if (!mainEl) return;

      const handleFocus = () => {
        gsap.fromTo(
          leavesRef.current,
          {
            x: -80,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          sliderRef.current,
          {
            x: -80,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      };

      const handleBlur = () => {
        gsap.fromTo(
          leavesRef.current,
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: -80,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          sliderRef.current,
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: -80,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleFocus();
          } else {
            handleBlur();
          }
        },
        { threshold: 0.2 } // fire when 20% of element is visible
      );

      observer.observe(mainEl);

      return () => observer.disconnect();
    },
    { scope: mainRef }
  ); // ✅ no dependencies
  if (loading) {
  return <section className="w-full py-20 text-center">Loading...</section>;
}

  return (
    <section
      ref={mainRef}
      className="relative w-full min-h-[50vh] h-[50vh] md:min-h-screen md:h-screen bg-gray-50 py-20 overflow-hidden"
    >
      
      <img
        ref={leavesRef}
        src={leaves2Img}
        alt="Decorative Leaves"
        className="absolute left-[-10%] top-[40%] scale-x-[-1] -translate-y-1/2 w-2/5 h-auto object-contain z-0 rotate-[18deg] pointer-events-none"
      />
      {/* Flower locator - positioned in upper right corner */}
      <div
        ref={flowerLocatorRef}
        className="absolute pointer-events-none top-[10%] right-[40%] -z-50"
      />
      <div className="container mx-auto px-6 relative">
        <div className="relative z-50">
          <h2 className="text-4xl md:text-5xl font-serif text-amber-800 text-center mb-12">
            From Our Journal
          </h2>

          <Swiper
            ref={sliderRef}
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
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                {/* 3. ทำให้แต่ละสไลด์เป็นลิงก์ไปยังหน้ารายละเอียดที่ถูกต้อง */}
                <Link to={`/blog/${post.id}`} className="group block">
                  <div className="overflow-hidden rounded-lg shadow-sm  ">
                    <img
                      // 4. ใช้ key "imageUrl" จากข้อมูลชุดใหม่
                      src={post.acf.cover_image} 
                      alt={post.title.rendered}
                      className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-serif text-amber-800 mt-4 group-hover:text-primary transition-colors duration-300">
                    {post.title.rendered}
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
