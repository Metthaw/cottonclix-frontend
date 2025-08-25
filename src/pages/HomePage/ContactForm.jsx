// src/pages/HomePage/ContactForm.jsx

import React, { useRef, useState } from "react";
import element1 from "../../img/element1.png";
import element5 from "../../img/element5.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ContactForm({ flowerLocatorRef }) {
  // ใช้ State เพื่อเก็บข้อมูลจากช่องกรอกต่างๆ
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ตอนนี้จะแค่แสดงข้อมูลใน Console
    // ในอนาคตเราจะใส่โค้ดของ EmailJS ที่นี่
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus("❌ Please enter a valid email address");
      return;
    }

    setStatus("Sending...");

    try {
      const response = await fetch(
        "https://cms.cottonclix.com/wp-json/fluentform/v1/submit/1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.status === "mail_sent") {
        setStatus("✅ Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("❌ Failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      setStatus("❌ Error: " + error.message);
    }
    console.log("Form Data Submitted:", formData);
    alert("Thank you for your message!");
  };

  return (
    <section
      ref={mainRef}
      id="contact-form"
      className="w-full min-h-screen bg-white overflow-hidden py-8 sm:py-12 md:py-16" // Adjusted height and padding
    >
      <div className="container relative mx-auto px-4 sm:px-6 flex justify-center">
        <div
          ref={flowerLocatorRef}
          className="absolute pointer-events-none top-[-5%] sm:top-[-8%] md:top-[-10%] right-[40%] -z-50"
        />
        <div
          ref={formRef}
          className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-3xl relative bg-stone-50 p-4 sm:p-6 md:p-12 rounded-lg shadow-lg z-50"
        >
          <div className="absolute bottom-0 left-0 w-full h-auto z-0 pointer-events-none">
            <img
              src={element1}
              alt="Branch Decoration"
              className="w-full h-auto drop-shadow-2xl opacity-50 sm:opacity-75 md:opacity-100"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-center text-[#BC9F31] mb-4 sm:mb-6 md:mb-8 z-10 relative">
            Contact Us
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5 md:space-y-6 z-10 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-[#8D8D8D] text-sm sm:text-base mb-1 sm:mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC9F31]"
                  required
                />
              </div>
              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-[#8D8D8D] text-sm sm:text-base mb-1 sm:mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC9F31]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[#8D8D8D] text-sm sm:text-base mb-1 sm:mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC9F31]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[#8D8D8D] text-sm sm:text-base mb-1 sm:mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC9F31]"
                required
              ></textarea>
            </div>

            <div className="text-center pt-2 sm:pt-3 md:pt-4">
              <button
                type="submit"
                className="bg-[#BC9F31] text-white font-bold text-sm sm:text-base py-2 px-8 sm:py-3 sm:px-12 rounded-full hover:bg-opacity-90 transition-all duration-300"
              >
                Send
              </button>
              <p>{status}</p>
            </div>
          </form>
        </div>

        <img
          src={element5}
          ref={branchRef}
          alt="Branch2 Decoration"
          className="absolute right-[3%] bottom-[-65%] -translate-y-1/2 w-2/5 h-[40vh] sm:h-[50vh] md:h-[60vh] object-contain z-0 pointer-events-none opacity-50 sm:opacity-75 md:opacity-100"
        />
      </div>
    </section>
  );
}
