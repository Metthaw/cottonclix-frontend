import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import branchImage from "../../img/16.svg";

import { storyContent } from "../../data/mockData";
import openBookImage from "../../img/13.svg";

export default function StoryBook({ selectedCollectionId, flowerLocatorRef }) {
  // ใช้ ID ที่ได้รับมา หรือใช้ 'spring-collection' เป็นค่าเริ่มต้นถ้าไม่มี
  const collectionId = selectedCollectionId || "spring-collection";
  const currentContent = storyContent.collectionDetails[collectionId];
  const storyText = storyContent.storyText;

  // ป้องกัน Error หากหา collection ไม่เจอ
  if (!currentContent) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center ">
        <p>Loading collection content...</p>
      </div>
    );
  }

  return (
    <section className="w-full flex items-center  p-20 relative ">
      <div className="container  flex grid-cols-1 md:grid-cols-2 items-center">
         <img 
        src={branchImage} 
        alt="Decorative background leaves"
        className="absolute -top-[25%] right-0 h-auto w-[30%] -z-10 pointer-events-none"
      />
        {/* ส่วนเนื้อเรื่อง */}
        <div className="text-left mx-4 w-[50%] h-full">
          <h2 className="text-4xl font-serif text-brand-black ">
            {storyText.heading}
          </h2>
          <div className="text-base text-brand-black h-full overflow-y-automy my-5 ">
            {storyText.paragraphs.map((p, i) => (
              <p key={i} style={{ whiteSpace: "pre-wrap" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
        {/* ส่วนหนังสือ */}
        <div className="relative w-full aspect-[4/3]">
          <img
            src={openBookImage}
            alt="Open Story Book"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 px-[10%] py-[12%]">
            <Swiper
              modules={[Navigation, EffectFade]}
              navigation={{
                prevEl: '.storybook-prev-arrow',
                nextEl: '.storybook-next-arrow',
              }}
              effect={"fade"}
              className="w-full h-full"
            >
              {currentContent.sliderImagePairs.map((pair) => (
                <SwiperSlide key={pair.id}>
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="bg-white">
                      <img
                        src={pair.leftImg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-white">
                      <img
                        src={pair.rightImg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                  </div>
                </SwiperSlide>
                
              ))}
            </Swiper>
            <a
                      href="https://lin.ee/iv9KnOe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute mt-3 mr-5 right-10 z-10 bg-primary text-secondary font-semibold px-6 py-1 rounded-lg hover:bg-secondary hover:text-primary transition-colors"
                    >
                      Shop Now
                    </a>
                     <button className="storybook-prev-arrow  absolute top-1/2 -translate-y-1/2 left-[5%] z-20 text-primary hover:text-secondary text-4xl rounded-full m-2 ">
             <LeftCircleFilled />
          </button>
          <button className="storybook-next-arrow absolute top-1/2 -translate-y-1/2 right-[5%] z-20 text-primary hover:text-secondary  text-4xl rounded-full">
             <RightCircleFilled />
          </button>
          </div>
          <div
            ref={flowerLocatorRef}
            className="absolute pointer-events-none"
            style={{ bottom: "10%", left: "10%" }}
          />
        </div>
      </div>
    </section>
  );
}
