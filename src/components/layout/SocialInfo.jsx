import React from "react";

// --- Import Social Media Icons ---
import FacebookIcon from "../../img/icon-navbar.svg";
import InstagramIcon from "../../img/icon-navbar-1.svg";
import LineIcon from "../../img/icon-navbar-2.svg";

// --- Import Contact Icons ---
import LocationIcon from "../../img/Group 50.svg";
import TimeIcon from "../../img/Group 51.svg";
import TelIcon from "../../img/Group 52.svg";
import EmailIcon from "../../img/Group 53.svg";

const socialInfoData = {
  address: "3 Floor, Terminal 21 Asoke Bangkok, Thailand",
  openingHours: "10:00 am - 10:00 pm",
  phone: "+66 123 4568",
  email: "cottonclix.official@gmail.com",
  socialLinks: {
    facebook: "#",
    instagram: "#",
    line: "#",
  },
  mapLocation:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.566100709205!2d100.5567683153437!3d13.746400601309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29edcfb15ae2b%3A0xb4e0e5a4fca3f7a5!2sTerminal%2021%20Asok!5e0!3m2!1sen!2sth!4v1620000000000!5m2!1sen!2sth",
};

export default function SocialInfo({ flowerLocatorRef, className = "" }) {
  return (
    <section className={`w-full bg-white py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          {/* Left Column: Contact Information */}
          <div className="max-w-xl mx-auto lg:mx-0">
            <h2 className="text-2xl font-semibold text-stone-800 mb-8 text-center lg:text-left">
              Contact Us
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <img
                  src={LocationIcon}
                  alt=""
                  className="w-5 h-5 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-medium text-stone-700">Address</h3>
                  <p className="text-stone-600">{socialInfoData.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src={TimeIcon}
                  alt=""
                  className="w-5 h-5 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-medium text-stone-700">Opening Hours</h3>
                  <p className="text-stone-600">
                    {socialInfoData.openingHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src={TelIcon}
                  alt=""
                  className="w-5 h-5 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-medium text-stone-700">Phone</h3>
                  <p className="text-stone-600">{socialInfoData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src={EmailIcon}
                  alt=""
                  className="w-5 h-5 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-medium text-stone-700">Email</h3>
                  <p className="text-stone-600">{socialInfoData.email}</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-medium text-stone-700 mb-3">Follow Us</h3>
                <div className="flex items-center gap-5">
                  {[
                    {
                      icon: FacebookIcon,
                      url: socialInfoData.socialLinks.facebook,
                      alt: "Facebook",
                    },
                    {
                      icon: InstagramIcon,
                      url: socialInfoData.socialLinks.instagram,
                      alt: "Instagram",
                    },
                    {
                      icon: LineIcon,
                      url: socialInfoData.socialLinks.line,
                      alt: "Line",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-75 transition-opacity"
                      aria-label={social.alt}
                    >
                      <img
                        src={social.icon}
                        alt={social.alt}
                        className="h-7 w-7"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            ref={flowerLocatorRef}
            className="absolute pointer-events-none bottom-8 left-[38rem]"
          />

          {/* Right Column: Map */}
          <div className="h-96 w-full rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={socialInfoData.mapLocation}
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
