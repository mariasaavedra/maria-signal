import { NextResponse } from 'next/server';
import { getPlaybackSnapshot } from '@/lib/audio/snapshot';
import { handleAudioAction } from '@/lib/audio/handlers';
import { toAudioError } from '@/lib/audio/errors';
import type { PlaybackActionRequest } from '@/lib/audio/contract';

export async function GET() {
  try {
    const data = await getPlaybackSnapshot();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    const { body, status } = toAudioError(err);
    return NextResponse.json(body, { status });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body.action !== 'string') {
      return NextResponse.json({ ok: false, error: 'action is required' }, { status: 400 });
    }

    const result = await handleAudioAction(body as PlaybackActionRequest);
    return NextResponse.json(result);
  } catch (err) {
    const { body, status } = toAudioError(err);
    return NextResponse.json(body, { status });
  }
}
