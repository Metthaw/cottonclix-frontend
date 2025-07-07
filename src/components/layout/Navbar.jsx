import React from 'react';
// Import โลโก้หลัก
import logoSrc from '../../img/Vector.svg';

// Import ไอคอน Social Media ทั้งสามไฟล์เข้ามา
import facebookIcon from '../../img/icon-navbar.svg';
import instagramIcon from '../../img/icon-navbar-1.svg';
import lineIcon from '../../img/icon-navbar-2.svg';


// --- Component ย่อย: โลโก้ (ยังคงแยกไว้เพื่อความเรียบร้อย) ---
const Logo = () => (
  <a href="/" className="h-16 w-16 flex-shrink-0">
    <img src={logoSrc} alt="Cottonclix Logo" className="h-full w-full object-contain" />
  </a>
);


// --- Navbar Component หลัก (ปรับแก้โครงสร้างทั้งหมด) ---
const Navbar = () => {
  // ข้อมูลสำหรับเมนูและโซเชียลมีเดีย
  const leftMenuItems = ['Our Story', 'Blog', 'Contact'];
  const rightMenuItems = ['Subscribe', 'Index'];
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: facebookIcon },
    { name: 'Instagram', href: '#', icon: instagramIcon },
    { name: 'Line', href: '#', icon: lineIcon },
  ];

  return (
    <header className="w-full h-[10px] bg-white py-4 px-6 pt-10 rounded-lg ">
      <div className="container mx-auto ">

        {/* --- Layout สำหรับจอ Desktop (md ขึ้นไป) --- */}
        {/* บล็อกนี้จะแสดงผลเมื่อหน้าจอกว้างกว่าขนาด md */}
        <div className="hidden md:flex justify-center items-center space-x-[128px] ">
            
          {/* เมนูฝั่งซ้าย */}
          <nav className="flex items-center space-x-[128px] text-stone-700 font-semibold text-base ">
            {leftMenuItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-amber-800 transition-colors duration-300">
                {item}
              </a>
            ))}
          </nav>

          {/* โลโก้ตรงกลาง */}
          <Logo />

          {/* เมนูฝั่งขวา */}
          <nav className="flex items-center space-x-[128px] text-stone-700 font-semibold text-base">
            {rightMenuItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-amber-800 transition-colors duration-300">
                {item}
              </a>
            ))}
          </nav>

          {/* ไอคอนโซเชียลฝั่งขวาสุด */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
                <a key={social.name} href={social.href} className="h-7 w-7 text-stone-700 hover:text-amber-800 transition-colors">
                  <img src={social.icon} alt={`${social.name} icon`} className="h-full w-full" />
                </a>
            ))}
          </div>

        </div>

        {/* --- Layout สำหรับจอ Mobile (เล็กกว่า md) --- */}
        {/* บล็อกนี้จะแสดงผลเฉพาะบนจอมือถือ */}
        <div className="md:hidden flex justify-between items-center h-16">
          {/* โลโก้ (ย้ายมาฝั่งซ้ายบนมือถือเพื่อความเรียบง่าย) */}
          <a href="/" className="h-12 w-12 flex-shrink-0">
              <img src={logoSrc} alt="Cottonclix Logo" className="h-full w-full object-contain" />
          </a>

          {/* ปุ่ม Hamburger */}
          <button className="text-amber-800 text-3xl">
            &#9776;
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
