import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";

const songs = [
  {
    id: 1,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "Divide",
    year: 2017,
    duration: 233,
    artwork: "/shape_of_you.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    year: 2020,
    duration: 200,
    artwork: "blinding_lights.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    year: 2020,
    duration: 203,
    artwork: "levitating.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired to a Hellish Extent",
    year: 2019,
    duration: 182,
    artwork: "someone_you_loved.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    title: "Peaches",
    artist: "Justin Bieber",
    album: "Justice",
    year: 2021,
    duration: 198,
    artwork: "peaches.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

const PlayList = () => {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio(currentSong.audio));

  useEffect(() => {
    const audio = audioRef.current;
    audio.pause();
    audio.src = currentSong.audio;
    audio.load();
    audio.volume = volume;

    if (isPlaying) {
      audio.play();
    }

    const updateProgress = () => setProgress(audio.currentTime);
    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [currentSong]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleSongChange = (direction) => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % songs.length
        : (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    audio.currentTime = parseFloat(e.target.value);
    setProgress(audio.currentTime);
  };

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(
      2,
      "0"
    )}`;
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col md:flex-row">
      {/* Song Detail Panel */}
      <div className="md:w-1/2 w-full p-6 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-gray-700">
        <h1 className="text-3xl font-bold mb-4">My Favorite Playlist 🎶</h1>
        <p className="text-sm text-gray-400 mb-2">
          Total Songs: {songs.length}
        </p>
        <img
          src={currentSong.artwork}
          alt={currentSong.title}
          className="w-64 h-64 object-cover rounded-lg shadow-lg mb-4"
        />
        <h2 className="text-2xl font-bold">{currentSong.title}</h2>
        <p className="text-md text-gray-400">{currentSong.artist}</p>
        <p className="text-sm text-gray-500 mt-1">
          {currentSong.album} • {currentSong.year}
        </p>

        {/* Progress Bar */}
        <div className="w-full mt-6 px-4">
          <input
            type="range"
            min={0}
            max={audioRef.current.duration || currentSong.duration}
            value={progress}
            onChange={handleSeek}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs mt-1 text-gray-400">
            <span>{formatTime(progress)}</span>
            <span>
              {formatTime(audioRef.current.duration || currentSong.duration)}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full mt-6 px-4">
          {/* Volume Slider on the left for large devices */}
          <div className="hidden sm:flex items-center gap-2 mb-4 md:mb-0">
            <Volume2 size={16} />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 accent-blue-500"
            />
          </div>

          {/* Playback Controls in the center (Always visible) */}
          <div className="flex items-center justify-center gap-6 mb-4 md:mb-0">
            <button onClick={() => handleSongChange("prev")}>
              <SkipBack size={32} />
            </button>
            <button
              onClick={togglePlay}
              className="bg-blue-600 hover:bg-blue-700 rounded-full p-4"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>
            <button onClick={() => handleSongChange("next")}>
              <SkipForward size={32} />
            </button>
          </div>

          {/* Action Icons on the right for large devices */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className={liked ? "text-red-500" : "text-gray-500"}
            >
              <Heart size={20} />
            </button>
            <button
              onClick={() => setShared(!shared)}
              className={shared ? "text-green-500" : "text-gray-500"}
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={saved ? "text-blue-500" : "text-gray-500"}
            >
              <Bookmark size={20} />
            </button>
          </div>

          {/* For Small devices: Volume and Icons side by side below controls */}
          <div className="sm:hidden flex flex-col items-center w-full gap-6 mt-4">
            <div className="flex items-center gap-4 w-full justify-between">
              {/* Volume Slider */}
              <div className="flex items-center gap-2 w-1/2">
                <Volume2 size={16} />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1 accent-blue-500"
                />
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-4 w-1/2 justify-end">
                <button
                  onClick={() => setLiked(!liked)}
                  className={liked ? "text-red-500" : "text-gray-500"}
                >
                  <Heart size={20} />
                </button>
                <button
                  onClick={() => setShared(!shared)}
                  className={shared ? "text-green-500" : "text-gray-500"}
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className={saved ? "text-blue-500" : "text-gray-500"}
                >
                  <Bookmark size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Panel */}
      <div className="md:w-1/2 w-full p-4 bg-gray-800 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Songs in Playlist</h2>
        <ul className="space-y-4">
          {songs.map((song) => (
            <li
              key={song.id}
              onClick={() => {
                setCurrentSong(song);
                setIsPlaying(false);
                setProgress(0);
              }}
              className={`flex items-center space-x-4 cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition ${
                song.id === currentSong.id ? "bg-gray-700" : ""
              }`}
            >
              <img
                src={song.artwork}
                alt={song.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayList;
