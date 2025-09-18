import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import leavesImg from "../../img/element4.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Carousel, Skeleton } from "antd";

const carouselStyles = `
 .custom-carousel .slick-dots {
    bottom: -30px;
    height: 12px;
    line-height: 12px;
  }
  .custom-carousel .slick-dots li {
    width: 8px;
    height: 8px;
    margin: 0 4px;
  }
  .custom-carousel .slick-dots li button {
    width: 8px;
    height: 8px;
    padding: 0;
    border-radius: 50%;
    background: #8B4513 !important;
    opacity: 0.5;
    transition: all 0.3s ease;
    border: none;
  }
  .custom-carousel .slick-dots li.slick-active {
    width: 8px;
  }
  .custom-carousel .slick-dots li.slick-active button {
    width: 8px;
    height: 8px;
    background: #8B4513 !important;
    opacity: 1;
    transform: none;
  }
  .custom-carousel .slick-dots li button:before {
    display: none;
  }
  .custom-carousel .slick-dots li button:focus {
    outline: none;
    box-shadow: none;
  }
  .custom-carousel *:focus {
    outline: none !important;
  }
  .custom-carousel .slick-slide {
    outline: none !important;
  }
  /* Ensure dots are perfectly circular */
  .custom-carousel .slick-dots li,
  .custom-carousel .slick-dots li button {
    border-radius: 50% !important;
    overflow: hidden;
  }
`;

// รับ props: collections, loading, และ onOpenBook
const CatalogSlider = ({
  collections,
  loading = false,
  onOpenBook,
  flowerLocatorRef,
}) => {
  const [activeCollection, setActiveCollection] = useState(null);

  const leavesRef = useRef(null);
  const carouselRef = useRef(null);
  const detailRef = useRef(null);
  const mainRef = useRef(null);

  useGSAP(
    () => {
      const mainEl = mainRef.current;
      if (!mainEl) return;

      const handleFocus = () => {
        gsap.fromTo(
          leavesRef.current,
          {
            x: -80,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          carouselRef.current,
          {
            x: -80,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          detailRef.current,
          {
            x: 100,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      };

      const handleBlur = () => {
        gsap.fromTo(
          leavesRef.current,
          {
            x: 0,
            // y: -20,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: -80,
            // y: -20,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          carouselRef.current,
          {
            x: 0,
            // y: -20,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: -80,
            // y: -20,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          detailRef.current,
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 100,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleFocus();
          } else {
            handleBlur();
          }
        },
        { threshold: 0.2 } // fire when 20% of element is visible
      );

      observer.observe(mainEl);

      return () => observer.disconnect();
    },
    { scope: mainRef }
  ); // ✅ no dependencies

  // เมื่อ collections ที่รับมาเปลี่ยนไป ให้อัปเดต activeCollection
  useEffect(() => {
    if (collections.length > 0) {
      setActiveCollection(collections[0]);
    }
  }, [collections]);

  // Skeleton content
  const SkeletonContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
      {/* Left side - Image Skeleton */}
      <div className="w-full h-auto order-2 md:order-1 max-w-full mx-auto">
        <div className="absolute left-[-30%] inset-0 flex justify-start items-center pointer-events-none">
          <Skeleton.Image 
            active 
            className="w-[60%] max-w-full h-auto object-contain rotate-[18deg]"
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>
        <div className="z-30 w-full">
          <Skeleton.Image 
            active 
            className="w-full h-[60vh] max-h-[60vh] object-contain"
          />
        </div>
      </div>
      
      {/* Right side - Text Skeleton */}
      <div className="flex flex-col relative items-center w-full md:text-left order-1 md:order-2">
        <div className="flex flex-col w-full">
          <Skeleton.Input 
            active 
            size="large" 
            className="w-3/4 h-12 mb-4"
          />
          <Skeleton.Input 
            active 
            size="default" 
            className="w-5/6 h-8 mb-6"
          />
          <Skeleton.Button 
            active 
            size="large" 
            className="w-32 h-12 mt-6"
          />
        </div>
        <div 
          ref={flowerLocatorRef}
          className="absolute right-[30%] md:left-[40%] bottom-[40%] pointer-events-none"
        />
      </div>
    </div>
  );

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = carouselStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <section
      ref={mainRef}
      className="w-full max-w-full min-h-fit bg-white flex md:items-center z-0 overflow-hidden"
    >
      <div className="w-full max-w-full mx-auto px-4 py-12 md:py-0">
        <div className="flex relative md:items-center w-full md:aspect-[3/1]">
          <div className="w-full px-4 md:px-14 py-8 md:py-12">
            {loading ? (
              <SkeletonContent />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div
                  ref={carouselRef}
                  className="w-full h-auto order-2 md:order-1 max-w-full mx-auto"
                >
                  <div className="absolute left-[-30%] inset-0 flex justify-start items-center pointer-events-none">
                    <img
                      ref={leavesRef}
                      src={leavesImg}
                      alt="Decorative Leaves"
                      className="w-[50%] max-w-full scale-x-[-1] h-auto object-contain rotate-[18deg]"
                    />
                  </div>
                  <Carousel
                    autoplay={false}
                    draggable
                    slidesToShow={1}
                    slidesToScroll={1}
                    infinite={false}
                    afterChange={(current) => {
                      if (collections?.length > 0) {
                        setActiveCollection(collections[current]);
                      }
                    }}
                    className="z-30 custom-carousel w-full"
                  >
                    {collections?.map((collection) => (
                      <div
                        key={collection?.id}
                        className="!flex items-center justify-center"
                      >
                        <img
                          src={collection?.coverImage}
                          alt={collection?.name}
                          className="w-full h-auto max-h-[60vh] object-contain"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div
                  ref={detailRef}
                  className="flex flex-col relative items-center w-full md:text-left order-1 md:order-2"
                >
                  {activeCollection?.id && (
                    <div className="flex flex-col">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-amber-800 break-words">
                        {activeCollection?.name}
                      </h2>
                      <p className="text-xl lg:text-2xl text-amber-600 mt-4 break-words">
                        {activeCollection?.subtitle}
                      </p>
                      <button
                        onClick={() => onOpenBook(activeCollection?.id)}
                        className="mt-6 inline-block text-amber-800 hover:underline text-2xl lg:text-3xl py-4 md:py-6 w-fit mx-auto md:mx-0"
                      >
                        {"<<< Open"}
                      </button>
                    </div>
                  )}
                  <div
                    ref={flowerLocatorRef}
                    className="absolute right-[30%] md:left-[40%] bottom-[40%] pointer-events-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSlider;
