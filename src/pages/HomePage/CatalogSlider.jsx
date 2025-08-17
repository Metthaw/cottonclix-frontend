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
import { Carousel } from "antd";

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
  loading,
  onOpenBook,
  flowerLocatorRef,
}) => {
  const [activeCollection, setActiveCollection] = useState(null);

  const leavesRef = useRef(null);
  const carouselRef = useRef(null);
  const detailRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    console.log("Component mounted, mainRef:", mainRef.current);
    console.log("leavesRef:", leavesRef.current);
  }, []);

  useGSAP(
    () => {
      const mainEl = mainRef.current;
      if (!mainEl) return;

      const handleFocus = () => {
        gsap.fromTo(leavesRef.current, {
          x: -80,
          duration: 1,
          ease: "sine.inOut",
        }, {
          x: 0,
          duration: 1,
          ease: "sine.inOut",
        });

        gsap.fromTo(carouselRef.current, {
          x: -80,
          duration: 1,
          ease: "sine.inOut",
        }, {
          x: 0,
          duration: 1,
          ease: "sine.inOut",
        });

        gsap.fromTo(detailRef.current, {
          x: 100,
          duration: 1,
          ease: "sine.inOut",
        }, {
          x: 0,
          duration: 1,
          ease: "sine.inOut",
        });
      };

      const handleBlur = () => {
        gsap.fromTo(leavesRef.current, {
          x: 0,
          // y: -20,
          duration: 1,
          ease: "sine.inOut",
        }, {
          x: -80,
          // y: -20,
          duration: 1,
          ease: "sine.inOut",
        });

        gsap.fromTo(carouselRef.current, {
          x: 0,
          // y: -20,
          duration: 1,
          ease: "sine.inOut",
        }, {
          x: -80,
          // y: -20,
          duration: 1,
          ease: "sine.inOut",
        });

        gsap.fromTo(detailRef.current, {
          x: 0,
          duration: 1,
          ease: "sine.inOut",
        }, {
          x: 100,
          duration: 1,
          ease: "sine.inOut",
        });
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

  // if (loading) {
  //   return (
  //     <section className="w-full bg-white py-20 md:py-24 text-center">
  //       Loading...
  //     </section>
  //   );
  // }

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
      className="w-full h-[90vh] bg-white flex items-center relative z-0 overflow-hidden"
    >
      {!loading && (
        <div className="flex items-center w-full h-full">
          <img
            ref={leavesRef}
            src={leavesImg}
            alt="Decorative Leaves"
            className="absolute left-[-10%] top-[50%] -translate-y-1/2 w-2/5 scale-x-[-1] h-[80vh] object-contain z-0 rotate-[18deg] pointer-events-none"
          />
          <div className="px-14 py-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div ref={carouselRef} className="w-full h-full">
                {/* <Swiper
                  modules={[Navigation, Pagination, EffectFade]}
                  navigation
                  pagination={{ clickable: true }}
                  loop={true}
                  onSlideChange={(swiper) => {
                    if (collections?.length > 0) {
                      setActiveCollection(collections[swiper.realIndex]);
                    }
                  }}
                  className="w-full h-auto z-30"
                >
                  {collections?.map((collection) => (
                    <SwiperSlide key={collection?.id}>
                      <img
                        src={collection?.coverImage}
                        alt={collection?.name}
                        className="w-auto h-auto object-contain mx-auto"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper> */}
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
                  className="w-full h-auto z-30 custom-carousel"
                >
                  {collections?.map((collection) => (
                    <div
                      key={collection?.id}
                      className="flex items-center justify-center"
                    >
                      <img
                        src={collection?.coverImage}
                        alt={collection?.name}
                        className="w-auto max-h-[500px]  object-contain mx-auto"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div ref={detailRef} className="relative text-center md:text-left w-full h-full">
                {activeCollection?.id && (
                  <div className="flex flex-col h-fit">
                    <h2 className="text-9xl md:text-6xl font-serif text-amber-800">
                      {activeCollection?.name}
                    </h2>
                    <p className="text-3xl text-amber-600 mt-4">
                      {activeCollection?.subtitle}
                    </p>
                    <button
                      onClick={() => onOpenBook(activeCollection?.id)}
                      className="text-left mt-6 inline-block text-amber-800  hover:underline text-4xl py-8"
                    >
                      {"<<< Open"}
                    </button>
                  </div>
                )}
                <div
                  ref={flowerLocatorRef}
                  className="absolute bottom-60 right-36 pointer-events-none"
                  style={{ transform: "translate(-15.5rem, 2rem)" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CatalogSlider;
