// src/pages/HomePage/ContactForm.jsx

import React, { useRef, useState, useEffect } from "react";
import element1 from "../../img/element1.png";
import element5 from "../../img/element5.svg";
import bushFlower2 from "../../img/Dicut-Cotton_FlowerBush_2.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Alert } from "antd";

export default function ContactForm({ flowerLocatorRef }) {
  // ใช้ State เพื่อเก็บข้อมูลจากช่องกรอกต่างๆ
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const mainRef = useRef(null);
  const formRef = useRef(null);
  const branchRef = useRef(null);
  const bushRef = useRef(null);

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
          bushRef.current,
          {
            x: -80,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
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
          bushRef.current,
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: -80,
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

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus("Please enter a valid email address");
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

      if (result.success) {
        setStatus("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("Failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  // Auto-close alert after 5 seconds when status changes
  useEffect(() => {
    let timer;
    if (status) {
      setShowAlert(true);
      timer = setTimeout(() => {
        setShowAlert(false);
        setStatus("");
      }, 5000); // 5000ms = 5 seconds
    }
    return () => clearTimeout(timer); // Clean up the timer on unmount or when status changes
  }, [status]);

  return (
    <section
      ref={mainRef}
      id="contact-form"
      className="w-full min-h-fit bg-white overflow-hidden py-6 md:py-8 lg:py-20"
    >
      <div className="container relative mx-auto px-2 sm:px-3 flex justify-center">
        <div
          ref={flowerLocatorRef}
          className="absolute pointer-events-none top-[-3%] sm:top-[-5%] md:top-[-6%] right-[30%] sm:right-[32%] md:right-[35%] -z-50"
        />

        <div
          ref={formRef}
          className="w-full max-w-[92%] sm:max-w-[85%] md:max-w-xl lg:max-w-2xl relative bg-stone-50 p-2 sm:p-3 md:p-4 lg:p-8 rounded-lg shadow-md z-50"
        >
          <div className="absolute bottom-[0%] left-[27%] w-full h-auto z-0 pointer-events-none">
            <img
              src={bushFlower2}
              alt="Branch Decoration"
              className="w-[50%] h-auto drop-shadow-xl opacity-50 sm:opacity-70 md:opacity-90"
            />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-medium text-left text-[#8C5F31] mb-2 sm:mb-3 md:mb-4 z-10 relative">
            Contact Us
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 z-10 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-[#8D8D8D] text-xs sm:text-sm lg:text-base mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-xs sm:text-sm border lg:text-base border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C5F31]"
                  required
                />
              </div>
              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-[#8D8D8D] text-xs sm:text-sm lg:text-base mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-xs sm:text-sm lg:text-base border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C5F31]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[#8D8D8D] text-xs sm:text-sm mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-1 text-xs sm:text-sm lg:text-base border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C5F31]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[#8D8D8D] text-xs sm:text-sm lg:text-base mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-2 py-1 text-xs sm:text-sm lg:text-base border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C5F31]"
                required
              ></textarea>
            </div>

            <div className="text-center pt-1 sm:pt-2 md:pt-3 space-y-2">
              <button
                type="submit"
                className="bg-[#8C5F31] text-white font-semibold text-xs sm:text-sm lg:text-base py-1 px-4 sm:py-1.5 sm:px-6 rounded-full hover:bg-opacity-90 transition-all duration-300"
              >
                Send
              </button>
              {showAlert && status && (
                <Alert
                  closable
                  onClose={() => {
                    setShowAlert(false);
                    setStatus("");
                  }}
                  message={status}
                  type={
                    status.includes("Message sent successfully!")
                      ? "success"
                      : status === "Sending..."
                      ? "info"
                      : "error"
                  }
                  showIcon
                  className="mx-auto max-w-xs text-xs sm:text-sm"
                />
              )}
            </div>
          </form>
        </div>

        <img
          src={element5}
          ref={branchRef}
          alt="Branch2 Decoration"
          className="absolute right-[1%] sm:right-[2%] bottom-[-25%] sm:bottom-[-35%] md:bottom-[-45%] -translate-y-1/2 w-1/2 sm:w-2/5 md:w-1/3 h-[20vh] sm:h-[30vh] md:h-[35vh] object-contain z-0 pointer-events-none opacity-50 sm:opacity-70 md:opacity-90"
        />
      </div>
    </section>
  );
}
