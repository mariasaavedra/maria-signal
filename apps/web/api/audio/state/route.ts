import { mopidy } from '@/lib/mopidy';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [state, track, timePosition] = await Promise.all([
      mopidy.playback.getState(),
      mopidy.playback.getCurrentTrack(),
      mopidy.playback.getTimePosition(),
    ]);

    return NextResponse.json({
      state,
      track,
      timePosition,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}