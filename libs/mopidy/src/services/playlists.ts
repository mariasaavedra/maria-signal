import { MopidyClient } from '../client';
import { MopidyRefRaw } from '../rpc/methods';
import { MopidyValidationError } from '../rpc/types';

export interface PlaylistsService {
  list(): Promise<MopidyRefRaw[]>;
  getItems(uri: string): Promise<MopidyRefRaw[] | null>;
}

export const createPlaylistsService = (client: MopidyClient): PlaylistsService => {
  return {
    async list() {
      return client.call('core.playlists.as_list');
    },

    async getItems(uri: string) {
      if (!uri.trim()) {
        throw new MopidyValidationError('Playlist URI is required.');
      }

      return client.call('core.playlists.get_items', { uri });
    },
  };
};
