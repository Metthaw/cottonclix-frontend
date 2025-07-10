// src/pages/HomePage/StoryBook.jsx
import React, { useLayoutEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/navigation';

import { storyContent } from '../../data/mockData';
import openBookImage from '../../img/13.svg';
import branchImage from '../../img/16.svg';

gsap.registerPlugin(ScrollTrigger);

export default function StoryBook({ selectedCollectionId }) {
  const component = useRef(null);
  const bookColumnRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          start: "center center",
          end: "+=2000",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(bookColumnRef.current,
        { xPercent: 100, opacity: 0.5 },
        { xPercent: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );

    }, component);
    return () => ctx.revert();
  }, []);

  const collectionId = selectedCollectionId || 'spring';
  const currentContent = storyContent.collectionDetails[collectionId];
  const storyText = storyContent.storyText;

  if (!currentContent) { return <div>Content not found.</div>; }

  return (
    <section ref={component} className="w-full min-h-screen flex items-center bg-stone-100 py-10 relative overflow-hidden">
      <img 
        src={branchImage} 
        alt="Decorative Branch"
        className="absolute -top-16 -right-16 w-80 h-auto z-20 pointer-events-none"
      />
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-[30%_70%] gap-8 items-center">
        <div className="text-left z-10">
          <h2 className="text-4xl font-serif text-[#BC9F31] mb-6">{storyText.heading}</h2>
          <div className="space-y-4 text-base text-[#8D8D8D]">
            {storyContent.storyText.paragraphs.map((p, i) => <p key={i} style={{ whiteSpace: 'pre-wrap' }}>{p}</p>)}
          </div>
        </div>
        <div ref={bookColumnRef} className="relative w-full aspect-[4/3]">
          <img src={openBookImage} alt="Open Story Book" className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 px-[10%] py-[12%]">
            <Swiper modules={[Navigation]} navigation loop={true} className="w-full h-full">
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
          <a href={currentContent.shopNowUrl} className="absolute bottom-[10%] right-[8%] bg-[#BC9F31] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 z-10">
            Shop now
          </a>
        </div>
      </div>
    </section>
  );
}