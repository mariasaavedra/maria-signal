import { MopidyClient } from '../client';
import { TlTrack, Track } from '../models';
import { MopidyTlTrackRaw, MopidyTrackRaw } from '../rpc/methods';
import { MopidyValidationError } from '../rpc/types';

export interface QueueService {
  getQueue(): Promise<TlTrack[]>;
  add(input: { uris: string[]; atPosition?: number | null }): Promise<TlTrack[]>;
  clear(): Promise<void>;
}

const normalizeTrack = (track: MopidyTrackRaw | null | undefined): Track | null => {
  if (!track?.uri) {
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

const normalizeTlTrack = (item: MopidyTlTrackRaw): TlTrack => {
  return {
    tlid: item.tlid,
    track: normalizeTrack(item.track),
  };
};

export const createQueueService = (client: MopidyClient): QueueService => {
  return {
    async getQueue() {
      const tracks = await client.call('core.tracklist.get_tl_tracks');
      return tracks.map(normalizeTlTrack);
    },

    async add(input) {
      if (!input.uris.length) {
        throw new MopidyValidationError('Queue add requires at least one URI.');
      }

      const tracks = await client.call('core.tracklist.add', {
        uris: input.uris,
        at_position: input.atPosition ?? null,
      });

      return tracks.map(normalizeTlTrack);
    },

    async clear() {
      await client.call('core.tracklist.clear');
    },
  };
};