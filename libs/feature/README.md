# @m7/audio-os-feature

Feature modules containing React components organized by feature area.

## Modules

- `shell/` - App shell components (sidebar, top bar)
- `library/` - Playlist and album browsing components (playlist-list, playlist-detail, album-card, track-row)
- `playback/` - Playback control components
- `search/` - Search interface components with infinite scroll

## Usage

Import from specific feature modules using path aliases:

```tsx
import { Sidebar, TopBar } from '@m7/audio-os/feature/shell';
import { PlaylistList, PlaylistDetail } from '@m7/audio-os/feature/library';
import { PlaybackControls } from '@m7/audio-os/feature/playback';
import { SearchResults } from '@m7/audio-os/feature/search';
```

## Organization

Each feature module follows this structure:

```
{module}/
  src/
    components/
      {component-name}/
        {component-name}.tsx
        index.ts
    index.ts            # Re-exports all components
```

Components are client-side React components (`'use client'`) and use TanStack Query hooks from `apps/web/lib/audio/hooks.ts` for data fetching.
