"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiOutlineSearch, AiOutlineArrowLeft } from "react-icons/ai"; // Importing icons

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const allSongs = [
    {
      id: 1,
      title: "Song Title 1",
      artist: "Artist 1",
      album: "Album 1",
      img: "1.jpeg",
    },
    {
      id: 2,
      title: "Song Title 2",
      artist: "Artist 2",
      album: "Album 2",
      img: "2.jpeg",
    },
    {
      id: 3,
      title: "Song Title 3",
      artist: "Artist 3",
      album: "Album 3",
      img: "3.jpeg",
    },
    {
      id: 4,
      title: "Song Title 4",
      artist: "Artist 4",
      album: "Album 4",
      img: "2.jpeg",
    },
    {
      id: 5,
      title: "Song Title 5",
      artist: "Artist 5",
      album: "Album 5",
      img: "1.jpeg",
    },
  ];

  const categories = [
    { name: "Music", color: "bg-pink-600" },
    { name: "Podcasts", color: "bg-green-700" },
    { name: "Live Events", color: "bg-purple-600" },
    { name: "Made For You", color: "bg-blue-800" },
    { name: "New Releases", color: "bg-lime-600" },
    { name: "Summer", color: "bg-yellow-500" },
    { name: "Hindi", color: "bg-pink-500" },
    { name: "Telugu", color: "bg-orange-600" },
    { name: "Podcast Charts", color: "bg-blue-600" },
    { name: "Podcast New Releases", color: "bg-purple-300" },
    { name: "Video Podcasts", color: "bg-red-500" },
    { name: "Business & Technology", color: "bg-emerald-600" },
    { name: "Charts", color: "bg-violet-400" },
    { name: "Punjabi", color: "bg-fuchsia-700" },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      setResults([]); // Show no results when search is empty
      return;
    }

    // Filter songs based on the search query
    const filteredSongs = allSongs
      .filter(
        (song) =>
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query) ||
          song.album.toLowerCase().includes(query)
      )
      .map((song) => ({ ...song, type: "song" }));

    // Only display filtered songs (not categories)
    setResults(filteredSongs);
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Search</h1>

        {/* Search Bar with Icons */}
        <div className="relative mb-6">
          {/* Input Field with Left and Right Icons */}
          <div className="flex items-center overflow-hidden ">
            {/* Back Icon */}
            {searchQuery && (
              <AiOutlineArrowLeft
                className="mr-4 text-gray-400 cursor-pointer"
                size={20}
                onClick={handleClearSearch}
              />
            )}
            {/* Input Field */}
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="What do you want to listen to?"
              className="w-full bg-gray-800 text-white placeholder-gray-400 focus-visible:ring-transparent"
            />
            {/* Search Icon */}
            {!searchQuery && (
              <AiOutlineSearch className="ml-4 text-gray-400" size={20} />
            )}
          </div>
        </div>

        {/* Browse Categories (when no search or no results) */}
        {searchQuery === "" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Browse all</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`rounded-lg h-28 flex items-end p-4 font-semibold text-white ${category.color}`}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Search Results */}
        {searchQuery !== "" && (
          <div className="mt-6 space-y-6">
            {results.length === 0 ? (
              <p className="text-center text-gray-400">No results found.</p>
            ) : (
              results.map((result) => (
                <Card
                  key={result.id}
                  className="bg-gray-800 text-white p-4 rounded-lg shadow-xl hover:bg-gray-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Placeholder Image for Album Cover */}
                      <img
                        src={`/${encodeURIComponent(result.img)}`}
                        alt={result.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-400">{result.artist}</p>
                        <p className="text-sm text-gray-500">{result.album}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      {/* Play and Favorite Buttons */}
                      <Button variant="link" className="text-blue-500 px-0">
                        ▶ Play
                      </Button>
                      <Button
                        variant="ghost"
                        className="hover:text-red-500 text-gray-500 px-0"
                      >
                        ♥
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { Search };
