# @m7/audio-os-shared

Shared domain types, utilities, constants, and infrastructure scripts used across the monorepo.

## Modules

- `types/` - Domain types (NormalizedTrack, PlaybackSnapshot, PlaybackActionRequest, etc.)
- `utils/` - Shared utility functions
- `constants/` - Shared constants
- `infra/` - Infrastructure scripts for Raspberry Pi deployment (see [infra/README.md](infra/README.md))

## Usage

Import from specific modules using path aliases:

```ts
// Domain types
import type {
  NormalizedTrack,
  PlaybackSnapshot,
  PlaybackActionRequest
} from '@m7/audio-os/shared/types';

// Utilities
import { someUtil } from '@m7/audio-os/shared/utils';

// Constants
import { SOME_CONSTANT } from '@m7/audio-os/shared/constants';
```

## Key Types

### NormalizedTrack

```ts
interface NormalizedTrack {
  uri: string;
  name: string;
  artist: string;
  duration: number | null;
}
```

### PlaybackSnapshot

```ts
interface PlaybackSnapshot {
  state: 'playing' | 'paused' | 'stopped';
  track: NormalizedTrack | null;
  position: number | null;
  artworkUrl: string | null;
}
```

### PlaybackActionRequest

Union type for all playback actions:
- `play`, `pause`, `resume`, `stop`, `previous`, `next`
- `seek` (with position)
- `playTrack`, `addToQueue`, `startPlaylist` (with uri)
- `shuffle`

See `types/src/index.ts` for the full type definitions.

## Note

Domain types are the source of truth. `apps/web/lib/audio/contract.ts` currently re-exports these types during a migration period.
