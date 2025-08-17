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
    <section className="w-full min-h-[50vh] h-[50vh] md:min-h-screen md:h-screen flex justify-center items-center bg-white">
      <div
        ref={mainRef}
        className="w-full min-h-full flex justify-center items-center bg-gray-100 p-4 lg:p-8"
      >
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl aspect-[3/1]" // or whatever your image aspect ratio is
        >
          <img
            ref={leavesRef}
            src={leavesImg}
            alt="Decorative Leaves"
            className="absolute left-[0%] top-[-60%] w-[35%] h-auto object-contain z-10 rotate-[25deg]"
          />

          <img
            src={smallBookImg}
            alt="Book"
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] h-auto z-20"
          />
          <div
            ref={flowerLocatorRef}
            className="absolute left-[40%] top-[-10%] z-40"
          />
          <img
            ref={flowerRef}
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute top-[20%] right-[5%] w-[20%] h-auto z-10 rotate-[45deg]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
