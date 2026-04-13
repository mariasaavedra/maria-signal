import { NextResponse } from 'next/server';
import { searchTracks } from '@/lib/audio/search';
import { toAudioError } from '@/lib/audio/errors';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.trim() ?? '';

    if (!q) {
      return NextResponse.json({ ok: false, error: 'q is required' }, { status: 400 });
    }

    const data = await searchTracks(q);
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    const { body, status } = toAudioError(err);
    return NextResponse.json(body, { status });
  }
}
