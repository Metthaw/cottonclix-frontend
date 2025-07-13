import React, { useState, useRef, useEffect } from 'react';

// Import Components
import CatalogSlider from './CatalogSlider';
import StoryBook from './StoryBook';
import OurStory from './OurStory';
import BlogSlider from './BlogSlider';
import ContactForm from './ContactForm';
import Hero from '../HomePage/Hero.jsx';

const API_URL = 'https://cottonclix.com/wp-json/wp/v2/collection';

export default function HomePage() {
  // State สำหรับเก็บข้อมูลทั้งหมด
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const storyBookRef = useRef(null);

  // ดึงข้อมูล Collection ที่นี่ที่เดียว
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const formattedData = data.map(item => ({
          id: item.slug,
          name: item.title.rendered,
          subtitle: item.acf.subtitle,
          coverImage: item.acf.cover_image,
        }));
        setCollections(formattedData);
        // --- จุดสำคัญ: ตั้งค่า ID แรกที่เจอเป็น default value ---
        if (formattedData.length > 0) {
          setSelectedCollectionId(formattedData[0].id);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const handleOpenBook = (collectionId) => {
    setSelectedCollectionId(collectionId);
    setTimeout(() => {
      storyBookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div>
      <Hero />
      {/* เราจะส่งข้อมูล collections และสถานะ loading ไปให้ CatalogSlider */}
      <CatalogSlider 
        collections={collections}
        loading={loading}
        onOpenBook={handleOpenBook} 
      />
      
      <div ref={storyBookRef}>
        <StoryBook selectedCollectionId={selectedCollectionId} />
      </div>

      <OurStory />
      <BlogSlider />
      <ContactForm />
    </div>
  );
}