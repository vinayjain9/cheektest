// import Link from "next/link";
import React from "react";
import { FiAlignJustify } from "react-icons/fi";
interface NavBarProps {
  toggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md fixed w-full top-0 z-50">
      <button onClick={toggleSidebar} className="text-2xl md:hidden">
        <FiAlignJustify />
      </button>
      <h1 className="text-xl font-bold">Logoalv al</h1>
    
      
      </header>
  );
};

export default NavBar;
