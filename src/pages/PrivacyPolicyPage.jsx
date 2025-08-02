import React, { useState, useEffect } from 'react';

const API_URL = 'https://cottonclix.com/privacy-policy-2/';

export default function PrivacyPolicyPage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.length > 0) {
          setPageData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
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

  return (
    <main className="bg-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <article>
          <h1 className="text-4xl font-serif text-center mb-12 text-gray-800">
            {pageData.title.rendered}
          </h1>
          <div 
            className="prose lg:prose-lg max-w-none mx-auto text-natural"
            dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
          />
        </article>
      </div>
    </main>
  );
}