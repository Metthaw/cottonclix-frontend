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
    <section className="w-full flex justify-center items-center bg-white">
      <div
        ref={mainRef}
        className="w-full min-h-full md:min-h-screen flex justify-center items-center bg-gray-100 p-4 lg:p-8"
      >
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl h-[35vh] md:h-[45vh] lg:h-[50vh] xl:h-[50vh]"
        >
          <img
            ref={leavesRef}
            src={leavesImg}
            alt="Decorative Leaves"
            className="absolute left-[-5%] md:left-[7%] lg:left-[-2%] top-[35%] md:top-[-5%] lg:top-[30%] xl:top-[15%] 2xl:top-[10%] -translate-y-1/2 w-2/5 md:w-[30%] lg:w-[40%] h-auto object-contain z-10 rotate-[25deg]"
          />
          <img
            src={smallBookImg}
            alt="Book"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[70%] lg:w-4/5 h-auto z-20"
          />
          <div
            ref={flowerLocatorRef}
            className="absolute top-[60%] left-1/2 md:top-[25%] lg:top-[30%] xl:top-[50%] lg:left-1/2 -translate-x-1/2 z-40"
            style={{ transform: "translate(-50%, -70px)" }}
          />
          <img
            ref={flowerRef}
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 lg:w-1/5 h-full z-10 right-[-15%] md:right-[5%] lg:right-[-5%] rotate-[25deg]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
