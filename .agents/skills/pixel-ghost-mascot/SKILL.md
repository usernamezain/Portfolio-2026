---
name: pixel-ghost-mascot
description: Adds a tiny pixel-art ghost mascot that wanders around a web page, vanishes and reappears. Use when the user wants a portfolio mascot, a playful wandering character, or says "pixel ghost", "add a mascot", "portfolio mascot", "add a wandering character", or "fun little character on my site". Includes the original demo, drop-in CSS/JS, and presets.
---

# Pixel Ghost Mascot (`pixel-ghost-mascot`)

Adds a self-contained, dependency-free 14x14 pixel-art ghost mascot that roams the viewport, looks toward its walking trajectory, blinks, shrinks/spins to vanish, and materializes at random locations.

---

## When to use
- User asks for a "mascot", "portfolio mascot", "pixel ghost", or "wandering character".
- Adding playful interactive Easter eggs to creative developer portfolios, 404 pages, or technical blogs.
- Needs a zero-dependency, zero-CLS, fixed-overlay animated character that requires no canvas or WebGL.

---

## Quick start
1. Read the source of truth demo in [references/pixel-ghost-mascot.html](./references/pixel-ghost-mascot.html) first to inspect its visual behavior and coordinate system.
2. Copy [assets/ghost.css](./assets/ghost.css) into the project's stylesheet or import it globally (`<style is:global>` in Astro).
3. Copy [assets/ghost.js](./assets/ghost.js) and call `initPixelGhost(config)` during client-side hydration.
4. Browse ready-made personality presets in [examples/variants.md](./examples/variants.md).
5. For framework-specific setup (Astro, Next.js, Vite), consult [references/integration-guide.md](./references/integration-guide.md).

---

## Configuration reference
Every key is defined at the top of [assets/ghost.js](./assets/ghost.js) and overridable via `initPixelGhost(config)`:

| Key | Default | Effect |
| :--- | :--- | :--- |
| `size` | `20` | Mascot rendered width & height in pixels (SVG scales cleanly to 16, 24, 32). |
| `body` | `'#ff3b3b'` | Hex/color string for ghost body & feet rects. |
| `eye` | `'#ffffff'` | Sclera color (rectangular eye whites). |
| `pupil` | `'#2a5cff'` | Pupil color (2x2 pixel blocks tracking movement direction). |
| `speed` | `55` | Movement speed in pixels per second. Higher = faster travel. |
| `hopsBeforeVanish` | `[1, 3]` | `[min, max]` wandering movements before shrinking & vanishing. |
| `hiddenFor` | `[2500, 7000]` | `[min, max]` milliseconds mascot stays invisible before spawning. |
| `pauseFor` | `[500, 1800]` | `[min, max]` milliseconds mascot idles between steps. |
| `edge` | `12` | Padding in pixels to keep mascot away from viewport boundaries. |

---

## Integration

### 1. Vanilla HTML
```html
<link rel="stylesheet" href="assets/ghost.css">
<script src="assets/ghost.js"></script>
```

### 2. Astro
```astro
<!-- src/layouts/Layout.astro -->
<style is:global>
  @import '../styles/ghost.css';
</style>
<script>
  import { initPixelGhost } from '../scripts/ghost.js';
  document.addEventListener('astro:page-load', () => initPixelGhost());
</script>
```

### 3. Next.js / React (App Router)
```tsx
'use client';
import { useEffect } from 'react';
import { initPixelGhost } from '@/assets/ghost';
import '@/assets/ghost.css';

export default function Mascot() {
  useEffect(() => {
    const destroy = initPixelGhost();
    return () => destroy();
  }, []);
  return null;
}
```

### 4. Vite / SPAs
Import `ghost.css` and call `initPixelGhost()` inside `main.js` or root application bootstrap.

See [references/integration-guide.md](./references/integration-guide.md) for full framework steps and route-change handling.

---

## Customization

- **Colors & Presets**: Pass any overrides to `initPixelGhost({ body: '#7CF5C6', pupil: '#1b2a4a' })`. Check [examples/variants.md](./examples/variants.md) for Classic Red, Mint Calm, Shy, and Hyper.
- **Scale**: Change `size: 24` or `size: 32`. SVG uses `shape-rendering: crispEdges` for razor-sharp pixel scaling.
- **Glow Color**: Modify the SVG drop-shadow filter in `ghost.css` (`filter: drop-shadow(0 0 6px rgba(..., .45))`).
- **Sprite Grid**: The 14x14 grid is drawn by ASCII row arrays (`BODY`, `FEET_A`, `FEET_B`) in `ghost.js`. Swap characters to design new hats, wings, or expressions.

---

## Accessibility
- **Reduced Motion**: Respects `(prefers-reduced-motion: reduce)` natively. When active:
  - Bobbing CSS keyframes and foot-flicker animations are disabled.
  - Linear transition walks become instantaneous hops (`ms = 0`).
  - Vanish spin/scale transitions are deactivated.
- **Zero Layout Shift**: Rendered inside a fixed-position container (`position: fixed; pointer-events: none; z-index: 9999;`).
- **Screen Readers**: Marked with `role="presentation"` and `aria-hidden="true"` so it never interrupts assistive technology.

---

## Troubleshooting
- **Ghost invisible after route switch**: Verify `ghost.css` is loaded globally. In Astro, use `<style is:global>`. In React, import in root layout.
- **Duplicate ghosts appearing**: Caused by remounting without calling `destroy()`. The updated `ghost.js` automatically tracks `window.__pixelGhostCleanup` to destroy stale instances.
- **Off-screen on small screens**: The script listens to window resize and clamps coordinates within `innerWidth - size - edge`.
- **Z-Index conflict**: Adjust `.pg { z-index: 9999; }` in `ghost.css` if modals or full-screen overlays require higher priority.
