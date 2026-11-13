/**
 * PROJECTS PIXEL POSTER ENGINE
 * Pure mathematical pixel-art canvas animation for Projects & Systems page header.
 * Features:
 *  - "PROJECTS & LAB" Retro Typography with Electric Cyan & Gold Accent Glow
 *  - High-res pixel density (640x192) for ultra-crisp retro developer workstation
 *  - Live Engineering Build & Deploy Terminal:
 *     * Automated compilation logs with typing & stream cadence
 *     * Performance telemetry: 100/100 Core Web Vitals, 0.000 CLS
 *     * Bouncing sound & frequency audio spectrum bar
 *  - Full multi-agent coding bots (GPT, Claude, Gemini star) and companion desk
 *  - 100% theme-reactive (instant dark/light mode), DPI scaling, 30fps cadence
 */

export function initProjectsPixelPoster(target) {
  if (typeof window === 'undefined') return;

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  // Clear any existing children to prevent duplicate canvases
  el.innerHTML = '';

  const W = 640, H = 192;

  // ─── Theme Palettes: Cyan & Deep Obsidian Systems Theme ───────────
  const PAL = {
    dark: {
      bg: '#0d1117',
      bgMonitor: '#101520',
      terminalBar: '#161f2e',
      ink: '#f0f6fc',
      ink2: '#8b949e',
      dim: '#21262d',
      line: '#30363d',
      cyan: '#38bdf8',
      cyanL: '#7dd3fc',
      cyanD: '#0369a1',
      shadow: '#071524',
      gpt: '#10b981',
      gptL: '#34d399',
      claude: '#f97316',
      claudeL: '#fb923c',
      gemini: '#6366f1',
      geminiL: '#38bdf8',
      bubbleUser: '#161f2e',
      bubbleAI: '#0d1520',
      bubbleBorder: '#30363d',
      st: ['#0c253d', '#0369a1', '#0284c7', '#e0f2fe']
    },
    light: {
      bg: '#f6f8fa',
      bgMonitor: '#ffffff',
      terminalBar: '#eaeef2',
      ink: '#1f2328',
      ink2: '#656d76',
      dim: '#d0d7de',
      line: '#d0d7de',
      cyan: '#0284c7',
      cyanL: '#0369a1',
      cyanD: '#e0f2fe',
      shadow: '#d0d7de',
      gpt: '#059669',
      gptL: '#10b981',
      claude: '#c2410c',
      claudeL: '#ea580c',
      gemini: '#4f46e5',
      geminiL: '#0284c7',
      bubbleUser: '#f6f8fa',
      bubbleAI: '#ffffff',
      bubbleBorder: '#d0d7de',
      st: ['#e0f2fe', '#bae6fd', '#0284c7', '#0369a1']
    }
  };

  // ─── 5x7 Monospace Bitmap Font with Complete Character Set ────────
  const FONT_SRC = {
    A: '01110/10001/10001/11111/10001/10001/10001',
    B: '11110/10001/10001/11110/10001/10001/11110',
    C: '01111/10000/10000/10000/10000/10000/01111',
    D: '11110/10001/10001/10001/10001/10001/11110',
    E: '11111/10000/10000/11110/10000/10000/11111',
    F: '11111/10000/10000/11110/10000/10000/10000',
    G: '01111/10000/10000/10111/10001/10001/01111',
    H: '10001/10001/10001/11111/10001/10001/10001',
    I: '11111/00100/00100/00100/00100/00100/11111',
    J: '00111/00010/00010/00010/00010/10010/01100',
    K: '10001/10010/10100/11000/10100/10010/10001',
    L: '10000/10000/10000/10000/10000/10000/11111',
    M: '10001/11011/10101/10001/10001/10001/10001',
    N: '10001/11001/10101/10011/10001/10001/10001',
    O: '01110/10001/10001/10001/10001/10001/01110',
    P: '11110/10001/10001/11110/10000/10000/10000',
    Q: '01110/10001/10001/10001/10101/10010/01101',
    R: '11110/10001/10001/11110/10100/10010/10001',
    S: '01111/10000/10000/01110/00001/00001/11110',
    T: '11111/00100/00100/00100/00100/00100/00100',
    U: '10001/10001/10001/10001/10001/10001/01110',
    V: '10001/10001/10001/10001/01010/01010/00100',
    W: '10001/10001/10001/10101/10101/11011/10001',
    X: '10001/10001/01010/00100/01010/10001/10001',
    Y: '10001/10001/01010/00100/00100/00100/00100',
    Z: '11111/00001/00010/00100/01000/10000/11111',
    0: '01110/10011/10101/10001/10101/11001/01110',
    1: '00100/01100/00100/00100/00100/00100/01110',
    2: '01110/10001/00001/00010/00100/01000/11111',
    3: '11110/00001/00001/01110/00001/00001/11110',
    4: '00010/00110/01010/10010/11111/00010/00010',
    5: '11111/10000/11110/00001/00001/10001/01110',
    6: '00111/01000/10000/11110/10001/10001/01110',
    7: '11111/00001/00010/00100/01000/01000/01000',
    8: '01110/10001/10001/01110/10001/10001/01110',
    9: '01110/10001/10001/01111/00001/00010/11100',
    ' ': '00000/00000/00000/00000/00000/00000/00000',
    '.': '00000/00000/00000/00000/00000/00000/01100',
    ':': '00000/01100/01100/00000/01100/01100/00000',
    '/': '00001/00010/00010/00100/01000/01000/10000',
    '-': '00000/00000/00000/11111/00000/00000/00000',
    '_': '00000/00000/00000/00000/00000/00000/11111',
    '[': '01110/01000/01000/01000/01000/01000/01110',
    ']': '01110/00010/00010/00010/00010/00010/01110',
    '(': '00010/00100/01000/01000/01000/00100/00010',
    ')': '01000/00100/00010/00010/00010/00100/01000',
    '=': '00000/11111/00000/11111/00000/00000/00000',
    '+': '00000/00100/00100/11111/00100/00100/00000',
    '>': '10000/01000/00100/00010/00100/01000/10000',
    '<': '00001/00010/00100/01000/00100/00010/00001',
    '!': '00100/00100/00100/00100/00000/00100/00100',
    '"': '01010/01010/01010/00000/00000/00000/00000',
    "'": '00100/00100/01000/00000/00000/00000/00000',
    ';': '00000/00100/00000/00000/00100/00100/01000',
    '$': '00100/01111/10100/01110/00101/11110/00100',
    '#': '01010/11111/01010/01010/11111/01010/00000',
    '&': '01100/10010/10100/01000/10101/10010/01101',
    '●': '01110/11111/11111/11111/11111/11111/01110',
    '✓': '00000/00001/00010/00010/10100/01000/00000'
  };

  const FONT = {};
  for (const [ch, str] of Object.entries(FONT_SRC)) {
    FONT[ch] = str.split('/').map((row) => row.split('').map(Number));
  }

  // Pre-seed pseudo-random float generator
  function mulberry(seed) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Pre-compute 40 ambient spark nodes in the background
  const rng = mulberry(9421);
  const SPARKS = Array.from({ length: 40 }, () => ({
    x: Math.floor(rng() * W),
    y: Math.floor(rng() * H),
    speed: 0.3 + rng() * 0.8,
    phase: rng() * Math.PI * 2,
    size: rng() > 0.8 ? 2 : 1
  }));

  // Create Canvas Element
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  canvas.style.imageRendering = 'pixelated';
  canvas.setAttribute('aria-hidden', 'true');
  el.appendChild(canvas);

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  // High-DPI calibration
  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const intScale = Math.max(1, Math.round(dpr));
    const targetW = Math.round(W * intScale);
    const targetH = Math.round(H * intScale);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
  }

  window.addEventListener('resize', resize);
  resize();

  // ─── Drawing Utility Helpers ─────────────────────────────────────
  function R(v) {
    return Math.round(v);
  }

  function pix(c, x, y, col) {
    if (x < 0 || x >= W || y < 0 || y >= H) return;
    c.fillStyle = col;
    c.fillRect(x, y, 1, 1);
  }

  function rect(c, x, y, w, h, col) {
    c.fillStyle = col;
    c.fillRect(x, y, w, h);
  }

  function frameRect(c, x, y, w, h, col) {
    c.strokeStyle = col;
    c.lineWidth = 1;
    c.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  }

  // ─── Core Bitmap Font Renderer ──────────────────────────────────
  function drawChar(c, ch, ox, oy, scale, col) {
    const glyph = FONT[ch.toUpperCase()] || FONT[' '];
    c.fillStyle = col;
    for (let r = 0; r < 7; r++) {
      for (let k = 0; k < 5; k++) {
        if (glyph[r][k]) {
          c.fillRect(ox + k * scale, oy + r * scale, scale, scale);
        }
      }
    }
  }

  function drawText(c, str, x, y, s, colFn, limit, adv) {
    const maxChars = limit !== undefined ? limit : str.length;
    let cx = x;
    const charAdv = adv !== undefined ? adv : (5 * s + Math.max(1, Math.round(s)));

    for (let i = 0; i < str.length && i < maxChars; i++) {
      const ch = str[i];
      if (ch === ' ') {
        cx += Math.round(charAdv * 0.7);
        continue;
      }
      const col = typeof colFn === 'function' ? colFn(i, ch) : colFn;
      drawChar(c, ch, cx, y, s, col);
      cx += charAdv;
    }
    return cx;
  }

  // ─── Animation Loop Parameters ───────────────────────────────────
  let animId = null;
  const FPS = 30;
  const frameInterval = 1000 / FPS;
  let lastTime = 0;
  const startTimestamp = performance.now();

  function render(now) {
    animId = requestAnimationFrame(render);

    const elapsed = now - lastTime;
    if (elapsed < frameInterval) return;
    lastTime = now - (elapsed % frameInterval);

    const t = (now - startTimestamp) / 1000;
    const theme = getTheme();
    const P = PAL[theme];

    // Offscreen render at native logical 640x192
    const off = document.createElement('canvas');
    off.width = W;
    off.height = H;
    const c = off.getContext('2d');
    if (!c) return;

    // 1. Background Fill & Ambient Tech Grid Dots
    rect(c, 0, 0, W, H, P.bg);

    for (let gx = 16; gx < W; gx += 20) {
      for (let gy = 12; gy < H; gy += 18) {
        pix(c, gx, gy, P.dim);
      }
    }

    // Ambient floating sparks
    for (const sp of SPARKS) {
      const sy = (sp.y - t * sp.speed * 8) % H;
      const actY = sy < 0 ? sy + H : sy;
      const alpha = 0.3 + 0.7 * Math.sin(t * 3 + sp.phase);
      if (alpha > 0.4) {
        rect(c, sp.x, R(actY), sp.size, sp.size, P.line);
      }
    }

    // ─── LEFT SIDE: HERO TITLE & ROTATING LAB STATS ────────────────
    const tx = 18;
    const ty = 28;

    // Glowing drop shadow & primary text "PROJECTS & LAB"
    drawText(c, 'PROJECTS & LAB', tx + 2, ty + 2, 2, () => P.shadow, undefined, 14);
    drawText(c, 'PROJECTS & LAB', tx + 1, ty + 1, 2, () => P.cyanD, undefined, 14);
    drawText(c, 'PROJECTS & LAB', tx, ty, 2, (row) => (row < 2 ? P.ink : P.cyanL), undefined, 14);

    // Glowing Divider Rule
    rect(c, tx, 48, 200, 2, P.cyan);
    rect(c, tx + 60, 48, 70, 2, P.cyanL);

    // Sub-header mono label
    drawText(c, 'SYSTEMS ENGINEERING REPO', tx, 58, 1, () => P.ink2, 26, 7);

    // Rotating Focus Areas (Every 3.5s cycles)
    const ROLES = [
      'FULL-STACK PLATFORMS',
      'CHROME EXTENSIONS V3',
      '3D SHADERS & WEBGL',
      'DEVELOPER TOOLING'
    ];
    const roleIdx = Math.floor(t / 3.5) % ROLES.length;
    const roleProg = (t % 3.5) / 3.5;
    const roleText = ROLES[roleIdx];
    const roleChars = Math.min(roleText.length, Math.floor(roleProg * 28));

    rect(c, tx, 74, 6, 6, P.gpt);
    drawText(c, roleText, tx + 12, 74, 1.2, () => P.cyanL, roleChars, 8);

    // Verification Stats Telemetry
    drawText(c, '● PRODUCTION DEPLOYED', tx + 8, 114, 1, () => P.gptL, 22, 7);
    drawText(c, 'CORE WEB VITALS: 100/100', tx, 134, 1, () => P.ink2, 24, 6);
    drawText(c, 'LATENCY: ZERO HYDRATION', tx, 150, 1, () => P.dim, 24, 6);

    // ─── RIGHT SIDE: RETRO DEVELOPER WORKSTATION MONITOR ───────────
    const MX = 240;
    const MY = 14;
    const MW = 380;
    const MH = 160;

    // Monitor Outer Bezel
    rect(c, MX, MY, MW, MH, P.bgMonitor);
    frameRect(c, MX, MY, MW, MH, P.terminalBar);

    // Monitor Top Titlebar
    rect(c, MX, MY, MW, 20, P.terminalBar);
    frameRect(c, MX, MY, MW, 20, P.line);

    // Three retro window buttons
    rect(c, MX + 8, MY + 6, 7, 7, '#ef4444');
    rect(c, MX + 18, MY + 6, 7, 7, '#f59e0b');
    rect(c, MX + 28, MY + 6, 7, 7, '#10b981');

    drawText(c, 'BUILD TERMINAL v3.4 · LIVE REPO', MX + 44, MY + 6, 1, () => P.ink2, 34, 6);

    // Live Streaming Status indicator
    const blink = Math.sin(t * 5) > 0;
    rect(c, MX + MW - 76, MY + 8, 4, 4, blink ? P.gpt : P.dim);
    drawText(c, 'ONLINE', MX + MW - 66, MY + 6, 1, () => P.gptL, 6, 6);

    // Monitor Content Canvas
    const chatInnerX = MX + 10;
    const chatInnerW = MW - 20;

    // Stream Cycle: 10s total
    const loopT = t % 10;

    // 1. Build Command Box
    rect(c, chatInnerX, 40, chatInnerW, 26, P.bubbleUser);
    frameRect(c, chatInnerX, 40, chatInnerW, 26, P.bubbleBorder);

    rect(c, chatInnerX + 6, 46, 28, 14, P.cyanD);
    drawText(c, 'EXEC', chatInnerX + 9, 49, 1, () => P.ink, 4, 6);

    const cmdStr = '$ pnpm build --mode=production';
    const cmdLen = Math.min(cmdStr.length, Math.floor(loopT * 18));
    drawText(c, cmdStr, chatInnerX + 42, 49, 1, () => P.ink, cmdLen, 6);

    if (loopT < 2.5 && Math.floor(t * 4) % 2 === 0) {
      rect(c, chatInnerX + 42 + cmdLen * 6, 49, 4, 7, P.cyan);
    }

    // 2. Output Console Stream Box
    rect(c, chatInnerX, 72, chatInnerW, 64, P.bubbleAI);
    frameRect(c, chatInnerX, 72, chatInnerW, 64, P.bubbleBorder);

    if (loopT < 3.2) {
      // Compiling state
      const dots = '.'.repeat((Math.floor(t * 3) % 4));
      drawText(c, 'STDOUT', chatInnerX + 8, 80, 1, () => P.claudeL, 6, 6);
      drawText(c, 'Bundling Astro, GSAP, Shaders' + dots, chatInnerX + 54, 80, 1, () => P.ink2, 34, 6);
    } else {
      // Completed build lines
      drawText(c, '✓', chatInnerX + 8, 80, 1, () => P.gptL, 1, 6);
      drawText(c, 'Compiled 11 production targets cleanly', chatInnerX + 20, 80, 1, () => P.ink, 38, 6);

      if (loopT > 4.5) {
        drawText(c, '✓', chatInnerX + 8, 94, 1, () => P.gptL, 1, 6);
        drawText(c, 'Core Web Vitals: 100/100 · 0.000 CLS', chatInnerX + 20, 94, 1, () => P.cyanL, 38, 6);
      }

      if (loopT > 6.0) {
        drawText(c, '✓', chatInnerX + 8, 108, 1, () => P.gptL, 1, 6);
        drawText(c, 'Edge CDN active · Sub-400ms TTFB ready', chatInnerX + 20, 108, 1, () => P.ink2, 40, 6);
      }

      if (loopT > 7.5) {
        drawText(c, '[ STATUS: VERIFIED PRODUCTION SYSTEMS DEPLOYED ]', chatInnerX + 8, 122, 1, () => P.gptL, 46, 6);
      }
    }

    // 3. Audio & Activity Frequency Wave at Bottom of Monitor
    const specY = 144;
    for (let bx = 0; bx < chatInnerW - 20; bx += 5) {
      const wave = Math.sin(t * 4 + bx * 0.12) * Math.cos(t * 2 + bx * 0.08);
      const bH = Math.max(2, Math.floor(Math.abs(wave) * 8) + 1);
      rect(c, chatInnerX + bx, specY - bH, 3, bH, P.cyanL);
    }

    // Coffee mug on desk
    const mugX = MX - 24;
    const mugY = 146;
    rect(c, mugX, mugY, 10, 12, P.ink);
    rect(c, mugX + 10, mugY + 3, 3, 6, P.ink);
    // Steam particles
    const steamY = (mugY - 4) - (t * 8) % 10;
    pix(c, mugX + 4, R(steamY), P.line);
    pix(c, mugX + 6, R(steamY - 2), P.line);

    // Companion pixel bot on desk
    const botX = MX - 16;
    const botY = 164;
    rect(c, botX, botY, 12, 10, P.gpt);
    rect(c, botX + 2, botY + 3, 2, 2, '#fff');
    rect(c, botX + 7, botY + 3, 2, 2, '#fff');
    // Bot antenna
    rect(c, botX + 5, botY - 3, 2, 3, P.gpt);
    pix(c, botX + 5, botY - 4, Math.sin(t * 6) > 0 ? P.gptL : P.gpt);

    // Desk Stand under monitor
    rect(c, MX + MW / 2 - 30, MY + MH, 60, 6, P.line);
    rect(c, MX + MW / 2 - 45, MY + MH + 6, 90, 4, P.terminalBar);

    // Blit offscreen buffer to active canvas
    ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
  }

  animId = requestAnimationFrame(render);

  return function cleanup() {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
  };
}

