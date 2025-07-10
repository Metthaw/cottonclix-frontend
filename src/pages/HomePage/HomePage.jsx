// // ตำแหน่ง: src/pages/HomePage.jsx
// import React, { useState, useRef } from 'react';


// // Import ส่วนประกอบต่างๆ ของหน้า Home
// import Hero from './Hero';
// import StoryIntro from './StoryIntro';
// import StoryBook from './StoryBook';
// import ContactForm from './ContactForm';
// import CatalogSlider from './CatalogSlider';
// import OurStory from './OurStory'
// import BlogSlider from './BlogSlider';

// const HomePage = () => {
//   // State เพื่อเก็บ ID ของ collection ที่ถูกเลือก
//   const [selectedCollectionId, setSelectedCollectionId] = useState('spring'); // ให้ spring เป็นค่าเริ่มต้น

//   // Ref สำหรับอ้างอิงถึง StoryBook section เพื่อ scroll ไปหา
//   const storyBookRef = useRef(null);

//   // ฟังก์ชันที่จะถูกเรียกเมื่อมีการคลิกเลือกหนังสือ
//   const handleSelectCollection = (collectionId) => {
//     setSelectedCollectionId(collectionId);
//     // เลื่อนหน้าจอไปที่ StoryBook section อย่างนุ่มนวล
//     storyBookRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };
//   return (
//     <div>
//       <Hero />
//       <CatalogSlider onSelectCollection={handleSelectCollection} />
      
//       {/* ส่ง Ref และ collection ที่เลือกไปให้ StoryBook */}
//       <div ref={storyBookRef}>
//         <StoryBook selectedCollectionId={selectedCollectionId} />
//       </div>
//       <OurStory />
//       <BlogSlider /> 
//       <ContactForm />
//     </div>
//   );
// };

// export default HomePage;

// src/pages/HomePage/HomePage.jsx
import React, { useState, useRef } from 'react';

// Import Components
import Hero from './Hero';
import CatalogSlider from './CatalogSlider';
import StoryBook from './StoryBook';
import OurStory from './OurStory';
import BlogSlider from './BlogSlider';
import ContactForm from './ContactForm';

export default function HomePage() {
  // State เพื่อเก็บ ID ของ collection ที่ถูกเลือก (ให้ spring เป็นค่าเริ่มต้น)
  const [selectedCollectionId, setSelectedCollectionId] = useState('spring');

  // Ref สำหรับอ้างอิงถึง StoryBook section เพื่อ scroll ไปหา
  const storyBookRef = useRef(null);

  // ฟังก์ชันที่จะถูกเรียกเมื่อมีการคลิกเลือกหนังสือจาก CatalogSlider
  const handleSelectCollection = (collectionId) => {
    setSelectedCollectionId(collectionId);
    // เลื่อนหน้าจอไปที่ StoryBook section อย่างนุ่มนวล
    storyBookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div>
      <Hero />
      {/* ส่งฟังก์ชัน handleSelectCollection ไปให้ CatalogSlider */}
      <CatalogSlider onSelectCollection={handleSelectCollection} />
      
      {/* ส่ง Ref และ collection ที่เลือกไปให้ StoryBook */}
      <div ref={storyBookRef}>
        <StoryBook selectedCollectionId={selectedCollectionId} />
      </div>

      <OurStory />
      <BlogSlider />
      <ContactForm />
    </div>
  );
}