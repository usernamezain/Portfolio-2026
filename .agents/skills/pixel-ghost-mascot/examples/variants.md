# Pixel Ghost Presets & Variants

These ready-made presets configure the behavior, personality, and palette of the pixel ghost mascot. Pass any of these partial objects into `initPixelGhost(preset)` or overwrite the `CONFIG` values in `assets/ghost.js`.

---

## 1. Classic Red (Default)
The original retro 8-bit red ghost with blue pupils. Energetic, visible, balanced wandering rhythm.

```javascript
{
  size: 20,
  body: '#ff3b3b',
  eye: '#ffffff',
  pupil: '#2a5cff',
  speed: 55,
  hopsBeforeVanish: [1, 3],
  hiddenFor: [2500, 7000],
  pauseFor: [500, 1800],
  edge: 12
}
```

---

## 2. Mint Calm (Relaxed & Aesthetic)
A pastel mint spirit that glides gently across dark or aesthetic portfolios. Moves slower and rests longer between hops.

```javascript
{
  size: 24,
  body: '#7CF5C6',
  eye: '#ffffff',
  pupil: '#1b2a4a',
  speed: 38,
  hopsBeforeVanish: [1, 2],
  hiddenFor: [4000, 9000],
  pauseFor: [1000, 2400],
  edge: 16
}
```

---

## 3. Shy (Rare & Elusive Easter Egg)
Acts as a subtle background discovery. Stays hidden off-screen for long stretches, takes only 1 hop, and quickly spins away.

```javascript
{
  size: 18,
  body: '#a3a3a3',
  eye: '#ffffff',
  pupil: '#52525b',
  speed: 45,
  hopsBeforeVanish: [1, 1],
  hiddenFor: [12000, 28000],
  pauseFor: [400, 1000],
  edge: 20
}
```

---

## 4. Hyper (Playful, Fast & Frequent)
High-energy arcade sprite in neon purple/cyan that is constantly roaming the screen, pausing briefly and moving rapidly.

```javascript
{
  size: 22,
  body: '#c084fc',
  eye: '#ffffff',
  pupil: '#22d3ee',
  speed: 85,
  hopsBeforeVanish: [3, 6],
  hiddenFor: [1200, 3000],
  pauseFor: [200, 800],
  edge: 10
}
```

---

## Usage in Code

### Vanilla Script
```html
<script src="/path/to/ghost.js"></script>
<script>
  // Overrides default configuration with the Mint Calm preset
  initPixelGhost({
    size: 24,
    body: '#7CF5C6',
    pupil: '#1b2a4a',
    speed: 38,
    hiddenFor: [4000, 9000]
  });
</script>
```

### React / Next.js
```javascript
import { useEffect } from 'react';
import { initPixelGhost } from './ghost.js';

useEffect(() => {
  const cleanup = initPixelGhost({
    body: '#7CF5C6',
    pupil: '#1b2a4a'
  });
  return cleanup;
}, []);
```
