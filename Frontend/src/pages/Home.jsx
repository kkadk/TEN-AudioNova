import React from "react";
import { IoMdArrowRoundUp } from "react-icons/io";
import FloatingMusicNotes from "./FloatingMusicNotes";

const Home = () => {
  return (
    <div className="relative flex min-h-screen bg-[#0a0e17] text-[#F4F4F5] overflow-hidden">
      <FloatingMusicNotes />

      <main className="flex-1 p-4 sm:p-6 md:p-8 z-10 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 drop-shadow-md">
          Welcome back
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="bg-[#72c4fa] p-4 sm:p-6 rounded-lg flex flex-col items-center text-white shadow-md hover:shadow-lg transition">
            <div className="text-4xl sm:text-5xl">🎵</div>
            <p className="mt-2 font-semibold text-sm sm:text-base">
              Your top mixes
            </p>
          </div>

          <div className="bg-[#a6e1fa] p-4 sm:p-6 rounded-lg flex flex-col items-center text-[#084b8a] shadow-md hover:shadow-lg transition">
            <div className="text-4xl sm:text-5xl">🧠</div>
            <p className="mt-2 font-semibold text-sm sm:text-base">
              AI Song Generator
            </p>
          </div>

          <div className="bg-[#72c4fa] p-4 sm:p-6 rounded-lg flex flex-col items-center text-white shadow-md hover:shadow-lg transition">
            <IoMdArrowRoundUp className="text-4xl sm:text-5xl" />
            <p className="mt-2 font-semibold text-sm sm:text-base">
              Upload a song
            </p>
          </div>

          <div className="bg-[#a6e1fa] p-0 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1589571894960-20bbe2828c5d?q=80"
              alt="Workout"
              className="w-full h-24 sm:h-28 md:h-32 object-cover rounded"
            />
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 drop-shadow-md">
          Made for You
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <Card title="Lo-Fi Mix" emoji="💽" />
          <Card
            title="Daily Mix 1"
            img="https://randomuser.me/api/portraits/men/45.jpg"
          />
          <Card
            title="Daily Mix 2"
            img="https://via.placeholder.com/100x100.png?text=Silhouette"
          />
          <Card
            title="Chill Vibes"
            img="https://randomuser.me/api/portraits/women/44.jpg"
          />
          <Card
            title="Relax & Unwind"
            img="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80"
          />
        </div>
      </main>
    </div>
  );
};

const Card = ({ title, emoji, img }) => (
  <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 sm:p-6 flex flex-col items-center justify-center text-[#084b8a] w-full h-40 sm:h-48 md:h-56 lg:h-60">
    {img ? (
      <img
        src={img}
        alt={title}
        className="w-full h-24 sm:h-32 md:h-36 lg:h-40 object-cover rounded"
      />
    ) : (
      <div className="text-5xl sm:text-6xl md:text-7xl">{emoji}</div>
    )}
    <p className="mt-3 font-medium text-center text-sm sm:text-base md:text-lg">
      {title}
    </p>
  </div>
);

export default Home;
