// src/components/BasicAudioPlayer.jsx
import React, { useEffect, useRef, useState } from 'react'
import { playSong } from '../api/songs'

const BasicAudioPlayer = ({ songId }) => {
  const audioRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const loadAudio = async () => {
      try {
        setLoading(true)
        setError(null)
        setIsPlaying(false)
        setCurrentTime(0)
        setDuration(0)

        const blob = await playSong(songId)
        
        // Validate that we received a blob
        if (!blob || !(blob instanceof Blob)) {
          throw new Error('Invalid audio data received')
        }

        const url = URL.createObjectURL(blob)

        if (audioRef.current) {
          // Clean up previous URL if exists
          if (audioRef.current.src) {
            URL.revokeObjectURL(audioRef.current.src)
          }
          
          audioRef.current.src = url
          audioRef.current.load()
        }
      } catch (err) {
        console.error('Error loading audio:', err)
        setError(`Failed to load audio: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    if (songId) {
      loadAudio()
    }

    // Cleanup function
    return () => {
      if (audioRef.current && audioRef.current.src) {
        URL.revokeObjectURL(audioRef.current.src)
      }
    }
  }, [songId])

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = (e) => {
      console.error('Audio error:', e)
      setError('Error playing audio')
      setIsPlaying(false)
    }

    const handleCanPlay = () => {
      setError(null) // Clear any previous errors
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
  }, [])

  const handleTogglePlay = async () => {
    if (!audioRef.current || loading) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        // The play() method returns a Promise
        await audioRef.current.play()
      }
    } catch (err) {
      console.error('Playback failed:', err)
      setError(`Playback failed: ${err.message}`)
      setIsPlaying(false)
    }
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e) => {
    if (!audioRef.current || loading) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <div className="p-4 bg-gray-900 text-white rounded shadow w-80">
      <h2 className="mb-2 text-lg font-semibold">Audio Player</h2>

      {loading && <p className="text-blue-400">Loading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <audio ref={audioRef} preload="metadata" />

      {/* Progress bar */}
      {duration > 0 && (
        <div className="mb-2">
          <div 
            className="w-full h-2 bg-gray-700 rounded cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-blue-600 rounded transition-all duration-100"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* Control buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleTogglePlay}
          disabled={loading || !!error}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-sm transition-colors"
        >
          {loading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
        </button>
        
        {/* Optional: Add stop button */}
        <button
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.pause()
              audioRef.current.currentTime = 0
              setCurrentTime(0)
              setIsPlaying(false)
            }
          }}
          disabled={loading || !!error}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-sm transition-colors"
        >
          Stop
        </button>
      </div>
    </div>
  )
}

export default BasicAudioPlayer