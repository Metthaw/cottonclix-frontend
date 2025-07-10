// src/components/BlogPostCard.jsx

import React from 'react';

const BlogPostCard = ({ title, category, excerpt, imageUrl, date }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-6">
        <p className="text-primary text-sm font-bold tracking-widest uppercase">{category}</p>
        <h3 className="mt-2 text-xl font-serif font-bold text-gray-800 h-16">{title}</h3>
        <p className="mt-2 text-natural text-sm h-20">{excerpt}</p>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;