export type MopidyPlaybackStateRaw = 'playing' | 'paused' | 'stopped';

export interface MopidyArtistRaw {
  __model__?: 'Artist';
  name?: string | null;
  uri?: string | null;
}

export interface MopidyAlbumRaw {
  __model__?: 'Album';
  name?: string | null;
  uri?: string | null;
}

export interface MopidyTrackRaw {
  __model__?: 'Track';
  uri?: string | null;
  name?: string | null;
  length?: number | null;
  artists?: MopidyArtistRaw[] | null;
  album?: MopidyAlbumRaw | null;
}

export interface MopidyTlTrackRaw {
  __model__?: 'TlTrack';
  tlid: number;
  track?: MopidyTrackRaw | null;
}

export interface MopidyPlaylistRefRaw {
  __model__?: 'Ref';
  uri: string;
  name: string;
  type?: string;
}

export interface MopidyMethodMap {
  'core.playback.play': {
    params: undefined;
    result: null;
  };
  'core.playback.pause': {
    params: undefined;
    result: null;
  };
  'core.playback.stop': {
    params: undefined;
    result: null;
  };
  'core.playback.next': {
    params: undefined;
    result: null;
  };
  'core.playback.previous': {
    params: undefined;
    result: null;
  };
  'core.playback.get_state': {
    params: undefined;
    result: MopidyPlaybackStateRaw;
  };
  'core.playback.get_current_track': {
    params: undefined;
    result: MopidyTrackRaw | null;
  };
  'core.tracklist.get_tl_tracks': {
    params: undefined;
    result: MopidyTlTrackRaw[];
  };
  'core.tracklist.add': {
    params: {
      uris: string[];
      at_position?: number | null;
    };
    result: MopidyTlTrackRaw[];
  };
  'core.tracklist.clear': {
    params: undefined;
    result: null;
  };
  'core.playlists.as_list': {
    params: undefined;
    result: MopidyPlaylistRefRaw[];
  };
  'core.playlists.get_items': {
    params: {
      uri: string;
    };
    result: MopidyTrackRaw[];
  };
}

export type MethodName = keyof MopidyMethodMap;
export type MethodParams<TMethod extends MethodName> = MopidyMethodMap[TMethod]['params'];
export type MethodResult<TMethod extends MethodName> = MopidyMethodMap[TMethod]['result'];