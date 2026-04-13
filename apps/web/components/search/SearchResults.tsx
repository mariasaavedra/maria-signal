'use client';

import type { SearchResults as SearchResultsType } from '@/lib/audio/contract';
import { TrackRow } from '@/components/playlists/TrackRow';

interface SearchResultsProps {
  results: SearchResultsType;
  onPlayTrack: (uri: string) => void;
  onAddToQueue: (uri: string) => void;
}

export function SearchResults({ results, onPlayTrack, onAddToQueue }: SearchResultsProps) {
  if (results.tracks.length === 0) {
    return (
      <p className="text-sm text-charcoal/50 px-3">
        No results for &ldquo;{results.query}&rdquo;.
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {results.tracks.map((track) => (
        <TrackRow
          key={track.uri}
          track={track}
          onPlay={() => onPlayTrack(track.uri)}
          onAdd={() => onAddToQueue(track.uri)}
        />
      ))}
    </div>
  );
}
