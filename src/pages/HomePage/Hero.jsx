// ตำแหน่ง: src/pages/HomePage/Hero.jsx

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import leavesImg from "../../img/element4.png";
import smallBookImg from "../../img/10.png";
import lineArtImg from "../../img/element2.svg";

const Hero = ({ containerRef, flowerLocatorRef }) => {
  const leavesRef = useRef(null);
  const flowerRef = useRef(null);
  const mainRef = useRef(null);

  useGSAP(
    () => {
      const mainEl = mainRef.current;
      if (!mainEl) return;

      const handleFocus = () => {
        gsap.fromTo(
          leavesRef.current,
          {
            x: "1.875rem",
            y: "1.875rem",
            duration: 1,
            ease: "sine.inOut",
          },
          { x: 0, y: 0, duration: 1, ease: "sine.inOut" }
        );
        gsap.fromTo(
          flowerRef.current,
          {
            x: "-0.625rem",
            y: "1.25rem",
            duration: 1,
            ease: "sine.inOut",
          },
          { x: 0, y: 0, duration: 1, ease: "sine.inOut" }
        );
      };

      const handleBlur = () => {
        gsap.fromTo(
          leavesRef.current,
          { x: "1.875rem", y: "1.875rem" },
          {
            x: 0,
            y: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );
        gsap.fromTo(
          flowerRef.current,
          { x: "-0.625rem", y: "1.25rem" },
          {
            x: 0,
            y: 0,
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

  return (
    <section className="w-full min-h-[50vh] sm:min-h-[50vh] md:min-h-screen bg-white">
      <div
        ref={mainRef}
        className="w-full min-h-[50vh] sm:min-h-[50vh] md:min-h-screen flex justify-center items-center p-4 sm:p-6 md:p-8"
      >
        <div
          ref={containerRef}
          className="relative w-[95%] sm:w-[90%] md:w-[85%] max-w-5xl aspect-[3/1]"
        >
          {/* Decorative Leaves */}
          <img
            ref={leavesRef}
            src={leavesImg}
            alt="Decorative Leaves"
            className="absolute left-[0%] top-[-60%] 
              w-[35%] 
              h-auto object-contain z-10 
              rotate-[25deg]"
          />

          {/* Main Book Image */}
          <img
            src={smallBookImg}
            alt="Book"
            className="absolute 
              top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 
              w-[95%] sm:w-[85%] md:w-[80%] 
              h-auto z-20"
          />

          {/* Flower Locator */}
          <div
            ref={flowerLocatorRef}
            className="absolute 
              left-[35%] sm:left-[38%] md:left-[40%]
              top-[-15%] sm:top-[-12%] md:top-[-10%]
              w-0 h-0
              transform
              translate-x-[-50%] translate-y-[-50%]
              pointer-events-none
              z-40"
          />

          {/* Line Art */}
          <img
            ref={flowerRef}
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute 
              top-[15%] sm:top-[18%] md:top-[20%] 
              right-[2%] sm:right-[3%] md:right-[5%] 
              w-[25%] sm:w-[22%] md:w-[20%] 
              h-auto z-10 
              rotate-[35deg] sm:rotate-[40deg] md:rotate-[45deg]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
