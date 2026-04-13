'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPlaybackSnapshot, postPlaybackAction } from './api';
import type {
  PlaybackActionRequest,
  PlaylistDetail,
  PlaylistSummary,
  SearchResults,
} from './contract';

export function usePlayback() {
  return useQuery({
    queryKey: ['playback'],
    queryFn: getPlaybackSnapshot,
    refetchInterval: 2000,
  });
}

export function usePlaybackAction() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: PlaybackActionRequest) => postPlaybackAction(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['playback'] });
    },
  });
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? 'Request failed');
  return json.data;
}

export function usePlaylists() {
  return useQuery<PlaylistSummary[]>({
    queryKey: ['playlists'],
    queryFn: () => fetchJson('/api/playlists'),
  });
}

export function usePlaylistDetail(encodedUri: string) {
  return useQuery<PlaylistDetail>({
    queryKey: ['playlists', encodedUri],
    queryFn: () => fetchJson(`/api/playlists/${encodedUri}`),
    enabled: encodedUri.length > 0,
  });
}

export function useSearch(q: string) {
  return useQuery<SearchResults>({
    queryKey: ['search', q],
    queryFn: () => fetchJson(`/api/search?q=${encodeURIComponent(q)}`),
    enabled: q.length > 0,
  });
}
