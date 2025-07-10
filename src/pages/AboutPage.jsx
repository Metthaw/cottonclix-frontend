import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { aboutPageData } from '../mockData'; // 1. Import ข้อมูลเข้ามา

const AboutPage = () => {
  // 2. ดึงข้อมูลจาก Object ที่ import เข้ามา
  const { title, featuredImageUrl, content } = aboutPageData;

  return (
    <div>
      <Navbar />
      <div className="pt-20 bg-gray-50">
        <div className="container mx-auto px-6 py-16">

          {/* 3. แสดงรูปภาพหลัก */}
          <div className="w-full h-64 md:h-96 bg-cover bg-center rounded-lg shadow-md"
               style={{ backgroundImage: `url(${featuredImageUrl})` }}>
          </div>
          
          {/* 4. แสดงหัวข้อและเนื้อหา */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <h1 className="text-4xl font-bold font-serif text-gray-800 mb-6">{title}</h1>

            <div className="text-left text-natural space-y-4">
              {content.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { aboutPageData } from '../mockData'; // 1. Import ข้อมูลเข้ามา

const AboutUs = () => {
  // 2. ดึงข้อมูลจาก Object ที่ import เข้ามา
  const { title, featuredImageUrl, content } = aboutPageData;

  return (
    <div>
      <Navbar />
      <div className="pt-20 bg-gray-50">
        <div className="container mx-auto px-6 py-16">

          {/* 3. แสดงรูปภาพหลัก */}
          <div className="w-full h-64 md:h-96 bg-cover bg-center rounded-lg shadow-md"
               style={{ backgroundImage: `url(${featuredImageUrl})` }}>
          </div>
          
          {/* 4. แสดงหัวข้อและเนื้อหา */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <h1 className="text-4xl font-bold font-serif text-gray-800 mb-6">{title}</h1>

            <div className="text-left text-natural space-y-4">
              {content.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;