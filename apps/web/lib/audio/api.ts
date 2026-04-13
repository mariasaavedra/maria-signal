import type {
  AudioResponse,
  PlaybackActionRequest,
  PlaybackSnapshot,
} from './contract';

export async function getPlaybackSnapshot(): Promise<PlaybackSnapshot> {
  const res = await fetch('/api/audio');

  if (!res.ok) throw new Error(`Failed: ${res.status}`);

  const json = await res.json();

  if (!json.ok) throw new Error(json.error);

  return json.data;
}

export async function postPlaybackAction(
  input: PlaybackActionRequest
): Promise<AudioResponse> {
  const res = await fetch('/api/audio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const json = await res.json();

  if (!res.ok || !json.ok) {
    throw new Error(json.error ?? 'Request failed');
  }

  return json;
}
