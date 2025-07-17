import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import { storyContent } from '../../data/mockData';
import openBookImage from '../../img/13.svg';

export default function StoryBook({ selectedCollectionId, flowerLocatorRef }) {
  // ใช้ ID ที่ได้รับมา หรือใช้ 'spring-collection' เป็นค่าเริ่มต้นถ้าไม่มี
  const collectionId = selectedCollectionId || 'spring-collection';
  const currentContent = storyContent.collectionDetails[collectionId];
  const storyText = storyContent.storyText;

  // ป้องกัน Error หากหา collection ไม่เจอ
  if (!currentContent) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-stone-100">
        <p>Loading collection content...</p>
      </div>
    );
  }

  return (
    <section className="w-full flex items-center bg-stone-100 py-20">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* ส่วนเนื้อเรื่อง */}
        <div className="text-left p-4">
          <h2 className="text-4xl font-serif text-primary mb-6">{storyText.heading}</h2>
          <div className="space-y-4 text-base text-natural max-h-[60vh] overflow-y-auto pr-4">
            {storyText.paragraphs.map((p, i) => (
              <p key={i} style={{ whiteSpace: 'pre-wrap' }}>{p}</p>
            ))}
          </div>
        </div>
        {/* ส่วนหนังสือ */}
        <div className="relative w-full aspect-[4/3]">
          <img src={openBookImage} alt="Open Story Book" className="absolute inset-0 w-full h-full object-contain" />
          <div className="absolute inset-0 px-[10%] py-[12%]">
            <Swiper modules={[Navigation, EffectFade]} navigation effect={'fade'} className="w-full h-full">
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
          <div
            ref={flowerLocatorRef}
            className="absolute pointer-events-none"
            style={{ bottom: '10%', left: '10%' }}
          />
        </div>
      </div>
    </section>
  );
}