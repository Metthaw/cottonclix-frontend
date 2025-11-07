import React, { useRef, useEffect } from "react";
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link as RouterLink } from "react-router-dom";

// Import images
import branch1 from "../../img/oelement2.svg";
import Vector from "../../img/Group 8.svg";

const LowerStorySection = ({ flowerLocatorRef }) => {
  const singleBranchRef = useRef(null);
  const logoRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Data for the component
  const data = {
    leftParagraphs: [
      "We use high quality cotton blends, warm and cheerful patterns, and simple-yet-premium designs to create special little gifts – whether it's a fabric scrunchie, a small pouch, a mini tote, or a tiny keepsake full of love.",
      "What we're proud of isn't just the 'thing' you receive, but the 'feeling' that comes with it.",
    ],
    rightList: [
      "Homemade warmth.",
      "Hand-wrapped cuteness.",
      "Care in every stitch.",
    ],
    rightParagraphs: [
      "Because we believe the best gifts aren't just objects they're the feelings that make someone smile.",
      "Cottonclix wants to be a small part of those moments — when you want someone to know",
    ],
    quote: "“I care.”",
    vector: Vector,
  };

  // Text styling function
  const renderStyledText = (text, wordsToStyle, className) => {
    const wordsArray = Array.isArray(wordsToStyle)
      ? wordsToStyle
      : [wordsToStyle];
    if (!wordsArray.length || !text) return text;

    const regex = new RegExp(`(${wordsArray.join("|")})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part) =>
          wordsArray.find(
            (word) => word.toLowerCase() === part.toLowerCase()
          ) ? (
            <span key={part} className={className}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // Animation logic
  useEffect(() => {
    const handleFocus = () => {
      // Animate the line art
      gsap.fromTo(
        singleBranchRef.current,
        { x: 100, opacity: 0, duration: 1, ease: "sine.inOut" },
        { x: 0, opacity: 1, duration: 1, ease: "sine.inOut" }
      );

      // Animate the logo
      gsap.fromTo(
        logoRef.current,
        { rotate: -90, duration: 1, ease: "sine.inOut" },
        { rotate: 0, duration: 1, ease: "sine.inOut" }
      );

      // Animate content
      gsap.fromTo(
        contentRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    };

    const handleBlur = () => {
      gsap.to(singleBranchRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "sine.inOut",
      });
      gsap.to(logoRef.current, {
        rotate: -90,
        duration: 0.8,
        ease: "sine.inOut",
      });
      gsap.to(contentRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in",
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleFocus();
        } else {
          handleBlur();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div ref={containerRef} className="min-h-[50vh] flex flex-col my-[10%]">
          {/* Two Column Content */}
          <div
            ref={contentRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16"
          >
            {/* Left Column */}
            <div className="space-y-4 md:space-y-6">
              {data.leftParagraphs.map((text) => (
                <div key={text.slice(0, 10)} className="content-item">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-left leading-relaxed">
                    {renderStyledText(
                      text,
                      ["“thing”", "“feeling”"],
                      "font-bold"
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="relative">
              <img
                ref={singleBranchRef}
                src={branch1}
                alt="Line Art"
                className="absolute hidden md:block top-[-25%] right-0 md:right-[-10%] w-[40%] h-auto scale-y-[-1] rotate-90 drop-shadow-2xl"
              />
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2 text-[#111000]">
                  {data.rightList.map((item) => (
                    <p
                      key={item}
                      className="content-item text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-left"
                    >
                      {item}
                    </p>
                  ))}
                </div>
                {data.rightParagraphs.map((text) => (
                  <p
                    key={text.slice(0, 10)}
                    className="content-item text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-left leading-relaxed"
                  >
                    {renderStyledText(
                      text,
                      "Cottonclix",
                      "text-[#8C5F31] font-bold"
                    )}
                  </p>
                ))}
                <RouterLink
                  to={"/about"}
                  rel="noopener noreferrer"
                  className="content-item text-[#8C5F31] font-bold underline hover:text-[#A7723C] transition-colors block"
                >
                  Read more ...
                </RouterLink>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="relative mt-12 sm:mt-16 md:mt-20">
            <div
              ref={flowerLocatorRef}
              className="absolute left-[15%] top-[10%]"
            />
            <div className="flex flex-col items-center space-y-4">
              <p className="content-item font-bold text-xl sm:text-2xl md:text-3xl text-[#8C5F31] text-center">
                {data.quote}
              </p>
              <img
                ref={logoRef}
                src={data.vector}
                alt="Logo"
                className="w-16 sm:w-18 md:w-20 lg:w-24 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LowerStorySection;
