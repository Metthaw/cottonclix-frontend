import React, { useState, useEffect } from 'react';

// API Endpoint สำหรับดึงข้อมูล Page จาก slug และขอข้อมูลรูปภาพมาด้วย
const API_URL = 'https://cms.cottonclix.com/wp-json/wp/v2/pages?slug=about-us&_embed';

export default function AboutPage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // API จะคืนค่ามาเป็น Array, เราต้องการแค่รายการแรก
        if (data.length > 0) {
          setPageData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching About Us page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  if (loading) {
    return <div className="text-center py-40">Loading...</div>;
  }

  if (!pageData) {
    return <div className="text-center py-40">Page not found.</div>;
  }
  
  // ดึง URL ของรูปภาพจากข้อมูลที่ _embed มาให้
  const featuredImageUrl = pageData._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  const pageTitle = pageData.title.rendered;
  const pageContent = pageData.content.rendered;

  return (
    <main className="bg-white">
      <div className="container mx-auto px-6 py-16">
        {/* ส่วนรูปภาพหลัก */}
        <div 
          className="w-full h-64 md:h-96 bg-cover bg-center rounded-lg shadow-md"
          style={{ backgroundImage: `url(${featuredImageUrl})` }}
          aria-label={pageTitle}
        >
        </div>
        
        {/* ส่วนเนื้อหา */}
        <article className="max-w-3xl mx-auto mt-12">
          <h1 className="text-4xl font-bold font-serif text-gray-800 mb-6 text-center">
            {pageTitle}
          </h1>

          {/* แสดงผลเนื้อหา HTML จาก WordPress Editor */}
          <div 
            className="prose lg:prose-lg max-w-none mx-auto text-natural space-y-4"
            dangerouslySetInnerHTML={{ __html: pageContent }} 
          />
        </article>
      </div>
    </main>
  );
};