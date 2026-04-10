// lib/mopidy.ts
import { createMopidy } from '@m7/mopidy';
import 'server-only';

const url = process.env.MOPIDY_RPC_URL;

if (!url) {
  throw new Error('Missing MOPIDY_RPC_URL');
}

export const mopidy = createMopidy({ url });