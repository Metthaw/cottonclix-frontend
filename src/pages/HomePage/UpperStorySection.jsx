import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Import images
import logo from "../../img/Logo.png";
import element1 from "../../img/element1.png";

const UpperStorySection = () => {
  const headerRef = useRef(null);
  const subHeaderRef = useRef(null);
  const branchRef = useRef(null);
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const upperFlowerLocatorRef = useRef(null);

  // Data for the component
  const data = {
    heading: "Our Story",
    leftParagraph:
      "In a world that moves faster every day, small gifts made with care have become more meaningful than we often realize. And that... is the inspiration behind Cottonclix.",
    rightParagraph:
      "Cottonclix was born from a love for fabric, a passion for nature-inspired patterns, and the belief that 'a good gift doesn't have to be big, it just has to be meaningful.'",
    logo,
    element1,
  };

  // Text styling function
  const renderStyledText = (text, wordsToStyle, className) => {
    const wordsArray = Array.isArray(wordsToStyle)
      ? wordsToStyle
      : [wordsToStyle];
    if (!wordsArray.length || !text) return text;

    const regex = new RegExp(`(${wordsArray.join("|")})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          wordsArray.find(
            (word) => word.toLowerCase() === part.toLowerCase()
          ) ? (
            <span key={index} className={className}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // Animation logic
  useGSAP(
    () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      const handleFocus = () => {
        gsap.fromTo(
          headerRef.current,
          { x: -300, y: 300, opacity: 0, duration: 1, ease: "sine.inOut" },
          { x: 0, y: 0, opacity: 1, duration: 1, ease: "sine.inOut" }
        );

        gsap.fromTo(
          subHeaderRef.current,
          { x: 40, opacity: 0, duration: 1, ease: "sine.inOut" },
          { x: 0, opacity: 1, duration: 1, ease: "sine.inOut" }
        );

        gsap.fromTo(
          branchRef.current,
          { y: 20, opacity: 0, duration: 1, ease: "sine.inOut" },
          { y: 0, opacity: 1, duration: 1, ease: "sine.inOut" }
        );
        gsap.fromTo(
          lineRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      };

      const handleBlur = () => {
        gsap.to(headerRef.current, {
          x: -300,
          y: 300,
          opacity: 0,
          duration: 1,
          ease: "sine.inOut",
        });
        gsap.to(subHeaderRef.current, {
          x: 40,
          opacity: 0,
          duration: 1,
          ease: "sine.inOut",
        });
        gsap.to(branchRef.current, {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "sine.inOut",
        });
        gsap.to(lineRef.current, {
          y: 20,
          opacity: 0,
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
        { threshold: 0.3 }
      );

      observer.observe(containerEl);
      return () => observer.disconnect();
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div
          ref={containerRef}
          className="relative min-h-[50vh] flex flex-col md:grid md:grid-cols-4 gap-32 md:gap-8"
        >
          {/* Logo & Heading - Mobile: Top, Desktop: Right */}
          <div className="flex flex-col items-center md:my-[20%] md:justify-between md:items-end md:col-span-2 order-1 md:order-2">
            <div className="flex flex-col items-center md:items-end gap-4 md:gap-2">
              <div className="flex items-center justify-center md:justify-end">
                <img
                  ref={headerRef}
                  src={data.logo}
                  alt="Cottonclix Logo"
                  className="h-16 sm:h-20 md:h-14 lg:h-28 w-auto"
                />
              </div>
              <h2
                ref={subHeaderRef}
                className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-bold text-center md:text-right"
              >
                {data.heading}
              </h2>
            </div>
            <p className="text-base sm:text-lg md:text-lg lg:text-xl text-center md:text-right mt-6 md:mt-6 leading-relaxed max-w-2xl md:max-w-none">
              {renderStyledText(
                data.rightParagraph,
                "Cottonclix",
                "text-[#8C5F31] font-bold"
              )}
            </p>
            <div
              ref={upperFlowerLocatorRef}
              className="md:absolute left-[30%] top-[35%] md:left-[55%] md:top-[30%] pointer-events-none"
            />
          </div>

          {/* Left Paragraph */}
          <div className="grid row-span-1 md:col-span-2 order-2 md:order-1 items-start md:my-[50%]">
            <p className="text-base sm:text-lg md:text-lg lg:text-xl text-center md:text-left leading-relaxed max-w-2xl md:max-w-none">
              {renderStyledText(
                data.leftParagraph,
                "Cottonclix",
                "text-[#8C5F31] font-bold"
              )}
            </p>
            {/* Decorative Branch */}
            <img
              ref={branchRef}
              src={data.element1}
              alt="Branch Decoration"
              className="md:absolute bottom-0 left-[5%] md:left-[-5%] w-[100%] md:w-[35%] lg:w-[45%] h-auto z-10 pointer-events-none drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
      <hr ref={lineRef} className="border-stone-200" />
    </section>
  );
};

export default UpperStorySection;
