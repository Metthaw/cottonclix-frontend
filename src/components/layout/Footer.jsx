// src/components/layout/Footer.jsx

import React from "react";

const footerData = {
  subscribePlaceholder: "Your E-mail",
  copyrightText: " 2025  Cottonclix All Rights Reserved.",
};

export default function Footer() {
  return (
    <footer id="subscribe-form" className="w-full h-full bg-white mt-20 mb-8">
      <div className="container w-full mx-auto bg-wghite ">
        {/* Subscribe Section */}
        <div className="w-[100%]  mx-auto max-w-5xl bg-[#F8E3C3] px-24 py-12 rounded-xl flex items-center justify-between mb-16">
          <div className="w-full bg-white rounded-lg flex items-center justify-between max-w-xl mx-auto ">
            <input
              type="email"
              placeholder={footerData.subscribePlaceholder}
              className="bg-transparent w-full text-stone-700 placeholder-stone-500 focus:outline-none px-4 "
            />
            <button className="bg-[#BC9F31] text-white font-semibold py-3 px-8  rounded-lg hover:bg-opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright Section */}
       
      </div>
       <div className="text-center text-stone-500 text-sm">
          <p>{footerData.copyrightText}</p>
        </div>
    </footer>
  );
}
