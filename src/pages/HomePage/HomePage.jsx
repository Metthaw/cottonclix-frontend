import React, { useState, useRef } from 'react';
import { collections } from '../../data/mockData';

// Import Components
import Hero from './Hero';
import CatalogSlider from './CatalogSlider';
import StoryBook from './StoryBook';
import OurStory from './OurStory';
import BlogSlider from './BlogSlider';
import ContactForm from './ContactForm';

export default function HomePage() {
  // State เพื่อเก็บ ID ของ collection ที่ถูกเลือก (ใช้ slug จาก mockData เป็นค่าเริ่มต้น)
  const [selectedCollectionId, setSelectedCollectionId] = useState(collections[0].id);

  // Ref สำหรับอ้างอิงถึงตำแหน่งของ StoryBook เพื่อ scroll ไปหา
  const storyBookRef = useRef(null);

  // ฟังก์ชันสำหรับเปิดหนังสือและเลื่อนหน้าจอ
  const handleOpenBook = (collectionId) => {
    setSelectedCollectionId(collectionId);
    setTimeout(() => {
      storyBookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div>
      <Hero />
      <CatalogSlider onOpenBook={handleOpenBook} />
      
      <div ref={storyBookRef}>
        <StoryBook selectedCollectionId={selectedCollectionId} />
      </div>

      <OurStory />
      <BlogSlider />
      <ContactForm />
    </div>
  );
}