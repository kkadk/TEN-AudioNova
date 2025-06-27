// import React from "react";
// import libraryData from "../assets/data/Library.js";
// import { FaPlus, FaSearch, FaPlay } from "react-icons/fa";

// function Library() {
//   return (
//     <div className="w-[25%]">
//       <div className="w-full bg-purple-700 mt-2 ml-2 pb-2 rounded-2xl flex flex-col">
//         <div className="text-white font-medium flex justify-between p-4">
//           <h1>Your Library</h1>
//           <button className="bg-purple-500 px-3 py-1 rounded-2xl cursor-pointer flex items-center gap-1.5 hover:bg-purple-400">
//             <FaPlus /> Create
//           </button>
//         </div>

//         <div className="text-white font-medium px-4 pb-4">
//           <button className="bg-purple-500 px-3 py-1 rounded-2xl cursor-pointer hover:bg-purple-400">
//             Playlist
//           </button>
//           <button className="bg-purple-500 px-3 py-1 rounded-2xl ml-2 cursor-pointer hover:bg-purple-400">
//             Artist
//           </button>
//         </div>

//         <div className="flex items-center w-40 h-10 text-white font-medium mx-4 mb-4 px-3 bg-purple-500 rounded-2xl hover:bg-purple-400 cursor-pointer">
//           <FaSearch className="mr-2 text-white" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="bg-transparent outline-none text-white w-full placeholder-white"
//           />
//         </div>

//         <div className="group relative h-[680px] px-2">
//           <div className="overflow-hidden group-hover:overflow-y-scroll pr-2 h-full">
//             {libraryData.map((data, index) => (
//               <div
//                 key={index}
//                 className="group/item bg-purple-500 flex mb-2 items-center p-2 rounded-lg cursor-pointer hover:bg-purple-400"
//               >
//                 <div className="relative w-20 h-20 flex-shrink-0">
//                   <img
//                     className="w-full h-full object-cover rounded-full"
//                     src={data.image}
//                     alt=""
//                   />
//                   <FaPlay className="absolute inset-0 m-auto text-white text-4xl bg-black bg-opacity-50 p-2 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
//                 </div>

//                 <div className="ml-4 text-white">
//                   <h2 className="text-lg font-semibold">{data.name}</h2>
//                   <h3 className="text-sm">{data.role}</h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Library;

import React from "react";
import { FaHeart, FaListUl, FaCompactDisc } from "react-icons/fa";
import FloatingMusicNotes from "./FloatingMusicNotes";
import MusicManagement from "../components/MusicManagement";
import UploadSong from "../components/UploadSong";

const libraryItems = [
  {
    icon: <FaHeart className="text-pink-500 text-4xl" />,
    title: "Liked Songs",
    description: "Your favorite tracks all in one place",
    bg: "bg-zinc-800",
  },
  {
    icon: <FaListUl className="text-green-400 text-4xl" />,
    title: "Playlists",
    description: "Custom and curated playlists",
    bg: "bg-zinc-700",
  },
  {
    icon: <FaCompactDisc className="text-blue-400 text-4xl" />,
    title: "Albums",
    description: "Saved albums from artists you love",
    bg: "bg-zinc-600",
  },
];

const Library = () => {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-white p-8">
      <FloatingMusicNotes />
      <h2 className="text-3xl font-bold mb-6">Your Library</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {libraryItems.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg p-6 hover:scale-105 transform transition-all ${item.bg}`}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-zinc-300">{item.description}</p>
          </div>
        ))}
      </div>
            <div>
        <UploadSong showUploadModal={true}
    setShowUploadModal={true}/>
      </div>
      <div>
        <MusicManagement />
      </div>
    </div>
  );
};

export default Library;
