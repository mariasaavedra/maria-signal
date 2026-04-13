'use client';

import { useState } from 'react';
import { useSearch, usePlaybackAction } from '@/lib/audio/hooks';
import { SearchBox } from '@/components/search/SearchBox';
import { SearchResults } from '@/components/search/SearchResults';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { data, isFetching } = useSearch(query);
  const action = usePlaybackAction();

  return (
    <main className="min-h-screen p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-dark mb-6">Search</h1>

      <SearchBox value={query} onChange={setQuery} />

      <div className="mt-4">
        {isFetching && <p className="text-sm text-charcoal/50 px-3">Searching…</p>}
        {!isFetching && data && (
          <SearchResults
            results={data}
            onPlayTrack={(uri) => action.mutate({ action: 'playTrack', uri })}
            onAddToQueue={(uri) => action.mutate({ action: 'addToQueue', uri })}
          />
        )}
      </div>
    </main>
  );
}
