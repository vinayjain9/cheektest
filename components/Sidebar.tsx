import React from "react";
import { FaHome, FaInfoCircle, FaTimes } from "react-icons/fa";
import Link from "next/link";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="h-full flex flex-col p-4 space-y-4 relative">
      {isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 md:hidden text-white text-2xl"
        >
          <FaTimes />
        </button>
      )}
      <nav className="space-y-4">
        <Link href="/" className="flex items-center p-2 rounded hover:bg-gray-700" onClick={toggleSidebar}>
          <FaHome className="mr-2" />
          <span>Dashboard</span>
        </Link>
        <Link href="/home" className="flex items-center p-2 rounded hover:bg-gray-700" onClick={toggleSidebar}>
          <FaHome className="mr-2" />
          <span>Home</span>
        </Link>
        <Link href="/Category" className="flex items-center p-2 rounded hover:bg-gray-700" onClick={toggleSidebar}>
          <FaInfoCircle className="mr-2" />
          <span>Category</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
