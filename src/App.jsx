import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import { AnimatePresence } from "motion/react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="h-full w-full max-w-full overflow-hidden">
      <ScrollToTop />
      <Navbar />
      <main>
        {/* Outlet คือพื้นที่ที่เนื้อหาของแต่ละหน้าจะถูกนำมาแสดงผล */}
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
