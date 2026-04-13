'use client';

import { Playback } from '@/components/playback/Playback';
import { usePlayback, usePlaybackAction } from '@/lib/audio/hooks';

export default function Home() {
  const { data, isLoading, error } = usePlayback();
  const action = usePlaybackAction();

  if (isLoading || !data) return null;
  if (error) return <div className="text-sm text-red-500">{(error as Error).message}</div>;

  const state = data.state;
  const dotColor = state === 'playing' ? 'bg-accent' : state === 'paused' ? 'bg-brand' : 'bg-charcoal/40';
  const artworkUrl = data.artworkUrl;

  return (
    <main className="min-h-screen flex items-center justify-center">
      {artworkUrl && (
        <div
          className="fixed inset-0 -z-10 scale-150 blur-[50px] opacity-50 saturate-200"
          style={{ backgroundImage: `url(${artworkUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}

      <Playback playback={data} onPlaybackAction={action.mutate} />

      <div className="fixed bottom-5 right-5 flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${state === 'playing' ? 'animate-pulse' : ''}`} />
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">
          {state}
        </span>
      </div>
    </main>
  );
}
