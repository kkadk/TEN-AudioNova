// src/components/MiniPlayer.jsx
import React, { useEffect, useRef, useState } from 'react'
import {
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoClose,
  IoVolumeHigh,
  IoPlay,
  IoPause,
} from 'react-icons/io5'
import { useMiniPlayer } from '../context/MiniPlayerContext'
import { playSong } from '../api/songs'

const MiniPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    closePlayer,
    togglePlayPause,
    playNext,
    playPrev,
    setProgress,
    setVolume,
  } = useMiniPlayer()

  // Local state for duration and current time
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Ref to our HTMLAudioElement
  const audioRef = useRef(null)

  // Load audio when track changes - following BasicAudioPlayer pattern
  useEffect(() => {
    const loadAudio = async () => {
      if (!currentTrack) return

      try {
        setIsLoading(true)
        setError(null)
        setCurrentTime(0)
        setDuration(0)

        // Pause and reset current audio
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
          // Clean up previous URL if exists
          if (audioRef.current.src) {
            URL.revokeObjectURL(audioRef.current.src)
          }
        }

        // Fetch audio blob - simplified like BasicAudioPlayer
        const blob = await playSong(currentTrack.id)
        
        // Validate that we received a blob
        if (!blob || !(blob instanceof Blob)) {
          throw new Error('Invalid audio data received')
        }

        const url = URL.createObjectURL(blob)

        if (audioRef.current) {
          audioRef.current.src = url
          audioRef.current.volume = volume / 100
          audioRef.current.load()
        }
      } catch (err) {
        console.error('Error loading audio:', err)
        setError(`Failed to load audio: ${err.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    if (currentTrack) {
      loadAudio()
    }

    // Cleanup function
    return () => {
      if (audioRef.current && audioRef.current.src) {
        URL.revokeObjectURL(audioRef.current.src)
      }
    }
  }, [currentTrack?.id, volume])

  // Handle play/pause state changes
  useEffect(() => {
    const handlePlayPause = async () => {
      if (!audioRef.current || isLoading) return

      try {
        if (isPlaying) {
          await audioRef.current.play()
        } else {
          audioRef.current.pause()
        }
      } catch (err) {
        console.error('Playback failed:', err)
        setError(`Playback failed: ${err.message}`)
        // Let context know playback failed
        togglePlayPause()
      }
    }

    handlePlayPause()
  }, [isPlaying, isLoading])

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // Audio event handlers - following BasicAudioPlayer pattern
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      const current = audio.currentTime
      setCurrentTime(current)
      
      if (duration > 0) {
        const pct = (current / duration) * 100
        setProgress(Math.floor(pct))
      }
    }

    const handlePlay = () => {
      // Audio element started playing
      setError(null)
    }

    const handlePause = () => {
      // Audio element paused
    }

    const handleEnded = () => {
      setCurrentTime(0)
      playNext()
    }

    const handleError = (e) => {
      console.error('Audio error:', e)
      setError('Error playing audio')
      setIsLoading(false)
    }

    const handleCanPlay = () => {
      setError(null) // Clear any previous errors
      setIsLoading(false)
    }

    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplay', handleCanPlay)

    // Cleanup
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [duration, setProgress, playNext])

  // Format time helper - same as BasicAudioPlayer
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Handle progress bar click - same as BasicAudioPlayer
  const handleSeek = (e) => {
    if (!audioRef.current || isLoading) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  if (!currentTrack) return null

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} preload="metadata" />

      <div className="fixed bottom-8 right-8 w-96 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 z-50 overflow-hidden">
        {/* Progress bar */}
        <div 
          className="w-full h-1 bg-white/20 cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="p-6 mb-2">
          {/* Track info & close */}
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
                    {currentTrack.emoji || '🎵'}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-white/60 text-xs">
                  {currentTrack.artist || 'Unknown Artist'}
                </p>
              </div>
            </div>
            <button
              onClick={closePlayer}
              className="text-white/60 hover:text-white transition-colors p-1"
            >
              <IoClose className="text-lg" />
            </button>
          </div>

          {/* Error display */}
          {error && (
            <div className="text-red-400 text-xs mb-2 truncate">
              {error}
            </div>
          )}

          {/* Time display */}
          <div className="flex justify-between text-xs text-white/60 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mt-4 mb-3">
            <button
              onClick={playPrev}
              className="text-white/70 hover:text-white transition-colors disabled:opacity-50"
              disabled={isLoading || !!error}
            >
              <IoPlaySkipBack className="text-xl" />
            </button>

            <button
              onClick={togglePlayPause}
              disabled={isLoading || !!error}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:from-blue-400 hover:to-purple-500 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isPlaying ? (
                <IoPause className="text-white text-lg" />
              ) : (
                <IoPlay className="text-white text-lg ml-0.5" />
              )}
            </button>

            <button
              onClick={playNext}
              className="text-white/70 hover:text-white transition-colors disabled:opacity-50"
              disabled={isLoading || !!error}
            >
              <IoPlaySkipForward className="text-xl" />
            </button>
          </div>

          {/* Volume control */}
          <div className="flex items-center space-x-2">
            <IoVolumeHigh className="text-white/60 text-sm" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer accent-blue-500"
              disabled={isLoading || !!error}
            />
            <span className="text-white/60 text-xs w-8 text-right">{volume}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default MiniPlayer