import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx"; // Layout หลักของเรา
import HomePage from "./pages/HomePage/HomePage.jsx"; // Path ที่ถูกต้องสำหรับหน้า Home
import AboutPage from "./pages/AboutPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogDetailsPage from "./pages/BlogDetailsPage.jsx";
import LinktreePage from "./pages/LinktreePage.jsx";

// สร้าง Router และกำหนดเส้นทาง
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // ใช้ App.jsx เป็น Layout หลัก
    // children คือหน้าย่อยที่จะแสดงใน <Outlet /> ของ App.jsx
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:blogId", // Dynamic route สำหรับ Blog Details
        element: <BlogDetailsPage />,
      },
      { path: "/index", element: <LinktreePage /> },
      // สามารถเพิ่มหน้าอื่นๆ ที่นี่ได้ในอนาคต เช่น Linktree, Privacy Policy
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
