import React, { useState, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// import leavesImg from "../../img/element4.png";
import circleleavesImg from "../../img/Dicut-Cotton_Flower-15.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Button, Skeleton, ConfigProvider } from "antd";
import "swiper/css";
import "swiper/css/pagination";

const swiperStyles = `
  .custom-pagination {
    position: relative !important;
    bottom: auto !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 0 !important;
    margin: 0 !important;
    list-style: none !important;
    width: 100% !important;
  }
  
  .custom-dot {
    width: 12px !important;
    height: 12px !important;
    margin: 0 6px !important;
    background-color: #8B4513 !important;
    opacity: 0.5 !important;
    border-radius: 50% !important;
    transition: all 0.3s ease !important;
    cursor: pointer !important;
  }
  
  .custom-dot.swiper-pagination-bullet-active {
    background-color: #8B4513 !important;
    opacity: 1 !important;
    transform: scale(1.25) !important;
  }
  
  .custom-dot:hover {
    opacity: 0.8 !important;
  }
  
  .custom-dot.swiper-pagination-bullet-active:hover {
    opacity: 1 !important;
  }
`;

// รับ props: collections, loading, และ onOpenBook
const CatalogSlider = ({
  collections,
  loading = false,
  onOpenBook,
  onClickBook,
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
            style={{ transform: "scaleX(-1)" }}
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
          <Skeleton.Input active size="large" className="w-3/4 h-12 mb-4" />
          <Skeleton.Input active size="default" className="w-5/6 h-8 mb-6" />
          <Skeleton.Button active size="large" className="w-32 h-12 mt-6" />
        </div>
        <div
          ref={flowerLocatorRef}
          className="absolute right-[30%] md:left-[40%] bottom-[40%] pointer-events-none"
        />
      </div>
    </div>
  );

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = swiperStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#8B4513",
          colorPrimaryHover: "#6B3410",
        },
      }}
    >
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
                    <div className="absolute left-[-20%] top-[25%] inset-0 flex justify-start items-center pointer-events-none">
                      <img
                        ref={leavesRef}
                        src={circleleavesImg}
                        alt="Decorative Leaves"
                        className="w-[70%] h-auto object-contain"
                      />
                    </div>
                    <div className="relative">
                      <Swiper
                        modules={[Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        onSlideChange={(swiper) => {
                          if (collections?.length > 0) {
                            setActiveCollection(
                              collections[swiper.activeIndex]
                            );
                          }
                        }}
                        pagination={{
                          clickable: true,
                          el: ".custom-pagination",
                          renderBullet: (index, className) => {
                            return `<span class="${className} custom-dot"></span>`;
                          },
                        }}
                        className="z-30 w-full"
                        allowTouchMove={true}
                        resistance={true}
                        resistanceRatio={0}
                      >
                        {collections?.map((collection) => (
                          <SwiperSlide key={collection?.id}>
                            <div
                              className="!flex items-center justify-center"
                              onClick={() => onClickBook(collection?.id)}
                            >
                              <img
                                src={collection?.coverImage}
                                alt={collection?.name}
                                className="w-full h-auto max-h-[60vh] object-contain"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      {collections?.length > 1 && (
                        <div className="custom-pagination flex justify-center mt-4 space-x-2"></div>
                      )}
                    </div>
                  </div>
                  <div
                    ref={detailRef}
                    className="flex flex-col relative items-center w-full md:text-left order-1 md:order-2"
                  >
                    {activeCollection?.id && (
                      <div className="flex flex-col">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8C5F31] break-words">
                          {activeCollection?.name}
                        </h2>
                        <p className="text-xl lg:text-2xl text-[#C59F78] mt-4 break-words">
                          {activeCollection?.subtitle}
                        </p>

                        <Button
                          onClick={() => onOpenBook(activeCollection?.id)}
                          className="bg-[#8C5F31] text-white text-base font-bold rounded-lg h-10 w-32 self-center my-4 hover:bg-[#A7723C] transition-colors"
                        >
                          {"Open"}
                        </Button>
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
    </ConfigProvider>
  );
};

export default CatalogSlider;
