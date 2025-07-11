// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )

// // src/main.jsx
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from './App.jsx'
// import './index.css'

// // Import หน้าต่างๆ ที่เราจะสร้าง
// import HomePage from './pages/HomePage/HomePage.jsx';
// import AboutPage from './pages/AboutPage.jsx'; // Placeholder for About Us
// import BlogPage from './pages/BlogPage.jsx';   // Placeholder for Blog

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         index: true, // ทำให้เป็นหน้าแรก
//         element: <HomePage />,
//       },
//       {
//         path: "about",
//         element: <AboutPage />,
//       },
//       {
//         path: "blog",
//         element: <BlogPage />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )

// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx'; // Layout หลักของเรา
import HomePage from './pages/HomePage/HomePage.jsx'; // Path ที่ถูกต้องสำหรับหน้า Home
import AboutPage from './pages/AboutPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogDetailsPage from './pages/BlogDetailsPage.jsx';

// สร้าง Router และกำหนดเส้นทาง
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // ใช้ App.jsx เป็น Layout หลัก
    // children คือหน้าย่อยที่จะแสดงใน <Outlet /> ของ App.jsx
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/blog',
        element: <BlogPage />,
      },
      {
        path: '/blog/:blogId', // Dynamic route สำหรับ Blog Details
        element: <BlogDetailsPage />,
      },
      // สามารถเพิ่มหน้าอื่นๆ ที่นี่ได้ในอนาคต เช่น Linktree, Privacy Policy
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);