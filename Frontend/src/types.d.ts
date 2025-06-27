// src/types.d.ts
export interface Track {
  id: number;
  user: string;
  title: string;
  duration: string;    // e.g. "00:00:10"
  file: string;        // URL to the audio
  genre: string;
  play_count: number;
  like_count: number;
  public: boolean;
  created_at: string;  // ISO timestamp
}
