// src/pages/HomePage/OurStory.jsx

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link as RouterLink } from "react-router-dom";

// --- รูปภาพที่ใช้ใน Component นี้ ---
import logo from "../../img/Logo.png";
import element1 from "../../img/element1.png"; // รูปกิ่งไม้จากโค้ดของคุณ
import lineArt from "../../img/element2.svg";
import Vector from "../../img/Group 8.svg"; // รูป Vector ที่ใช้ในโค้ดของคุณ

// --- ข้อมูลทั้งหมดสำหรับ Component นี้ รวมไว้ที่เดียว ---
const storyData = {
  // Part 1 Data (สำหรับส่วนบน)
  part1: {
    heading: "Our Story",
    leftParagraph:
      "In a world that moves faster every day, small gifts made with care have become more meaningful than we often realize. And that... is the inspiration behind Cottonclix.",
    rightParagraph:
      "Cottonclix was born from a love for fabric, a passion for nature-inspired patterns, and the belief that “a good gift doesn't have to be big , it just has to be meaningful.”",
  },
  // Bottom Section Data (สำหรับส่วนล่าง)
  bottomSection: {
    leftParagraphs: [
      "We use high-quality cotton blends, warm and cheerful patterns, and simple-yet-premium designs to create special little gifts – whether it's a fabric scrunchie, a small pouch, a mini tote, or a tiny keepsake full of love.",
      "What we're proud of isn't just the “thing” you receive, but the “feeling” that comes with it.",
    ],
    rightList: [
      "Homemade warmth.",
      "Hand-wrapped cuteness.",
      "Care in every stitch.",
    ],
    rightParagraphs: [
      "Because we believe the best gifts aren't just objects they're the feelings that make someone smile.",
      "Cottonclix wants to be a small part of those moments — when you want someone to know",
    ],
    quote: "“ I care. ”",
    finalLogoUrl: "/src/img/Logo.png",
  },
};

