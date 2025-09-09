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
        { threshold: 0.4 } // fire when 20% of element is visible
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
    <section ref={mainRef} className="relative w-full min-h-fit bg-white">
      {/* Flower Locator - Move it first in DOM order */}
      <div
        ref={flowerLocatorRef}
        className="absolute pointer-events-none 
        top-[5%] sm:top-[8%] md:top-[10%] 
        right-[30%] md:right-[40%] 
        z-10
        "
      />

      {/* Background Leaf */}
      <img
        ref={leavesRef}
        src={leaves2Img}
        alt="Decorative Leaves"
        className="absolute left-[-5%] md:left-[-10%] 
        top-1/2 -translate-y-1/2 
        scale-x-[-1]
        w-[60%] md:w-2/5 
        h-auto object-contain 
        rotate-[18deg]
        pointer-events-none 
        z-0"
      />

      {/* Content Container - Higher z-index */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <h2
          className="text-xl sm:text-2xl md:text-4xl lg:text-5xl 
          font-bold text-amber-800 text-center 
          mb-3 sm:mb-4 md:mb-8 lg:mb-12"
        >
          From Our Journal
        </h2>

        {/* Swiper Container */}
        <div className="w-full max-w-7xl mx-auto z-50">
          <Swiper
            ref={sliderRef}
            modules={[Pagination]}
            spaceBetween={12}
            slidesPerView={1.2}
            centeredSlides={true}
            pagination={{ clickable: true }}
            breakpoints={{
              480: {
                slidesPerView: 2.2,
                spaceBetween: 16,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
                centeredSlides: false,
              },
            }}
            className="!pt-2 !pb-8 md:!pb-12 !z-50"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <Link
                  to={`/blog/${post.id}`}
                  className="group block w-full aspect-[4/5] sm:aspect-[3/4] 
                    relative rounded-lg shadow-sm overflow-hidden z-50"
                >
                  {/* Image Container */}
                  <div className="absolute inset-0">
                    <img
                      src={post.acf.cover_image}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover transform 
                        group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t 
                      from-black/70 via-black/20 to-transparent"
                    />
                  </div>

                  {/* Title */}
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 md:p-4">
                    <h3
                      className="text-xs sm:text-sm md:text-base lg:text-lg 
                      font-medium text-white 
                      group-hover:text-primary 
                      transition-colors duration-300 
                      line-clamp-2"
                    >
                      {post.title.rendered}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
