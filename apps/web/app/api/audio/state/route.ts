import { mopidy } from '@/lib/mopidy';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [status, track] = await Promise.all([
      mopidy.playback.getState(),
      mopidy.playback.getCurrentTrack(),
    ]);

    return NextResponse.json({
      status,
      track,
      artist: track?.artistNames?.[0] ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}