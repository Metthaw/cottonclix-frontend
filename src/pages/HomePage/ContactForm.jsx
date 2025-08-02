// src/pages/HomePage/ContactForm.jsx

<<<<<<< HEAD
import React, { useState } from "react";
import formBackground from "../../img/element1.png"; // นำเข้าภาพพื้นหลังของฟอร์ม
=======
import React, { useRef, useState } from "react";
import element1 from "../../img/element1.png";
import element5 from "../../img/element5.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
>>>>>>> ce6aac52077053d905ba4e842b4857f89c4fbece

export default function ContactForm({ flowerLocatorRef }) {
  // ใช้ State เพื่อเก็บข้อมูลจากช่องกรอกต่างๆ
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const mainRef = useRef(null);
  const formRef = useRef(null);
  const branchRef = useRef(null);

  useGSAP(
    () => {
      const mainEl = mainRef.current;
      if (!mainEl) return;

      const handleFocus = () => {
        gsap.fromTo(
          branchRef.current,
          {
            rotate: 30,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            rotate: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          formRef.current,
          {
            x: 80,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      };

      const handleBlur = () => {
        gsap.fromTo(
          branchRef.current,
          {
            rotate: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            rotate: 30,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          formRef.current,
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 80,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleFocus();
          } else {
            handleBlur();
          }
        },
        { threshold: 0.2 } // fire when 20% of element is visible
      );

      observer.observe(mainEl);

      return () => observer.disconnect();
    },
    { scope: mainRef }
  ); // ✅ no dependencies

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
    <section
      ref={mainRef}
      id="contact-form"
      className="w-full bg-white py-20 md:py-32 overflow-hidden"
    >
      <div className="container relative mx-auto px-4 flex justify-center">
        <div
          ref={flowerLocatorRef}
          className="absolute pointer-events-none top-8 right-[30rem] z-50"
        />
<<<<<<< HEAD
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
=======
        <div
          ref={formRef}
          className="w-full max-w-3xl relative bg-stone-50 p-8 md:p-12 rounded-lg shadow-lg z-50"
        >
          <div className="absolute bottom-0 left-0 w-full h-auto z-0 pointer-events-none">
            <img
              src={element1}
              alt="Branch Decoration"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-center text-[#BC9F31] mb-8 z-10 relative">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 z-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
>>>>>>> ce6aac52077053d905ba4e842b4857f89c4fbece
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

        <img
          src={element5}
          ref={branchRef}
          alt="Branch2 Decoration"
          className="absolute right-[3%] bottom-[-65%] -translate-y-1/2 w-2/5 h-[60vh] object-contain z-0 pointer-events-none"
        />
      </div>
    </section>
  );
}
