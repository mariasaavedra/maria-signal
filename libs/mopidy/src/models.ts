export type PlaybackState = 'playing' | 'paused' | 'stopped';

export type RefType = 'album' | 'artist' | 'directory' | 'playlist' | 'track';

export interface Ref {
  uri: string;
  name: string;
  type: RefType;
}

export interface Artist {
  uri?: string | null;
  name?: string | null;
  sortname?: string | null;
  musicbrainz_id?: string | null;
}

export interface Album {
  uri?: string | null;
  name?: string | null;
  artists?: Artist[] | null;
  num_tracks?: number | null;
  num_discs?: number | null;
  date?: string | null;
  musicbrainz_id?: string | null;
}

export interface Track {
  uri: string;
  name?: string | null;
  artists?: Artist[] | null;
  album?: Album | null;
  composers?: Artist[] | null;
  performers?: Artist[] | null;
  genre?: string | null;
  track_no?: number | null;
  disc_no?: number | null;
  date?: string | null;
  length?: number | null;
  bitrate?: number | null;
  comment?: string | null;
  musicbrainz_id?: string | null;
  last_modified?: number | null;
}

export interface TlTrack {
  tlid: number;
  track: Track;
}

export interface Playlist {
  uri: string;
  name: string;
  tracks?: Track[] | null;
  last_modified?: number | null;
}

export interface Image {
  uri: string;
  width?: number | null;
  height?: number | null;
}

export interface SearchResult {
  uri?: string | null;
  tracks?: Track[] | null;
  artists?: Artist[] | null;
  albums?: Album[] | null;
}
