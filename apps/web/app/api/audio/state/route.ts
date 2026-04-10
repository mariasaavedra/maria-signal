import { mopidy } from "@/lib/mopidy";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const status = await mopidy.playback.getState();

    return NextResponse.json({ status });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}