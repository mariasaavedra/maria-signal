import { mopidy } from '@/lib/mopidy';
import type { AudioSnapshot } from '@/lib/audio/contract';

export async function getAudioSnapshot(): Promise<AudioSnapshot> {
  const [state, track, tlTrack, tlid, timePosition] = await Promise.all([
    mopidy.playback.getState(),
    mopidy.playback.getCurrentTrack(),
    mopidy.playback.getCurrentTlTrack(),
    mopidy.playback.getCurrentTlid(),
    mopidy.playback.getTimePosition(),
  ]);

  return { state, track, tlTrack, tlid, timePosition };
}
