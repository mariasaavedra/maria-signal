import { MopidyClient } from '../client';
import { MopidyRefRaw, MopidySearchResultRaw } from '../rpc/methods';

export interface LibraryService {
  browse(uri?: string | null): Promise<MopidyRefRaw[]>;
  search(
    query: Record<string, string[]>,
    uris?: string[] | null,
    exact?: boolean | null,
  ): Promise<MopidySearchResultRaw[]>;
}

export const createLibraryService = (client: MopidyClient): LibraryService => {
  return {
    async browse(uri) {
      return client.call('core.library.browse', { uri: uri ?? null });
    },

    async search(query, uris, exact) {
      return client.call('core.library.search', {
        query,
        uris: uris ?? null,
        exact: exact ?? null,
      });
    },
  };
};
