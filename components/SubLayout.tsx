// "use client";
// import React, { useState } from "react";
// import NavBar from "./Navbar";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// const SubLayout: React.FC = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="relative min-h-screen flex bg-gray-600">
//       <NavBar toggleSidebar={toggleSidebar} />
//       <div
//         className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } fixed inset-y-0 left-0 z-40 mt-14 bg-black w-64 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out text-white`}
//       >
//         <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       </div>
//       <div className="mt-14 flex-1 flex flex-col">
//         <main
//           className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "md:ml-3" : "ml-0"
//             }`}
//         >
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SubLayout;
"use client"; // Mark this as a Client Component

import React, { useState } from "react";
import NavBar from "./Navbar";
import Sidebar from "./Sidebar";

interface SubLayoutProps {
  children: React.ReactNode; // Use this to receive page content
}

const SubLayout: React.FC<SubLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen flex bg-gray-600">
      <NavBar toggleSidebar={toggleSidebar} />
      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-40 mt-14 bg-black w-64 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out text-white`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="mt-12 flex-1 flex flex-col">
        <main
          className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-3" : "ml-0"
            }`}
        >
          {children} {/* Render page content here */}
        </main>
      </div>
    </div>
  );
};

export default SubLayout;
