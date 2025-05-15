import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-68 min-h-screen p-6 bg-[#0a0e17] text-[#F4F4F5] flex flex-col gap-8 shadow-lg text-[#084b8a] font-semibold select-none">
      <h1 className="text-3xl font-extrabold mb-6 tracking-wide drop-shadow-sm whitespace-nowrap">
        TEN AudioNova
      </h1>

      <nav className="flex flex-col gap-5 text-lg">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] hover:text-[#084b8a] transition-all"
        >
          <FaHome className="text-[#F4F4F5] group-hover:text-[#084b8a]" />
          <span>Home</span>
        </Link>

        <Link
          to="/browse"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] hover:text-[#084b8a] transition-all"
        >
          <FaSearch className="text-[#F4F4F5] group-hover:text-[#084b8a]" />
          <span>Browse</span>
        </Link>

        <Link
          to="/ai-generator"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] hover:text-[#084b8a] transition-all"
        >
          <AiOutlineRobot className="text-[#F4F4F5] group-hover:text-[#084b8a]" />
          <span>AI Generator</span>
        </Link>
      </nav>

      <Link
        to="/profile"
        className="mt-auto bg-[#72c4fa] text-[#084b8a] py-3 text-center rounded-full font-bold shadow-md hover:bg-[#4a8fe1] transition-colors duration-300"
      >
        Profile
      </Link>
    </aside>
  );
};

export default Sidebar;
