// // src/pages/BlogDetailsPage.jsx

// import React from 'react';
// import { useParams } from 'react-router-dom'; // 1. Import useParams
// import { blogPosts } from '../data/mockData'; // 2. Import ข้อมูลบทความ

// const BlogDetailsPage = () => {
//   // 3. ใช้ useParams เพื่อดึงค่า blogId จาก URL
//   const { blogId } = useParams();

//   // 4. ค้นหาบทความที่ตรงกับ ID ที่ได้มา
//   // เราใช้ parseInt() เพื่อแปลง blogId (ที่เป็น string) ให้เป็น number ก่อนเปรียบเทียบ
//   const post = blogPosts.find(p => p.id === parseInt(blogId));

//   // 5. กรณีหาบทความไม่เจอ (เช่นใส่ URL ผิด)
//   if (!post) {
//     return (
//       <div className="text-center py-20 pt-20">
//         <h1 className="text-2xl">Blog Post Not Found!</h1>
//       </div>
//     );
//   }

//   // 6. แสดงผลเบื้องต้นเพื่อทดสอบ
//   return (
//     <div className="text-center py-20 ">
//       <h1>{post.title}</h1>
//       {/* เราจะสร้าง UI ที่สวยงามตามดีไซน์ในขั้นต่อไป */}
//     </div>
//   );
// };

// export default BlogDetailsPage;


// src/pages/BlogDetailsPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/mockData';

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(blogId));

  // ส่วน Recents (บทความล่าสุด) สามารถดึงมาแสดงได้
  const recentPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  if (!post) {
    return <div className="text-center py-20"><h1>Blog Post Not Found!</h1></div>;
  }

  return (
    <div className="bg-gray-50 pt-20">
      {/* 1. Hero Image */}
      <div 
        className="w-full h-80 md:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${post.imageUrl})` }}
      ></div>

      {/* 2. Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Post Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-widest">{post.category}</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mt-2">{post.title}</h1>
          <p className="text-natural mt-4">By {post.author} on {post.date}</p>
        </div>

        {/* Post Body - วนลูปแสดงผลเนื้อหา */}
        <div className="prose lg:prose-xl max-w-none mx-auto text-natural">
          {post.content && post.content.map((block, index) => {
            if (block.type === 'paragraph') {
              return <p key={index}>{block.text}</p>;
            }
            if (block.type === 'image') {
              return <img key={index} src={block.url} alt={block.alt} className="rounded-lg shadow-md my-8" />;
            }
            return null;
          })}
        </div>
      </article>

      {/* 3. Recent Posts Section */}
      <section className="">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-serif text-center ">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map(recent => (
              <Link to={`/blog/${recent.id}`} key={recent.id} className="group block">
                <div className="overflow-hidden rounded-lg">
                  <img src={recent.imageUrl} alt={recent.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-serif mt-4 group-hover:text-primary">{recent.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;