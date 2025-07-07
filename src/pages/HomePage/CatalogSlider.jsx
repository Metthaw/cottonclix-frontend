// src/pages/HomePage/CatalogSlider.jsx
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { collections } from '../../data/mockData';

export default function CatalogSlider({ onSelectCollection }) {
  const [activeCollection, setActiveCollection] = useState(collections[0]);

  return (
    <section className="w-full bg-white py-20 md:py-24">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              onSlideChange={(swiper) => {
                setActiveCollection(collections[swiper.realIndex]);
              }}
              className="w-full h-auto"
            >
              {collections.map((collection) => (
                <SwiperSlide key={collection.id} onClick={() => onSelectCollection(collection.id)} className="cursor-pointer">
                  <img src={collection.coverImage} alt={collection.name} className="w-auto h-[500px] object-contain mx-auto" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif text-[#BC9F31]">
              {activeCollection.name}
            </h2>
            <p className="text-lg text-[#8D8D8D] mt-4">
              {activeCollection.subtitle}
            </p>
            <button
              onClick={() => onSelectCollection(activeCollection.id)}
              className="text-amber-700 mt-6 inline-block font-semibold hover:underline"
            >
              {'<<< Open'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}