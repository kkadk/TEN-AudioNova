import React from "react";
import libraryData from "../assets/data/Library.js";

function Library() {
  return (
    <div className="w-[20%] bg-purple-700 mt-2 ml-2 rounded-2xl">
      <div className="text-white font-medium flex justify-between p-4">
        <h1>Your Library</h1>
        <button className="bg-purple-500 px-3 py-1 rounded-2xl">
          + Create
        </button>
      </div>

      <div className="text-white font-medium px-4 pb-4">
        <button className="bg-purple-500 px-3 py-1 rounded-2xl">
          Playlist
        </button>
        <button className="bg-purple-500 px-3 py-1 rounded-2xl ml-2">
          Artist
        </button>
      </div>

      <div>
        {libraryData.map((data, index) => (
          <div
            key={index}
            className="bg-purple-500 flex mx-2 mb-2 items-center p-2 rounded-lg"
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
  );
}

export default Library;
