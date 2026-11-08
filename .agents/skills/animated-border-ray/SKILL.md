---
name: animated-border-ray
description: Applies a pure CSS animated border beam (a continuous, soft travelling arc of glowing light orbiting the border of an element) to any target element without restructuring markup or causing layout shifts.
---

# Animated Border Ray (`animated-border-ray`)

## Overview
A specialized CSS motion design skill for rendering a reusable, high-performance "border beam" (or border ray) effect: a short, soft, glowing arc of light that continuously travels along the border of an element (pills, badges, buttons, cards, inputs, navbars, chips, or avatars) while leaving the element's interior completely untouched.

---

## Technique & Architecture (Pure CSS)

1. **Animatable Angle Property**:
   Registers `--beam-angle` with syntax `<angle>` to allow smooth hardware-accelerated 0deg to 360deg rotation via CSS keyframes.
   ```css
   @property --beam-angle {
     syntax: "<angle>";
     initial-value: 0deg;
     inherits: false;
   }
   ```

2. **Dual Pseudo-Element Layers**:
   - `::before`: Blurred duplicate glow layer (`filter: blur(var(--beam-glow)); opacity: 0.6; z-index: 0;`).
   - `::after`: Crisp, sharp traveling ray (`z-index: 1;`).
   - Both layers inherit `border-radius: inherit;` to match any container radius (pill, circle, rounded rectangle).

3. **Mask Ring Trick (Preserves Interior)**:
   Uses dual-gradient masking with exclusion composite to isolate the beam strictly to the 1-2px padding perimeter:
   ```css
   -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
   mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
   -webkit-mask-composite: xor;
   mask-composite: exclude;
   ```

4. **Conic Gradient Ray Calculation**:
   ```css
   background: conic-gradient(
     from var(--beam-angle),
     transparent 0 calc(100% - var(--beam-length)),
     var(--beam-color) 90%,
     transparent 100%
   );
   ```

---

## Global CSS Implementation

Include the following block in the project's global stylesheet (e.g., `global.css`):

```css
@property --beam-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.border-beam {
  --beam-color: #ff6a00;
  --beam-width: 1.5px;
  --beam-duration: 4s;
  --beam-length: 30%;
  --beam-glow: 6px;
  --beam-base-border: rgba(255, 255, 255, 0.08);
  position: relative;
}

.border-beam::before,
.border-beam::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: var(--beam-width);
  pointer-events: none;
  background: conic-gradient(
    from var(--beam-angle),
    transparent 0 calc(100% - var(--beam-length)),
    var(--beam-color) 90%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: borderBeamSpin var(--beam-duration) linear infinite;
}

.border-beam::before {
  filter: blur(var(--beam-glow));
  opacity: 0.6;
  z-index: 0;
}

.border-beam::after {
  z-index: 1;
}

/* Optional Hover Trigger Modifier */
.border-beam--hover::before,
.border-beam--hover::after {
  opacity: 0;
  transition: opacity 0.25s ease;
}

.border-beam--hover:hover::before {
  opacity: 0.6;
}

.border-beam--hover:hover::after {
  opacity: 1;
}

@keyframes borderBeamSpin {
  to {
    --beam-angle: 360deg;
  }
}

/* Browser Fallback for Browsers Without @property */
@supports not (background: paint(something)) {
  .border-beam::before,
  .border-beam::after {
    background: var(--beam-base-border);
    animation: none;
  }
}

/* Reduced Motion Compliance */
@media (prefers-reduced-motion: reduce) {
  .border-beam::before,
  .border-beam::after {
    animation: none !important;
  }
}
```

---

## Customization Variables

| CSS Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--beam-color` | `#ff6a00` | Light streak color (hex, rgb, hsl, or `var(--accent)`) |
| `--beam-width` | `1.5px` | Perimeter border ring thickness |
| `--beam-duration` | `4s` | Duration for one full 360° orbit |
| `--beam-length` | `30%` | Arc circumference coverage percentage |
| `--beam-glow` | `6px` | Soft glow blur radius on the underlying layer |
| `--beam-base-border`| `rgba(255,255,255,0.08)` | Static border fallback color |

---

## Workflow When Applying to Elements

1. Add the `.border-beam` class (or `.border-beam.border-beam--hover` if hover-only) directly to the target element.
2. Ensure child content has `position: relative; z-index: 2;` so the beam stays behind text, icons, and labels.
3. Ensure no competing static hover borders (e.g. `border-color: var(--accent)`) clash with the animated streak.
4. Customize `--beam-color`, `--beam-duration`, or `--beam-glow` inline or via parent selector as needed.

---

## Examples

### 1. Default Continuous Orbiting Badge
```html
<span class="badge border-beam">Trusted by 1.5M+ Developers Worldwide</span>
```

### 2. Custom Cyan Beam on Button
```html
<button class="btn border-beam" style="--beam-color: #00e5ff; --beam-duration: 3s;">
  <span>Get Started</span>
</button>
```

### 3. Hover-Only Streak on Card
```html
<div class="card border-beam border-beam--hover" style="--beam-color: #6ea8fe; --beam-glow: 8px;">
  <h3>Interactive Card</h3>
</div>
```
