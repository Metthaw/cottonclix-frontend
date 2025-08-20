import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import openBookImage from "../../img/13.svg";
import leaves2Img from "../../img/16.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
    <div className="bg-stone-50 p-4 shadow-inner" ref={ref}>
      {props.children}
    </div>
  );
});
Page.displayName = "Page";

export default function StoryBook({ collectionData, flowerLocatorRef }) {
  const mainRef = useRef(null);
  const bookRef = useRef(null);
  const leavesRef = useRef(null);
  const detailRef = useRef(null);

  // GSAP Animation Hook (Unchanged)
  useGSAP(
    () => {
      const mainEl = mainRef.current;
      if (!mainEl) return;
      const handleFocus = () => {
        gsap.fromTo( leavesRef.current, { x: 80, duration: 1, ease: "sine.inOut" }, { x: 0, duration: 1, ease: "sine.inOut" } );
        gsap.fromTo( bookRef.current, { x: 200, duration: 1, ease: "sine.inOut" }, { x: 0, duration: 1, ease: "sine.inOut" } );
        gsap.fromTo( detailRef.current, { y: 200, opacity: 0, duration: 1, ease: "sine.inOut" }, { x: 0, y:0, opacity: 1, duration: 1, ease: "sine.inOut" } );
      };
      const handleBlur = () => {
        gsap.fromTo( leavesRef.current, { x: 0, duration: 1, ease: "sine.inOut" }, { x: 80, duration: 1, ease: "sine.inOut" } );
        gsap.fromTo( bookRef.current, { x: 0, duration: 1, ease: "sine.inOut" }, { x: 200, duration: 1, ease: "sine.inOut" } );
        gsap.fromTo( detailRef.current, { x: 0, y: 0, opacity: 1, duration: 1, ease: "sine.inOut" }, { y: 200, opacity: 0, duration: 1, ease: "sine.inOut" } );
      };
      const observer = new IntersectionObserver( ([entry]) => { if (entry.isIntersecting) handleFocus(); else handleBlur(); }, { threshold: 0.3 } );
      observer.observe(mainEl);
      return () => observer.disconnect();
    },
    { scope: mainRef }
  );

  if (!collectionData) {
    return (
      <section ref={mainRef} className="w-full min-h-screen flex items-center justify-center bg-stone-100">
        <p>Select a collection to read the story.</p>
      </section>
    );
  }

  return (
    <section
      ref={mainRef}
      className="w-full min-h-[50vh] md:min-h-screen relative flex items-center bg-gradient-to-b from-stone-100 to-stone-200 py-20 overflow-hidden"
    >
      <img
        ref={leavesRef}
        src={leaves2Img}
        alt="Decorative Leaves"
        className="absolute right-[-10%] top-[30%] -translate-y-1/2 w-2/5 h-auto object-contain z-0 rotate-[18deg] pointer-events-none"
      />
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text side */}
        <div ref={detailRef} className="text-left p-4">
          {/* ✅ แสดง Heading จาก WordPress */}
          <h2 className="text-4xl font-serif text-primary mb-6">
            {collectionData.storyHeading}
          </h2>
          <div className="space-y-4 text-base text-natural max-h-[60vh] pr-4">
            {/* ✅ แสดง Paragraphs จาก WordPress */}
            <p style={{ whiteSpace: "pre-wrap" }}>
              {collectionData.storyParagraphs}
            </p>
          </div>
        </div>

        {/* Flip book side */}
        <div className="relative w-full aspect-[4/3]">
          {collectionData?.sliderImagePairs?.length > 0 && (
            <div className="relative w-full h-full" ref={bookRef}>
              <img
                src={openBookImage}
                alt="Open Story Book"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute top-[49%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92%] h-[86%]">
                  <HTMLFlipBook
                    key={collectionData.id}
                    width={600}
                    height={850}
                    size="stretch"
                    drawShadow={true}
                    mobileScrollSupport={false}
                    className="w-full h-full"
                  >
                    {collectionData.sliderImagePairs.flatMap((pair) => [
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
                        <a
                          href="https://lin.ee/iv9KnOe"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-5 right-5 z-10 bg-stone-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-stone-700 transition-colors"
                        >
                          Shop Now
                        </a>
                      </Page>,
                    ])}
                  </HTMLFlipBook>
                </div>
              </div>
            </div>
          )}
          <div
            ref={flowerLocatorRef}
            className="absolute bottom-[20%] left-[-30%] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}