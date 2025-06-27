// src/pages/Home.jsx
import React, { useEffect, useState } from "react";

import {
  getPublicPlaylists,
  getPlaylistDetailsWithSongs,
} from "../api/playlists";
import MusicManagement from "../components/MusicManagement";
import { IoMdArrowRoundUp } from "react-icons/io";
import {
  IoPlay,
  IoHeart,
} from "react-icons/io5";


const FloatingMusicNotes = () => {
  const notes = ["♪", "♫", "♬", "♩", "♮", "♯"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white/5 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 40}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 4}s`,
          }}
        >
          {notes[Math.floor(Math.random() * notes.length)]}
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPublicPlaylists();
        const detailed = await Promise.all(
          data.results.map(async (pl) => {
            const details = await getPlaylistDetailsWithSongs(pl.id);
            return {
              ...pl,
              songs: details.songs,
              img: pl.cover_image,
              emoji: "🎵",
            };
          })
        );
        setPlaylists(detailed);
      } catch (err) {
        console.error("Failed to load playlists", err);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleClosePlayer = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = playlists.findIndex((p) => p.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlists.length;
    setCurrentTrack(playlists[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = playlists.findIndex((p) => p.id === currentTrack.id);
    const prevIndex =
      currentIndex === 0 ? playlists.length - 1 : currentIndex - 1;
    setCurrentTrack(playlists[prevIndex]);
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#1a1f2e] to-[#0f1419] text-[#F4F4F5] overflow-hidden">
      <FloatingMusicNotes />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <main className="flex-1 p-4 sm:p-6 md:p-8 z-10 w-full relative">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-[#72c4fa] via-[#a6e1fa] to-[#72c4fa] bg-clip-text text-transparent drop-shadow-2xl">
            Welcome back
          </h2>
          <p className="text-lg sm:text-xl text-white/70 font-light">
            Discover your perfect soundtrack
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <QuickActionCard
            icon="🧠"
            title="AI Song Generator"
            subtitle="Create with AI"
            gradient="from-[#f093fb] to-[#f5576c]"
            onClick={() => console.log("AI Generator clicked")}
          />

          <QuickActionCard
            icon={<IoMdArrowRoundUp className="text-4xl sm:text-5xl" />}
            title="Upload a song"
            subtitle="Share your music"
            gradient="from-[#4facfe] to-[#00f2fe]"
            onClick={() => setShowUploadModal(true)}
          />
        </div>

        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Made for You
          </h3>
          <p className="text-white/60 mb-6">
            Curated playlists based on your taste
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8 mb-12">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              title={playlist.name}
              emoji={playlist.emoji}
              img={playlist.img}
              isHovered={hoveredCard === playlist.id}
              onHover={() => setHoveredCard(playlist.id)}
              onLeave={() => setHoveredCard(null)}
              onPlay={() => handlePlayTrack(playlist)}
            />
          ))}
        </div>

          <div>
            <MusicManagement />
          </div>
      </main>
    </div>
  );
};

const QuickActionCard = ({ icon, title, subtitle, gradient, onClick }) => (
  <div
    className={`group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden`}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="text-4xl sm:text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-lg sm:text-xl mb-1">{title}</h3>
      <p className="text-white/80 text-sm">{subtitle}</p>
    </div>
    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full transform group-hover:scale-150 transition-transform duration-500" />
  </div>
);

const PlaylistCard = ({
  title,
  emoji,
  img,
  isHovered,
  onHover,
  onLeave,
  onPlay,
}) => (
  <div
    className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden border border-white/10"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <div className="p-4 sm:p-6 flex flex-col items-center justify-center h-48 sm:h-56 relative">
      {img ? (
        <div className="relative w-full h-32 sm:h-36 mb-4 overflow-hidden rounded-xl">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ) : (
        <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
          {emoji}
        </div>
      )}

      <p className="font-semibold text-center text-sm sm:text-base text-white/90 group-hover:text-white transition-colors duration-300">
        {title}
      </p>

      {/* Hover overlay with controls */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <IoPlay className="text-white text-xl ml-1" />
          </button>
          <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm">
            <IoHeart className="text-white text-xl" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
