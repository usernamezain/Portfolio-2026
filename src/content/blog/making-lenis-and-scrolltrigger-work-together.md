---
title: "Making Lenis and ScrollTrigger Work Together Without Lag"
description: "How to drive Lenis directly from GSAP's ticker to eliminate scroll stutter and keep ScrollTrigger coordinates 100% accurate."
pubDate: 2026-02-15
author: "Zain Ali Mughal"
tags: ["GSAP", "Lenis", "ScrollTrigger", "Performance"]
readTime: "4 min read"
status: "Published Guide"
---

When building modern animation-heavy websites, combining smooth scrolling with scroll-driven animations is one of the most common requirements. However, developers often encounter a frustrating issue: **ScrollTrigger animations lagging behind or desynchronizing from Lenis scroll positions.**

In this guide, we explore why this desynchronization happens and how to achieve 100% locked synchronization using a single requestAnimationFrame loop.

---

## The Root Problem: Dual Animation Tickers

By default, Lenis runs its own internal `requestAnimationFrame` loop to interpolate wheel and touch events, while GSAP maintains its own internal ticker loop to advance tweens and update ScrollTrigger positions.

Because both loops fire at slightly different times in the browser's frame cycle, ScrollTrigger calculates positions against stale scroll coordinates. This leads to:
1. **Jittery pinned sections** (elements vibrating during scroll).
2. **Delayed trigger starts** (animations triggering 50–100ms late).
3. **Double CPU load** from multiple uncoordinated RAF callbacks.

---

## The Solution: Drive Lenis from the GSAP Ticker

Instead of allowing Lenis to run autonomously, disable Lenis's auto-RAF and let **GSAP's central ticker drive Lenis**.

Here is the exact production-ready setup:

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// 1. Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// 2. Initialize Lenis with autoRaf set to false
const lenis = new Lenis({
  autoRaf: false,        // Crucial: disables Lenis's internal loop
  lerp: 0.1,             // Smoothness factor (0.05 to 0.15)
  smoothWheel: true,
  syncTouch: false,      // Preserves native phone momentum for better UX
  wheelMultiplier: 1.0,
});

// 3. Inform ScrollTrigger whenever Lenis updates
lenis.on('scroll', ScrollTrigger.update);

// 4. Bind Lenis's RAF directly to GSAP's ticker
gsap.ticker.add((time: number) => {
  // Lenis expects milliseconds
  lenis.raf(time * 1000);
});

// 5. Turn off lagSmoothing to keep positions exact during frame drops
gsap.ticker.lagSmoothing(0);
```

---

## Mobile Viewport Resize Protection

On mobile devices, the browser address bar dynamically hides and reveals as the user scrolls, changing `window.innerHeight`. By default, ScrollTrigger attempts to re-measure all trigger offsets every time this happens, causing noticeable scroll hitching.

To prevent this, configure ScrollTrigger to ignore mobile address bar resizes:

```typescript
ScrollTrigger.config({
  ignoreMobileResize: true,
});
```

---

## Recalculating After Fonts and Images Load

Web fonts and dynamic images shift layout heights once they finish downloading. If ScrollTrigger measures elements before fonts render, trigger offsets will be offset by several pixels.

Always queue a single consolidated refresh:

```typescript
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
    lenis.resize();
  });
}

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  lenis.resize();
});
```

---

## Conclusion

By routing Lenis through GSAP's central ticker and disabling redundant loops, you eliminate all coordinates jitter, reduce CPU utilization, and guarantee silky 60/120fps motion across both desktop and mobile screens.
