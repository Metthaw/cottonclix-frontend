// src/components/layout/Footer.jsx

import React, { useState, useEffect } from "react";
// import lineArtImg from "../../img/element2.png";
// import paperPlane from "../../img/paperPlane.svg";
import { Alert } from "antd"; // Import Alert component from Ant Design
import { Link } from "react-router-dom";

const footerData = {
  subscribePlaceholder: "Your E-mail",
  copyrightText: " Copyright 2025 © Cottonclix All Rights Reserved.",
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  // Auto-close alert after 5 seconds when it becomes visible
  useEffect(() => {
    let timer;
    if (alertVisible) {
      timer = setTimeout(() => {
        setAlertVisible(false);
      }, 5000); // 5000ms = 5 seconds
    }
    return () => clearTimeout(timer); // Clean up the timer on unmount or when alert is hidden
  }, [alertVisible]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setAlertVisible(false);

    // --- START: ข้อมูลสำคัญที่คุณได้มาจาก MailPoet ---
    const API_ENDPOINT =
      "https://cms.cottonclix.com/wp-json/myapi/v1/subscribe";

    const formData = new FormData();
    formData.append("data[form_id]", "1");
    formData.append("token", "3a3d677895");
    formData.append("api_version", "v1");
    formData.append("endpoint", "subscribers");
    formData.append("mailpoet_method", "subscribe");
    formData.append("data[form_field_M2NlODc2ZDMzY2NiX2VtYWls]", email);
    // --- END: ข้อมูลสำคัญ ---

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setAlertVisible(true);
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Subscription failed. Please try again.");
        setAlertVisible(true);
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please check your connection.");
      setAlertVisible(true);
      console.error("An error occurred:", error);
    }
  };

  return (
    <footer
      id="subscribe-form"
      className="w-full bg-white pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Alert Message */}
        {alertVisible && (
          <div className="max-w-5xl mx-auto mb-4">
            <Alert
              message={status === "success" ? "Success" : "Error"}
              description={message}
              type={status === "success" ? "success" : "error"}
              showIcon
              closable
              afterClose={() => setAlertVisible(false)}
              className="rounded-lg"
            />
          </div>
        )}

        {/* Subscribe Section */}
        <div className="w-full relative max-w-5xl mx-auto bg-[#dad0c6] py-6 sm:py-8 md:py-12 px-4 sm:px-24 md:px-48 rounded-lg sm:rounded-xl flex items-center justify-between mb-8 sm:mb-12 md:mb-16">
          {/* Decorative Elements - Mobile First Approach */}
          {/* <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute scale-y-[-1] scale-x-[-1] 
              top-[40%] 
              left-4 sm:left-16 md:left-32 
              -translate-x-1/2 -translate-y-1/2 
              w-[15%] sm:w-[18%] md:w-1/5 
              h-full z-0"
          /> */}

          {/* <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute 
              top-[65%] 
              left-[50%] 
              -translate-x-1/2 -translate-y-1/2 
              w-[15%] sm:w-[18%] md:w-1/5 
              h-[15vh] sm:h-[18vh] md:h-[20vh] 
              z-0 invert brightness-0"
          /> */}

          {/* <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute scale-y-[-1] 
              top-[50%] 
              right-[-2%] 
              rotate-[25deg] 
              -translate-x-1/2 -translate-y-1/2 
              w-[15%] sm:w-[18%] md:w-1/5 
              h-[15vh] sm:h-[18vh] md:h-[20vh] 
              z-0"
          /> */}

          {/* <img
            src={lineArtImg}
            alt="Cotton Flower"
            className="absolute 
              top-[30%] 
              -translate-x-1/2 -translate-y-1/2 
              w-[15%] sm:w-[18%] md:w-1/5 
              h-[8vh] sm:h-[9vh] md:h-[10vh] 
              z-10 
              right-[-8%] sm:right-[-10%] md:right-[-12%] 
              invert brightness-0"
          /> */}

          {/* <img
            src={paperPlane}
            alt="paper Plane"
            className="absolute 
              top-[70%] 
              -translate-x-1/2 -translate-y-1/2 
              h-[15vh] sm:h-[18vh] md:h-[20vh] 
              z-10 
              right-[-10%] sm:right-[-15%] md:right-[-20%]"
          /> */}

          {/* Subscribe Input Container */}
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-md sm:rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between z-50 overflow-hidden"
          >
            <input
              type="email"
              placeholder={footerData.subscribePlaceholder}
              className="bg-transparent w-full text-stone-700 placeholder-stone-500 focus:outline-none px-4 py-3 sm:py-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
            />
            <button
              type="submit"
              className="bg-[#8b5f31] text-white text-sm sm:text-base font-semibold py-3 px-6 sm:px-8 hover:bg-opacity-90 transition-all disabled:opacity-50"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="mx-10 flex flex-col md:flex-row items-center justify-center flex-wrap gap-x-6 sm:gap-x-8 gap-y-4 text-center">
          <div className="flex flex-col md:flex-row flex-wrap w-full justify-center gap-x-8 md:gap-x-6 gap-y-8">
            <Link to="/about" className="hover:underline">
              Our Story
            </Link>
            <Link to="/blog" className="hover:underline">
              Blog
            </Link>
            <Link to="#contact-form" className="hover:underline">
              Contact
            </Link>
            <Link to="#subscribe-form" className="hover:underline">
              Subscribe
            </Link>
            <Link to="/index" className="hover:underline">
              Index
            </Link>
            <Link to="/policy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>

          {/* Copyright Section */}
          <div className="text-[#8C5F31] sm:text-sm mx-4 w-fit">
            <p>{footerData.copyrightText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
