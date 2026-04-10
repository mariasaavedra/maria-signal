export type PlaybackState = 'playing' | 'paused' | 'stopped';

export interface Track {
  uri: string;
  name: string | null;
  albumName: string | null;
  artistNames: string[];
  lengthMs: number | null;
}

export interface TlTrack {
  tlid: number;
  track: Track | null;
}

export interface PlaylistRef {
  uri: string;
  name: string;
}