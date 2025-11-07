// src/pages/BlogPage.jsx

import React, { useState, useEffect, useRef } from "react"; // 1. Import useState และ useEffect
import { Link } from "react-router-dom";
import SocialInfo from "../components/layout/SocialInfo";
import element2 from "../img/element2.png";
import element5 from "../img/element5.svg";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ConfigProvider, Pagination, Skeleton, Row, Col } from "antd";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

// URL ของ API ที่เราจะไปดึงข้อมูล
const API_URL = "https://cms.cottonclix.com/wp-json/wp/v2/posts";

export default function BlogPage() {
  // 2. สร้าง State เพื่อเก็บข้อมูลบทความและสถานะการโหลด
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);

  const mainRef = useRef(null);
  const flowerRef = useRef(null);

  useGSAP(
    () => {
      if (!(mainRef.current && flowerRef.current)) return;

      const handleFocus = () => {
        gsap.fromTo(
          flowerRef.current,
          {
            x: -600,
            y: 200,
            rotate: 180,
            opacity: 0,
            duration: 0.7,
            ease: "sine.inOut",
          },
          {
            x: 0,
            y: 0,
            rotate: 90,
            opacity: 1,
            duration: 0.7,
            ease: "sine.inOut",
          }
        );
      };

      const handleBlur = () => {
        gsap.fromTo(
          flowerRef.current,
          {
            x: 0,
            y: 0,
            rotate: 90,
            opacity: 1,
            duration: 0.7,
            ease: "sine.inOut",
          },
          {
            x: -600,
            y: 200,
            rotate: 180,
            opacity: 0,
            duration: 0.7,
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
        { threshold: 0.4 }
      );

      observer.observe(mainRef.current);

      return () => observer.disconnect();
    },
    { dependencies: [isAnimatedIn], scope: mainRef }
  );
  // 3. ใช้ useEffect เพื่อดึงข้อมูลจาก API แค่ครั้งเดียวเมื่อเปิดหน้า
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPosts(data); // นำข้อมูลที่ได้มาเก็บใน State
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // ตั้งค่าว่าโหลดเสร็จแล้ว (ไม่ว่าจะสำเร็จหรือล้มเหลว)
      }
    };

    fetchPosts();
  }, []); // [] ว่างๆ หมายถึงให้ทำงานแค่ครั้งเดียว

  // Skeleton item that matches the blog post card layout
  const SkeletonCard = () => (
    <div className="group block w-full">
      <div className="w-full h-80 rounded-lg overflow-hidden">
        <Skeleton.Image active className="w-full h-full" />
      </div>
      <div className="pt-4 w-full">
        <Skeleton.Input 
          active 
          size="small" 
          className="w-4/5 h-7 mb-2" 
        />
        <div className="space-y-2 mt-2">
          <Skeleton active paragraph={false} title={{ width: '100%' }} />
          <Skeleton active paragraph={false} title={{ width: '100%' }} />
        </div>
        <Skeleton.Input 
          active 
          size="small" 
          className="w-2/5 h-4 mt-3" 
        />
      </div>
    </div>
  );

  // Skeleton for the pagination
  const SkeletonPagination = () => (
    <div className="flex justify-center py-28">
      <Skeleton.Button active style={{ width: "200px", height: "32px" }} />
    </div>
  );

  return (
    <motion.div
      // ref={mainRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1 }}
      className="bg-white overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          ref={mainRef}
          key="blog-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => setIsAnimatedIn(true)}
          className="container relative mx-auto px-6 py-16 z-10"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold  text-gray-900">
              Blogs
            </h1>
            <p className="mt-4 text-lg text-natural"></p>
          </div>
          <img
            src={element2}
            ref={flowerRef}
            alt="Cotton Flower"
            className="absolute right-[-25%] opacity-0 top-0 rotate-[90deg] scale-y-[-1]  w-2/5 h-[40vh] object-contain -z-10 pointer-events-none"
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 z-10">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 z-10">
              {posts?.map((post) => (
                <Link
                  to={`/blog/${post?.id}`}
                  key={post?.id}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-lg">
                    <img
                      className="w-full h-80 object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                      src={post?.acf?.cover_image}
                      alt={post?.title?.rendered}
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="mt-2 text-xl text-black group-hover:text-primary">
                      {post?.title?.rendered}
                    </h3>
                    <p
                      className="mt-2 text-natural text-sm h-12 overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: post?.acf?.excerpt,
                      }}
                    />
                    <p className="mt-3 text-sm text-gray-400">
                      {new Date(post?.date).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="relative flex justify-center items-center space-x-2 z-10 py-28">
            {loading ? (
              <SkeletonPagination />
            ) : (
              <>
                <ConfigProvider
                  theme={{
                    components: {
                      Pagination: {
                        colorPrimary: "#856647",
                        colorPrimaryHover: "#BC9F31",
                        colorPrimaryActive: "#BC9F31",
                      },
                    },
                  }}
                >
                  <Pagination
                    defaultCurrent={1}
                    pageSize={9}
                    total={posts?.length ?? 0}
                  />
                </ConfigProvider>
                <img
                  src={element5}
                  alt="Branch2 Decoration"
                  className="absolute left-[-15%] top-[50%] -translate-y-1/2 w-[30%] h-auto rotate-[45deg] object-contain -z-10 pointer-events-none"
                />
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <div>
        <SocialInfo />
      </div>
    </motion.div>
  );
}
