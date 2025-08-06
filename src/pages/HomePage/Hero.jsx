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
        gsap.to(leavesRef.current, {
          x: -30,
          y: -30,
          duration: 1,
          ease: "sine.inOut",
        });
        gsap.to(flowerRef.current, {
          x: 10,
          y: -20,
          duration: 1,
          ease: "sine.inOut",
        });
      };

      const handleBlur = () => {
        gsap.to(leavesRef.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "sine.inOut",
        });
        gsap.to(flowerRef.current, {
          x: 0,
          y: 0,
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

  return (
    <section className="w-full flex justify-center items-center bg-white">
      <div
        ref={mainRef}
        className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-8 "
      >
        <div ref={containerRef} className="relative w-full max-w-5xl h-[500px]">
          <img
            ref={leavesRef}
            src={leavesImg}
            alt="Decorative Leaves"
            className="absolute left-1/5 top-1/3 -translate-y-1/2 w-2/5 h-full object-contain z-10 rotate-[18deg]"
          />
          <img
            src={smallBookImg}
            alt="Book"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-auto z-20"
          />
          <div
            ref={flowerLocatorRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 z-40"
            style={{ transform: "translate(-50%, -70px)" }}
          />
          <img
            ref={flowerRef}
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 h-full z-10 right-12 rotate-[25deg]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
