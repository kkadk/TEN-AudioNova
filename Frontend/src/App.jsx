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
import Browse from './pages/Browse';
import Login from './pages/Login';
import SignUp from "./pages/Signup";
import { MiniPlayerProvider } from './context/MiniPlayerContext';
import MiniPlayer from './components/MiniPlayer';
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <MiniPlayerProvider>
      <MiniPlayer />
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex flex-col flex-1">
            <Navbar />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/library" element={<Library />} />
                <Route path="/search" element={<Search />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/artist" element={<ArtistDetails />} />
                <Route path="/playlist" element={<PlayList />} />
              </Routes>
            </main>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </MiniPlayerProvider>
  );
}

export default App;
