import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { createPortal } from "react-dom";

// Import Components
import CatalogSlider from "./CatalogSlider";
import StoryBook from "./StoryBook";
import OurStory from "./OurStory";
import BlogSlider from "./BlogSlider";
import ContactForm from "./ContactForm";
import Hero from "../HomePage/Hero.jsx";
import AnimatedCottonFlower from "../../components/AnimatedCottonFlower";
import SocialInfo from "../../components/layout/SocialInfo.jsx";

const API_URL = "https://cottonclix.com/wp-json/wp/v2/collection";

export default function HomePage() {
  // State สำหรับเก็บข้อมูลทั้งหมด
  const [collections, setCollections] = React.useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const heroContainerRef = useRef(null);
  const flowerLocatorRef = useRef(null);
  const catalogFlowerLocatorRef = useRef(null);
  const storybookFlowerLocatorRef = useRef(null);
  const ourStoryUpperFlowerLocatorRef = useRef(null);
  const ourStoryLowerFlowerLocatorRef = useRef(null);
  const blogSliderFlowerLocatorRef = useRef(null);
  const contactFormFlowerLocatorRef = useRef(null);
  const socialInfoFlowerLocatorRef = useRef(null);
  const catalogSliderRef = useRef(null);
  const storyBookRef = useRef(null);
  const ourStoryRef = useRef(null);
  const blogSliderRef = useRef(null);
  const contactFormRef = useRef(null);
  const socialInfoRef = useRef(null);

  const [flowerStyle, setFlowerStyle] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeLocatorIndex, setActiveLocatorIndex] = useState(0);

  // ดึงข้อมูล Collection ที่นี่ที่เดียว
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const formattedData = data.map((item) => ({
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

  const locatorRefMap = {
    hero: [flowerLocatorRef],
    catalog: [catalogFlowerLocatorRef],
    storybook: [storybookFlowerLocatorRef],
    ourstory: [ourStoryUpperFlowerLocatorRef, ourStoryLowerFlowerLocatorRef],
    blog: [blogSliderFlowerLocatorRef],
    contact: [contactFormFlowerLocatorRef],
    social: [socialInfoFlowerLocatorRef], // Add blog section with its locator
  };

  useLayoutEffect(() => {
    const targetLocatorRefs = locatorRefMap[activeSection] || [];
    const currentLocatorRef =
      targetLocatorRefs[activeLocatorIndex] || targetLocatorRefs[0];

    if (currentLocatorRef?.current && heroContainerRef.current) {
      const locatorRect = currentLocatorRef.current.getBoundingClientRect();
      const containerRect = heroContainerRef.current.getBoundingClientRect();

      setFlowerStyle({
        position: "absolute",
        top: locatorRect.top - containerRect.top,
        left: locatorRect.left - containerRect.left,
        zIndex: 50,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition: "top 0.8s ease-in-out, left 0.8s ease-in-out",
      });
    }
  }, [activeSection, activeLocatorIndex]);

  useEffect(() => {
    const sections = [
      { ref: heroContainerRef, name: "hero" },
      { ref: catalogSliderRef, name: "catalog" },
      { ref: storyBookRef, name: "storybook" },
      { ref: ourStoryRef, name: "ourstory" },
      { ref: blogSliderRef, name: "blog" },
      { ref: contactFormRef, name: "contact" },
      { ref: socialInfoRef, name: "social" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.sectionName);
          }
        });
      },
      {
        root: null, // relative to the viewport
        threshold: 0.5, // Trigger when 50% of a section is visible
      }
    );

    sections.forEach((section) => {
      if (section.ref.current) {
        section.ref.current.dataset.sectionName = section.name;
        observer.observe(section.ref.current);
      }
    });

    // Cleanup function to unobserve the element when the component unmounts
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (activeSection === "ourstory" && ourStoryRef.current) {
        const ourStoryRect = ourStoryRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollPosition = -ourStoryRect.top;
        const scrollRatio =
          scrollPosition / (ourStoryRect.height - viewportHeight);

        // Switch to lower locator when scrolled past 50% of the section
        setActiveLocatorIndex(scrollRatio > 0.5 ? 1 : 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleOpenBook = (collectionId) => {
    setSelectedCollectionId(collectionId);
    setTimeout(() => {
      storyBookRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div>
      {heroContainerRef.current &&
        flowerStyle &&
        createPortal(
          <AnimatedCottonFlower
            style={flowerStyle}
            activeSection={activeSection}
          />,
          heroContainerRef.current
        )}
      <Hero
        heroContainerRef={heroContainerRef}
        flowerLocatorRef={flowerLocatorRef}
      />
      <div ref={catalogSliderRef}>
        <CatalogSlider
          collections={collections}
          loading={loading}
          onOpenBook={handleOpenBook}
          flowerLocatorRef={catalogFlowerLocatorRef}
        />
      </div>

      <div ref={storyBookRef}>
        <StoryBook
          selectedCollectionId={selectedCollectionId}
          flowerLocatorRef={storybookFlowerLocatorRef}
        />
      </div>

      <div ref={ourStoryRef}>
        <OurStory
          upperFlowerLocatorRef={ourStoryUpperFlowerLocatorRef}
          lowerFlowerLocatorRef={ourStoryLowerFlowerLocatorRef}
        />
      </div>
      <div ref={blogSliderRef}>
        <BlogSlider flowerLocatorRef={blogSliderFlowerLocatorRef} />
      </div>
      <div ref={contactFormRef}>
        <ContactForm flowerLocatorRef={contactFormFlowerLocatorRef} />
      </div>
      <div ref={socialInfoRef}>
        <SocialInfo flowerLocatorRef={socialInfoFlowerLocatorRef} />
      </div>
    </div>
  );
}
