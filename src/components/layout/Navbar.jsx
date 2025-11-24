import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoSrc from "../../img/Group 8.svg";
import logoMobileSrc from "../../img/LogoMobile.svg";
import facebookIcon from "../../img/icon-navbar.svg";
import instagramIcon from "../../img/icon-navbar-1.svg";
import lineIcon from "../../img/icon-navbar-2.svg";
import { gsap } from "gsap";

const API_URL = "https://cms.cottonclix.com/wp-json/wp/v2/linktree_link";

const Logo = ({ className = "" }) => (
  <Link to="/" className={`flex-shrink-0 ${className}`}>
    <img
      src={logoSrc}
      alt="Cottonclix Logo"
      className="h-full w-full object-contain"
    />
  </Link>
);

const MobileLogo = ({ className = "" }) => (
  <Link to="/" className={`flex-shrink-0 ${className}`}>
    <img
      src={logoMobileSrc}
      alt="Cottonclix Logo"
      className="h-full w-full object-contain"
    />
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const menuRef = useRef(null);
  const menuTl = useRef();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const iconMap = {
          Facebook: facebookIcon,
          Instagram: instagramIcon,
          "Line Official": lineIcon,
        };

        const formattedLinks = data
          .filter((link) => iconMap[link.title.rendered])
          .map((link) => ({
            name: link.title.rendered,
            href: link.acf.link_url,
            icon: iconMap[link.title.rendered],
          }));

        setSocialLinks(formattedLinks);
      } catch (error) {
        console.error("Failed to fetch social links for Navbar:", error);
      }
    };
    fetchLinks();
  }, []);

  useEffect(() => {
    // Create the animation timeline
    menuTl.current = gsap.timeline({ paused: true }).fromTo(
      menuRef.current,
      {
        opacity: 0,
        y: -20,
        display: "none",
        duration: 0.3,
        ease: "power2.out",
      },
      {
        opacity: 1,
        y: 0,
        display: "block",
        duration: 0.3,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    // Play or reverse the animation based on menu state
    if (isMenuOpen) {
      menuTl.current.play();
    } else {
      menuTl.current.reverse();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const leftMenuItems = ["Our Story", "Blog", "Contact"];
  const rightMenuItems = ["Subscribe", "Index"];

  const smoothScrollTo = (targetId) => {
    if (!targetId) return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    // Temporarily add a class to indicate programmatic scroll
    document.body.classList.add('programmatic-scroll');
    
    window.scrollTo({
      top: targetElement.offsetTop - 100, // 100px offset from top
      behavior: 'smooth'
    });
    
    // Remove the class after scroll completes
    setTimeout(() => {
      document.body.classList.remove('programmatic-scroll');
    }, 1000);
  };

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (target.startsWith('#')) {
      smoothScrollTo(target);
    } else {
      window.location.href = target;
    }
  };

  const renderMenuItem = (item) => {
    const className = "hover:text-amber-800 transition-colors duration-300 cursor-pointer";
    
    const getHref = () => {
      switch (item) {
        case "Our Story": return "/about";
        case "Blog": return "/blog";
        case "Contact": return "#contact-form";
        case "Subscribe": return "#subscribe-form";
        case "Index": return "/index";
        case "Privacy Policy": return "/policy";
        default: return `#${item.toLowerCase().replace(" ", "-")}`;
      }
    };
    
    const href = getHref();
    
    return (
      <a
        key={item}
        href={href}
        className={className}
        onClick={(e) => handleNavClick(e, href)}
      >
        {item}
      </a>
    );
  
  };

  return (
    <header className="w-full bg-white py-2 sm:py-3 px-3 sm:px-2 md:px-4 lg:px-6 relative z-50">
      <div className="container mx-auto font-medium">
        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex items-center justify-between gap-12 lg:gap-16 xl:gap-20 max-w-[90%] mx-auto">
          {/* Left Menu */}
          <nav className="flex-1 flex justify-end">
            <div className="flex items-center gap-8 lg:gap-12 xl:gap-16 text-sm sm:text-base lg:text-lg">
              {leftMenuItems.map((item) => renderMenuItem(item))}
            </div>
          </nav>

          {/* Center Logo */}
          <div className="flex-shrink-0">
            <Logo className="block h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18 xl:h-20 xl:w-20" />
          </div>

          {/* Right Content */}
          <div className="flex-1 flex justify-start">
            <div className="flex items-center gap-8 lg:gap-12 xl:gap-16">
              {/* Right Menu */}
              <nav className="flex items-center gap-8 lg:gap-12 xl:gap-16 text-sm sm:text-base lg:text-lg">
                {rightMenuItems.map((item) => renderMenuItem(item))}
              </nav>

              {/* Social Icons */}
              <div className="flex items-center gap-1 lg:gap-1 xl:gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-4 w-4 sm:h-8 sm:w-8 lg:h-10 lg:w-10 hover:text-amber-800 "
                  >
                    <img
                      src={social.icon}
                      alt={`${social.name} icon`}
                      className="h-auto w-auto object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between relative z-50 bg-white">
          <MobileLogo className="h-12 w-auto block" />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-amber-800 text-3xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className="md:hidden absolute w-full bg-white shadow-lg hidden"
        >
          <div className="container mx-auto px-4 pt-2 pb-6 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 text-lg">
              {[...leftMenuItems, ...rightMenuItems].map((item) => (
                <div key={item} className="py-2">
                  {renderMenuItem(item)}
                </div>
              ))}
            </nav>

            <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 text-stone-700 hover:text-amber-800"
                >
                  <img
                    src={social.icon}
                    alt={`${social.name} icon`}
                    className="h-full w-full"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
