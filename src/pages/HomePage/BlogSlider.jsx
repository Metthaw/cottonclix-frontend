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
const API_URL =
  "https://cms.cottonclix.com/wp-json/wp/v2/posts?per_page=6&_embed";
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
      className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col"
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

      <div className="flex-1 px-[5%] py-[5%] overflow-hidden relative z-50 flex flex-col">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-amber-800 text-center mb-6 md:mb-12">
          From Our Journal
        </h2>

        <Swiper
          ref={sliderRef}
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="w-full flex-1 mt-4 md:mt-8"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id} className="h-full">
              <Link
                to={`/blog/${post.id}`}
                className="group block h-full pb-[133.33%] relative"
              >
                <div className="absolute inset-0 rounded-lg shadow-sm overflow-hidden">
                  <img
                    src={post.acf.cover_image}
                    alt={post.title.rendered}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 md:p-4">
                    <h3 className="text-base md:text-lg font-serif text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title.rendered}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
