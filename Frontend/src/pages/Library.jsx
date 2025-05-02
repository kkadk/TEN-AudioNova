import React from "react";
import libraryData from "../assets/data/Library.js";
import { FaPlus, FaSearch } from "react-icons/fa";

function Library() {
  return (
    <div className="w-[20%] bg-purple-700 mt-2 ml-2 pb-2 rounded-2xl flex flex-col">
      <div className="text-white font-medium flex justify-between p-4">
        <h1>Your Library</h1>
        <button className="bg-purple-500 px-3 py-1 rounded-2xl cursor-pointer flex items-center gap-1.5 hover:bg-purple-400">
          <FaPlus /> Create
        </button>
      </div>

      <div className="text-white font-medium px-4 pb-4">
        <button className="bg-purple-500 px-3 py-1 rounded-2xl cursor-pointer hover:bg-purple-400">
          Playlist
        </button>
        <button className="bg-purple-500 px-3 py-1 rounded-2xl ml-2 cursor-pointer hover:bg-purple-400">
          Artist
        </button>
      </div>

      <div className="flex items-center w-40 h-10 text-white font-medium mx-4 mb-4 px-3 bg-purple-500 rounded-2xl hover:bg-purple-400 cursor-pointer">
        <FaSearch className="mr-2 text-white" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-white w-full placeholder-white"
        />
      </div>

      <div className="group relative h-[680px] px-2">
        <div className="overflow-hidden group-hover:overflow-y-scroll pr-2 h-full">
          {libraryData.map((data, index) => (
            <div
              key={index}
              className="bg-purple-500 flex mb-2 items-center p-2 rounded-lg cursor-pointer hover:bg-purple-400"
            >
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={data.image}
                  alt=""
                />
              </div>
              <div className="ml-4 text-white">
                <h2 className="text-lg font-semibold">{data.name}</h2>
                <h3 className="text-sm">{data.role}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Library;
