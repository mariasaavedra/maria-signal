'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null);

  const call = async (endpoint: string, method: 'GET' | 'POST' = 'POST') => {
    try {
      setLoading(endpoint);
      await fetch(`/api/audio/${endpoint}`, { method });
    } finally {
      setLoading(null);
    }
  };

  const isLoading = (key: string) => loading === key;

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4 bg-zinc-50 font-sans dark:bg-black">
      
      <div className="flex gap-2">
        <button
          onClick={() => call('previous')}
          disabled={!!loading}
          className="px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-800"
        >
          ⏮
        </button>

        <button
          onClick={() => call('play')}
          disabled={!!loading}
          className="px-4 py-2 rounded bg-green-500 text-white"
        >
          {isLoading('play') ? '...' : '▶'}
        </button>

        <button
          onClick={() => call('pause')}
          disabled={!!loading}
          className="px-4 py-2 rounded bg-yellow-500 text-black"
        >
          {isLoading('pause') ? '...' : '⏸'}
        </button>

        <button
          onClick={() => call('next')}
          disabled={!!loading}
          className="px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-800"
        >
          ⏭
        </button>
      </div>

      <button
        onClick={() => call('state', 'GET')}
        disabled={!!loading}
        className="px-4 py-2 rounded bg-blue-500 text-white"
      >
        Refresh State
      </button>

    </div>
  );
}