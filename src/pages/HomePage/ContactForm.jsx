// src/pages/HomePage/ContactForm.jsx

import React, { useState } from "react";
import formBackground from "../../img/element1.png"; // นำเข้าภาพพื้นหลังของฟอร์ม

export default function ContactForm({ flowerLocatorRef }) {
  // ใช้ State เพื่อเก็บข้อมูลจากช่องกรอกต่างๆ
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ตอนนี้จะแค่แสดงข้อมูลใน Console
    // ในอนาคตเราจะใส่โค้ดของ EmailJS ที่นี่
    console.log("Form Data Submitted:", formData);
    alert("Thank you for your message!");
  };

  return (
    <section id="contact-form" className="w-full bg-white py-20 md:py-32">
      <div className="container relative mx-auto px-4 flex justify-center">
        <div
          ref={flowerLocatorRef}
          className="absolute pointer-events-none top-8 right-[30rem] z-50"
        />
        <div className="relative w-full max-w-3xl z-10">
          
          {/* 2. วางรูปพื้นหลังไว้ข้างใต้ (z-0) */}
          <img 
            src={formBackground} 
            alt="background decoration"
            className="absolute inset-0 w-auto h-full object-contain z-10  bg-secondary/25 rounded-lg pt-28"
          />

          {/* 3. ทำให้เนื้อหาฟอร์มอยู่ข้างบน (z-10) */}
          <div className="relative z-20 p-8 md:p-12 rounded-lg shadow-lg">
            <h2 className="text-4xl md:text-5xl font-serif text-left text-primary mb-8">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  
                  <input
                    type="text" id="firstName" name="firstName"
                    value={formData.firstName} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    placeholder="First Name"
                  />
                </div>
                {/* Last Name */}
                <div>
                  
                  <input
                    type="text" id="lastName" name="lastName"
                    value={formData.lastName} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div>
                
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  placeholder="Email Address"
                />
              </div>
              <div>
                
                <textarea
                  id="message" name="message" rows="5"
                  value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div className="text-right pt-4">
                <button 
                  type="submit"
                  className="bg-primary text-white font-bold py-3 px-12 rounded-lg hover:bg-opacity-90 transition-all duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
