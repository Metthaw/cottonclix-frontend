// src/pages/HomePage/OurStory.jsx

import React from "react";

// --- รูปภาพที่ใช้ใน Component นี้ ---
import logo from "../../img/Logo.png";
import element1 from "../../img/element1.png"; // รูปกิ่งไม้จากโค้ดของคุณ
import cottonFlower from "../../img/4.png";
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
    quote: "“I care.”",
    finalLogoUrl: "/src/img/Logo.png",
  },
};

export default function OurStory({
  upperFlowerLocatorRef,
  lowerFlowerLocatorRef,
}) {
  return (
    <section className="w-full bg-white py-20 md:py-32">
      <div className="container mx-auto px-8">
        {/* ====================================================== */}
        {/* === ส่วนบน (ตามโค้ดที่คุณทำมา) === */}
        {/* ====================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          <div className="md:col-span-2 text-lg text-[#8D8D8D] leading-relaxed ">
            <p className="px-28">{storyData.part1.leftParagraph}</p>
            <img
              src={element1}
              alt="Branch Decoration"
              className="bottom-0 left-0 w-full h-auto opacity-100 z-0 pointer-events-none drop-shadow-2xl"
            />
          </div>
          <div className="relative md:col-span-2 text-left ">
            <div className=" grid grid-cols-1 md:grid-cols-1 items-center justify-end ">
              {/* This is the new, correctly placed locator */}
              <div
                ref={upperFlowerLocatorRef}
                className="absolute w-32 h-32"
                style={{ right: "70%", top: "40%" }}
              />
              <div className="grid grid-cols-1 md:grid-cols-1 items-center justify-end">
                <div className="flex items-center justify-end gap-4 ">
                  <img
                    src={logo}
                    alt="Cottonclix Logo"
                    className="h-32 w-auto "
                  />
                </div>
                <h2 className="text-5xl font-serif text-right pr-10 ">
                  {storyData.part1.heading}
                </h2>
              </div>
            </div>
            <p className="text-lg text-[#8D8D8D] leading-relaxed mt-48 ">
              {storyData.part1.rightParagraph}
            </p>
          </div>
        </div>

        {/* ====================================================== */}
        {/* === ส่วนล่าง (ตามดีไซน์ล่าสุด) === */}
        {/* ====================================================== */}

        <hr className=" mb-10 border-stone-200" />

        <div className="relative grid grid-cols-2 md:grid-cols-1 gap-x-16 gap-y-8 text-lg text-[#8D8D8D] leading-relaxed">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-x-16 gap-y-8 text-lg text-[#8D8D8D] leading-relaxed">
            {/* คอลัมน์ซ้าย */}
            <div className="space-y-6">
              {storyData.bottomSection.leftParagraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            {/* คอลัมน์ขวา */}
            <div className="relative ">
              <img
                src={lineArt}
                alt="Line Art"
                className="absolute  -top-[45%] scale-y-[-1] right-0 w-48 h-auto opacity-100 hidden md:block rotate-90 drop-shadow-2xl"
              />
              <div className="space-y-2 text-lg text-[#111000] font-medium">
                {storyData.bottomSection.rightList.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>

              {storyData.bottomSection.rightParagraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 relative py-16">
            {/* Lower flower locator - positioned relative to the quote section */}
            <div
              ref={lowerFlowerLocatorRef}
              className="absolute w-32 h-32"
              style={{
                left: "35%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <div className="relative z-10">
              <p className="font-serif font-semibold text-[#BC9F31] text-3xl pt-4">
                {storyData.bottomSection.quote}
              </p>
              <img src={Vector} alt="Logo" className="h-[50%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
