import { MopidyClient } from '../client';
import { PlaybackState, Track } from '../models';
import { MopidyTrackRaw } from '../rpc/methods';

export interface PlaybackService {
  play(): Promise<void>;
  pause(): Promise<void>;
  stop(): Promise<void>;
  next(): Promise<void>;
  previous(): Promise<void>;
  getState(): Promise<PlaybackState>;
  getCurrentTrack(): Promise<Track | null>;
}

const normalizeTrack = (track: MopidyTrackRaw | null): Track | null => {
  if (!track || !track.uri) {
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

export const createPlaybackService = (client: MopidyClient): PlaybackService => {
  return {
    async play() {
      await client.call('core.playback.play');
    },

    async pause() {
      await client.call('core.playback.pause');
    },

    async stop() {
      await client.call('core.playback.stop');
    },

    async next() {
      await client.call('core.playback.next');
    },

    async previous() {
      await client.call('core.playback.previous');
    },

    async getState() {
      return client.call('core.playback.get_state');
    },

    async getCurrentTrack() {
      const track = await client.call('core.playback.get_current_track');
      return normalizeTrack(track);
    },
  }
}