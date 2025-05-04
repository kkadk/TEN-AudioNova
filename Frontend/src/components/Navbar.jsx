import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'; 

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-purple-600 text-white">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="TEN AudioNova Logo" className="h-8 w-8 object-cover" />
        <h1 className="text-2xl font-bold">TEN AudioNova</h1>
      </div>
      <div>
        <Link to="/" className="mr-4 hover:underline">Home</Link>
        <Link to="/about" className="mr-4 hover:underline">About</Link>
      </div>
    </nav>
  );
};
