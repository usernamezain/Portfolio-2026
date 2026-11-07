---
title: "Coexistence: GSAP, Anime.js, and CSS Physics in Modern Astro"
description: "Techniques to orchestrate multi-library animation stacks without collision, memory leaks, or main-thread blocking."
pubDate: 2026-02-28
author: "Zain Ali Mughal"
tags: ["Astro", "GSAP", "Anime.js", "Architecture"]
readTime: "6 min read"
status: "Deep Dive"
---

A common misconception among web developers is that you must choose **either** GSAP or Anime.js. The reality is that both libraries excel at fundamentally different layers of motion design:

- **GSAP**: The undisputed master of scroll-driven choreography, timeline sequencing, and complex ScrollTrigger pinning.
- **Anime.js**: Exceptional for micro-interactions, spring-based UI physics, geometric SVG morphing, and self-contained widget timelines.

When combined strategically, they create unforgettable creative web experiences without sacrificing performance.

---

## The Rule of Single Responsibility

The primary reason libraries collide is when **two engines compete for the same CSS property on the same DOM element**.

To guarantee zero collisions, enforce strict separation of concerns:

| Layer | Engine | Responsibility | Animated Properties |
| :--- | :--- | :--- | :--- |
| **Scroll Choreography** | GSAP 3 + ScrollTrigger | Page reveals, timeline pins, progress indicators | `opacity`, `transform` (scaleX, y), section transitions |
| **Micro-Physics** | Anime.js 3 | Hover elasticity, magnetic cards, particle effects | `scale`, `translateY` on hover, counter tweens |
| **Page Scroll** | Lenis | Virtual inertia, touch normalization | Scroll position |
| **Baseline Theme** | CSS Variables | Transitions for colors, backgrounds, borders | `background-color`, `border-color` |

---

## Real World Example: Preloader & Micro-Interactions

Here is how our portfolio preloader uses Anime.js for the numerical ticker while GSAP handles the curtain reveal:

```typescript
// Anime.js handles the high-precision counter calculation
const counterObj = { count: 0 };

anime({
  targets: counterObj,
  count: 100,
  duration: 800,
  easing: 'easeInOutQuad',
  update: () => {
    counterEl.textContent = `${Math.round(counterObj.count)}%`;
    barEl.style.width = `${counterObj.count}%`;
  },
  complete: () => {
    // Hand off to GSAP for the smooth curtain lift
    gsap.to(preloaderEl, {
      opacity: 0,
      scale: 0.98,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => {
        preloaderEl.style.display = 'none';
        startHeroSequence();
      }
    });
  }
});
```

---

## Memory Leak Prevention on Astro Page Transitions

If you use Astro's View Transitions or multi-page navigation, animation listeners and tickers must be cleaned up to avoid stacking listeners.

Ensure you store your ticker references and cancel pending tweens when navigating:

```typescript
document.addEventListener('astro:before-swap', () => {
  // 1. Kill active ScrollTriggers
  ScrollTrigger.getAll().forEach((st) => st.kill());
  
  // 2. Remove ticker callbacks
  gsap.ticker.remove(tickerFn);
  
  // 3. Destroy Lenis virtual scroller
  lenisInstance?.destroy();
});
```

---

## Summary

Multi-library stacks do not cause bloat when bundled and tree-shaken intelligently through modern Astro Vite pipelines. By segregating properties and unifying requestAnimationFrame loops, you achieve both cinematic scroll storytelling and playful interactive micro-motion.
