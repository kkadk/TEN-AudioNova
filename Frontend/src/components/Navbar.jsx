import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-end items-center gap-6 px-6 py-3 bg-[#0a0e17] text-[#F4F4F5] shadow-lg font-semibold select-none">
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] transition-all cursor-pointer"
      >
        <FaHome className="text-[#F4F4F5]" />
        <span>Home</span>
      </Link>

      <Link
        to="/browse"
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] transition-all cursor-pointer"
      >
        <FaSearch className="text-[#F4F4F5]" />
        <span>Browse</span>
      </Link>

      <Link
        to="/ai-generator"
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] transition-all cursor-pointer"
      >
        <AiOutlineRobot className="text-[#F4F4F5]" />
        <span>AI Generator</span>
      </Link>

      <Link
        to="/signup"
        className="bg-[#72c4fa] text-[#084b8a] px-5 py-2 rounded-full font-bold shadow-md hover:bg-[#4a8fe1] transition-colors duration-300"
      >
        Sign Up
      </Link>

      <Link
        to="/login"
        className="bg-[#72c4fa] text-[#084b8a] px-5 py-2 rounded-full font-bold shadow-md hover:bg-[#4a8fe1] transition-colors duration-300"
      >
        Log In
      </Link>
    </nav>
  );
};

export default Navbar;
