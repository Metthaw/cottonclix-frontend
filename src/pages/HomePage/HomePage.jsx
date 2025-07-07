// ตำแหน่ง: src/pages/HomePage.jsx

import React from 'react';

// Import ส่วนประกอบต่างๆ ของหน้า Home
import Hero from './Hero';
import StoryIntro from './StoryIntro';
import ProductShowcase from './ProductShowcase';
import CatalogSlider from './CatalogSlider';
import OurStory from './OurStory'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CatalogSlider />
      <ProductShowcase />
      <OurStory />
    </div>
  );
};

export default HomePage;