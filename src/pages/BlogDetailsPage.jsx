// src/pages/BlogDetailsPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

export default function BlogDetailsPage() {
  const { blogId } = useParams();

  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]); // 1. เพิ่ม State สำหรับเก็บ Recent Posts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // 2. ดึงข้อมูล 2 ส่วนพร้อมกัน
        // ส่วนที่ 1: ดึงข้อมูลบทความปัจจุบัน
        const postUrl = `https://cottonclix.com/wp-json/wp/v2/posts/${blogId}`;
        const postPromise = fetch(postUrl).then((res) => res.json());

        // ส่วนที่ 2: ดึงข้อมูลบทความล่าสุด 3 ชิ้น (โดยไม่รวมบทความปัจจุบัน)
        const recentPostsUrl = `https://cottonclix.com/wp-json/wp/v2/posts?per_page=4&exclude=${blogId}`;
        const recentPromise = fetch(recentPostsUrl).then((res) => res.json());

        // รอให้ทั้งสองอย่างเสร็จสิ้น
        const [postData, recentData] = await Promise.all([
          postPromise,
          recentPromise,
        ]);

        setPost(postData);
        // กรองเอาบทความปัจจุบันออกอีกครั้งเผื่อกรณีที่ per_page น้อยกว่า 4
        setRecentPosts(
          recentData.filter((p) => p.id !== postData.id).slice(0, 3)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [blogId]);

  if (loading) {
    return <div className="text-center py-40">Loading...</div>;
  }

  if (!post || post.data?.status === 404) {
    return <div className="text-center py-40">Post Not Found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-gray-50"
    >
      <div
      className="flex  w-full justify-center  "
        // className="w-[80%]  h-80 md:h-[500px] bg-cover bg-center"
        // style={{ backgroundImage: `url(${post.acf.cover_image})` }}
        
      >
        
        <div
        className="flex w-[90%]  h-full md:h-[500px]   bg-origin-border  bg-center bg-cover rounded-lg "
        style={{ backgroundImage: `url(${post.acf.cover_image})` }}
      ></div> 
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mt-2">
            {post.title.rendered}
          </h1>
          <p className="text-natural mt-4">
            Published on {new Date(post.date).toLocaleDateString()}
          </p>
        </div>

        <div
          className=" max-w-none mx-auto text-natural space-y-6"
          dangerouslySetInnerHTML={{ __html: post.acf.main_content }}
        />
      </article>

      {/* 3. เพิ่ม Section สำหรับ Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="">
          <div className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-serif text-center mb-8 text-gray-800">
              Recent Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((recent) => (
                <Link
                  to={`/blog/${recent.id}`}
                  key={recent.id}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={recent.acf.cover_image}
                      alt={recent.title.rendered}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-serif group-hover:text-primary">
                    {recent.title.rendered}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
