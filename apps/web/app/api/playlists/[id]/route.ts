import { NextResponse } from 'next/server';
import { getPlaylistDetail } from '@/lib/audio/playlists';
import { toAudioError } from '@/lib/audio/errors';
import { decodeUri } from '@/lib/audio/encoding';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const uri = decodeUri(id);
    const data = await getPlaylistDetail(uri);
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    const { body, status } = toAudioError(err);
    return NextResponse.json(body, { status });
  }
}
