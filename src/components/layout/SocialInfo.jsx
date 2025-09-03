import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// --- Import Social Media Icons ---
import FacebookIcon from "../../img/icon-navbar.svg";
import InstagramIcon from "../../img/icon-navbar-1.svg";
import LineIcon from "../../img/icon-navbar-2.svg";

// --- Import Contact Icons ---
import LocationIcon from "../../img/Group 50.svg";
import TimeIcon from "../../img/Group 51.svg";
import TelIcon from "../../img/Group 52.svg";
import EmailIcon from "../../img/Group 53.svg";

const API_URL = "https://cms.cottonclix.com/wp-json/wp/v2/linktree_link";

const staticInfo = {
  address: "3 Floor, Terminal 21 Asoke Bangkok, Thailand",
  openingHours: "10:00 am - 10:00 pm",
  phone: "+66 123 4568",
  email: "cottonclix.official@gmail.com",
  mapLocation:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.566100709205!2d100.5567683153437!3d13.746400601309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29edcfb15ae2b%3A0xb4e0e5a4fca3f7a5!2sTerminal%2021%20Asok!5e0!3m2!1sen!2sth!4v1620000000000!5m2!1sen!2sth",
};

export default function SocialInfo({ flowerLocatorRef }) {
  const mainRef = useRef(null);
  const headerRef = useRef(null);
  const mapRef = useRef(null);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const iconMap = {
          Facebook: FacebookIcon,
          Instagram: InstagramIcon,
          "Line Official": LineIcon,
        };

        const formattedLinks = data
          .filter((link) => iconMap[link.title.rendered])
          .map((link) => ({
            icon: iconMap[link.title.rendered],
            url: link.acf.link_url,
            alt: link.title.rendered,
          }));

        setSocialLinks(formattedLinks);
      } catch (error) {
        console.error("Failed to fetch social links for SocialInfo:", error);
      }
    };
    fetchLinks();
  }, []);

  useGSAP(
    () => {
      const mainEl = mainRef.current;
      if (!mainEl) return;

      const handleFocus = () => {
        gsap.fromTo(
          headerRef.current,
          {
            x: 80,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          mapRef.current,
          {
            x: 200,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      };

      const handleBlur = () => {
        gsap.fromTo(
          headerRef.current,
          {
            x: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 80,
            duration: 1,
            ease: "sine.inOut",
          }
        );

        gsap.fromTo(
          mapRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
          },
          {
            x: 200,
            opacity: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );
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

      observer.observe(mainEl);

      return () => observer.disconnect();
    },
    { scope: mainRef }
  );

  return (
    <section
      ref={mainRef}
      className="w-full bg-white py-8 sm:py-12 md:py-16 min-h-fit"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Column: Contact Information */}
          <div className="w-full max-w-xl mx-auto lg:mx-0">
            <h2
              ref={headerRef}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-stone-800 mb-6 sm:mb-8 text-center lg:text-left"
            >
              Contact
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Contact Info Items */}
              <div className="flex items-start gap-3 sm:gap-4">
                <img
                  src={LocationIcon}
                  alt=""
                  className="w-auto sm:w-5 h-auto sm:h-5 flex-shrink-0 "
                />
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-stone-700">
                    Address
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600">
                    {staticInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <img
                  src={TimeIcon}
                  alt=""
                  className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-stone-700">
                    Opening Hours
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600">
                    {staticInfo.openingHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <img
                  src={TelIcon}
                  alt=""
                  className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-stone-700">
                    Phone
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600">
                    {staticInfo.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <img
                  src={EmailIcon}
                  alt=""
                  className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-stone-700">
                    Email
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600">
                    {staticInfo.email}
                  </p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 sm:pt-6">
                <h3 className="text-sm sm:text-base font-medium text-stone-700 mb-3">
                  Follow Us
                </h3>
                <div className="flex items-center gap-4 sm:gap-5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-75 transition-opacity"
                      aria-label={social.alt}
                    >
                      <img
                        src={social.icon}
                        alt={social.alt}
                        className="h-6 w-6 sm:h-7 sm:w-7"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Flower Locator */}
          <div
            ref={flowerLocatorRef}
            className="absolute pointer-events-none bottom-[10%] sm:bottom-[15%] left-[5%] sm:left-[10%]"
          />

          {/* Right Column: Map */}
          <div
            ref={mapRef}
            className="h-72 sm:h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mt-6 lg:mt-0"
          >
            <iframe
              src={staticInfo.mapLocation}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="CottonClix Location"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
