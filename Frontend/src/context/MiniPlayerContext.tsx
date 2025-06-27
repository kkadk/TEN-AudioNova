// src/context/MiniPlayerContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { Track } from '../types';

interface MiniPlayerContextValue {
  queue: Track[];
  currentIndex: number;       // position in the queue
  currentTrack: Track | null; // same as queue[currentIndex]
  isPlaying: boolean;
  volume: number;
  progress: number;

  // actions
  openPlayer: (track: Track, tracks?: Track[]) => void;
  closePlayer: () => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrev: () => void;
  setVolume: (v: number) => void;
  setProgress: (p: number) => void;
}

const MiniPlayerContext = createContext<MiniPlayerContextValue | undefined>(
  undefined
);

export const MiniPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(40);
  const [progress, setProgress] = useState(0);

  // derive currentTrack
  const currentTrack = queue[currentIndex] || null;

  const openPlayer = useCallback(
    (track: Track, tracks: Track[] = []) => {
      if (tracks.length) {
        // if a new queue is provided, replace it
        const startIndex = tracks.findIndex((t) => t.id === track.id);
        setQueue(tracks);
        setCurrentIndex(startIndex >= 0 ? startIndex : 0);
      } else {
        // if no queue, just play this one
        setQueue([track]);
        setCurrentIndex(0);
      }
      setPlaying(true);
      setProgress(0);
    },
    []
  );

  const closePlayer = useCallback(() => {
    setPlaying(false);
    setQueue([]);
    setCurrentIndex(0);
    setProgress(0);
  }, []);

  const togglePlayPause = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  const playNext = useCallback(() => {
    setCurrentIndex((idx) => {
      const next = idx + 1;
      return next < queue.length ? next : 0; // wrap around
    });
    setPlaying(true);
    setProgress(0);
  }, [queue.length]);

  const playPrev = useCallback(() => {
    setCurrentIndex((idx) => {
      const prev = idx - 1;
      return prev >= 0 ? prev : queue.length - 1; // wrap around
    });
    setPlaying(true);
    setProgress(0);
  }, [queue.length]);

  return (
    <MiniPlayerContext.Provider
      value={{
        queue,
        currentIndex,
        currentTrack,
        isPlaying,
        volume,
        progress,
        openPlayer,
        closePlayer,
        togglePlayPause,
        playNext,
        playPrev,
        setVolume,
        setProgress,
      }}
    >
      {children}
    </MiniPlayerContext.Provider>
  );
};

export const useMiniPlayer = () => {
  const ctx = useContext(MiniPlayerContext);
  if (!ctx) throw new Error('useMiniPlayer must be inside MiniPlayerProvider');
  return ctx;
};
