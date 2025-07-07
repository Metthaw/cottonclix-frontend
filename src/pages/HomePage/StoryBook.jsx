// src/pages/HomePage/StoryBook.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { storyContent } from '../../data/mockData';
import openBookImage from '../../img/13.svg';

export default function StoryBook({ selectedCollectionId }) {
  const collectionId = selectedCollectionId || 'spring';
  const currentContent = storyContent.collectionDetails[collectionId];
  const storyText = storyContent.storyText;

  if (!currentContent) {
    return <div>Content not found.</div>;
  }

  return (
    <section className="w-full bg-stone-50 py-20 md:py-24">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-[30%_70%] gap-8 items-center">
        
        <div className="text-left">
          <h2 className="text-4xl font-serif text-[#BC9F31] mb-6">{storyText.heading}</h2>
          <div className="space-y-4 text-base text-[#8D8D8D]">
            {storyText.paragraphs.map((p, i) => <p key={i} style={{ whiteSpace: 'pre-wrap' }}>{p}</p>)}
          </div>
        </div>

        <div className="relative w-full aspect-[4/3]">
          <img src={openBookImage} alt="Open Story Book" className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 px-[10%] py-[12%]">
            <Swiper modules={[Navigation]} navigation loop={true} className="w-full h-full">
              
              {/* === จุดที่แก้ไข: วนลูป sliderImagePairs และสร้าง Grid 2 คอลัมน์ === */}
              {currentContent.sliderImagePairs.map(pair => (
                <SwiperSlide key={pair.id}>
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="bg-white"><img src={pair.leftImg} alt="" className="w-full h-full object-cover"/></div>
                    <div className="bg-white"><img src={pair.rightImg} alt="" className="w-full h-full object-cover"/></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <a href={currentContent.shopNowUrl} className="absolute bottom-[10%] right-[8%] bg-[#BC9F31] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90">
            Shop now
          </a>
        </div>
      </div>
    </section>
  );
}