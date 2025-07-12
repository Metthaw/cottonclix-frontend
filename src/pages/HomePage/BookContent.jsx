// src/pages/HomePage/BookContent.jsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import { storyContent } from '../../data/mockData';

export default function BookContent({ selectedCollectionId }) {
  const collectionId = selectedCollectionId || 'spring';
  const currentContent = storyContent.collectionDetails[collectionId];

  if (!currentContent) {
    return <div>Collection content not found.</div>;
  }

  return (
    <Swiper 
      modules={[Navigation, EffectFade]} 
      navigation 
      loop={true} 
      effect={'fade'}
      className="w-full h-full"
    >
      {currentContent.sliderImagePairs.map(pair => (
        <SwiperSlide key={pair.id}>
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="bg-white"><img src={pair.leftImg} alt="" className="w-full h-full object-cover"/></div>
            <div className="bg-white"><img src={pair.rightImg} alt="" className="w-full h-full object-cover"/></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}