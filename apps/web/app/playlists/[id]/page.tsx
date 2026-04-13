'use client';

import { use } from 'react';
import { usePlaylistDetail, usePlaybackAction } from '@/lib/audio/hooks';
import { PlaylistDetail } from '@/components/playlists/PlaylistDetail';

export default function PlaylistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = usePlaylistDetail(id);
  const action = usePlaybackAction();

  if (isLoading) return null;
  if (error) return <div className="text-sm text-red-500">{(error as Error).message}</div>;
  if (!data) return null;

  return (
    <main className="min-h-screen p-6 max-w-lg mx-auto">
      <PlaylistDetail
        detail={data}
        onStartPlaylist={() => action.mutate({ action: 'startPlaylist', uri: data.uri })}
        onPlayTrack={(uri) => action.mutate({ action: 'playTrack', uri })}
        onAddToQueue={(uri) => action.mutate({ action: 'addToQueue', uri })}
      />
    </main>
  );
}
