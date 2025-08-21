import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../img/Logo.png";
import SocialInfo from "../components/layout/SocialInfo";

import element5 from "../img/element5.svg";
import cottonFlowerImg from "../img/4.png";
import leaves2Img from "../img/16.svg";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

// 1. URL ของ API สำหรับดึงข้อมูล Linktree Links
const API_URL = "https://cms.cottonclix.com/wp-json/wp/v2/linktree_link";

export default function LinktreePage() {
  // 2. สร้าง State สำหรับเก็บข้อมูลและสถานะการโหลด
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);

  const mainRef = useRef(null);
  const logoRef = useRef(null);
  const flowerRef = useRef(null);
  const leavesRef = useRef(null);
  const branchRef = useRef(null);

  useGSAP(
    () => {
      if (!mainRef.current) return;

      const handleFocus = () => {
        gsap.fromTo(
          logoRef.current,
          {
            x: -400,
            y: 400,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          flowerRef.current,
          {
            x: 0,
            y: 0,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          leavesRef.current,
          {
            x: -300,
            y: 300,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          branchRef.current,
          {
            x: 200,
            y: 300,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      };

      const handleBlur = () => {
        gsap.fromTo(
          logoRef.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: -400,
            y: 400,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );
        gsap.fromTo(
          flowerRef.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            y: 0,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );
        gsap.fromTo(
          leavesRef.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: -300,
            y: 300,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );
        gsap.fromTo(
          branchRef.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 200,
            y: 300,
            opacity: 0,
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
        { threshold: 0.4 }
      );

      observer.observe(mainRef.current);

      return () => observer.disconnect();
    },
    { dependencies: [isAnimatedIn], scope: mainRef }
  );

  // 3. ดึงข้อมูลจาก WordPress เมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // จัดระเบียบข้อมูลให้ใช้งานง่าย
        const formattedLinks = data.map((item) => ({
          id: item.id,
          name: item.title.rendered,
          url: item.acf.link_url,
        }));
        setLinks(formattedLinks);
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-white py-16 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            ref={mainRef}
            key="blog-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onAnimationComplete={() => setIsAnimatedIn(true)}
            className="relative my-16"
          >
            <div className="container mx-auto px-6 max-w-4xl">
              {/* --- Header: โลโก้และชื่อแบรนด์ --- */}
              <div ref={logoRef} className="text-center mb-12 opacity-0">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Cottonclix Logo"
                    className="h-24 w-auto mx-auto mb-4"
                  />
                </Link>
              </div>

              {/* --- Links Grid: แสดงผลข้อมูลจาก State --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-16">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url} // ใช้ URL ที่มาจาก WordPress
                    target="_blank" // เปิดในแท็บใหม่
                    rel="noopener noreferrer"
                    className="bg-stone-100 p-4 rounded-full flex items-center justify-center text-lg font-semibold hover:bg-stone-200 transition-colors"
                  >
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
              <div />
            </div>
            <img
              ref={leavesRef}
              src={leaves2Img}
              alt="Decorative Leaves"
              className="absolute right-[-10%] top-[30%] scale-y-[-1] opacity-0 -translate-y-1/2 w-2/5 h-[60vh] object-contain pointer-events-none"
            />
            <img
              ref={flowerRef}
              src={cottonFlowerImg}
              alt="Cotton Flower"
              className="absolute right-[15%] bottom-[-40%] opacity-0 -translate-y-1/2 w-2/5 h-[10vh] object-contain  pointer-events-none"
            />
            <img
              ref={branchRef}
              src={element5}
              alt="Branch2 Decoration"
              className="absolute left-[-10%] bottom-[-100%] rotate-[45deg] opacity-0 -translate-y-1/2 w-2/5 h-[40vh] object-contain pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        <SocialInfo />
      </div>
    </motion.div>
  );
}
