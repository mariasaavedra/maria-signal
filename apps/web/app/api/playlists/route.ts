import { NextResponse } from 'next/server';
import { getPlaylists } from '@/lib/audio/playlists';
import { toAudioError } from '@/lib/audio/errors';

export async function GET() {
  try {
    const data = await getPlaylists();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    const { body, status } = toAudioError(err);
    return NextResponse.json(body, { status });
  }
}
