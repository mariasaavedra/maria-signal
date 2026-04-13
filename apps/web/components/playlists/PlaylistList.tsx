'use client';

import type { PlaylistSummary } from '@/lib/audio/contract';
import { PlaylistRow } from './PlaylistRow';

interface PlaylistListProps {
  playlists: PlaylistSummary[];
  onStartPlaylist: (uri: string) => void;
}

export function PlaylistList({ playlists, onStartPlaylist }: PlaylistListProps) {
  if (playlists.length === 0) {
    return <p className="text-sm text-charcoal/50 px-3">No playlists found.</p>;
  }

  return (
    <div className="flex flex-col">
      {playlists.map((playlist) => (
        <PlaylistRow
          key={playlist.uri}
          playlist={playlist}
          onPlay={() => onStartPlaylist(playlist.uri)}
        />
      ))}
    </div>
  );
}
