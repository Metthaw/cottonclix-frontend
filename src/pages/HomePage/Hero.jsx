// ตำแหน่ง: src/pages/HomePage/Hero.jsx

import React from 'react';

// Import รูปภาพที่ใช้ใน Hero Section
import leavesImg from '../../img/element4.png';
import smallBookImg from '../../img/10.png';
import cottonFlowerImg from '../../img/4.png';
import lineArtImg from '../../img/element2.svg';

const Hero = () => {
  return (
    <section className="w-full flex justify-center items-center py-16 md:py-24 bg-white">
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-8 ">
        <div className="relative w-full max-w-5xl h-[500px] ">
          <img 
            src={leavesImg} 
            alt="Decorative Leaves" 
            className="absolute left-1/5 top-1/3 -translate-y-1/2 w-2/5 h-full object-contain z-10 rotate-[18deg] "
          />
          <img 
            src={smallBookImg} 
            alt="Book" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-auto z-20"
          />
          <img 
            src={cottonFlowerImg} 
            alt="Cotton Flower" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] w-1/3 h-auto z-30"
          />
          <img 
            src={lineArtImg} 
            alt="Cotton Flower" 
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 h-auto z-10 right-1 rotate-[25deg]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;