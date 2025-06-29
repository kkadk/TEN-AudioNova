// import React from "react";
// import { FaHome, FaSearch } from "react-icons/fa";
// import { AiOutlineRobot } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthCheck } from "../hooks/useAuthCheck";
// import api from "../utils/axios";

// const Navbar = () => {
//   const { authenticated } = useAuthCheck();
//   const navigate = useNavigate();

//   // const handleLogout = () => {
    
//   //   localStorage.removeItem("accessToken");
//   //   localStorage.removeItem("refreshToken");
//   //   navigate("/login");
//   // };

//   const handleLogout = async () => {
//   try {
//     await api.post('/auth/logout/'); 
//   } catch (err) {
//     console.error(err);
//   }
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("refreshToken");
//   navigate("/login");
// };


//   return (
//     <nav className="flex justify-end items-center gap-6 px-6 py-3 bg-[#0a0e17] text-[#F4F4F5] shadow-lg font-semibold select-none">
//       <Link
//         to="/"
//         className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] transition-all cursor-pointer"
//       >
//         <FaHome className="text-[#F4F4F5]" />
//         <span>Home</span>
//       </Link>

//       <Link
//         to="/browse"
//         className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] transition-all cursor-pointer"
//       >
//         <FaSearch className="text-[#F4F4F5]" />
//         <span>Browse</span>
//       </Link>

//       <Link
//         to="/ai-generator"
//         className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] transition-all cursor-pointer"
//       >
//         <AiOutlineRobot className="text-[#F4F4F5]" />
//         <span>AI Generator</span>
//       </Link>

//       {authenticated ? (
//         <>
//           {/* Profile Icon */}
//           <Link
//             to="/profile"
//             className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] transition-all cursor-pointer"
//           >
//             {/* Simple circle profile icon (SVG) */}
//             <svg
//               className="w-6 h-6 fill-[#F4F4F5]"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
//             </svg>
//             <span>Profile</span>
//           </Link>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="bg-[#f87171] text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-[#ef4444] transition-colors duration-300"
//           >
//             Logout
//           </button>
//         </>
//       ) : (
//         <>
//           <Link
//             to="/signup"
//             className="bg-[#72c4fa] text-[#084b8a] px-5 py-2 rounded-full font-bold shadow-md hover:bg-[#4a8fe1] transition-colors duration-300"
//           >
//             Sign Up
//           </Link>

//           <Link
//             to="/login"
//             className="bg-[#72c4fa] text-[#084b8a] px-5 py-2 rounded-full font-bold shadow-md hover:bg-[#4a8fe1] transition-colors duration-300"
//           >
//             Log In
//           </Link>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuthCheck } from "../hooks/useAuthCheck";
import api from "../utils/axios";

const Navbar = () => {
  const { authenticated } = useAuthCheck();
  const navigate = useNavigate();

  // Local state to force UI update after logout
  const [isAuth, setIsAuth] = useState(authenticated);

  useEffect(() => {
    setIsAuth(authenticated);
  }, [authenticated]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout/");
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuth(false); // Update local state so UI refreshes
    navigate("/login");
  };

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

      {isAuth ? (
        <>
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#a6e1fa] transition-all cursor-pointer"
          >
            <svg
              className="w-6 h-6 fill-[#F4F4F5]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
            <span>Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-[#f87171] text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-[#ef4444] transition-colors duration-300"
          >
            Logout
          </button>
        </>
      ) : (
        <>
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
        </>
      )}
    </nav>
  );
};

export default Navbar;

