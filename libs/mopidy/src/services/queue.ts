import { MopidyClient } from '../client';
import { MopidyTlTrackRaw } from '../rpc/methods';
import { MopidyValidationError } from '../rpc/types';

export interface QueueService {
  getTlTracks(): Promise<MopidyTlTrackRaw[]>;
  add(input: { uris: string[]; at_position?: number | null }): Promise<MopidyTlTrackRaw[]>;
  remove(criteria: Record<string, unknown>): Promise<MopidyTlTrackRaw[]>;
  clear(): Promise<void>;
  shuffle(start?: number | null, end?: number | null): Promise<void>;
}

export const createQueueService = (client: MopidyClient): QueueService => {
  return {
    async getTlTracks() {
      return client.call('core.tracklist.get_tl_tracks');
    },

    async add(input) {
      if (!input.uris.length) {
        throw new MopidyValidationError('Queue add requires at least one URI.');
      }

      return client.call('core.tracklist.add', {
        uris: input.uris,
        at_position: input.at_position ?? null,
      });
    },

    async remove(criteria) {
      return client.call('core.tracklist.remove', { criteria });
    },

    async clear() {
      await client.call('core.tracklist.clear');
    },

    async shuffle(start, end) {
      await client.call('core.tracklist.shuffle', { start: start ?? null, end: end ?? null });
    },
  };
};
