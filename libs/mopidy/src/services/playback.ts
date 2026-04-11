import { MopidyClient } from '../client';
import { PlaybackState } from '../models';
import {
  MopidyTlTrackRaw,
  MopidyTrackRaw,
} from '../rpc/methods';

export interface PlaybackService {
  play(tlid?: number | null): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  stop(): Promise<void>;
  next(): Promise<void>;
  previous(): Promise<void>;
  seek(timePosition: number): Promise<boolean>;
  getState(): Promise<PlaybackState>;
  getCurrentTrack(): Promise<MopidyTrackRaw | null>;
  getCurrentTlTrack(): Promise<MopidyTlTrackRaw | null>;
  getCurrentTlid(): Promise<number | null>;
  getTimePosition(): Promise<number | null>;
}

export const createPlaybackService = (client: MopidyClient): PlaybackService => {
  return {
    async play(tlid) {
      await client.call('core.playback.play', tlid != null ? { tlid } : undefined);
    },

    async pause() {
      await client.call('core.playback.pause');
    },

    async resume() {
      await client.call('core.playback.resume');
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

    async seek(timePosition) {
      return client.call('core.playback.seek', { time_position: timePosition });
    },

    async getState() {
      return client.call('core.playback.get_state');
    },

    async getCurrentTrack() {
      return client.call('core.playback.get_current_track');
    },

    async getCurrentTlTrack() {
      return client.call('core.playback.get_current_tl_track');
    },

    async getCurrentTlid() {
      return client.call('core.playback.get_current_tlid');
    },

    async getTimePosition() {
      return client.call('core.playback.get_time_position');
    },
  };
};
