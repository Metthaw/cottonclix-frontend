import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/Logo.png';

// 1. URL ของ API สำหรับดึงข้อมูล Linktree Links
const API_URL = 'https://cottonclix.com/wp-json/wp/v2/linktree_link';

export default function LinktreePage() {
  // 2. สร้าง State สำหรับเก็บข้อมูลและสถานะการโหลด
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. ดึงข้อมูลจาก WordPress เมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // จัดระเบียบข้อมูลให้ใช้งานง่าย
        const formattedLinks = data.map(item => ({
          id: item.id,
          name: item.title.rendered,
          url: item.acf.link_url,
        }));
        setLinks(formattedLinks);
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) {
    return <div className="text-center py-40">Loading...</div>;
  }

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* --- Header: โลโก้และชื่อแบรนด์ --- */}
        <div className="text-center mb-12">
          <Link to="/">
            <img src={logo} alt="Cottonclix Logo" className="h-24 w-auto mx-auto mb-4" />
          </Link>
          
        </div>

        {/* --- Links Grid: แสดงผลข้อมูลจาก State --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-16">
          {links.map(link => (
            <a 
              key={link.id} 
              href={link.url} // ใช้ URL ที่มาจาก WordPress
              target="_blank" // เปิดในแท็บใหม่
              rel="noopener noreferrer"
              className="bg-stone-100 p-4 rounded-full flex items-center justify-center text-lg font-semibold hover:bg-stone-200 transition-colors"
            >
              <span>{link.name}</span>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}