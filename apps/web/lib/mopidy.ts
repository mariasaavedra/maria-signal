import { createMopidy } from '@m7/mopidy';
import 'server-only';

export function createMopidyClient() {
  const url = process.env.MOPIDY_RPC_URL;

  if (!url) {
    throw new Error('Missing MOPIDY_RPC_URL');
  }

  return createMopidy({ url });
}