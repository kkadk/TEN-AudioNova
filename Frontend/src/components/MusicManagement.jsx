import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, Edit, Trash2, Plus, Eye, EyeOff, Clock, Users, Heart, Search, Filter } from 'lucide-react';
import { getUserSongs, updateSong, patchSong, deleteSong } from '../api/songs';
import { useMiniPlayer } from '../context/MiniPlayerContext';
import BasicAudioPlayer from './BasicAudioPlayer';

export default function MusicManagement() {
  const { openPlayer } = useMiniPlayer();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSong, setEditingSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Fetch songs on component mount
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const data = await getUserSongs();
      setSongs(data.results);
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (song) => {
    setEditingSong({ ...song });
  };

  const handleSave = async () => {
    try {
      const updatedSong = await updateSong(editingSong.id, {
        title: editingSong.title,
        genre: editingSong.genre,
        public: editingSong.public
      });
      
      setSongs(songs.map(song => 
        song.id === editingSong.id ? { ...song, ...updatedSong } : song
      ));
      setEditingSong(null);
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await deleteSong(id);
        setSongs(songs.filter(song => song.id !== id));
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
  };

  const toggleVisibility = async (song) => {
    try {
      const updatedSong = await patchSong(song.id, { public: !song.public });
      setSongs(songs.map(s => 
        s.id === song.id ? { ...s, public: !s.public } : s
      ));
    } catch (error) {
      console.error('Error updating visibility:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === 'all' || song.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = [...new Set(songs.map(song => song.genre))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading your music...</span>
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Music</h1>
          <p className="text-gray-600 mt-1">Manage your uploaded songs</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Upload Song
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Songs List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredSongs.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No songs found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredSongs.map((song) => (
              <div key={song.id} className="p-4 hover:bg-gray-50 transition-colors" onClick={() => openPlayer(song)}>
                {editingSong && editingSong.id === song.id ? (
                  /* Edit Mode */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={editingSong.title}
                          onChange={(e) => setEditingSong({...editingSong, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                        <input
                          type="text"
                          value={editingSong.genre}
                          onChange={(e) => setEditingSong({...editingSong, genre: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`public-${song.id}`}
                        checked={editingSong.public}
                        onChange={(e) => setEditingSong({...editingSong, public: e.target.checked})}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`public-${song.id}`} className="text-sm text-gray-700">
                        Make this song public
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingSong(null)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Display Mode */
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{song.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="capitalize">{song.genre}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {song.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {song.play_count} plays
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {song.like_count} likes
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        song.public 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {song.public ? 'Public' : 'Private'}
                      </span>
                      
                      <button
                        onClick={() => toggleVisibility(song)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title={song.public ? 'Make private' : 'Make public'}
                      >
                        {song.public ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      
                      <button
                        onClick={() => handleEdit(song)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit song"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(song.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete song"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal Placeholder */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Upload Song</h2>
            <p className="text-gray-600 mb-4">Use your existing upload modal component here</p>
            <button
              onClick={() => setShowUploadModal(false)}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}