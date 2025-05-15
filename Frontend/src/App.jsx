import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Search } from "./pages/Search";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import ArtistDetails from "./pages/ArtistDetails";
import PlayList from "./pages/PlayList";
import Home from "./pages/Home";
import { Footer } from "./components/Footer";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <Navbar />

          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/library" element={<Library />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/artist" element={<ArtistDetails />} />
              <Route path="/playlist" element={<PlayList />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
