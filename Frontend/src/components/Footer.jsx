import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-center md:text-left">
            © 2025 <span className="font-semibold">TEN AudioNova</span>. All rights reserved.
          </div>

          <div className="flex space-x-4 justify-center md:justify-end">
            <a href="#" className="text-gray-300 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
