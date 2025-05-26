import React, { useState } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";
import {
  IoPlay,
  IoHeart,
  IoAdd,
  IoPause,
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoClose,
  IoVolumeHigh,
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

const MiniPlayer = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onClose,
  onNext,
  onPrevious,
}) => {
  const [volume, setVolume] = useState(40);
  const [progress, setProgress] = useState(60);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-8 right-8 w-96 h-54 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 z-50 overflow-hidden">
      {/* Progress bar */}
      <div className="w-full h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-6 mb-2">
        {/* Track info and close button */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              {currentTrack.img ? (
                <img
                  src={currentTrack.img}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">
                  {currentTrack.emoji}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-sm truncate">
                {currentTrack.title}
              </h4>
              <p className="text-white/60 text-xs">Unknown Artist</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <IoClose className="text-lg" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mt-8 mb-3">
          <button
            onClick={onPrevious}
            className="text-white/70 hover:text-white transition-colors"
          >
            <IoPlaySkipBack className="text-xl" />
          </button>

          <button
            onClick={onPlayPause}
            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:from-blue-400 hover:to-purple-500 transition-all duration-200 shadow-lg"
          >
            {isPlaying ? (
              <IoPause className="text-white text-lg" />
            ) : (
              <IoPlay className="text-white text-lg ml-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            className="text-white/70 hover:text-white transition-colors"
          >
            <IoPlaySkipForward className="text-xl" />
          </button>
        </div>

        {/* Volume control */}
        <div className="flex items-center space-x-2">
          <IoVolumeHigh className="text-white/60 text-sm" />
          <div className="flex-1 h-1 bg-white/20 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-200"
              style={{ width: `${volume}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playlists = [
    { id: "lofi", title: "Lo-Fi Mix", emoji: "💽" },
    {
      id: "morning",
      title: "Daily Mix 1",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: "evening",
      title: "Chill Vibes",
      img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300",
    },
    {
      id: "chill",
      title: "Daily Mix 2",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "relax",
      title: "Relax & Unwind",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300",
    },
    { id: "focus1", title: "Focus Flow", emoji: "🎯" },
    { id: "deepwork", title: "Deep Work", emoji: "🧠" },
    { id: "coding", title: "Coding Beats", emoji: "💻" },
    { id: "midnight", title: "Midnight Drive", emoji: "🌃" },
    { id: "nature", title: "Nature Sounds", emoji: "🌿" },
  ];

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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

  const handleWorkoutClick = () => {
    const workoutTrack = {
      id: "workout",
      title: "Workout Beats",
      img: "https://imgs.search.brave.com/uUGDp5ikkZN_HW_gamN-vG7MDfwtQjHcRGRlnmPD4fA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vRW9NS0Nu/dUxqa3NsV3lmVkRl/NS1ZZUxSX3lQZTRt/UG1oMU9rZUNjYjJ3/TS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl0/WldScC9ZUzVwYzNS/dlkydHdhRzl1L2J5/NWpiMjB2YVdRdk1U/RXovTVRFek5qTTJN/aTl3YUc5MElIby9i/eTV2V3Jsb2FFOWtk/Mkl5TFcxc2JTNXFi/MmNYUkNqMDJNVEI0/TmtKdWJ6RTFRQ05y/UFRJZ0ptTjlCeUp1/QlNqVWdiVy9jY21K/YkdGSFltSjNSa1JF/VlNMM0Y1Yms5dF9r/Vkhka2JXaTFNWFVi/TVM1c0NqQWpaams1/WVJsSDJjVk5uWkdw/OFhBbEkxWUZaZTBU/WTBjVnBFZkFWXzVL/ZFE/Y2o4Mld5OUw4/YUhSMF93WVVkZ01X/TW9TM01YM2ZKQz9k/a0FvblNwUmEydjNW/UVNqWTVSbWQyYmtG/eWNIUnc/d3ZFMnJQ/alUwakpoWlNyUExF/OEJXMWhfUWVSUlQw/ZTdwVFlqVnNjZzll/bVd4UVdKcEt6WXd6/SmdsOXpOaUg2ZlYw/Wl8oQzRydjlEY2c/WFZoUlUvN3piSmlB/alZpVU93X05N",
    };
    handlePlayTrack(workoutTrack);
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#1a1f2e] to-[#0f1419] text-[#F4F4F5] overflow-hidden">
      <FloatingMusicNotes />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <main className="flex-1 p-4 sm:p-6 md:p-8 z-10 w-full relative">
        {/* Header with gradient text */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-[#72c4fa] via-[#a6e1fa] to-[#72c4fa] bg-clip-text text-transparent drop-shadow-2xl">
            Welcome back
          </h2>
          <p className="text-lg sm:text-xl text-white/70 font-light">
            Discover your perfect soundtrack
          </p>
        </div>

        {/* Quick Actions Grid */}
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
            onClick={() => console.log("Upload clicked")}
          />
        </div>

        {/* Made for You Section */}
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
              title={playlist.title}
              emoji={playlist.emoji}
              img={playlist.img}
              isHovered={hoveredCard === playlist.id}
              onHover={() => setHoveredCard(playlist.id)}
              onLeave={() => setHoveredCard(null)}
              onPlay={() => handlePlayTrack(playlist)}
            />
          ))}
        </div>
      </main>

      {/* Mini Player */}
      <MiniPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onClose={handleClosePlayer}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
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
