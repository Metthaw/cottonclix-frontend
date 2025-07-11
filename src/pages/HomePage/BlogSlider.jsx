// // src/pages/HomePage/BlogSlider.jsx

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

// // --- ข้อมูลบทความจำลอง (Mock Data) ---
// const blogPosts = [
//   { 
//     id: 1, 
//     title: 'The Secret to Perfect Scrunchies', 
//     image: 'https://via.placeholder.com/400x500?text=Blog+1',
//     link: 'https://www.youtube.com' 
//   },
//   { 
//     id: 2, 
//     title: 'Why Handmade Matters', 
//     image: 'https://via.placeholder.com/400x500?text=Blog+2',
//     link: 'https://www.youtube.com'
//   },
//   { 
//     id: 3, 
//     title: 'A Touch of Nature in Every Stitch', 
//     image: 'https://via.placeholder.com/400x500?text=Blog+3',
//     link: 'https://www.youtube.com'
//   },
//   { 
//     id: 4, 
//     title: 'Seasonal Fabric Guide: Spring', 
//     image: 'https://via.placeholder.com/400x500?text=Blog+4',
//     link: 'https://www.youtube.com'
//   },
//   { 
//     id: 5, 
//     title: 'Behind The Scenes at Cottonclix', 
//     image: 'https://via.placeholder.com/400x500?text=Blog+5',
//     link: 'https://www.youtube.com'
//   },
// ];

// export default function BlogSlider() {
//   return (
//     <section className="w-full bg-stone-50 py-20 md:py-32">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl md:text-5xl font-serif text-stone-800 text-center mb-12">From Our Blog</h2>
//         <Swiper
//           modules={[Pagination]}
//           spaceBetween={30}
//           slidesPerView={1}
//           pagination={{ clickable: true }}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             768: { slidesPerView: 3 },
//             1024: { slidesPerView: 4 },
//           }}
//           className="pb-12" // เพิ่ม padding ด้านล่างสำหรับ pagination
//         >
//           {blogPosts.map((post) => (
//             <SwiperSlide key={post.id}>
//               <a href={post.link} target="_blank" rel="noopener noreferrer" className="group block">
//                 <div className="overflow-hidden rounded-lg shadow-md">
//                   <img 
//                     src={post.image} 
//                     alt={post.title}
//                     className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//                 <h3 className="text-lg font-semibold text-stone-700 mt-4 group-hover:text-amber-800 transition-colors duration-300">
//                   {post.title}
//                 </h3>
//               </a>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }

// src/pages/HomePage/BlogSlider.jsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// 1. นำเข้าข้อมูลจาก mockData.js และ Link จาก react-router-dom
import { blogPosts } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function BlogSlider() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 text-center mb-12">From Our Journal</h2>
        <Swiper
          // (ส่วนคอนฟิกของ Swiper เหมือนเดิม)
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {/* 2. ใช้ข้อมูล "blogPosts" ชุดใหม่ที่ import เข้ามา */}
          {blogPosts.map((post) => (
            <SwiperSlide key={post.id}>
              {/* 3. ทำให้แต่ละสไลด์เป็นลิงก์ไปยังหน้ารายละเอียดที่ถูกต้อง */}
              <Link to={`/blog/${post.id}`} className="group block">
                <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200">
                  <img 
                    // 4. ใช้ key "imageUrl" จากข้อมูลชุดใหม่
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-serif text-gray-700 mt-4 group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}