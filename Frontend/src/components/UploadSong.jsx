import React, { useState, useRef } from 'react';
import { Upload, X, Music, Tag, File } from 'lucide-react';
import { uploadSong } from '../api/songs';

export default function UploadSong({ showUploadModal, setShowUploadModal }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!title || !genre || !selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("file", selectedFile);
    try {
      const response = await uploadSong(formData);
      console.log("Uploaded successfully", response);
      setShowUploadModal(false);
    } catch (error) {
      console.error("Upload failed", error);
    }
    setIsUploading(false);
    setShowUploadModal(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!showUploadModal) return null;

  return (
    <div className="flex pt-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full mx-auto transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Upload Song</h2>
              <p className="text-sm text-gray-500">Share your music with the world</p>
            </div>
          </div>
          <button
            onClick={() => setShowUploadModal(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          <div className='flex gap-3'>
            <div className='w-1/2'>
              {/* Song Title Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Music className="w-4 h-4" />
                  Song Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter song title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black"
                />
              </div>

              {/* Genre Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Tag className="w-4 h-4" />
                  Genre
                </label>
                <input
                  type="text"
                  name="genre"
                  placeholder="e.g., Pop, Rock, Jazz"
                  required
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="text-black w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading || !selectedFile || !title || !genre}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Song
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* File Upload Area */}
            <div className="space-y-2 w-1/2 h-full flex flex-col">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <File className="w-4 h-4" />
                Audio File
              </label>

              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : selectedFile
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  name="file"
                  accept="audio/*"
                  required={!selectedFile}
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  className="text-black absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {selectedFile ? (
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Music className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">
                        Drop your audio file here, or{' '}
                        <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                          browse
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Supports MP3, WAV, FLAC, and more
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}