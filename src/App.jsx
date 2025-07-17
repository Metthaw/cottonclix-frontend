// import Navbar from './components/layout/Navbar';
// import './App.css'
// import HomePage from '../src/pages/HomePage/HomePage'; 
// import Footer from './components/layout/Footer';

// function App() {
 

//   return (
//     <>
//       <Navbar />
//       <HomePage />
//       <Footer />
      
//     </>
//   )
// }

// export default App

// src/App.jsx
// import React from 'react';
// import { Outlet } from 'react-router-dom'; // Import Outlet
// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
// import './App.css';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <Outlet /> {/* Outlet คือพื้นที่ที่เนื้อหาของแต่ละหน้าจะมาแสดงผล */}
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default App;


// src/App.jsx

// src/App.jsx

import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        {/* Outlet คือพื้นที่ที่เนื้อหาของแต่ละหน้าจะถูกนำมาแสดงผล */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;