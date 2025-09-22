import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../img/Logo.png";
import SocialInfo from "../components/layout/SocialInfo";
import { Skeleton } from "antd";
import element5 from "../img/element5.svg";
import cottonFlowerImg from "../img/4.png";
import leaves2Img from "../img/16.svg";
import linktreeFB from "../img/linktreeFB.svg";
import linktreeLine from "../img/linktreeLine.svg";
import linktreeIG from "../img/linktreeIG.svg";
import linktreeTT from "../img/linktreeTT.svg";
import linktreeSP from "../img/linktreeSP.svg";
import linktreeWeb from "../img/linktreeWeb.svg";

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
  const linksContainerRef = useRef(null);

  const iconNameMap = [
    { name: "Website", icon: linktreeWeb },
    { name: "Facebook", icon: linktreeFB },
    { name: "Instagram", icon: linktreeIG },
    { name: "Line Official", icon: linktreeLine },
    { name: "Shopee", icon: linktreeSP },
    { name: "Tiktok", icon: linktreeTT },
  ];

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
        { threshold: 0.3 }
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
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();

        // Map ข้อมูลจาก API ให้เป็นรูปแบบที่ต้องการ
        const formattedLinks = data.map((item) => ({
          id: item.id,
          name: item.title.rendered,
          url: item.acf.link_url,
          iconUrl: item.acf.icon,
        }));

        setLinks(formattedLinks);

        // Wait for the next tick to ensure the DOM is updated
        await new Promise((resolve) => setTimeout(resolve, 0));
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  // Skeleton for the link items
  const SkeletonLinkItem = () => (
    <div className="bg-stone-100 p-4 rounded-full flex items-center justify-center h-14">
      <Skeleton.Input active className="w-full h-6" />
    </div>
  );

  // Skeleton for the header
  const SkeletonHeader = () => (
    <div className="text-center mb-12">
      <Skeleton.Avatar
        active
        size={96}
        shape="square"
        className="mx-auto mb-4"
      />
    </div>
  );

  return (
    <div className="bg-white py-16 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          ref={mainRef}
          key="linktree-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => setIsAnimatedIn(true)}
          className="relative my-16"
        >
          <div className="container mx-auto px-6 max-w-4xl">
            {/* Header */}
            {loading ? (
              <SkeletonHeader />
            ) : (
              <div ref={logoRef} className="text-center mb-12">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Cottonclix Logo"
                    className="h-24 w-auto mx-auto mb-4"
                  />
                </Link>
              </div>
            )}

            {/* Links Grid */}
            <div
              ref={linksContainerRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-16"
            >
              {loading
                ? Array(4)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={index}
                        className="h-12 mb-3 bg-gray-200 rounded-full w-full max-w-md mx-auto"
                      />
                    ))
                : links.map((link) => (
  
                  <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full z-10 max-w-md mx-auto mb-3 flex items-center justify-center h-14 bg-[#d9cfc5] hover:bg-[#d0c4b9] rounded-full transition-colors"
                    >
                      <div className="">
                      {link.iconUrl && (
                      <img
                        src={link.iconUrl}
                        alt={`${link.name} icon`}
                        className="w-auto h-10" // ปรับขนาดไอคอนตามต้องการ
                      />
                    )}
                    </div>
                    
                    <span>{link.name}</span>
                    </a>
                  ))}
            </div>

            {/* Decorative Elements - Only show when links are rendered */}
            {!loading && (
              <>
                <img
                  ref={leavesRef}
                  src={leaves2Img}
                  alt="Decorative Leaves"
                  className="absolute right-[0%] top-[30%] scale-y-[-1] -translate-y-1/2 w-[20%] h-auto object-contain pointer-events-none"
                />
                <img
                  ref={flowerRef}
                  src={cottonFlowerImg}
                  alt="Cotton Flower"
                  className="absolute right-[15%] top-[100%] z-20 -translate-y-1/2 w-[10%] h-auto object-contain pointer-events-none"
                />
                <img
                  ref={branchRef}
                  src={element5}
                  alt="Branch2 Decoration"
                  className="absolute left-[0%] top-[80%] rotate-[45deg] -translate-y-1/2 w-[20%] h-auto object-contain pointer-events-none"
                />
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <div>
        <SocialInfo />
      </div>
    </div>
  );
}
