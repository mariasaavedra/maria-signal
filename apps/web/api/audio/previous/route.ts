import { mopidy } from '@/lib/mopidy';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await mopidy.playback.next();

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}