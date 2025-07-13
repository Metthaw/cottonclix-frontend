// src/pages/HomePage/ContactForm.jsx

import React, { useState } from 'react';

export default function ContactForm() {
  // ใช้ State เพื่อเก็บข้อมูลจากช่องกรอกต่างๆ
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ตอนนี้จะแค่แสดงข้อมูลใน Console
    // ในอนาคตเราจะใส่โค้ดของ EmailJS ที่นี่
    console.log('Form Data Submitted:', formData);
    alert('Thank you for your message!');
  };

  return (
    <section id="contact-form" className="w-full bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 flex justify-center">

        <div className="w-full max-w-3xl bg-stone-50 p-8 md:p-12 rounded-lg shadow-lg">
          <h2 className="text-4xl md:text-5xl font-serif text-center text-[#BC9F31] mb-8">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-[#8D8D8D] mb-2">First Name</label>
                <input
                  type="text" id="firstName" name="firstName"
                  value={formData.firstName} onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC9F31]"
                  required
                />
              </div>
              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-[#8D8D8D] mb-2">Last Name</label>
                <input
                  type="text" id="lastName" name="lastName"
                  value={formData.lastName} onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC9F31]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[#8D8D8D] mb-2">Email</label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC9F31]"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[#8D8D8D] mb-2">Message</label>
              <textarea
                id="message" name="message" rows="5"
                value={formData.message} onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC9F31]"
                required
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <button 
                type="submit"
                className="bg-[#BC9F31] text-white font-bold py-3 px-12 rounded-full hover:bg-opacity-90 transition-all duration-300"
              >
                Send
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}