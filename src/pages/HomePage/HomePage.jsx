import React, { useRef, useState, useEffect } from "react";
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

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const API_URL = "https://cottonclix.com/wp-json/wp/v2/collection";

export default function HomePage() {
  // State สำหรับเก็บข้อมูลทั้งหมด
  const [collections, setCollections] = React.useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const [activeSection, setActiveSection] = useState("hero");
  const [activeLocatorIndex, setActiveLocatorIndex] = useState(0);
  const [isHeroReady, setIsHeroReady] = useState(false);

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

  const rootRef = useRef(null);
  const flowerRef = useRef(null);
  const lastIndexRef = useRef(activeLocatorIndex);
  const isInitialRender = useRef(true);

  // ดึงข้อมูล Collection ที่นี่ที่เดียว

  const locatorRefMap = {
    hero: [flowerLocatorRef],
    catalog: [catalogFlowerLocatorRef],
    storybook: [storybookFlowerLocatorRef],
    ourstory: [ourStoryUpperFlowerLocatorRef, ourStoryLowerFlowerLocatorRef],
    blog: [blogSliderFlowerLocatorRef],
    contact: [contactFormFlowerLocatorRef],
    social: [socialInfoFlowerLocatorRef], // Add blog section with its locator
  };

  const getRelativePosition = (curRef, containerRef) => {
    if (!curRef?.current || !containerRef.current) return { x: 0, y: 0 };

    const loc = curRef.current.getBoundingClientRect();
    const cont = containerRef.current.getBoundingClientRect();

    return {
      x: loc.left - cont.left,
      y: loc.top - cont.top,
    };
  };

  const handleOpenBook = (collectionId) => {
    setSelectedCollectionId(collectionId);
    setTimeout(() => {
      storyBookRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // Initial "falling flower" animation - runs only once on the main wrapper
  useGSAP(
    () => {
      let tl;
      let onScroll;

      // small timeout so Hero and portal have rendered
      const timer = setTimeout(() => {
        const flower = flowerRef.current;
        const heroEl = heroContainerRef.current;
        const target = flowerLocatorRef.current;
        if (!flower || !heroEl || !target) return;

        // compute drop target
        const { x: tx, y: ty } = getRelativePosition(
          flowerLocatorRef,
          heroContainerRef
        );
        const { width: w } = heroEl.getBoundingClientRect();

        // build the intro timeline
        tl = gsap.timeline({
          defaults: { duration: 2.2, ease: "power2.out" },
        });

        tl.set(flower, {
          x: w / 2,
          y: "-100vh",
          opacity: 1,
          rotation: -60,
        });
        tl.to(flower, { x: tx, y: ty, rotation: 0, opacity: 1 });

        // scroll interrupt: if running and user scrolls, jump to end
        onScroll = () => {
          if (tl && tl.isActive()) {
            tl.progress(1, false);
            window.removeEventListener("scroll", onScroll);
          }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
      }, 50);

      return () => {
        clearTimeout(timer);
        if (onScroll) window.removeEventListener("scroll", onScroll);
        if (tl) tl.kill();
      };
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      // Prevent this animation from running on the initial render,
      // as the "falling flower" animation handles the initial state.
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }

      // console.log("activeSection", activeSection);

      const locRefs = locatorRefMap[activeSection] || [];
      const curRef = locRefs[activeLocatorIndex] || locRefs[0];

      // Define fixed rotation degrees for each section
      const sectionRotations = {
        hero: 0,
        catalog: 90,
        storybook: 180,
        ourstory: activeSection === "ourstory" ? 270 : 0, // Special handling for OurStory
        blog: 90,
        contact: 180,
        social: 270,
      };

      // For OurStory section, we'll use the activeLocatorIndex to determine rotation
      if (activeSection === "ourstory") {
        sectionRotations.ourstory = activeLocatorIndex === 0 ? 270 : 0;
      }

      const targetRotation = sectionRotations[activeSection] || 0;
      lastIndexRef.current = activeLocatorIndex;

      if (!curRef?.current || !flowerRef.current || !heroContainerRef.current)
        return;

      const { x, y } = getRelativePosition(curRef, heroContainerRef);

      gsap.to(flowerRef.current, {
        x,
        y,
        rotation: targetRotation,
        duration: 1.2,
        ease: "slow(0.7, 0.7)",
      });
    },
    { scope: rootRef, dependencies: [activeSection, activeLocatorIndex] }
  );

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
        threshold: 0.4, // Trigger when 40% of a section is visible
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

  useEffect(() => {
    if (heroContainerRef.current) {
      setIsHeroReady(true);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1 }}
      ref={rootRef}
    >
      {heroContainerRef.current &&
        isHeroReady &&
        createPortal(
          <div
            ref={flowerRef}
            className="w-[25%] h-auto absolute opacity-0 pointer-events-none z-40"
            style={{
              willChange: "transform, opacity",
            }}
          >
            <AnimatedCottonFlower />
          </div>,
          heroContainerRef.current
        )}

      <Hero
        containerRef={heroContainerRef}
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
    </motion.div>
  );
}
