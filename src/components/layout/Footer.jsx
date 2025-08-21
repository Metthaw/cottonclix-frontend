// src/components/layout/Footer.jsx

import React from "react";
import lineArtImg from "../../img/element2.svg";
import paperPlane from "../../img/paperPlane.svg";


const footerData = {
  subscribePlaceholder: "Your E-mail",
  copyrightText: " 2025  Cottonclix All Rights Reserved.",
};

export default function Footer() {
  return (
    <footer id="subscribe-form" className="w-full bg-white pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Subscribe Section */}
        <div className="w-full relative max-w-5xl mx-auto bg-[#dad0c6] py-6 sm:py-8 md:py-12 px-4 sm:px-24 md:px-48 rounded-lg sm:rounded-xl flex items-center justify-between mb-8 sm:mb-12 md:mb-16">
          {/* Decorative Elements - Mobile First Approach */}
          <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute scale-y-[-1] scale-x-[-1] 
              top-[40%] 
              left-4 sm:left-16 md:left-32 
              -translate-x-1/2 -translate-y-1/2 
              w-[15%] sm:w-[18%] md:w-1/5 
              h-full z-0"
          />
          
          <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute 
              top-[65%] 
              left-[50%] 
              -translate-x-1/2 -translate-y-1/2 
              w-[15%] sm:w-[18%] md:w-1/5 
              h-[15vh] sm:h-[18vh] md:h-[20vh] 
              z-0 invert brightness-0"
          />
          
          <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute scale-y-[-1] 
              top-[50%] 
              right-[-2%] 
              rotate-[25deg] 
              -translate-x-1/2 -translate-y-1/2 
              w-[15%] sm:w-[18%] md:w-1/5 
              h-[15vh] sm:h-[18vh] md:h-[20vh] 
              z-0"
          />
          
          <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute 
              top-[30%] 
              -translate-x-1/2 -translate-y-1/2 
              w-[15%] sm:w-[18%] md:w-1/5 
              h-[8vh] sm:h-[9vh] md:h-[10vh] 
              z-10 
              right-[-8%] sm:right-[-10%] md:right-[-12%] 
              invert brightness-0"
          />
          
          <img
            src={paperPlane}
            alt="paper Plane"
            className="absolute 
              top-[70%] 
              -translate-x-1/2 -translate-y-1/2 
              h-[15vh] sm:h-[18vh] md:h-[20vh] 
              z-10 
              right-[-10%] sm:right-[-15%] md:right-[-20%]"
          />

          {/* Subscribe Input Container */}
          <div className="w-full bg-white rounded-md sm:rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between z-50 overflow-hidden">
            <input
              type="email"
              placeholder={footerData.subscribePlaceholder}
              className="bg-transparent w-full text-stone-700 placeholder-stone-500 focus:outline-none px-4 py-3 sm:py-0"
            />
            <button className="bg-[#8b5f31] text-white text-sm sm:text-base font-semibold py-3 px-6 sm:px-8 hover:bg-opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-stone-500 text-xs sm:text-sm">
          <p>{footerData.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