export default function OurStory({
  upperFlowerLocatorRef,
  lowerFlowerLocatorRef,
}) {
  const mainRef = useRef(null);
  const headerRef = useRef(null);
  const subHeaderRef = useRef(null);
  const branchRef = useRef(null);
  const lineRef = useRef(null);
  const singleBranchRef = useRef(null);
  const logoRef = useRef(null);

  useGSAP(
    () => {
      const mainEl = mainRef.current;
      if (!mainEl) return;

      const handleFocus = () => {
        gsap.fromTo(
          headerRef.current,
          {
            x: -300,
            y: 300,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            y: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          subHeaderRef.current,
          {
            x: 40,
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
          branchRef.current,
          {
            // x: 100,
            y: 20,
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
          lineRef.current,
          {
            // x: 100,
            y: 20,
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
          singleBranchRef.current,
          {
            x: 100,
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
      };

      const handleBlur = () => {
        gsap.fromTo(
          headerRef.current,
          {
            x: 0,
            y: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: -300,
            y: 300,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          subHeaderRef.current,
          {
            x: 0,
            // y: -20,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 40,
            // y: -20,
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
            // x: 100,
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          lineRef.current,
          {
            x: 0,
            // y: -20,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 20,
            // y: -20,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          singleBranchRef.current,
          {
            x: 0,
            // y: -20,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 100,
            // y: -20,
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
        { threshold: 0.3 } // fire when 20% of element is visible
      );

      observer.observe(mainEl);

      return () => observer.disconnect();
    },
    { scope: mainRef }
  ); // ✅ no dependencies

  useGSAP(
    () => {
      const logoEl = logoRef.current;
      if (!logoEl) return;

      const handleFocus = () => {
        gsap.fromTo(
          logoEl,
          {
            // x: -300,
            // y: 300,
            rotate: -90,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            // x: 0,
            // y: 0,
            rotate: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      };

      const handleBlur = () => {
        gsap.fromTo(
          logoEl,
          {
            // x: 0,
            // y: 0,
            rotate: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            // x: -300,
            // y: 300,
            rotate: -90,
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
        { threshold: 0.3 } // fire when 20% of element is visible
      );

      observer.observe(logoEl);

      return () => observer.disconnect();
    },
    { scope: logoRef }
  ); // ✅

  const renderStyledText = (text, wordsToStyle, className) => {
    // ตรวจสอบให้แน่ใจว่า wordsToStyle เป็น Array
    const wordsArray = Array.isArray(wordsToStyle)
      ? wordsToStyle
      : [wordsToStyle];

    if (!wordsArray.length || !text) {
      return text;
    }

    // สร้าง Regular Expression จาก Array ของคำที่ต้องการ
    const regex = new RegExp(`(${wordsArray.join("|")})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          // ตรวจสอบว่า part ที่เจอ ตรงกับคำใดคำหนึ่งใน Array หรือไม่
          wordsArray.find(
            (word) => word.toLowerCase() === part.toLowerCase()
          ) ? (
            <span key={index} className={className}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <section
      ref={mainRef}
      className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Upper Section */}
        <div className="relative min-h-[50vh] flex flex-col md:grid md:grid-cols-4 gap-32 md:gap-8">
          {/* Logo & Heading - Mobile: Top, Desktop: Right */}
          <div className="flex flex-col items-center md:my-[20%] md:justify-between md:items-end md:col-span-2 order-1 md:order-2">
            <div className="flex flex-col items-center md:items-end gap-4 md:gap-2">
              <div className="flex items-center justify-center md:justify-end">
                <img
                  ref={headerRef}
                  src={logo}
                  alt="Cottonclix Logo"
                  className="h-16 sm:h-20 md:h-14 lg:h-28 w-auto"
                />
              </div>
              <h2
                ref={subHeaderRef}
                className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-bold  text-center md:text-right "
              >
                {storyData.part1.heading}
              </h2>
            </div>
            <p className="text-base sm:text-lg md:text-lg lg:text-xl  text-center md:text-right mt-6 md:mt-6 leading-relaxed max-w-2xl md:max-w-none">
              {renderStyledText(
                storyData.part1.rightParagraph,
                "Cottonclix",
                "text-[#8C5F31] font-bold"
              )}
            </p>
            <div
              ref={upperFlowerLocatorRef}
              className="md:absolute left-[30%] top-[35%] md:left-[55%] md:top-[30%] pointer-events-none"
            />
          </div>

          {/* Left Paragraph */}
          <div className="grid row-span-1 md:col-span-2 order-2 md:order-1 items-start md:my-[50%]">
            <p className="text-base sm:text-lg md:text-lg lg:text-xl  text-center md:text-left leading-relaxed max-w-2xl md:max-w-none">
              {renderStyledText(
                storyData.part1.leftParagraph,
                "Cottonclix",
                "text-[#8C5F31] font-bold"
              )}
            </p>
            {/* Decorative Branch */}
            <img
              ref={branchRef}
              src={element1}
              alt="Branch Decoration"
              className="md:absolute bottom-0 left-[5%] md:left-[-5%] 
            w-[100%] md:w-[35%] lg:w-[45%] 
            h-auto
            z-10 pointer-events-none drop-shadow-2xl
            "
            />
          </div>
        </div>

        <hr ref={lineRef} className=" border-stone-200" />

        {/* Lower Section */}
        <div className="min-h-[50vh] flex flex-col my-[10%]">
          {/* Two Column Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            {/* Left Column */}
            <div className="space-y-4 md:space-y-6">
              {storyData.bottomSection.leftParagraphs.map((text, i) => (
                <p
                  key={i}
                  className="text-sm sm:text-base md:text-lg lg:text-xl  text-center md:text-left leading-relaxed"
                >
                  {renderStyledText(
                    text,
                    ["“thing”", "“feeling”"],
                    "font-bold" // ใส่แค่คลาส font-bold
                  )}
                </p>
              ))}
            </div>

            {/* Right Column */}
            <div className="relative">
              <img
                ref={singleBranchRef}
                src={lineArt}
                alt="Line Art"
                className="absolute hidden md:block top-[-25%] right-0 md:right-[-10%] 
                w-[40%] h-auto 
                scale-y-[-1] rotate-90 drop-shadow-2xl"
              />
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2 text-[#111000]">
                  {storyData.bottomSection.rightList.map((item, i) => (
                    <p
                      key={i}
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-left"
                    >
                      {item}
                    </p>
                  ))}
                </div>
                {storyData.bottomSection.rightParagraphs.map((text, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base md:text-lg lg:text-xl  text-center md:text-left leading-relaxed"
                  >
                    {renderStyledText(
                      text,
                      "Cottonclix",
                      "text-[#8C5F31] font-bold"
                    )}
                  </p>
                ))}
                <RouterLink
                  to={"/about"}
                  rel="noopener noreferrer"
                  className=" text-[#8C5F31] font-bold underline hover:text-[#A7723C] transition-colors"
                >
                  Read more ...
                </RouterLink>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="relative mt-12 sm:mt-16 md:mt-20">
            <div
              ref={lowerFlowerLocatorRef}
              className="absolute left-[15%] top-[10%]"
            />
            <div className="flex flex-col items-center space-y-4">
              <p className="font-bold text-xl sm:text-2xl md:text-3xl text-[#8C5F31] text-center">
                {storyData.bottomSection.quote}
              </p>
              <img
                ref={logoRef}
                src={Vector}
                alt="Logo"
                className="w-16 sm:w-18 md:w-20 lg:w-24 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
