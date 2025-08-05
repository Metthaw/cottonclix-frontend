import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoSrc from "../../img/Group 8.svg";
import facebookIcon from "../../img/icon-navbar.svg";
import instagramIcon from "../../img/icon-navbar-1.svg";
import lineIcon from "../../img/icon-navbar-2.svg";

const Logo = ({ className = "" }) => (
  <Link to="/" className={`flex-shrink-0 ${className}`}>
    <img
      src={logoSrc}
      alt="Cottonclix Logo"
      className="h-full w-full object-contain"
    />
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/cottonclix",
      icon: facebookIcon,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/cottonclix.official?igsh=OXkyMGY1dXl2aHRl&utm_source=qr",
      icon: instagramIcon,
    },
    { name: "Line", href: "https://lin.ee/iv9KnOe", icon: lineIcon },
  ];

  const renderMenuItem = (item) => {
    const className = "hover:text-amber-800 transition-colors duration-300";

    switch (item) {
      case "Our Story":
        return (
          <Link key={item} to="/about" className={className}>
            {item}
          </Link>
        );
      case "Blog":
        return (
          <Link key={item} to="/blog" className={className}>
            {item}
          </Link>
        );
      case "Contact":
        return (
          <a key={item} href="/#contact-form" className={className}>
            {item}
          </a>
        );
      case "Subscribe":
        return (
          <a key={item} href="/#subscribe-form" className={className}>
            {item}
          </a>
        );
      case "Index":
        return (
          <Link key={item} to="/index" className={className}>
            {item}
          </Link>
        );
      default:
        return (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className={className}
          >
            {item}
          </a>
        );
    }
  };

  return (
    <header className="w-full bg-white py-2 sm:py-3 px-3 sm:px-4 md:px-6 lg:px-8 relative z-50">
      <div className="container mx-auto">
        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Menu */}
          <nav className="flex-1 flex justify-center">
            <div className="flex space-x-4 sm:space-x-6 lg:space-x-10 xl:space-x-12 text-sm sm:text-base lg:text-lg">
              {leftMenuItems.map((item) => renderMenuItem(item))}
            </div>
          </nav>

          {/* Center Logo */}
          <div className="flex-shrink-0 px-3 sm:px-6 lg:px-8">
            <Logo className="block h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24" />
          </div>

          {/* Right Content */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center">
              {/* Right Menu */}
              <nav className="flex space-x-4 sm:space-x-6 lg:space-x-10 xl:space-x-12 text-sm sm:text-base lg:text-lg">
                {rightMenuItems.map((item) => renderMenuItem(item))}
              </nav>

              {/* Social Icons */}
              <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 ml-4 sm:ml-6 lg:ml-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-stone-700 hover:text-amber-800 transition-colors"
                  >
                    <img
                      src={social.icon}
                      alt={`${social.name} icon`}
                      className="h-full w-full object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between relative z-10 bg-white">
          <Logo className="h-12 w-12" />

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
          className={`md:hidden absolute left-0 right-0 w-full bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          style={{
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
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
