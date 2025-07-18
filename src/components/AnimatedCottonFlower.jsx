// src/components/AnimatedCottonFlower.jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import cottonFlowerImg from '../img/4.png'; // Adjust path as needed

const AnimatedCottonFlower = ({
  className = "",
  imgClassName = "",
  activeSection,
  ...props
}) => {
  const containerRef = useRef(null);
  const flowerRef = useRef(null);
  const root = useRef(null);

  useEffect(() => {
    // Initial falling animation
    if (flowerRef.current) {
      // Reset any transforms that might affect positioning
      gsap.set(flowerRef.current, { 
        y: '-100vh',  // Start from above the viewport
        position: 'relative',
        top: 0,
        left: 0,
        right: 'auto',
        bottom: 'auto',
        margin: 0,
        transform: 'none'
      });

      // Animate to final position
      gsap.to(flowerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        clearProps: 'transform' // Clean up after animation
      });
    }

    if (activeSection) {
      console.log(`AnimatedCottonFlower: Section "${activeSection}" is in focus.`);
    }
  }, [activeSection]);

  return (
    <div ref={root} className={`relative w-[28rem] h-auto ${className}`} {...props}>
      <div ref={containerRef} className="relative h-auto">
        <img
          ref={flowerRef}
          src={cottonFlowerImg}
          alt="Cotton Flower"
          className={`w-full h-auto ${imgClassName}`}
          style={{ opacity: 0, willChange: 'transform' }}
        />
      </div>
    </div>
  );
};

export default AnimatedCottonFlower;
