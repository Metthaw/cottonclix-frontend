import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const API_URL = 'https://cottonclix.com/wp-json/wp/v2/collection';

export default function CatalogSlider({ onOpenBook }) {
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setCollections(formattedData);
        if (formattedData.length > 0) {
          setActiveCollection(formattedData[0]);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (loading) {
    return <section className="w-full bg-white py-20 md:py-24 text-center">Loading...</section>;
  }

  return (
    <section className="w-full bg-white py-20 md:py-24">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* ----- คอลัมน์ซ้าย: สไลด์รูปภาพ ----- */}
          <div className="w-full">
            <Swiper
              modules={[Navigation, Pagination, EffectFade]}
              navigation
              pagination={{ clickable: true }}
              effect="fade"
              spaceBetween={30}
              slidesPerView={1}
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

          {/* ----- คอลัมน์ขวา: ข้อความ ----- */}
          <div className="text-center md:text-left">
            {activeCollection && (
              <>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-800">
                  {activeCollection.name}
                </h2>
                <p className="text-lg text-gray-500 mt-4">
                  {activeCollection.subtitle}
                </p>
                <button
                  onClick={() => onOpenBook(activeCollection.id)}
                  className="text-primary mt-6 inline-block font-semibold hover:underline text-lg"
                >
                  {'<<< Open'}
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}