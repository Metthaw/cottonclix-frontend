import React from 'react';
import { Link } from 'react-router-dom';
// Import โลโก้หลัก
import logoSrc from '../../img/Vector.svg';

// Import ไอคอน Social Media ทั้งสามไฟล์เข้ามา
import facebookIcon from '../../img/icon-navbar.svg';
import instagramIcon from '../../img/icon-navbar-1.svg';
import lineIcon from '../../img/icon-navbar-2.svg';


// --- Component ย่อย: โลโก้ (ยังคงแยกไว้เพื่อความเรียบร้อย) ---
const Logo = () => (
  <Link to="/" className="h-16 w-16 flex-shrink-0">
    <img src={logoSrc} alt="Cottonclix Logo" className="h-full w-full object-contain" />
  </Link>
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
        <div className="hidden md:flex justify-center items-center space-x-[128px] ">
          
          {/* เมนูฝั่งซ้าย */}
          <nav className="flex items-center space-x-[128px] text-stone-700 font-semibold text-base ">
            {leftMenuItems.map((item) => {
              const className = "hover:text-amber-800 transition-colors duration-300";
              // --- ส่วนที่แก้ไข ---
              if (item === 'Our Story') {
                return <Link key={item} to="/about" className={className}>{item}</Link>;
              }
              if (item === 'Blog') {
                return <Link key={item} to="/blog" className={className}>{item}</Link>;
              }
              // ถ้าไม่ใช่ ให้ใช้ <a> สำหรับ Anchor link เหมือนเดิม
              return <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={className}>{item}</a>;
            })}
          </nav>

          {/* โลโก้ตรงกลาง */}
          <Logo />

          {/* เมนูฝั่งขวา */}
          <nav className="flex items-center space-x-[128px] text-stone-700 font-semibold text-base">
            {rightMenuItems.map((item) => (
              // ส่วนนี้เป็น Anchor Link ทั้งหมด ใช้ <a> เหมือนเดิม
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-amber-800 transition-colors duration-300">
                {item}
              </a>
            ))}
          </nav>

          {/* ไอคอนโซเชียลฝั่งขวาสุด */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
                // ส่วนนี้เป็นลิงก์ภายนอก ใช้ <a> เหมือนเดิม
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="h-7 w-7 text-stone-700 hover:text-amber-800 transition-colors">
                  <img src={social.icon} alt={`${social.name} icon`} className="h-full w-full" />
                </a>
            ))}
          </div>
        </div>

        {/* --- Layout สำหรับจอ Mobile (เล็กกว่า md) --- */}
        <div className="md:hidden flex justify-between items-center h-16">
          <Link to="/" className="h-12 w-12 flex-shrink-0">
            <img src={logoSrc} alt="Cottonclix Logo" className="h-full w-full object-contain" />
          </Link>
          <button className="text-amber-800 text-3xl">
            &#9776;
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;