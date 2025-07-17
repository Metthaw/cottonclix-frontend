import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// รับ props: collections, loading, และ onOpenBook
export default function CatalogSlider({ collections, loading, onOpenBook, flowerLocatorRef }) {
  const [activeCollection, setActiveCollection] = useState(null);

  // เมื่อ collections ที่รับมาเปลี่ยนไป ให้อัปเดต activeCollection
  useEffect(() => {
    if (collections.length > 0) {
      setActiveCollection(collections[0]);
    }
  }, [collections]);

  if (loading) {
    return <section className="w-full bg-white py-20 md:py-24 text-center">Loading...</section>;
  }

  return (
    <section className="w-full bg-white py-20 md:py-24">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="w-full">
            <Swiper
              modules={[Navigation, Pagination, EffectFade]}
              navigation
              pagination={{ clickable: true }}
              effect="fade"
              loop={true}
              onSlideChange={(swiper) => {
                if (collections.length > 0) {
                  setActiveCollection(collections[swiper.realIndex]);
                }
              }}
              className="w-full h-auto"
            >
              {collections.map((collection) => (
                <SwiperSlide key={collection.id}>
                  <img src={collection.coverImage} alt={collection.name} className="w-auto h-[500px] object-contain mx-auto" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="relative text-center md:text-left">
            {activeCollection && (
              <>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-800">{activeCollection.name}</h2>
                <p className="text-lg text-gray-500 mt-4">{activeCollection.subtitle}</p>
                <button
                  onClick={() => onOpenBook(activeCollection.id)}
                  className="text-primary mt-6 inline-block font-semibold hover:underline text-lg"
                >
                  {'<<< Open'}
                </button>
              </>
            )}
            <div
              ref={flowerLocatorRef}
              className="absolute bottom-0 right-0 pointer-events-none"
              style={{ transform: 'translate(-15.5rem, 2rem)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}