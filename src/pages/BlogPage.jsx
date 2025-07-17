// src/pages/BlogPage.jsx

import React, { useState, useEffect } from "react"; // 1. Import useState และ useEffect
import { Link } from "react-router-dom";
import SocialInfo from "../components/layout/SocialInfo";

// URL ของ API ที่เราจะไปดึงข้อมูล
const API_URL = "https://cottonclix.com/wp-json/wp/v2/posts";

export default function BlogPage() {
  // 2. สร้าง State เพื่อเก็บข้อมูลบทความและสถานะการโหลด
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. ใช้ useEffect เพื่อดึงข้อมูลจาก API แค่ครั้งเดียวเมื่อเปิดหน้า
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPosts(data); // นำข้อมูลที่ได้มาเก็บใน State
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // ตั้งค่าว่าโหลดเสร็จแล้ว (ไม่ว่าจะสำเร็จหรือล้มเหลว)
      }
    };

    fetchPosts();
  }, []); // [] ว่างๆ หมายถึงให้ทำงานแค่ครั้งเดียว

  // 4. แสดงข้อความ "Loading..." ขณะที่กำลังดึงข้อมูล
  if (loading) {
    return <div className="text-center py-40">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900">
            Our Journal
          </h1>
          <p className="mt-4 text-lg text-natural">
            เรื่องราว แรงบันดาลใจ และเกร็ดความรู้จากโลกของ Cottonclix
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {/* 5. เปลี่ยนมา map ข้อมูลจาก State 'posts' แทน */}
          {posts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="group block">
              <div className="overflow-hidden rounded-lg">
                <img
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  src={post.acf.cover_image} // 6. เข้าถึงข้อมูลรูปภาพผ่าน acf
                  alt={post.title.rendered}
                />
              </div>
              <div className="pt-4">
                {/* Categories ยังไม่ได้ดึงมา จะทำในขั้นต่อไป */}
                <h3 className="mt-2 text-xl font-serif text-gray-800 group-hover:text-primary">
                  {post.title.rendered}
                </h3>
                <p
                  className="mt-2 text-natural text-sm h-12 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: post.acf.excerpt }} // 7. ใช้ excerpt จาก acf
                />
                <p className="mt-3 text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-16">
          <span className="px-4 py-2 text-gray-500 cursor-not-allowed">
            {"<"}
          </span>
          <span className="px-4 py-2 bg-primary text-white rounded-md">1</span>
          <span className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer">
            2
          </span>
          <span className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer">
            3
          </span>
          <span className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer">
            {">"}
          </span>
        </div>
      </div>

      <div>
        <SocialInfo />
      </div>
    </div>
  );
}
