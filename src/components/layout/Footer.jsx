// src/components/layout/Footer.jsx

import React from 'react';

// --- Import ไอคอน Social Media ---
import FacebookIcon from '../../img/icon-navbar.svg';
import InstagramIcon from '../../img/icon-navbar-1.svg';
import LineIcon from '../../img/icon-navbar-2.svg';

// --- Import ไอคอนข้อมูลติดต่อ ---
import LocationIcon from '../../img/Group 50.svg';
import TimeIcon from '../../img/Group 51.svg';
import TelIcon from '../../img/Group 52.svg';
import EmailIcon from '../../img/Group 53.svg';


const footerData = {
  address: "3 Floor, Terminal 21 Asoke Bangkok, Thailand",
  openingHours: "10:00 am - 10:00 pm",
  phone: "+66 123 4568",
  email: "cottonclix.official@gmail.com",
  socialLinks: {
    facebook: "#",
    instagram: "#",
    line: "#",
  },
  subscribePlaceholder: "Your E-mail",
  copyrightText: "© Copyright 2025 © Cottonclix All Rights Reserved."
};


export default function Footer() {
  return (
    <footer id="subscribe-form" className="w-full bg-white pt-20 pb-8">
      <div  className="container mx-auto px-8">

        {/* ส่วนบน: ข้อมูลติดต่อและแผนที่ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* ฝั่งซ้าย: ข้อมูลติดต่อ */}
          <div className="space-y-4">
            <p className='text-stone-700 text-lg '>Contact</p>
            
            
            {/* === เปลี่ยนจาก Emoji เป็น ไอคอน SVG === */}
            <div className="flex items-start gap-4 text-stone-600">
              <img src={LocationIcon} alt="Address" className="w-5 h-5 flex-shrink-0 mt-1" />
              <p>{footerData.address}</p>
            </div>
            <div className="flex items-start gap-4 text-stone-600">
              <img src={TimeIcon} alt="Opening Hours" className="w-5 h-5 flex-shrink-0 mt-1" />
              <p>{footerData.openingHours}</p>
            </div>
            <div className="flex items-start gap-4 text-stone-600">
              <img src={TelIcon} alt="Phone" className="w-5 h-5 flex-shrink-0 mt-1" />
              <p>{footerData.phone}</p>
            </div>
            <div className="flex items-start gap-4 text-stone-600">
              <img src={EmailIcon} alt="Email" className="w-5 h-5 flex-shrink-0 mt-1" />
              <p>{footerData.email}</p>
            </div>
            
            <div className="flex items-center gap-5 pt-4">
              <a href={footerData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                <img src={FacebookIcon} alt="Facebook" className="h-7 w-7" />
              </a>
              <a href={footerData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                <img src={InstagramIcon} alt="Instagram" className="h-7 w-7" />
              </a>
              <a href={footerData.socialLinks.line} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                <img src={LineIcon} alt="Line" className="h-7 w-7" />
              </a>
            </div>
          </div>

          {/* ฝั่งขวา: แผนที่ */}
          <div className="w-full h-80 bg-stone-200 rounded-lg flex items-center justify-center">
            <p className="text-stone-400">Google Maps Placeholder</p>
          </div>
        </div>

        {/* ส่วนกลาง: ช่อง Subscribe */}
        <div  className="w-full max-w-2xl mx-auto bg-[#F8E3C3] p-6 rounded-xl flex items-center justify-between m-16">
          <div className="w-full max-w-2xl mx-auto bg-white  rounded-lg flex items-center justify-between ">
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

        {/* ส่วนล่าง: Copyright */}
        <div className="text-center text-stone-500 text-sm">
          <p>{footerData.copyrightText}</p>
        </div>

      </div>
    </footer>
  );
}