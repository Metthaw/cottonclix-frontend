// src/pages/BlogPage.jsx

import React from 'react';

import { blogPosts } from '../data/mockData'; // Import ข้อมูลบทความ
import BlogPostCard from '../components/BlogPostCard'; // Import Card Component

const BlogPage = () => {
  return (
    <div className="">
     
      <div className="container mx-auto px-6 py-16 pt-28">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900">Our Journal</h1>
          <p className="mt-4 text-lg text-natural">
            เรื่องราว แรงบันดาลใจ และเกร็ดความรู้จากโลกของ Cottonclix
          </p>
        </div>

        {/* ใช้ map() เพื่อแสดงผล BlogPostCard ตามข้อมูล */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              category={post.category}
              title={post.title}
              excerpt={post.excerpt}
              imageUrl={post.imageUrl}
              date={post.date}
            />
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default BlogPage;