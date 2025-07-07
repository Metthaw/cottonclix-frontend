// src/pages/HomePage/ProductShowcase.jsx

import React from 'react';

// --- Import รูปภาพสินค้าเข้ามา ---
import productImage1 from '../../img/Group 56.png';
import productImage2 from '../../img/4.png';
import productImage3 from '../../img/15.png';

// --- ข้อมูลสินค้าสมมติ โดยมีลิงก์ไปยัง YouTube ---
const products = [
  {
    name: 'Lookbook: Seasonal Collection',
    image: productImage1,
    link: 'https://www.youtube.com' // <-- ลิงก์ YouTube
  },
  {
    name: 'The Art of Natural Fibers',
    image: productImage2,
    link: 'https://www.youtube.com' // <-- ลิงก์ YouTube
  },
  {
    name: 'Handmade Crafting Guide',
    image: productImage3,
    link: 'https://www.youtube.com' // <-- ลิงก์ YouTube
  }
];

const ProductShowcase = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-stone-50">
      <div className="container mx-auto px-4 text-center">
        
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">Featured Products</h2>
        <p className="text-lg text-stone-500 mb-12 max-w-2xl mx-auto">
          Discover our highlighted products and the stories behind them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer">
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-semibold text-white mb-4">{product.name}</h3>
                  <span className="bg-white text-stone-800 font-bold py-2 px-6 rounded-full hover:bg-stone-200 transition-colors">
                    View Link
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;