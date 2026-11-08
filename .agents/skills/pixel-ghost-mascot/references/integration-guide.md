# Pixel Ghost Mascot Integration Guide

This guide details drop-in setup across different web frameworks and architectures.

---

## 1. Vanilla HTML / Static Sites

1. Add `ghost.css` in `<head>`:
   ```html
   <link rel="stylesheet" href="/assets/ghost.css">
   ```
2. Add `ghost.js` right before `</body>`:
   ```html
   <script src="/assets/ghost.js"></script>
   ```
3. (Optional) Pass a custom preset:
   ```html
   <script>
     initPixelGhost({
       size: 24,
       body: '#7CF5C6',
       pupil: '#1b2a4a'
     });
   </script>
   ```

---

## 2. Astro

Astro components isolate styles and execute client scripts selectively. Because the ghost generates its own DOM elements at runtime, the CSS must be global, and scripts should account for client-side routing (`astro:page-load`).

### Option A: Layout Embedding (Recommended)
Place this inside your main layout (e.g. `src/layouts/Layout.astro`):

```astro
---
// Layout.astro
---
<!-- Include the ghost styles globally so dynamically injected elements are styled -->
<style is:global>
  @import '../styles/ghost.css';
</style>

<!-- Mount ghost on client side -->
<script>
  import { initPixelGhost } from '../scripts/ghost.js';

  // Handles initial load and Astro View Transitions
  document.addEventListener('astro:page-load', () => {
    initPixelGhost({
      body: '#6ea8fe', // Optional: match portfolio theme
      pupil: '#ffffff'
    });
  });
</script>
```

> **Astro Pitfall**: Standard scoped `<style>` tags in Astro append `data-astro-cid-*` selectors, which will not match elements created dynamically via `document.createElement`. Always use `<style is:global>` or import into your global stylesheet.

---

## 3. Next.js / React (App Router or Pages Router)

Because the ghost accesses `window`, `document`, and `innerWidth`, it must **never execute during Server-Side Rendering (SSR)**. Mount it strictly inside `useEffect` on the client.

```tsx
'use client';

import { useEffect } from 'react';
import { initPixelGhost } from '@/assets/ghost';
import '@/assets/ghost.css';

export default function PixelGhostMascot() {
  useEffect(() => {
    // Client-only execution with cleanup on unmount
    const destroy = initPixelGhost({
      size: 22,
      body: '#ff3b3b'
    });

    return () => {
      destroy();
    };
  }, []);

  return null; // The mascot injects its own DOM container
}
```

> **React 18 Strict Mode & HMR Pitfall**: React executes `useEffect` twice in development mode. The included `initPixelGhost` checks `window.__pixelGhostCleanup` and automatically terminates the previous ghost before spawning a new one, preventing duplicate ghosts.

---

## 4. Vite / Vue / Svelte

### Vite (Vanilla / SPA)
In your `main.js`:
```javascript
import './ghost.css';
import { initPixelGhost } from './ghost.js';

initPixelGhost();
```

### Vue 3
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { initPixelGhost } from '@/assets/ghost.js';
import '@/assets/ghost.css';

let cleanup = null;

onMounted(() => {
  cleanup = initPixelGhost();
});

onUnmounted(() => {
  if (cleanup) cleanup();
});
</script>

<template>
  <!-- Mascot creates its own fixed DOM container -->
</template>
```

---

## 5. Duplicate Prevention on SPA Navigation

If your SPA switches routes without full page reloads:
- Always call the returned `destroy()` function in your framework's unmount lifecycle (`useEffect` cleanup in React, `onUnmounted` in Vue, `onDestroy` in Svelte).
- `assets/ghost.js` provides automatic safeguard: calling `initPixelGhost()` always kills any running instance stored on `window.__pixelGhostCleanup`.
