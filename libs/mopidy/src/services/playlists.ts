import { MopidyClient } from '../client';
import { MopidyTrackRaw, MopidyValidationError } from '../index';
import { PlaylistRef, Track } from '../models';

export interface PlaylistsService {
  list(): Promise<PlaylistRef[]>;
  getItems(uri: string): Promise<Track[]>;
}

const normalizeTrack = (track: MopidyTrackRaw): Track | null => {
  if (!track.uri) {
    return null;
  }

  return {
    uri: track.uri,
    name: track.name ?? null,
    albumName: track.album?.name ?? null,
    artistNames: track.artists?.map((artist) => artist.name).filter(Boolean) as string[] ?? [],
    lengthMs: track.length ?? null,
  };
};

export const createPlaylistsService = (client: MopidyClient): PlaylistsService => {
  return {
    async list() {
      const refs = await client.call('core.playlists.as_list');

      return refs.map((ref) => ({
        uri: ref.uri,
        name: ref.name,
      }));
    },

    async getItems(uri: string) {
      if (!uri.trim()) {
        throw new MopidyValidationError('Playlist URI is required.');
      }

      const tracks = await client.call('core.playlists.get_items', { uri });

      return tracks
        .map(normalizeTrack)
        .filter((track): track is Track => track !== null);
    },
  };
};