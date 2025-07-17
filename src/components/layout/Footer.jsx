// src/components/layout/Footer.jsx

import React from "react";

const footerData = {
  subscribePlaceholder: "Your E-mail",
  copyrightText: " 2025  Cottonclix All Rights Reserved.",
};

export default function Footer() {
  return (
    <footer id="subscribe-form" className="w-full bg-white pt-20 pb-8">
      <div className="container mx-auto px-8">
        {/* Subscribe Section */}
        <div className="w-full max-w-2xl mx-auto bg-[#F8E3C3] p-6 rounded-xl flex items-center justify-between mb-16">
          <div className="w-full bg-white rounded-lg flex items-center justify-between">
            <input
              type="email"
              placeholder={footerData.subscribePlaceholder}
              className="bg-transparent w-full text-stone-700 placeholder-stone-500 focus:outline-none px-4"
            />
            <button className="bg-[#BC9F31] text-white font-semibold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-opacity">
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
