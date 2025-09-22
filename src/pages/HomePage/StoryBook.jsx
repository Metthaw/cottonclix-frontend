import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import openBookImage from "../../img/13.svg";
import leaves2Img from "../../img/16.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button, ConfigProvider, Skeleton } from "antd";
import { Button, ConfigProvider, Skeleton } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Helper components remain unchanged
const PageCover = React.forwardRef((props, ref) => {
  return (
    <div
      className="flex items-center justify-center bg-gradient-to-br from-[#6d4c41] to-[#4e342e] text-stone-100 shadow-md border border-black/20"
      ref={ref}
      data-density="hard"
    >
      <div className="text-center p-4">
        <h2 className="text-4xl font-serif tracking-wider">{props.children}</h2>
      </div>
    </div>
  );
});
PageCover.displayName = "PageCover";

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="p-4 shadow-inner" ref={ref}>
      {props.children}
    </div>
  );
});
Page.displayName = "Page";

export default function StoryBook({
  collectionData,
  flowerLocatorRef,
  loading = false,
}) {
  const mainRef = useRef(null);
  const bookRef = useRef(null);
  const leavesRef = useRef(null);
  const detailRef = useRef(null);
  const flipBookRef = useRef(null);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useGSAP(
    () => {
      const mainEl = mainRef.current;
      if (!mainEl) return;

      const handleFocus = () => {
        if (leavesRef.current) {
          gsap.fromTo(
            leavesRef.current,
            { x: 80, duration: 1, ease: "sine.inOut" },
            { x: 0, duration: 1, ease: "sine.inOut" }
          );
        }

        if (bookRef.current) {
          gsap.fromTo(
            bookRef.current,
            { x: 200, duration: 1, ease: "sine.inOut" },
            { x: 0, duration: 1, ease: "sine.inOut" }
          );
        }

        if (detailRef.current) {
          gsap.fromTo(
            detailRef.current,
            { y: 200, opacity: 0, duration: 1, ease: "sine.inOut" },
            { x: 0, y: 0, opacity: 1, duration: 1, ease: "sine.inOut" }
          );
        }
      };

      const handleBlur = () => {
        if (leavesRef.current) {
          gsap.fromTo(
            leavesRef.current,
            { x: 0, duration: 1, ease: "sine.inOut" },
            { x: 80, duration: 1, ease: "sine.inOut" }
          );
        }

        if (bookRef.current) {
          gsap.fromTo(
            bookRef.current,
            { x: 0, duration: 1, ease: "sine.inOut" },
            { x: 200, duration: 1, ease: "sine.inOut" }
          );
        }

        if (detailRef.current) {
          gsap.fromTo(
            detailRef.current,
            { x: 0, y: 0, opacity: 1, duration: 1, ease: "sine.inOut" },
            { y: 200, opacity: 0, duration: 1, ease: "sine.inOut" }
          );
        }
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleFocus();
          } else {
            handleBlur();
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(mainEl);
      return () => observer.disconnect();
    },
    { scope: mainRef }
  );

  useEffect(() => {
    // Hide skeleton after initial render to allow animations to work
    if (loading === false) {
      setShowSkeleton(false);
    }
  }, [loading]);

  const handlePrevPage = () => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  };

  const handleNextPage = () => {
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  if (!collectionData) {
    return (
      <section
        ref={mainRef}
        className="w-full min-h-fit relative flex items-center py-20 overflow-hidden mt-12"
      >
        <div className="absolute right-[-10%] top-[30%] -translate-y-1/2 w-2/5 h-auto z-0 rotate-[18deg] pointer-events-none">
          <Skeleton.Image
            active
            className="w-full h-full"
            style={{ height: "100%" }}
          />
        </div>

        <Skeleton.Button
          active
          className="absolute bottom-[5%] right-[5%] md:bottom-[10%] md:right-[10%] z-10 w-32 h-10 rounded-full"
        />

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text side skeleton */}
          <div className="text-left p-4 ml">
            <Skeleton.Input active size="large" className="w-3/4 h-12 mb-6" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  active
                  paragraph={{ rows: 2, width: ["100%", "90%"] }}
                  className="w-full"
                />
              ))}
            </div>
          </div>

          {/* Flip book side skeleton */}
          <div className="relative w-full aspect-[4/3]">
            <Skeleton.Image active className="w-full h-full" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={mainRef}
      className="w-full min-h-fit relative flex items-center py-20 overflow-hidden mt-12"
    >
      {showSkeleton ? (
        <div className="absolute right-[-10%] top-[30%] -translate-y-1/2 w-2/5 h-auto z-0 rotate-[18deg] pointer-events-none">
          <Skeleton.Image
            active
            className="w-full h-full"
            style={{ height: "100%" }}
          />
        </div>
      ) : (
        <img
          ref={leavesRef}
          src={leaves2Img}
          alt="Decorative Leaves"
          className="absolute right-[-10%] top-[35%] -translate-y-1/2 w-2/5 h-auto object-contain z-0 rotate-[18deg] pointer-events-none"
        />
      )}

      <a
        href="https://lin.ee/iv9KnOe"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-[5%]  md:bottom-[10%] md:right-[10%] z-10 bg-[#8C5F31] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#A7723C] transition-colors"
      >
        Shop Now
      </a>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text side */}
        <div ref={detailRef} className="text-left p-4 ml">
          {showSkeleton ? (
            <>
              <Skeleton.Input active size="large" className="w-3/4 h-12 mb-6" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton
                    key={i}
                    active
                    paragraph={{ rows: 2, width: ["100%", "90%"] }}
                    className="w-full"
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-sans text-primary mb-6">
                {collectionData?.storyHeading}
              </h2>
              <div className="space-y-4 text-base text-natural max-h-[60vh] overflow-y-auto">
                <p style={{ whiteSpace: "pre-wrap" }}>
                  {collectionData?.storyParagraphs}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Flip book side */}
        <div className="relative w-full aspect-[4/3]">
          <div ref={bookRef} className="relative w-full h-full">
            {showSkeleton ? (
              <Skeleton.Image active className="w-full h-full" />
            ) : (
              <>
                <img
                  src={openBookImage}
                  alt="Open Story Book"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-[49%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92%] h-[86%]">
                  {/* Navigation Buttons */}
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<LeftOutlined />}
                    onClick={handlePrevPage}
                    className="absolute left-[-3%] top-1/2 -translate-y-1/2 z-50 bg-[#8C5F31] hover:!bg-[#A7723C]"
                  />
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<RightOutlined />}
                    onClick={handleNextPage}
                    className="absolute right-[-3%] top-1/2 -translate-y-1/2 z-50 bg-[#8C5F31] hover:!bg-[#A7723C]"
                  />

                  <HTMLFlipBook
                    ref={flipBookRef}
                    key={collectionData?.id}
                    width={600}
                    height={850}
                    size="stretch"
                    drawShadow={true}
                    mobileScrollSupport={false}
                    className="w-full h-full"
                  >
                    {collectionData.sliderImagePairs?.flatMap((pair) => [
                      <Page key={`${pair.id}-left`}>
                        <img
                          src={pair.leftImg}
                          alt="Story page - left"
                          className="w-full h-full object-cover"
                        />
                      </Page>,
                      <Page key={`${pair.id}-right`}>
                        <img
                          src={pair.rightImg}
                          alt="Story page - right"
                          className="w-full h-full object-cover"
                        />
                       
                      </Page>,
                    ])}
                  </HTMLFlipBook>
                  {collectionData?.sliderImagePairs?.length > 0 && (
                    <HTMLFlipBook
                      ref={flipBookRef}
                      key={collectionData?.id}
                      width={600}
                      height={850}
                      size="stretch"
                      drawShadow={true}
                      mobileScrollSupport={false}
                      className="w-full h-full"
                    >
                      {collectionData.sliderImagePairs?.flatMap((pair) => [
                        <Page key={`${pair.id}-left`}>
                          <img
                            src={pair.leftImg}
                            alt="Story page - left"
                            className="w-full h-full object-cover"
                          />
                        </Page>,
                        <Page key={`${pair.id}-right`}>
                          <img
                            src={pair.rightImg}
                            alt="Story page - right"
                            className="w-full h-full object-cover"
                          />
                        </Page>,
                      ])}
                    </HTMLFlipBook>
                  )}
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          // Default
                          colorPrimary: "#ffffff", // brown background
                          colorTextLightSolid: "#8b7422", // text/icon in default
                          colorBorder: "#ffffff", // white outline
                          lineWidth: 2,

                          // Hover
                          colorPrimaryHover: "#8b7422", // bg turns white
                          colorText: "#8b7422", // text turns brown
                          colorBorderHover: "#8b7422", // outline brown

                          // Active (click)
                          colorPrimaryActive: "#ffffff", // bg stays white
                          colorTextActive: "#8b7422", // text stays brown
                          colorBorderActive: "#8b7422", // outline brown
                        },
                      },
                    }}
                  >
                    <Button
                      type="default"
                      shape="circle"
                      icon={<LeftOutlined />}
                      onClick={handlePrevPage}
                      className="absolute left-[-3%] top-1/2 -translate-y-1/2 z-50"
                    />
                    <Button
                      type="default"
                      shape="circle"
                      icon={<RightOutlined />}
                      onClick={handleNextPage}
                      className="absolute right-[-3%] top-1/2 -translate-y-1/2 z-50"
                    />
                  </ConfigProvider>
                </div>
              </>
            )}
          </div>
          <div
            ref={flowerLocatorRef}
            className="absolute bottom-[140%] left-[60%] md:bottom-[20%] md:left-[-25%] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
