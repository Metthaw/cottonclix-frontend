// src/pages/AboutPage.jsx

import React from 'react';

import { aboutPageData } from '../data/mockData'; // Import ข้อมูล

const AboutPage = () => {
  // ดึงข้อมูลจาก Object เพื่อให้ใช้งานง่าย
  const { title, featuredImageUrl, content } = aboutPageData;

  return (
    <div>
      
      <main className=" ">
        <div className="container mx-auto px-6 py-16">

          {/* ส่วนรูปภาพหลัก */}
          <div 
            className="w-full h-64 md:h-96 bg-cover bg-center rounded-lg shadow-md"
            style={{ backgroundImage: `url(${featuredImageUrl})` }}
            aria-label={title}
          >
          </div>
          
          {/* ส่วนเนื้อหา */}
          <article className="max-w-3xl mx-auto mt-12">
            <h1 className="text-4xl font-bold font-serif text-gray-800 mb-6 text-center">
              {title}
            </h1>

            <div className="text-left text-natural space-y-4">
              {/* วนลูปแสดงผลแต่ละย่อหน้า */}
              {content.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

        </div>
      </main>
      
    </div>
  );
};

export default AboutPage;