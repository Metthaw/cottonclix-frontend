import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// 1. Import EffectCoverflow และ Pagination เพิ่ม
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'; // 2. Import CSS ของ Coverflow

import { storyContent } from '../../data/mockData';
import openBookImage from '../../img/13.svg';

const API_URL = 'https://cms.cottonclix.com/wp-json/wp/v2/collection';

export default function CollectionShowcase() {
  const [wpCollections, setWpCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const formattedData = data.map(item => ({
          id: item.slug,
          name: item.title.rendered,
          subtitle: item.acf.subtitle,
          coverImage: item.acf.cover_image,
        }));
        setWpCollections(formattedData);
        if (formattedData.length > 0) {
          setSelectedCollectionId(formattedData[0].id);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  const currentStoryContent = selectedCollectionId ? storyContent.collectionDetails[selectedCollectionId] : null;

  return (
    <>
      {/* ส่วนเลือกหนังสือ (CatalogSlider) */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center text-gray-800 mb-12">Our Collections</h2>
          {/* 3. แก้ไขการตั้งค่า Swiper ให้เป็น Coverflow */}
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="catalog-slider"
            onSlideChange={(swiper) => {
                if (wpCollections.length > 0) {
                    setSelectedCollectionId(wpCollections[swiper.realIndex].id);
                }
            }}
          >
            {wpCollections.map((collection) => (
              <SwiperSlide key={collection.id} style={{ width: '300px', height: '400px' }}>
                <div 
                  className="w-full h-full bg-cover bg-center rounded-lg shadow-lg cursor-pointer flex items-end p-6" 
                  style={{ backgroundImage: `url(${collection.coverImage})` }}
                >
                  <h3 className="text-white text-2xl font-bold font-serif bg-black/50 p-2 rounded">{collection.name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ส่วนแสดงเนื้อหาหนังสือ (StoryBook) */}
      <section className="w-full flex items-center bg-stone-100 py-20">
          {/* ... โค้ดส่วน StoryBook เหมือนเดิม ... */}
          <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div className="text-left z-10 p-4">
                 <h2 className="text-4xl font-serif text-primary mb-6">{storyContent.storyText.heading}</h2>
                 <p className="text-base text-natural" style={{ whiteSpace: 'pre-wrap' }}>{storyContent.storyText.paragraphs[0]}</p>
             </div>
             <div className="relative w-full aspect-[4/3]">
                 <img src={openBookImage} alt="Open Story Book" className="absolute inset-0 w-full h-full object-contain" />
                 <div className="absolute inset-0 px-[10%] py-[12%]">
                     <Swiper modules={[Navigation]} navigation loop={true} className="w-full h-full">
                         {currentStoryContent && currentStoryContent.sliderImagePairs.map(pair => (
                             <SwiperSlide key={pair.id}>
                                 <div className="grid grid-cols-2 gap-4 h-full">
                                     <div className="bg-white"><img src={pair.leftImg} alt="" className="w-full h-full object-cover"/></div>
                                     <div className="bg-white"><img src={pair.rightImg} alt="" className="w-full h-full object-cover"/></div>
                                 </div>
                             </SwiperSlide>
                         ))}
                     </Swiper>
                 </div>
             </div>
         </div>
      </section>
    </>
  );
}