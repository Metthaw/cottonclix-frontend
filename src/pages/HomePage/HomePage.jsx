// ตำแหน่ง: src/pages/HomePage.jsx

import React from 'react';

// Import ส่วนประกอบต่างๆ ของหน้า Home
import Hero from './Hero';
import StoryIntro from './StoryIntro';
import ContactForm from './ContactForm';

import OurStory from './OurStory'
import BlogSlider from './BlogSlider';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <OurStory />
      <BlogSlider /> 
      <ContactForm />
    </div>
  );
};

export default HomePage;