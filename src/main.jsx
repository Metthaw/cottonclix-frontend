import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { initGA, logPageView } from "./analytics";

import App from "./App.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogDetailsPage from "./pages/BlogDetailsPage.jsx";
import LinktreePage from "./pages/LinktreePage.jsx";
import PolicyPage from "./pages/PolicyPage.jsx";

// Initialize GA4
initGA();

// Track page views
const trackPageView = (location) => {
  logPageView(location.pathname + location.search);
};

// Create router configuration
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "blog",
          element: <BlogPage />,
        },
        {
          path: "blog/:blogId",
          element: <BlogDetailsPage />,
        },
        {
          path: "index",
          element: <LinktreePage />,
        },
        {
          path: "policy",
          element: <PolicyPage />,
        },
      ],
    },
  ],
  {
    // Optional: Set initial entries if needed
    initialEntries: [window.location.pathname],
    initialIndex: 0,
  }
);

// Track initial page load
trackPageView(window.location);

// Track subsequent page views
router.subscribe((state) => {
  trackPageView(state.location);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
