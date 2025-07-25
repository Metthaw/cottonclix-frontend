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
    <footer id="subscribe-form" className="w-full bg-white pt-20 pb-8">
      <div className="container mx-auto px-8">
        {/* Subscribe Section */}
        <div className="w-full relative max-w-5xl mx-auto bg-[#dad0c6] py-12 px-48 rounded-xl flex items-center justify-between mb-16">
          <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute scale-y-[-1] scale-x-[-1] top-[40%] left-32 -translate-x-1/2 -translate-y-1/2 w-1/5 h-full z-0"
          />
          <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute top-[65%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-1/5 h-[20vh] z-0 invert brightness-0"
          />
          <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute scale-y-[-1] top-[50%] right-[-2%] rotate-[25deg] -translate-x-1/2 -translate-y-1/2 w-1/5 h-[20vh] z-0"
          />
          <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute top-[30%] -translate-x-1/2 -translate-y-1/2 w-1/5 h-[10vh] z-10 right-[-12%] invert brightness-0"
          />
           <img
            src={paperPlane}
            alt="paper Plane"
            className="absolute top-[70%] -translate-x-1/2 -translate-y-1/2 h-[20vh] z-10 right-[-20%]"
          />
          <div className="w-full bg-white rounded-lg flex items-center justify-between z-50">
            <input
              type="email"
              placeholder={footerData.subscribePlaceholder}
              className="bg-transparent w-full text-stone-700 placeholder-stone-500 focus:outline-none px-4"
            />
            <button className="bg-[#8b5f31] text-white font-semibold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-stone-500 text-sm">
          <p>{footerData.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
