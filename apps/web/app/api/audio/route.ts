import { NextResponse } from 'next/server';
import { getAudioSnapshot } from '@/lib/audio/snapshot';
import { handleAudioAction } from '@/lib/audio/handlers';
import { toAudioError } from '@/lib/audio/errors';
import type { AudioActionRequest } from '@/lib/audio/contract';

export async function GET() {
  try {
    const data = await getAudioSnapshot();
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

    const result = await handleAudioAction(body as AudioActionRequest);
    return NextResponse.json(result);
  } catch (err) {
    const { body, status } = toAudioError(err);
    return NextResponse.json(body, { status });
  }
}
