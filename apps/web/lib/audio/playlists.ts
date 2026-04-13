import 'server-only';
import { mopidy } from '@/lib/mopidy';
import type { MopidyTrackRaw } from '@m7/mopidy';
import type { NormalizedTrack, PlaylistDetail, PlaylistSummary } from '@/lib/audio/contract';

function normalizeTrack(raw: MopidyTrackRaw): NormalizedTrack {
  return {
    uri: raw.uri,
    name: raw.name ?? 'Unknown track',
    artist: raw.artists?.[0]?.name ?? 'Unknown artist',
    duration: raw.length ?? null,
  };
}

export async function getPlaylists(): Promise<PlaylistSummary[]> {
  const refs = await mopidy.playlists.list();
  return refs.map((r) => ({ uri: r.uri, name: r.name }));
}

export async function getPlaylistDetail(uri: string): Promise<PlaylistDetail> {
  const refs = await mopidy.playlists.getItems(uri);

  if (!refs) {
    return { uri, name: '', tracks: [] };
  }

  const uris = refs.map((r) => r.uri);
  const nameMap = Object.fromEntries(refs.map((r) => [r.uri, r.name]));

  const lookupResult = uris.length > 0 ? await mopidy.library.lookup(uris) : {};

  const tracks: NormalizedTrack[] = uris.flatMap((trackUri) => {
    const matches = lookupResult[trackUri] ?? [];
    if (matches.length > 0) return [normalizeTrack(matches[0])];
    // Fall back to ref name if lookup returned nothing
    return [{ uri: trackUri, name: nameMap[trackUri] ?? 'Unknown track', artist: '', duration: null }];
  });

  // Get the playlist name from as_list
  const allPlaylists = await mopidy.playlists.list();
  const meta = allPlaylists.find((p) => p.uri === uri);

  return { uri, name: meta?.name ?? '', tracks };
}
