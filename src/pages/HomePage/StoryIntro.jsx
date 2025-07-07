import React from 'react';

// --- Import รูปภาพสำหรับ Section นี้ ---
// กรุณาตรวจสอบให้แน่ใจว่าชื่อไฟล์และ Path ถูกต้อง
import bookImg from '../../img/15.png';      // หนังสือ
import leavesImg from '../../img/element4.png'; // ใบไม้
import cottonFlowerImg from '../../img/4.png';  // ดอกฝ้าย
import cottonFlowerImg2 from '../../img/2.png'; 

const StoryIntro = () => {
  return (
    <section className="w-full flex justify-center items-center py-12 md:py-20 bg-white">
      <div className="container  ">
        
        {/* ใช้ Grid layout เพื่อแบ่งส่วนซ้ายและขวา */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full w-screen">
          
          {/* ส่วนซ้าย: รูปภาพหนังสือและใบไม้ซ้อนกัน */}
          <div className="relative flex justify-center items-center h-full">
            
            

            <img 
              src={leavesImg} 
              alt="Decorative Leaves" 
              className="relative w-4/6 h-full w-autoobject-contain transform -rotate-[345deg] z-10 scale-x-[-1] -left-1/3 top-1/5 "
            />
            <div className='absolute  z-20 w-full  '>
<img 
              src={cottonFlowerImg2} 
              alt="Story Book" 
              className="absolute z-40 h-auto w-1/3 right-1/3 top-1/4"
            />
              <img 
              src={bookImg} 
              alt="Story Book" 
              className="relative z-30 h-auto w-auto " 
            />
            </div>
            

            
          </div>

          {/* ส่วนขวา: ข้อความและดอกฝ้าย */}
          
          <div className="flex items-center justify-center gap-8 grid-cols-2">
            
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-serif text-stone-800 tracking-wider">COTTONCLIX</h2>
              <p className="text-xl text-stone-500 mt-2">Little cutter</p>
            
              
              <a href="#" className="text-lg text-amber-700 mt-4 inline-block hover:underline">
                {'<<< Open'}
              </a>
            </div>
            <div className="text-left">
              
            
              <img 
              src={cottonFlowerImg} 
              alt="Cotton Flower" 
              className="w- h-auto flex-shrink-0 "
            />
              
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoryIntro;
