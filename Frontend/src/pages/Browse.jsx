import React, { useState } from 'react';
import { IoPlay, IoHeart, IoAdd, IoSearch, IoFilter, IoGrid, IoList, IoPause, IoPlaySkipForward, IoPlaySkipBack, IoClose, IoVolumeHigh } from 'react-icons/io5';

const MiniPlayer = ({ currentTrack, isPlaying, onPlayPause, onClose, onNext, onPrevious }) => {
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(35);

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
      
      <div className="p-4">
        {/* Track info and close button */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-sm truncate">{currentTrack.title}</h4>
              <p className="text-white/60 text-xs truncate">{currentTrack.artist || currentTrack.creator || 'Unknown Artist'}</p>
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

const Browse = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const genres = ['All', 'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Indie', 'R&B'];

  const featuredPlaylists = [
    {
      id: 1,
      title: "Today's Top Hits",
      description: "The biggest songs right now",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400",
      tracks: 50,
      genre: "Pop"
    },
    {
      id: 2,
      title: "Rock Classics",
      description: "Timeless rock anthems",
      image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400",
      tracks: 75,
      genre: "Rock"
    },
    {
      id: 3,
      title: "Chill Hip-Hop",
      description: "Laid-back beats and flows",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=400",
      tracks: 42,
      genre: "Hip-Hop"
    },
    {
      id: 4,
      title: "Electronic Vibes",
      description: "Pulse-pounding electronic music",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400",
      tracks: 38,
      genre: "Electronic"
    }
  ];

  const albums = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Silva",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      year: 2024,
      genre: "Pop"
    },
    {
      id: 2,
      title: "Thunder Roads",
      artist: "The Wanderers",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300",
      year: 2023,
      genre: "Rock"
    },
    {
      id: 3,
      title: "Urban Legends",
      artist: "MC Flow",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      year: 2024,
      genre: "Hip-Hop"
    },
    {
      id: 4,
      title: "Digital Horizons",
      artist: "Synth Master",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300",
      year: 2024,
      genre: "Electronic"
    },
    {
      id: 5,
      title: "Jazz After Dark",
      artist: "Miles Away",
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=300",
      year: 2023,
      genre: "Jazz"
    },
    {
      id: 6,
      title: "Symphonic Tales",
      artist: "Orchestra Prima",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=300",
      year: 2024,
      genre: "Classical"
    }
  ];

  const playlists = [
    {
      id: 1,
      title: "Morning Motivation",
      creator: "Spotify",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=300",
      tracks: 30,
      genre: "Pop"
    },
    {
      id: 2,
      title: "Study Sessions",
      creator: "Focus Music",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=300",
      tracks: 45,
      genre: "Indie"
    },
    {
      id: 3,
      title: "Workout Beast Mode",
      creator: "Gym Hits",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=300",
      tracks: 60,
      genre: "Electronic"
    },
    {
      id: 4,
      title: "Late Night R&B",
      creator: "Smooth Vibes",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      tracks: 25,
      genre: "R&B"
    }
  ];

  // Create combined array for navigation
  const allTracks = [...featuredPlaylists, ...albums, ...playlists];

  const filteredContent = (items) => {
    return items.filter(item => {
      const matchesGenre = selectedGenre === 'All' || item.genre === selectedGenre;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (item.artist && item.artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           (item.creator && item.creator.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGenre && matchesSearch;
    });
  };

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
    const currentIndex = allTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % allTracks.length;
    setCurrentTrack(allTracks[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = allTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? allTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(allTracks[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#1a1f2e] to-[#0f1419] text-white p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[#72c4fa] via-[#a6e1fa] to-[#72c4fa] bg-clip-text text-transparent">
          Browse Music
        </h1>
        <p className="text-lg text-white/70 mb-6">Discover new favorites and explore genres</p>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Search playlists, albums, artists..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 focus:border-[#72c4fa] focus:outline-none transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#72c4fa] text-white' : 'text-white/70 hover:text-white'}`}
              >
                <IoGrid />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#72c4fa] text-white' : 'text-white/70 hover:text-white'}`}
              >
                <IoList />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedGenre === genre
                  ? 'bg-gradient-to-r from-[#72c4fa] to-[#a6e1fa] text-white shadow-lg transform scale-105'
                  : 'bg-white/10 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Playlists */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Featured Playlists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredContent(featuredPlaylists).map((playlist) => (
            <PlaylistCard 
              key={playlist.id} 
              item={playlist} 
              type="playlist" 
              viewMode={viewMode} 
              onPlay={() => handlePlayTrack(playlist)}
            />
          ))}
        </div>
      </section>

      {/* New Albums */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">New Albums</h2>
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6' : 'space-y-3'}`}>
          {filteredContent(albums).map((album) => (
            <AlbumCard 
              key={album.id} 
              item={album} 
              viewMode={viewMode} 
              onPlay={() => handlePlayTrack(album)}
            />
          ))}
        </div>
      </section>

      {/* Popular Playlists */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Popular Playlists</h2>
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6' : 'space-y-3'}`}>
          {filteredContent(playlists).map((playlist) => (
            <PlaylistCard 
              key={playlist.id} 
              item={playlist} 
              type="playlist" 
              viewMode={viewMode} 
              onPlay={() => handlePlayTrack(playlist)}
            />
          ))}
        </div>
      </section>

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

const PlaylistCard = ({ item, type, viewMode, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <div 
        className="group flex items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div 
            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
          >
            <IoPlay className="text-white text-xl" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{item.title}</h3>
          <p className="text-white/70 text-sm truncate">
            {type === 'playlist' ? `${item.tracks} tracks • ${item.creator || 'Various Artists'}` : item.description}
          </p>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
            <IoHeart className="text-white text-sm" />
          </button>
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
            <IoAdd className="text-white text-sm" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden border border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 sm:p-6">
        <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex space-x-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay();
                }}
                className="w-12 h-12 bg-[#72c4fa] hover:bg-[#5fb3f0] rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
              >
                <IoPlay className="text-white text-xl ml-1" />
              </button>
              <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200">
                <IoHeart className="text-white text-lg" />
              </button>
              <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200">
                <IoAdd className="text-white text-lg" />
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-[#72c4fa] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-white/70 text-sm mb-2">
            {type === 'playlist' ? `${item.tracks} tracks` : item.description}
          </p>
          <p className="text-white/50 text-xs">
            {item.creator || 'Various Artists'}
          </p>
        </div>
      </div>
    </div>
  );
};

const AlbumCard = ({ item, viewMode, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <div 
        className="group flex items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div 
            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
          >
            <IoPlay className="text-white text-xl" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{item.title}</h3>
          <p className="text-white/70 text-sm truncate">{item.artist} • {item.year}</p>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
            <IoHeart className="text-white text-sm" />
          </button>
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
            <IoAdd className="text-white text-sm" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden border border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-xl">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPlay();
              }}
              className="w-12 h-12 bg-[#72c4fa] hover:bg-[#5fb3f0] rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
            >
              <IoPlay className="text-white text-xl ml-1" />
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-white text-sm sm:text-base mb-1 group-hover:text-[#72c4fa] transition-colors duration-300 truncate">
            {item.title}
          </h3>
          <p className="text-white/70 text-xs sm:text-sm truncate">{item.artist}</p>
          <p className="text-white/50 text-xs">{item.year}</p>
        </div>
      </div>
    </div>
  );
};

export default Browse;