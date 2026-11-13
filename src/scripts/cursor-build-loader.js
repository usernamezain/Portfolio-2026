/*! CursorBuild 10-Second Loading Ceremony Engine
 *  Multiplayer-cursor / DevTools inspector build ceremony for page loading.
 *  Configured with exactly 5 cursors, character-by-character typing animation,
 *  and clean dismissal after 10.0 seconds.
 */

export function initCursorBuildLoader(options = {}) {
  if (typeof window === 'undefined') return;

  // Strictly execute only on the home page where the hero section exists
  const p = window.location.pathname.replace(/\/$/, '') || '/';
  const isHome = p === '/' || p.endsWith('/index.html');
  const heroEl = document.querySelector('#top');
  if (!isHome || !heroEl) {
    document.body.classList.remove('cb-loading');
    document.querySelectorAll('.cb-pre').forEach(el => el.classList.add('in'));
    document.querySelectorAll('.cb-ch').forEach(el => el.classList.add('on'));
    return;
  }

  // Immediate reduced-motion bypass
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.cb-pre').forEach(el => el.classList.add('in'));
    document.querySelectorAll('.cb-ch').forEach(el => el.classList.add('on'));
    return;
  }

  // 8 distinct cursors with purposeful roles and vibrant palette
  const C = {
    cursors: 8,
    colors: [
      '#6ea8fe', // FullStack - Accent Blue
      '#a855f7', // Dev - Purple
      '#22d3ee', // WebGL - Cyan
      '#4ade80', // React - Emerald Green
      '#fb923c', // GSAP - Orange
      '#f43f5e', // Next.js - Rose
      '#eab308', // Node.js - Amber
      '#ec4899'  // UI/UX - Pink
    ],
    labels: ['FullStack', 'Dev', 'WebGL', 'React', 'GSAP', 'Next.js', 'Node.js', 'UI/UX'],
    trails: true,
    guides: true,
    totalDuration: 6000 // Exactly 6.0 seconds total ceremony
  };

  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const now = () => performance.now();
  const TAU = Math.PI * 2;

  let W = window.innerWidth, H = window.innerHeight, dpr = 1;
  let fx, cv, ctx, gl, bl, cl;
  let swarm = [], stamps = [], guides = [], boxes = new Set();
  let last = 0, t00 = 0;
  let anchor = { x: 0.5, y: 0.5, r: 0.45 }, anchorUntil = 0;
  let rafId = null, dismissed = false;

  // Prevent scroll and isolate hero during the 10-second loader
  const prevDocOverflow = document.documentElement.style.overflowY;
  const prevBodyOverflow = document.body.style.overflowY;
  document.documentElement.style.overflowY = 'hidden';
  document.body.style.overflowY = 'hidden';
  document.body.classList.add('cb-loading');

  const SHAPES = {
    arrow: {
      ox: 1, oy: 1,
      svg: c => `<svg width="15" height="19" viewBox="0 0 16 20"><path d="M1 1V15.6L4.9 12.3L7.7 18.7L10.2 17.6L7.4 11.3H12.6Z" fill="${c}" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
      rot: 2.356,
      trail: 'tri'
    },
    plus: {
      ox: 6, oy: 6,
      svg: c => `<svg width="13" height="13" viewBox="0 0 12 12"><path d="M6 0V12M0 6H12" stroke="${c}" stroke-width="1.8"/></svg>`,
      rot: null,
      trail: 'plus'
    },
    ibeam: {
      ox: 4.5, oy: 9,
      svg: c => `<svg width="9" height="18" viewBox="0 0 9 18"><path d="M1 1H8M1 17H8M4.5 1V17" stroke="${c}" stroke-width="1.6" fill="none"/></svg>`,
      rot: null,
      trail: 'x'
    },
    tri: {
      ox: 5, oy: 5,
      svg: c => `<svg width="11" height="11" viewBox="0 0 10 10"><path d="M0 0L10 5L0 10Z" fill="${c}"/></svg>`,
      rot: 0,
      trail: 'tri'
    }
  };

  // Exactly 5 cursors: 3 pointers for drawing + 1 crosshair + 1 indicator
  const CURSOR_KINDS = ['arrow', 'arrow', 'arrow', 'plus', 'arrow'];

  function mkCursor(i) {
    const kind = CURSOR_KINDS[i] || 'arrow';
    const sh = SHAPES[kind], color = C.colors[i % C.colors.length];
    const el = document.createElement('div');
    el.className = 'cb-cur';
    el.innerHTML = sh.svg(color);
    const svgEl = el.firstChild;
    if (svgEl) svgEl.style.transformOrigin = `${sh.ox}px ${sh.oy}px`;

    // Each cursor carries its distinct label
    const l = document.createElement('span');
    l.className = 'lbl';
    l.textContent = C.labels[i % C.labels.length];
    l.style.background = color;
    if (color === '#ffd60a' || color === '#ffffff') l.style.color = '#111';
    el.appendChild(l);

    cl.appendChild(el);
    return {
      el, svgEl, kind, sh, color,
      x: W / 2, y: H / 2, vx: 0, vy: 0, tx: W / 2, ty: H / 2, next: 0, rot: 0, ph: rnd(0, TAU),
      drive: null, mode: 'wander', lx: W / 2, ly: H / 2, sv: 0, sy: 0, until: 0, ang: 0, w: 0, oc: null, r: 0, od: 0, px: W / 2, py: H / 2
    };
  }

  function mkLayers() {
    fx = document.createElement('div');
    fx.id = 'cb-fx';
    cv = document.createElement('canvas');
    gl = document.createElement('div'); gl.className = 'cb-guides';
    bl = document.createElement('div'); bl.className = 'cb-boxes';
    cl = document.createElement('div'); cl.className = 'cb-cursors';
    fx.append(cv, gl, bl, cl);
    document.body.appendChild(fx);
    ctx = cv.getContext('2d');
    resize();
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    if (!cv || !ctx) return;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cv.style.width = W + 'px';
    cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function newTarget(c, t) {
    c.tx = anchor.x * W + rnd(-1, 1) * anchor.r * W;
    c.ty = anchor.y * H + rnd(-1, 1) * anchor.r * W * 0.5;
    c.next = t + rnd(350, 950);
  }

  function tick(t) {
    if (dismissed) return;
    const dt = Math.min(40, t - last) / 16.7;
    last = t;
    if (anchorUntil && t > anchorUntil) {
      anchor = { x: 0.5, y: 0.5, r: 0.45 };
      anchorUntil = 0;
    }

    for (const c of swarm) {
      let sp;
      if (c.drive) {
        const k = Math.min(1, 0.35 * dt);
        const jx = Math.sin(t / 110 + c.ph) * 2;
        const jy = Math.cos(t / 130 + c.ph) * 2;
        c.vx = (c.drive.x + jx - c.x) * k;
        c.vy = (c.drive.y + jy - c.y) * k;
        c.x += c.vx;
        c.y += c.vy;
        if (c.sh.rot !== null) c.rot += (0 - c.rot) * 0.22 * dt;
        sp = Math.hypot(c.vx, c.vy);
      } else {
        if (c.mode === 'orbit') {
          c.ang += c.w * dt;
          c.tx = c.oc.x + Math.cos(c.ang) * c.r;
          c.ty = c.oc.y + Math.sin(c.ang) * c.r * 0.75;
          if (t > c.until) { c.mode = 'wander'; c.next = 0; }
        } else if (t > c.next) {
          newTarget(c, t);
        }

        const k = c.mode === 'orbit' ? 0.022 : 0.005;
        c.vx += (c.tx - c.x) * k * dt + Math.sin(t / 280 + c.ph) * 0.035 * dt;
        c.vy += (c.ty - c.y) * k * dt + Math.cos(t / 240 + c.ph) * 0.035 * dt;
        const damp = Math.pow(c.mode === 'orbit' ? 0.86 : 0.9, dt);
        c.vx *= damp;
        c.vy *= damp;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        sp = Math.hypot(c.vx, c.vy);
        if (sp < 0.22 && c.mode === 'wander') c.next = 0;
        if (c.sh.rot !== null && sp > 0.25) {
          let d = Math.atan2(c.vy, c.vx) + c.sh.rot - c.rot;
          d = Math.atan2(Math.sin(d), Math.cos(d));
          c.rot += d * 0.16 * dt;
        }
      }

      if (C.trails && sp > 0.8) {
        const dx = c.x - c.lx, dy = c.y - c.ly;
        if (dx * dx + dy * dy > 55) {
          stamps.push({ x: c.x, y: c.y, k: c.sh.trail, a: Math.atan2(c.vy, c.vx), c: c.color, t });
          if (stamps.length > 320) stamps.shift();
          c.lx = c.x;
          c.ly = c.y;
        }
      }

      c.el.style.transform = `translate(${c.x - c.sh.ox}px,${c.y - c.sh.oy}px)`;
      if (c.sh.rot !== null && c.svgEl) c.svgEl.style.transform = `rotate(${c.rot}rad)`;
    }

    if (C.trails) paintTrails(t);
    updateGuides(t);
    boxes.forEach(f => f(t));
    rafId = requestAnimationFrame(tick);
  }

  function paintTrails(t) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    while (stamps.length && t - stamps[0].t > 700) stamps.shift();
    for (const s of stamps) {
      const a = 1 - (t - s.t) / 700;
      ctx.globalAlpha = a * 0.85;
      ctx.strokeStyle = ctx.fillStyle = s.c;
      ctx.lineWidth = 1.4;
      ctx.save();
      ctx.translate(s.x, s.y);
      if (s.k === 'tri') {
        ctx.rotate(s.a);
        ctx.beginPath();
        ctx.moveTo(-3.5, -3.5); ctx.lineTo(4.5, 0); ctx.lineTo(-3.5, 3.5);
        ctx.closePath();
        ctx.fill();
      } else if (s.k === 'plus') {
        ctx.beginPath();
        ctx.moveTo(-3.5, 0); ctx.lineTo(3.5, 0);
        ctx.moveTo(0, -3.5); ctx.lineTo(0, 3.5);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(-3, -3); ctx.lineTo(3, 3);
        ctx.moveTo(3, -3); ctx.lineTo(-3, 3);
        ctx.stroke();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function burst(cx, cy, speed = 12) {
    swarm.forEach(c => {
      const a = rnd(0, TAU), v = rnd(speed * 0.7, speed * 1.3);
      c.x = cx + rnd(-10, 10);
      c.y = cy + rnd(-10, 10);
      c.lx = c.x; c.ly = c.y;
      c.vx = Math.cos(a) * v;
      c.vy = Math.sin(a) * v;
      c.mode = 'wander';
      c.tx = cx + Math.cos(a) * rnd(0.25, 0.55) * W;
      c.ty = cy + Math.sin(a) * rnd(0.2, 0.5) * H;
      c.next = now() + rnd(500, 1000);
    });
  }

  function addGuide(getRect, edge, color, life) {
    if (!C.guides) return null;
    const d = document.createElement('i');
    d.className = 'cb-g ' + (edge === 'l' || edge === 'r' ? 'v' : 'h');
    d.style.background = color || 'var(--cb-blue)';
    gl.appendChild(d);
    const g = { d, getRect, edge, t0: now(), life: life || 1400, dead: false };
    guides.push(g);
    if (guides.length > 25) {
      const o = guides.shift();
      if (o) o.d.remove();
    }
    return g;
  }

  function updateGuides(t) {
    for (let i = guides.length - 1; i >= 0; i--) {
      const g = guides[i], age = t - g.t0;
      if (age > g.life || g.dead) {
        g.d.remove();
        guides.splice(i, 1);
        continue;
      }
      const r = g.getRect();
      if (!r) continue;
      const p = Math.min(1, age / 260);
      const fade = g.life === Infinity ? 1 : Math.min(1, (g.life - age) / 300);
      g.d.style.opacity = (g.d.dataset.o || 0.5) * p * Math.max(0, fade);
      if (g.edge === 'l' || g.edge === 'r') {
        g.d.style.transform = `translateX(${g.edge === 'l' ? r.left : r.right}px) scaleY(${p})`;
      } else {
        g.d.style.transform = `translateY(${g.edge === 't' ? r.top : r.bottom}px) scaleX(${p})`;
      }
    }
  }

  function mkBox(kind) {
    const b = document.createElement('div');
    b.className = 'cb-sel cb-' + kind;
    for (let i = 0; i < 4; i++) {
      const h = document.createElement('i');
      h.className = 'h';
      b.appendChild(h);
    }
    const pill = document.createElement('span');
    pill.className = 'pill';
    b.appendChild(pill);
    bl.appendChild(b);
    return {
      b,
      pill,
      set: (r, w, h, text) => {
        b.style.width = Math.max(2, w) + 'px';
        b.style.height = Math.max(2, h) + 'px';
        b.style.transform = `translate(${r.left}px,${r.top}px)`;
        if (text) {
          pill.style.display = 'block';
          pill.textContent = text;
        } else {
          pill.style.display = 'none';
        }
      },
      remove: () => b.remove()
    };
  }

  function bnds(el) {
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
  }

  function acquire(n, x, y) {
    const f = swarm.filter(c => !c.drive);
    f.sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y));
    const out = f.slice(0, n);
    out.forEach(c => { c.drive = { x, y }; c.mode = 'wander'; });
    return out;
  }

  function release(c) {
    if (!c) return;
    c.drive = null;
    c.vx += rnd(-3, 3);
    c.vy += rnd(-3, 3);
    c.next = 0;
  }

  /**
   * Prepares text element for character-by-character typing animation
   */
  const typedElements = [];

  function prepareTyping(el) {
    if (!el) return [];
    typedElements.push({ el, origHTML: el.innerHTML });
    const chars = [];
    const walk = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 3) { // Text node
          const text = child.textContent || '';
          if (!text) return;
          const frag = document.createDocumentFragment();
          [...text].forEach(char => {
            const span = document.createElement('span');
            span.className = 'cb-ch';
            if (char === ' ') {
              span.innerHTML = '&nbsp;';
              span.classList.add('cb-space');
            } else {
              span.textContent = char;
            }
            frag.appendChild(span);
            chars.push(span);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          if (window.getComputedStyle && window.getComputedStyle(child).display === 'none') return;
          walk(child);
        }
      });
    };
    walk(el);
    return chars;
  }

  /**
   * Draws a target element with selection box, typing animation, size pills, and snap lines
   */
  function drawTarget(el, {
    kind = 'capsule',
    delay = 0,
    duration = 1000,
    pillLabel = null,
    isTyping = false
  } = {}) {
    if (!el) return;

    let chars = [];
    if (isTyping) {
      chars = prepareTyping(el);
      el.style.opacity = '1';
    } else {
      el.classList.add('cb-pre', 'cb-' + kind);
    }

    setTimeout(() => {
      if (dismissed) {
        el.classList.add('in');
        chars.forEach(ch => ch.classList.add('on'));
        return;
      }

      const r0 = bnds(el);
      if (r0.width < 2 || r0.height < 2) {
        el.classList.add('in');
        chars.forEach(ch => ch.classList.add('on'));
        return;
      }

      const box = mkBox(kind);
      const ib = document.createElement('div');
      ib.className = 'cb-ib';
      bl.appendChild(ib);

      const mainC = acquire(1, r0.left, r0.top)[0] || swarm[0];
      const helper = acquire(1, r0.right, r0.bottom)[0];
      let phase = 0, pt = now(), revealed = false;
      let lastCharIdx = -1;

      // Phase breakdown: fly -> drag box open -> character typing/reveal -> hold -> release
      const dFly = duration * 0.18;
      const dDrag = duration * 0.28;
      const dType = duration * 0.42;
      const dHold = duration * 0.12;

      const f = t => {
        if (dismissed) {
          box.remove(); ib.remove(); boxes.delete(f);
          el.classList.add('in');
          chars.forEach(ch => ch.classList.add('on'));
          return;
        }

        const e = t - pt, r = bnds(el);
        let w = r.width, h = r.height, cx = r.right, cy = r.bottom;

        if (phase === 0) { // Phase 0: Fly in
          const p = ease(Math.min(1, e / dFly));
          w = h = 0; cx = r.left; cy = r.top;
          box.b.style.opacity = p;
          if (e >= dFly) {
            phase = 1; pt = t;
            // Snap guidelines
            addGuide(() => bnds(el), 'l', kind === 'capsule' ? 'var(--cb-red)' : null, duration * 0.9);
            addGuide(() => bnds(el), 't', null, duration * 0.85);
            if (kind !== 'text') {
              addGuide(() => bnds(el), 'r', null, duration * 0.85);
            }
          }
        } else if (phase === 1) { // Phase 1: Drag selection box open
          const p = ease(Math.min(1, e / dDrag));
          w = r.width * p; h = r.height * p;
          cx = r.left + w; cy = r.top + h;
          if (e >= dDrag) {
            phase = 2; pt = t;
            if (!isTyping) {
              el.classList.add('in');
            }
          }
        } else if (phase === 2) { // Phase 2: Typing Animation / Reveal
          const p = Math.min(1, e / dType);
          cx = r.right; cy = r.bottom;

          if (isTyping && chars.length > 0) {
            // Character-by-character typing reveal
            const currentIdx = Math.floor(p * chars.length);
            for (let i = lastCharIdx + 1; i <= currentIdx && i < chars.length; i++) {
              chars[i].classList.add('on');
            }
            lastCharIdx = currentIdx;

            // Caret rides along the typed characters
            const activeCh = chars[Math.min(currentIdx, chars.length - 1)];
            if (activeCh) {
              const chRect = activeCh.getBoundingClientRect();
              ib.style.display = 'block';
              ib.style.height = `${Math.max(14, chRect.height)}px`;
              ib.style.transform = `translate(${chRect.right + 1}px, ${chRect.top}px)`;
              // Main cursor rides with the typing caret!
              cx = chRect.right + 2;
              cy = chRect.top + chRect.height / 2;
            }
          } else {
            if (!revealed) {
              revealed = true;
              el.classList.add('in');
            }
          }

          if (e >= dType) {
            phase = 3; pt = t;
            ib.style.display = 'none';
            chars.forEach(ch => ch.classList.add('on'));
          }
        } else if (phase === 3) { // Phase 3: Hold and smooth release
          ib.style.display = 'none';
          cx = r.right; cy = r.bottom;
          if (e >= dHold) {
            phase = 4;
            box.remove(); ib.remove(); boxes.delete(f);
            el.classList.add('in');
            chars.forEach(ch => ch.classList.add('on'));
            release(mainC);
            release(helper);
            return;
          }
        }

        const label = pillLabel || `${Math.round(w)} × ${Math.round(h)}`;
        box.set(r, w, h, label);
        if (mainC && phase < 4) mainC.drive = { x: cx, y: cy };
        if (helper && phase < 4) helper.drive = { x: r.left, y: r.top + h };
      };

      boxes.add(f);
    }, delay);
  }

  function dismiss() {
    if (dismissed) return;
    dismissed = true;

    // Restore typed elements to clean, native HTML (restoring pristine spaces, tags & symbols)
    typedElements.forEach(({ el, origHTML }) => {
      if (el && origHTML !== undefined) {
        el.innerHTML = origHTML;
      }
    });

    // Remove loading isolation and restore normal document scrolling
    document.body.classList.remove('cb-loading');
    document.documentElement.style.overflowY = prevDocOverflow;
    document.body.style.overflowY = prevBodyOverflow;
    window.dispatchEvent(new CustomEvent('cb:dismissed'));

    // Ensure 100% of the site is visible immediately
    document.querySelectorAll('.cb-pre').forEach(el => {
      el.classList.add('in');
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
    document.querySelectorAll('.cb-ch').forEach(el => el.classList.add('on'));

    // Fade out and clean up the cursor stack
    if (fx) {
      fx.style.transition = 'opacity 0.6s ease';
      fx.style.opacity = '0';
      setTimeout(() => {
        if (fx && fx.parentNode) fx.parentNode.removeChild(fx);
        if (rafId) cancelAnimationFrame(rafId);
      }, 650);
    }
  }

  // Build UI layers
  mkLayers();

  // Exactly 5 cursors populated
  for (let i = 0; i < C.cursors; i++) {
    swarm.push(mkCursor(i));
  }

  window.addEventListener('resize', resize);
  last = t00 = now();

  // 1. Initial Cursor Swarm Launch (0ms - 1000ms)
  const oc = { x: W / 2, y: H / 2 }, t1 = now();
  swarm.forEach(c => {
    c.x = W / 2 + rnd(-50, 50);
    c.y = H / 2 + rnd(-50, 50);
    c.lx = c.x; c.ly = c.y;
    Object.assign(c, {
      mode: 'orbit', oc, r: rnd(25, 70), ang: rnd(0, TAU),
      w: (Math.random() < 0.5 ? 1 : -1) * rnd(0.06, 0.12), until: t1 + 450
    });
  });
  setTimeout(() => {
    burst(W / 2, H / 2, 10);
  }, 460);

  // 2. Query target elements for the 6-Second Hero, Marquee & Navbar Ceremony
  const brandEl = document.querySelector('#navigation .brand');
  const navLinks = Array.from(document.querySelectorAll('#navigation .nav-links a'));
  const themeToggle = document.querySelector('#navigation #theme-toggle');
  const pixelBannerEl = document.querySelector('#top .hero-pixel-banner');
  const titleEl = document.querySelector('#top .hero-name');
  const roleEl = document.querySelector('#top .role');
  const ledeEl = document.querySelector('#top .lede');
  const actionBtns = Array.from(document.querySelectorAll('#top .actions .btn'));
  const marqueeEl = document.querySelector('#top .hero-marquee-wrap');

  // ══════════════════════════════════════════════════════════════════
  // MASTER CHOREOGRAPHY TIMELINE (8 Cursors, 6.0 Seconds Exact)
  // ══════════════════════════════════════════════════════════════════

  // A. Navbar (0.5s – 1.4s)
  drawTarget(brandEl, {
    kind: 'capsule',
    delay: 500,
    duration: 650,
    isTyping: true,
    pillLabel: 'zaindev.me'
  });

  navLinks.forEach((link, idx) => {
    drawTarget(link, {
      kind: 'capsule',
      delay: 750 + idx * 70,
      duration: 450,
      pillLabel: link.textContent?.trim()
    });
  });

  drawTarget(themeToggle, {
    kind: 'capsule',
    delay: 1150,
    duration: 380,
    pillLabel: '38 × 38'
  });

  // B. Retro Pixel Header Video Banner (1.2s – 1.85s)
  drawTarget(pixelBannerEl, {
    kind: 'group',
    delay: 1200,
    duration: 650,
    pillLabel: 'Pixel Header • Workstation'
  });

  // C. Main Heading with Character-by-Character Typing (1.7s – 2.4s)
  drawTarget(titleEl, {
    kind: 'text',
    delay: 1700,
    duration: 700,
    isTyping: true,
    pillLabel: 'Zain Ali Mughal'
  });

  // E. Role Pill with Typing (2.3s – 2.8s)
  drawTarget(roleEl, {
    kind: 'capsule',
    delay: 2300,
    duration: 500,
    isTyping: true,
    pillLabel: 'Full Stack Dev • 7+ Yrs'
  });

  // F. Lede Paragraph with Typing Animation (2.55s – 3.35s)
  drawTarget(ledeEl, {
    kind: 'text',
    delay: 2550,
    duration: 800,
    isTyping: true,
    pillLabel: 'Bio Statement'
  });

  // G. Hero Action Buttons (3.15s – 3.8s)
  actionBtns.forEach((btn, idx) => {
    drawTarget(btn, {
      kind: 'capsule',
      delay: 3150 + idx * 100,
      duration: 450,
      pillLabel: btn.querySelector('span')?.textContent?.trim() || 'Action'
    });
  });

  // H. Scroll Marquee Text Band (3.85s – 5.1s)
  drawTarget(marqueeEl, {
    kind: 'group',
    delay: 3850,
    duration: 1100,
    pillLabel: 'Marquee • Tech & Creative Stack'
  });

  // H. Outro Swirl & Disappear (5.2s – 6.0s)
  setTimeout(() => {
    if (!dismissed) {
      burst(W / 2, H * 0.45, 14);
    }
  }, 5200);

  // Exact 6.0-second finish: Cursors disappear completely
  setTimeout(dismiss, C.totalDuration);

  // Early dismiss safety on Escape
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') dismiss();
  }, { once: true });

  rafId = requestAnimationFrame(tick);

  return { dismiss };
}
