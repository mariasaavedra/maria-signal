import { mopidy } from '@/lib/mopidy';
import type { AudioActionRequest } from '@/lib/audio/contract';

export async function handleAudioAction(input: AudioActionRequest): Promise<{ ok: true; data?: unknown }> {
  switch (input.action) {
    // Playback
    case 'play':
      await mopidy.playback.play(input.tlid ?? null);
      return { ok: true };

    case 'pause':
      await mopidy.playback.pause();
      return { ok: true };

    case 'resume':
      await mopidy.playback.resume();
      return { ok: true };

    case 'stop':
      await mopidy.playback.stop();
      return { ok: true };

    case 'next':
      await mopidy.playback.next();
      return { ok: true };

    case 'previous':
      await mopidy.playback.previous();
      return { ok: true };

    case 'seek':
      if (input.timePosition < 0) {
        throw new Error('timePosition must be >= 0');
      }
      await mopidy.playback.seek(input.timePosition);
      return { ok: true };

    // Queue
    case 'queue.add':
      if (!input.uris.length) {
        throw new Error('uris must not be empty');
      }
      const added = await mopidy.queue.add({
        uris: input.uris,
        at_position: input.atPosition ?? null,
      });
      return { ok: true, data: added };

    case 'queue.clear':
      await mopidy.queue.clear();
      return { ok: true };

    case 'queue.remove':
      const removed = await mopidy.queue.remove(input.criteria);
      return { ok: true, data: removed };

    case 'queue.getTlTracks':
      const tlTracks = await mopidy.queue.getTlTracks();
      return { ok: true, data: tlTracks };

    case 'queue.shuffle':
      await mopidy.queue.shuffle(input.start ?? null, input.end ?? null);
      return { ok: true };

    // Playlists
    case 'playlists.list':
      const playlists = await mopidy.playlists.list();
      return { ok: true, data: playlists };

    case 'playlists.getItems':
      if (!input.uri) {
        throw new Error('uri is required for playlists.getItems');
      }
      const items = await mopidy.playlists.getItems(input.uri);
      return { ok: true, data: items };

    // History
    case 'history.getHistory':
      const history = await mopidy.history.getHistory();
      return { ok: true, data: history };

    case 'history.getLength':
      const length = await mopidy.history.getLength();
      return { ok: true, data: length };

    // Library
    case 'library.browse':
      const refs = await mopidy.library.browse(input.uri ?? null);
      return { ok: true, data: refs };

    case 'library.search':
      const results = await mopidy.library.search(
        input.query,
        input.uris ?? null,
        input.exact ?? null,
      );
      return { ok: true, data: results };
  }
}
