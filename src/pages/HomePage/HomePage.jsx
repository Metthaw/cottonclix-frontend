import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

// Import Components
import CatalogSlider from "./CatalogSlider";
import StoryBook from "./StoryBook";
import OurStory from "./OurStory";
import UpperStorySection from "./UpperStorySection";
import LowerStorySection from "./LowerStorySection";
import BlogSlider from "./BlogSlider";
import ContactForm from "./ContactForm";
import Hero from "../HomePage/Hero.jsx";
import AnimatedCottonFlower from "../../components/AnimatedCottonFlower";
import SocialInfo from "../../components/layout/SocialInfo.jsx";
import { ConfigProvider, FloatButton } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const API_URL = "https://cms.cottonclix.com/wp-json/wp/v2/collection?_embed";

export default function HomePage() {
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [loading, setLoading] = useState(true);
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
  const upperStorySectionRef = useRef(null);
  const lowerStorySectionRef = useRef(null);
  const blogSliderRef = useRef(null);
  const contactFormRef = useRef(null);
  const socialInfoRef = useRef(null);

  const rootRef = useRef(null);
  const flowerRef = useRef(null);
  const lastIndexRef = useRef(activeLocatorIndex);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const formattedData = data.map((item) => {
          const acf = item.acf;
          const imagePairs = [];

          if (acf.book_image_1_left && acf.book_image_1_right) {
            imagePairs.push({
              id: `${item.slug}-p1`,
              leftImg: acf.book_image_1_left,
              rightImg: acf.book_image_1_right,
            });
          }
          if (acf.book_image_2_left && acf.book_image_2_right) {
            imagePairs.push({
              id: `${item.slug}-p2`,
              leftImg: acf.book_image_2_left,
              rightImg: acf.book_image_2_right,
            });
          }

          return {
            id: item.slug,
            name: item.title.rendered,
            subtitle: acf.subtitle,
            coverImage: acf.cover_image,
            sliderImagePairs: imagePairs,
            // ✅ เปลี่ยนเป็นดึงข้อมูล 2 fields ใหม่นี้
            storyHeading: acf.story_heading,
            storyParagraphs: acf.story_paragraphs,
          };
        });

        setCollections(formattedData);

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
    upperstory: [ourStoryUpperFlowerLocatorRef],
    lowerstory: [ourStoryLowerFlowerLocatorRef],
    blog: [blogSliderFlowerLocatorRef],
    contact: [contactFormFlowerLocatorRef],
    social: [socialInfoFlowerLocatorRef],
  };

  const getRelativePosition = (curRef, containerRef) => {
    if (!curRef?.current || !containerRef.current) return { x: 0, y: 0 };
    const loc = curRef.current.getBoundingClientRect();
    const cont = containerRef.current.getBoundingClientRect();
    return { x: loc.left - cont.left, y: loc.top - cont.top };
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

  const handleSelectBook = (collectionId) => {
    setSelectedCollectionId(collectionId);
    setTimeout(() => {
      storyBookRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
  };

  useGSAP(
    () => {
      let tl;
      let onScroll;
      const timer = setTimeout(() => {
        const flower = flowerRef.current;
        const heroEl = heroContainerRef.current;
        const target = flowerLocatorRef.current;
        if (!flower || !heroEl || !target) return;
        const { x: tx, y: ty } = getRelativePosition(
          flowerLocatorRef,
          heroContainerRef
        );
        const { width: w } = heroEl.getBoundingClientRect();
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
        onScroll = () => {
          if (tl?.isActive()) {
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
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }
      const locRefs = locatorRefMap[activeSection] || [];
      const curRef = locRefs[activeLocatorIndex] || locRefs[0];
      const sectionRotations = {
        hero: 0,
        catalog: 90,
        storybook: 180,
        ourstory: activeSection === "ourstory" ? 270 : 0,
        upperstory: 270,
        lowerstory: 270,
        blog: 90,
        contact: 180,
        social: 270,
      };
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
    const sections = [
      { ref: heroContainerRef, name: "hero" },
      { ref: catalogSliderRef, name: "catalog" },
      { ref: storyBookRef, name: "storybook" },
      { ref: ourStoryRef, name: "ourstory" },
      { ref: upperStorySectionRef, name: "upperstory" },
      { ref: lowerStorySectionRef, name: "lowerstory" },
      { ref: blogSliderRef, name: "blog" },
      { ref: contactFormRef, name: "contact" },
      { ref: socialInfoRef, name: "social" },
    ];

    // Observer for regular sections
    const mainObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.sectionName);
          }
        });
      },
      {
        root: null,
        threshold: 0.7,
        rootMargin: "0px",
      }
    );

    // Special observer for OurStory section
    const ourStoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isSmallScreen = window.innerWidth < 768;
          const isLandscape = window.innerHeight < window.innerWidth;

          // Adjust threshold based on screen orientation and size
          if (isSmallScreen && isLandscape) {
            // For landscape mobile, use a lower threshold
            if (entry.intersectionRatio > 0.2) {
              setActiveSection(entry.target.dataset.sectionName);
            }
          } else {
            // For portrait and larger screens, use normal threshold
            if (entry.intersectionRatio > 0.3) {
              setActiveSection(entry.target.dataset.sectionName);
            }
          }
        });
      },
      {
        root: null,
        // More granular thresholds for smoother detection
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        // Adjust root margin based on screen orientation
        rootMargin:
          window.innerHeight < window.innerWidth ? "-5% 0px" : "-10% 0px",
      }
    );

    // Add resize handler to update observers when orientation changes
    const handleResize = () => {
      if (ourStoryRef.current) {
        ourStoryObserver.unobserve(ourStoryRef.current);
        ourStoryObserver.observe(ourStoryRef.current);
      }
    };

    window.addEventListener("resize", handleResize);

    // Observe sections with appropriate observer
    sections.forEach((section) => {
      if (section.ref.current) {
        section.ref.current.dataset.sectionName = section.name;

        if (section.name === "ourstory") {
          ourStoryObserver.observe(section.ref.current);
        } else {
          mainObserver.observe(section.ref.current);
        }
      }
    });

    // Cleanup
    return () => {
      mainObserver.disconnect();
      ourStoryObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update the scroll handler for better responsiveness
  useEffect(() => {
    const handleScroll = () => {
      if (activeSection === "ourstory" && ourStoryRef.current) {
        const ourStoryRect = ourStoryRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollPosition = -ourStoryRect.top;
        const scrollRatio =
          scrollPosition / (ourStoryRect.height - viewportHeight);

        // Add debouncing and smoother threshold
        const threshold = window.innerWidth < 768 ? 0.4 : 0.5;
        setActiveLocatorIndex(scrollRatio > threshold ? 1 : 0);
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

  const selectedCollectionData =
    collections.find((c) => c.id === selectedCollectionId) || null;

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
            className="w-[25%] h-auto absolute opacity-0 pointer-events-none"
            style={{
              willChange: "transform, opacity",
              // Dynamically adjust z-index based on active section
              zIndex:
                activeSection === "contact" || activeSection === "blog"
                  ? 10
                  : 40,
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
          onClickBook={handleSelectBook}
          flowerLocatorRef={catalogFlowerLocatorRef}
        />
      </div>

      <div ref={storyBookRef}>
        <StoryBook
          collectionData={selectedCollectionData}
          flowerLocatorRef={storybookFlowerLocatorRef}
        />
      </div>

      {/* <div ref={ourStoryRef}>
        <OurStory
          upperFlowerLocatorRef={ourStoryUpperFlowerLocatorRef}
          lowerFlowerLocatorRef={ourStoryLowerFlowerLocatorRef}
        />
      </div> */}
      
      <div ref={upperStorySectionRef}>
        <UpperStorySection flowerLocatorRef={ourStoryUpperFlowerLocatorRef} />
      </div>
      <div ref={lowerStorySectionRef}>
        <LowerStorySection flowerLocatorRef={ourStoryLowerFlowerLocatorRef} />
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
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: "#856647",
          },
        }}
      >
        <FloatButton.BackTop
          icon={
            <ArrowUpOutlined style={{ color: "white", fontSize: "1rem" }} />
          }
          className="fixed bottom-8 right-8 shadow-xl rounded-full"
          visibilityHeight={400}
        />
      </ConfigProvider>
    </motion.div>
  );
}
