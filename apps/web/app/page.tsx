'use client';

import { PlayerCard } from '@/components/PlayerCard';
import { useAudio, useAudioAction } from '@/lib/audio/hooks';

export default function Home() {
  const { data, isLoading, error } = useAudio();
  const action = useAudioAction();

  if (isLoading || !data) return null;
  if (error) return <div className="text-sm text-red-500">{(error as Error).message}</div>;

  const state = data.state;
  const dotColor = state === 'playing' ? 'bg-accent' : state === 'paused' ? 'bg-brand' : 'bg-charcoal/40';

  return (
    <main className="min-h-screen flex items-center justify-center">
      <PlayerCard snapshot={data} onAction={action.mutate} />

      <div className="fixed bottom-5 right-5 flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${state === 'playing' ? 'animate-pulse' : ''}`} />
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">
          {state}
        </span>
      </div>
    </main>
  );
}
