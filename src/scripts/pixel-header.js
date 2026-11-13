/*! Zain Ali — Retro Pixel Workstation Header Animation
 *  Canvas-based animated retro pixel-art header with monitor, typing code,
 *  creative tools, motion timeline, stars, and theme toggle reactivity.
 */

export function initPixelHeader(containerSelector = '#zain-pixel-header') {
  if (typeof window === 'undefined') return null;

  const el = typeof containerSelector === 'string'
    ? document.querySelector(containerSelector)
    : containerSelector;

  if (!el) return null;

  // Clear any existing instances
  el.innerHTML = '';

  const W = 304, H = 88;
  const PAL = {
    dark: {
      ink: '#fafafa',
      ink2: '#9ca3af',
      dim: '#2a2a30',
      line: '#3f3f46',
      blue: '#3b82f6',
      blueL: '#60a5fa',
      blueD: '#1e3a8a',
      shadow: '#172554',
      st: ['#2a2f3a', '#6b7280', '#e5e7eb']
    },
    light: {
      ink: '#0a0a0a',
      ink2: '#6b7280',
      dim: '#e5e7eb',
      line: '#cbd5e1',
      blue: '#2563eb',
      blueL: '#3b82f6',
      blueD: '#bfdbfe',
      shadow: '#dbeafe',
      st: ['#dbeafe', '#93c5fd', '#2563eb']
    }
  };

  const SC = {
    bg: '#04060b',
    bar: '#0b1220',
    sep: '#1f2937',
    w: '#e5e7eb',
    g: '#6b7280',
    b: '#60a5fa',
    d: '#3b82f6',
    k: '#1f2937',
    k2: '#172554'
  };

  const FONT_SRC = {
    A: '01110/10001/10001/11111/10001/10001/10001',
    B: '11110/10001/10001/11110/10001/10001/11110',
    C: '01111/10000/10000/10000/10000/10000/01111',
    D: '11110/10001/10001/10001/10001/10001/11110',
    E: '11111/10000/10000/11110/10000/10000/11111',
    F: '11111/10000/10000/11110/10000/10000/10000',
    G: '01111/10000/10000/10011/10001/10001/01111',
    H: '10001/10001/10001/11111/10001/10001/10001',
    I: '01110/00100/00100/00100/00100/00100/01110',
    J: '00111/00010/00010/00010/00010/10010/01100',
    K: '10001/10010/10100/11000/10100/10010/10001',
    L: '10000/10000/10000/10000/10000/10000/11111',
    M: '10001/11011/10101/10101/10001/10001/10001',
    N: '10001/11001/10101/10011/10001/10001/10001',
    O: '01110/10001/10001/10001/10001/10001/01110',
    P: '11110/10001/10001/11110/10000/10000/10000',
    Q: '01110/10001/10001/10001/10101/10010/01101',
    R: '11110/10001/10001/11110/10100/10010/10001',
    S: '01111/10000/10000/01110/00001/00001/11110',
    T: '11111/00100/00100/00100/00100/00100/00100',
    U: '10001/10001/10001/10001/10001/10001/01110',
    V: '10001/10001/10001/10001/10001/01010/00100',
    W: '10001/10001/10001/10101/10101/11011/10001',
    X: '10001/10001/01010/00100/01010/10001/10001',
    Y: '10001/10001/01010/00100/00100/00100/00100',
    Z: '11111/00001/00010/00100/01000/10000/11111',
    ' ': '00000/00000/00000/00000/00000/00000/00000'
  };

  const FONT = {};
  for (const k in FONT_SRC) FONT[k] = FONT_SRC[k].split('/');

  const BOT = [
    ['...l....', '...w....', '.wwwwww.', 'wwbwwbww', 'wwwwwwww', '.wwwwww.', '.w.ww.w.', '.w....w.'],
    ['...l....', '...w....', '.wwwwww.', 'wwbwwbww', 'wwwwwwww', '.wwwwww.', '..wwww..', '..w..w..']
  ];

  const ARROW = ['X..', 'XX.', 'XXX', 'XX.', 'X..'];

  const CODE = [
    [[0, 8, SC.d], [10, 18, SC.w]],
    [[4, 12, SC.b], [18, 26, SC.w], [46, 10, SC.g]],
    [[4, 10, SC.g], [16, 30, SC.w]],
    [[8, 22, SC.b], [32, 14, SC.d]],
    [[8, 34, SC.w]],
    [[4, 10, SC.d]],
    [[0, 6, SC.g], [10, 22, SC.b]]
  ];

  const ROLES = ['DEVELOPER', 'CREATIVE', 'MOTION DESIGNER'];
  const TITLE = 'ZAIN ALI', RT0 = 2.2, CY = 4.4;

  function mulberry(a) {
    return function () {
      a |= 0;
      a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  const STARS = (() => {
    const r = mulberry(11), out = [];
    let n = 0;
    while (out.length < 44 && n++ < 600) {
      const x = Math.floor(r() * W);
      const y = Math.floor(r() * 62);
      const p = r() * 6.28;
      const sp = r() < 0.1;
      if (x < 184 && y > 8 && y < 66) continue;
      if (x >= 198 && x <= 296 && y >= 8 && y < 74) continue;
      out.push({ x, y, p, sp, f: 0.8 + r() * 1.4 });
    }
    return out;
  })();

  function R(c, x, y, w, h, col) {
    c.fillStyle = col;
    c.fillRect(Math.round(x), Math.round(y), w, h);
  }

  function drawText(c, str, x, y, s, colFn, limit, adv) {
    if (!str) return x;
    let cx = x;
    for (let i = 0; i < str.length && i < limit; i++) {
      const g = FONT[str[i]] || FONT[' '];
      if (!g) continue;
      for (let r = 0; r < 7; r++) {
        if (!g[r]) continue;
        for (let q = 0; q < 5; q++) {
          if (g[r][q] === '1') R(c, cx + q * s, y + r * s, s, s, colFn(r, i));
        }
      }
      cx += adv;
    }
    return cx;
  }

  function sprite(c, rows, x, y, flip, map) {
    if (!rows || !rows.length || !rows[0]) return;
    const w = rows[0].length;
    for (let r = 0; r < rows.length; r++) {
      if (!rows[r]) continue;
      for (let q = 0; q < w; q++) {
        const ch = rows[r][flip ? w - 1 - q : q];
        if (ch && ch !== '.' && map[ch]) R(c, x + q, y + r, 1, 1, map[ch]);
      }
    }
  }

  const clamp = (x, a, b) => x < a ? a : x > b ? b : x;
  const blink = (t, hz) => Math.floor(t * hz * 2) % 2 === 0;

  function drawCode(c, local, t) {
    const x0 = 211, y0 = 24;
    let rem = Math.floor(local * 70), lx = x0, ly = y0;
    outer: for (let li = 0; li < CODE.length; li++) {
      const y = y0 + li * 5;
      for (const [dx, w, col] of CODE[li]) {
        const d = Math.min(w, rem);
        if (d > 0) {
          R(c, x0 + dx, y, d, 2, col);
          lx = x0 + dx + d;
          ly = y;
        }
        rem -= w;
        if (rem <= 0) break outer;
      }
    }
    if (blink(t, 2.5)) R(c, lx + 2, ly - 1, 2, 4, SC.b);
  }

  function drawCreative(c, local) {
    const pop = a => Math.ceil(clamp((local - a) / 0.25, 0, 1) * 4) / 4;
    let p = pop(0.3), r = Math.round(8 * p);
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy <= r * r) R(c, 224 + dx, 38 + dy, 1, 1, SC.d);
      }
    }
    p = pop(0.8);
    const s = Math.round(14 * p);
    if (s > 0) R(c, 251 - s / 2, 37 - s / 2, s, s, SC.w);
    p = pop(1.3);
    const h = Math.round(13 * p);
    for (let i = 0; i < h; i++) {
      const w = Math.max(1, Math.round((i + 1) * 14 / 13));
      R(c, 275 - w / 2, 31 + i, w, 1, SC.b);
    }
    const sw = [SC.d, SC.b, SC.w, SC.g, SC.k];
    for (let i = 0; i < 5; i++) {
      if (local > 1.8 + i * 0.15) R(c, 212 + i * 11, 54, 8, 4, sw[i]);
    }
    const wp = [[226, 49], [246, 45], [272, 47], [232, 51], [226, 49]];
    const u = clamp(local / 3.4, 0, 0.999) * 4;
    const i = Math.floor(u), f = u - i, e = f * f * (3 - 2 * f);
    const ax = wp[i][0] + (wp[i + 1][0] - wp[i][0]) * e;
    const ay = wp[i][1] + (wp[i + 1][1] - wp[i][1]) * e;
    sprite(c, ARROW, Math.round(ax), Math.round(ay), false, { X: SC.w });
  }

  function drawMotion(c, local) {
    const rows = [
      { y: 25, end: 272, k: [226, 246, 264] },
      { y: 31, end: 262, k: [232, 252] },
      { y: 37, end: 278, k: [228, 258, 274] }
    ];
    const p = clamp(local / 3.4, 0, 1), px = 222 + Math.round(p * 55);
    for (const r of rows) {
      R(c, 211, r.y, 7, 3, SC.g);
      R(c, 222, r.y, 56, 3, SC.k);
      R(c, 222, r.y, r.end - 222, 3, SC.k2);
      for (const kx of r.k) {
        const lit = px >= kx;
        R(c, kx - 1, r.y + 1, 3, 1, lit ? SC.b : SC.g);
        R(c, kx, r.y, 1, 3, lit ? SC.w : SC.g);
      }
    }
    R(c, px, 22, 1, 19, SC.d);
    R(c, px - 1, 21, 3, 1, SC.d);
    R(c, 211, 48, 7, 2, SC.g);
    R(c, 222, 61, 56, 1, SC.k);
    let dx = 0, dy = 0;
    for (let ix = 0; ix < 56; ix++) {
      const u = ix / 55, v = u * u * (3 - 2 * u), y = Math.round(59 - v * 13);
      R(c, 222 + ix, y, 1, 2, (ix <= p * 55) ? SC.d : SC.g);
      if (ix === Math.round(p * 55)) {
        dx = 222 + ix;
        dy = y;
      }
    }
    R(c, dx - 1, dy - 1, 3, 3, SC.w);
  }

  function drawFrame(c, t, themeName) {
    t = Math.max(0, Number.isFinite(t) ? t : 0);
    const P = PAL[themeName] || PAL.dark;
    c.clearRect(0, 0, W, H);

    /* stars */
    for (const s of STARS) {
      const lv = Math.floor((Math.sin(t * s.f + s.p) + 1) / 2 * 2.999);
      R(c, s.x, s.y, 1, 1, P.st[lv]);
      if (s.sp) {
        R(c, s.x - 1, s.y, 1, 1, P.st[0]);
        R(c, s.x + 1, s.y, 1, 1, P.st[0]);
        R(c, s.x, s.y - 1, 1, 1, P.st[0]);
        R(c, s.x, s.y + 1, 1, 1, P.st[0]);
      }
    }
    const ts = t % 9;
    if (ts < 0.8) {
      for (let i = 0; i < 6; i++) {
        const x = 150 + ts * 150 - i * 3, y = 4 + ts * 40 - i * 0.8;
        R(c, x, y, 1, 1, P.st[i < 2 ? 2 : i < 4 ? 1 : 0]);
      }
    }

    /* title */
    const tx = 12, ty = 16;
    let vis = 0;
    for (let i = 0; i < TITLE.length; i++) {
      if (t >= 0.25 + i * 0.2) vis = i + 1;
    }
    drawText(c, TITLE, tx + 3, ty + 3, 3, () => P.shadow, vis, 18);
    drawText(c, TITLE, tx, ty, 3, (r, i) => (t - (0.25 + i * 0.2) < 0.12) ? P.blueL : (r <= 3 ? P.ink : P.blue), vis, 18);
    if (t < 2.4 && blink(t, 3)) R(c, tx + vis * 18, ty, 6, 21, P.blue);
    if (t > 1.8) {
      R(c, 12, 42, 28, 2, P.blue);
      R(c, 42, 42, 6, 2, P.ink2);
      R(c, 50, 42, 3, 2, P.dim);
    }

    /* roles */
    let mode = -1, local = 0;
    if (t >= RT0) {
      const tt = t - RT0, n = Math.floor(tt/CY);
      mode = n % 3;
      local = tt - n * CY;
    }
    if (mode >= 0) {
      const word = ROLES[mode], L = word.length;
      let k = Math.min(L, Math.floor(local / 0.07) + 1);
      if (local > 3.5) k = Math.max(0, L - Math.floor((local - 3.5) / 0.04));
      const ex = drawText(c, word, 12, 48, 2, () => P.blueL, k, 11);
      if (blink(t, 2.5)) R(c, ex, 48, 6, 14, P.blue);
      for (let i = 0; i < 3; i++) R(c, 12 + i * 8, 66, 6, 2, i === mode ? P.blue : P.dim);
    }

    /* monitor */
    const MX = 206, MY = 12, MW = 84, MH = 54;
    R(c, MX, MY, MW, MH, P.blue);
    R(c, MX + 2, MY + 2, MW - 4, MH - 4, SC.bg);
    R(c, 208, 14, 80, 6, SC.bar);
    R(c, 211, 16, 2, 2, SC.w);
    R(c, 216, 16, 2, 2, SC.g);
    R(c, 221, 16, 2, 2, SC.b);
    R(c, 208, 20, 80, 1, SC.sep);
    if (mode < 0) {
      if (blink(t, 2.5)) R(c, 211, 24, 2, 4, SC.b);
    } else if (local < 0.18) {
      R(c, 208, Math.round(21 + local / 0.18 * 41), 80, 1, SC.d);
    } else if (mode === 0) {
      drawCode(c, local - 0.18, t);
    } else if (mode === 1) {
      drawCreative(c, local - 0.18);
    } else {
      drawMotion(c, local - 0.18);
    }
    if (blink(t, 1)) R(c, MX + 78, MY + MH - 3, 2, 1, SC.b);
    R(c, MX + 36, 66, 12, 5, P.line);
    R(c, MX + 24, 71, 36, 2, P.line);
    for (let i = 0; i < 3; i++) {
      if (Math.floor(t * 3 + i) % 3 === 0) R(c, MX + 28 + i * 12, 71, 2, 1, P.blueL);
    }

    /* desk, floor */
    R(c, 184, 73, 120, 1, P.blueL);
    R(c, 184, 74, 120, 1, P.blue);
    R(c, 184, 75, 120, 4, P.blueD);
    R(c, 190, 79, 3, 8, P.dim);
    R(c, 296, 79, 3, 8, P.dim);
    R(c, 0, 87, W, 1, P.dim);

    /* plant */
    const sw = Math.round(Math.sin(t * 1.2));
    R(c, 193, 62, 1, 6, P.ink2);
    R(c, 191 + sw, 60, 3, 2, P.blueL);
    R(c, 194 + sw, 60, 3, 2, P.blueL);
    R(c, 192 + sw, 58, 2, 2, P.blueL);
    R(c, 194 + sw, 58, 2, 2, P.blueL);
    R(c, 190, 68, 7, 5, P.blue);
    R(c, 190, 68, 7, 1, P.blueL);

    /* mug + steam */
    R(c, 293, 67, 6, 6, P.ink);
    R(c, 299, 68, 1, 3, P.ink);
    R(c, 294, 68, 4, 1, P.blueD);
    for (let k = 0; k < 3; k++) {
      const ph = (t * 6 + k * 4) % 12, y = 65 - ph, x = 295 + (k === 1 ? 1 : 0) + (k === 2 ? -1 : 0) + Math.round(Math.sin(t * 2 + k));
      R(c, x, y, 1, 2, ph < 6 ? P.ink2 : P.dim);
    }

    /* walking bot */
    const u = ((t % 20) + 20) % 20 / 20;
    const tri = u < 0.5 ? u * 2 : (1 - u) * 2;
    const bx = Math.round(-10 + tri * (W + 4));
    const botLen = (BOT && BOT.length) || 1;
    const f = Math.abs(Math.floor(t * 6)) % botLen;
    if (BOT && BOT[f]) {
      sprite(c, BOT[f], bx, 79, u >= 0.5, { w: P.ink, b: P.blue, l: P.blueL });
    }
  }

  // Setup DOM Canvas
  const cv = document.createElement('canvas');
  cv.style.cssText = 'display:block;width:100%;height:auto;image-rendering:pixelated;image-rendering:crisp-edges';
  el.appendChild(cv);

  const lo = document.createElement('canvas');
  lo.width = W;
  lo.height = H;
  const lc = lo.getContext('2d'), cx = cv.getContext('2d');
  const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

  let visible = true, raf = 0, last = 0, t0 = performance.now(), alive = true;

  function currentTheme() {
    const r = document.documentElement;
    const a = (r.getAttribute('data-theme') || '') + ' ' + r.className;
    if (/light/.test(a)) return 'light';
    if (/dark/.test(a)) return 'dark';
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
  }

  function size() {
    const dpr = window.devicePixelRatio || 1;
    const cw = el.clientWidth || W;
    // Scale buffer to match container width while maintaining exact aspect ratio with zero dead space
    const s = Math.max(1, cw * dpr / W);
    cv.width = Math.round(W * s);
    cv.height = Math.round(H * s);
    cv.style.width = '100%';
    cv.style.height = 'auto';
    cx.imageSmoothingEnabled = false;
  }

  function paint(t) {
    drawFrame(lc, t, currentTheme());
    cx.clearRect(0, 0, cv.width, cv.height);
    cx.imageSmoothingEnabled = false;
    cx.drawImage(lo, 0, 0, cv.width, cv.height);
  }

  function loop(now) {
    if (!alive) return;
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden || (now - last < 33)) return; // 30fps lock for retro pixel feel
    last = now;
    paint(Math.max(0, (now - t0) / 1000));
  }

  function still() {
    paint(RT0 + 3.0);
  }

  size();
  if (mq && mq.matches) still();
  else raf = requestAnimationFrame(loop);

  const ro = new ResizeObserver(() => {
    size();
    if (mq && mq.matches) still();
    else paint(Math.max(0, (performance.now() - t0) / 1000));
  });
  ro.observe(el);

  const io = new IntersectionObserver(e => {
    visible = e[0].isIntersecting;
  });
  io.observe(el);

  // Instant reactive repaint on theme toggle
  const mo = new MutationObserver(() => {
    if (mq && mq.matches) still();
    else paint((performance.now() - t0) / 1000);
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

  // Direct event listener for immediate feedback on theme switch
  const handleThemeChange = () => {
    paint((performance.now() - t0) / 1000);
  };
  window.addEventListener('theme:change', handleThemeChange);

  return {
    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('theme:change', handleThemeChange);
      cv.remove();
    },
    repaint() {
      paint((performance.now() - t0) / 1000);
    }
  };
}

