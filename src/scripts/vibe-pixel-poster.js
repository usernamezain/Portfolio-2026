/**
 * VIBE CODING PIXEL POSTER ENGINE v2.0
 * Pure mathematical pixel-art canvas animation for blog header poster.
 * Features:
 *  - Refined, compact "VIBE CODING" Typography with Electric Orange Glow
 *  - High-res pixel density (640x192) for microscopic, ultra-crisp chatbot UI
 *  - Authentic AI Chatbot Terminal Experience:
 *     * User prompt chat bubble with typing cadence & blinking caret
 *     * AI Agent loading bubble with bouncing typing dots (● ● ●) & reasoning status
 *     * AI Agent response bubble with streaming syntax-highlighted code & Core Web Vitals
 *     * Delicate audio frequency vibe spectrum
 *  - Multi-Agent AI Studio Crew:
 *     * ChatGPT Bot at desk typing sparks onto keyboard
 *     * Claude Bot companion with pulsing warm amber thinking aura
 *     * Gemini Radiant Star floating safely above monitor firing data beams
 *     * Steaming coffee mug & walking companion bot
 *  - 100% theme-reactive (instant dark/light mode), DPI scaling, 30fps retro cadence
 */

export function initVibePixelPoster(target) {
  if (typeof window === 'undefined') return;

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  // Clear any existing children to prevent duplicate canvases
  el.innerHTML = '';

  const W = 640, H = 192;

  // ─── Theme Palettes: Electric Orange Vibe Coding Theme ───────────
  const PAL = {
    dark: {
      bg: '#100e0c',
      bgMonitor: '#15110d',
      terminalBar: '#241a13',
      ink: '#fff7ed',
      ink2: '#fed7aa',
      dim: '#38291e',
      line: '#523c2c',
      orange: '#ff6a00',
      orangeL: '#ff9f0a',
      orangeD: '#9a3412',
      shadow: '#331206',
      gpt: '#10b981',
      gptL: '#34d399',
      claude: '#f97316',
      claudeL: '#fb923c',
      gemini: '#6366f1',
      geminiL: '#38bdf8',
      bubbleUser: '#241710',
      bubbleAI: '#191410',
      bubbleBorder: '#4a3322',
      st: ['#2e1507', '#7c2d12', '#ea580c', '#ffedd5']
    },
    light: {
      bg: '#fff8f2',
      bgMonitor: '#fdf4ea',
      terminalBar: '#fed7aa',
      ink: '#1c1917',
      ink2: '#78350f',
      dim: '#fed7aa',
      line: '#fdba74',
      orange: '#ea580c',
      orangeL: '#f97316',
      orangeD: '#ffedd5',
      shadow: '#fed7aa',
      gpt: '#059669',
      gptL: '#10b981',
      claude: '#c2410c',
      claudeL: '#ea580c',
      gemini: '#4f46e5',
      geminiL: '#0284c7',
      bubbleUser: '#fff1e5',
      bubbleAI: '#fef7ef',
      bubbleBorder: '#fdba74',
      st: ['#ffedd5', '#fed7aa', '#f97316', '#c2410c']
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
    J: '00001/00001/00001/00001/00001/10001/01110',
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
    '0': '01110/10011/10101/11001/10001/10001/01110',
    '1': '00100/01100/00100/00100/00100/00100/01110',
    '2': '01110/10001/00001/00010/00100/01000/11111',
    '3': '11110/00001/00001/01110/00001/00001/11110',
    '4': '00010/00110/01010/10010/11111/00010/00010',
    '5': '11111/10000/11110/00001/00001/10001/01110',
    '6': '00110/01000/10000/11110/10001/10001/01110',
    '7': '11111/00001/00010/00100/01000/01000/01000',
    '8': '01110/10001/10001/01110/10001/10001/01110',
    '9': '01110/10001/10001/01111/00001/00010/01100',
    ' ': '00000/00000/00000/00000/00000/00000/00000',
    '-': '00000/00000/00000/11111/00000/00000/00000',
    '>': '10000/01000/00100/00010/00100/01000/10000',
    '<': '00001/00010/00100/01000/00100/00010/00001',
    ':': '00000/00100/00000/00000/00100/00000/00000',
    ';': '00000/00110/00110/00000/00110/00100/01000',
    ',': '00000/00000/00000/00000/00110/00100/01000',
    '.': '00000/00000/00000/00000/00000/00110/00110',
    '/': '00001/00010/00010/00100/01000/01000/10000',
    '+': '00000/00100/00100/11111/00100/00100/00000',
    '=': '00000/11111/00000/11111/00000/00000/00000',
    '_': '00000/00000/00000/00000/00000/00000/11111',
    '(': '00110/01100/01100/01100/01100/01100/00110',
    ')': '01100/00110/00110/00110/00110/00110/01100',
    '{': '00110/00100/00100/01100/00100/00100/00110',
    '}': '01100/00100/00100/00110/00100/00100/01100',
    '[': '01111/01000/01000/01000/01000/01000/01111',
    ']': '11110/00010/00010/00010/00010/00010/11110',
    '"': '10100/10100/10100/00000/00000/00000/00000',
    "'": '00100/00100/01000/00000/00000/00000/00000',
    '!': '00100/00100/00100/00100/00100/00000/00100',
    '?': '01110/10001/00001/00010/00100/00000/00100',
    '*': '00000/10101/01110/11111/01110/10101/00000',
    '|': '00100/00100/00100/00100/00100/00100/00100',
    // Special symbol glyphs
    '●': '00000/01110/11111/11111/11111/01110/00000',
    '✓': '00000/00001/00011/10110/11100/01100/00000'
  };

  const FONT = {};
  for (const k in FONT_SRC) FONT[k] = FONT_SRC[k].split('/');

  // ─── AI Bots Pixel Art Sprites (Rendered 2x on 640x192 canvas) ──
  // 1. ChatGPT Bot (Green Bot at Terminal Keyboard)
  const CHATGPT_BOT = [
    '..gggg..',
    '.gwwwwg.',
    'gwwbbwwg',
    'gwwbbwwg',
    'gggggggg',
    'g.gggg.g',
    '.g....g.',
    '.gg..gg.'
  ];

  // 2. Claude Bot (Warm Amber Spark Companion)
  const CLAUDE_BOT = [
    '...o...',
    '..ooo..',
    '.ooaoo.',
    'ooaaaoo',
    '.ooaoo.',
    '..ooo..',
    '...o...'
  ];

  // 3. Gemini Radiant Star (Celestial 4-pointed radiant star)
  const GEMINI_STAR = [
    '....g....',
    '....g....',
    '...ggg...',
    '..ggwgg..',
    'gggwswggg',
    '..ggwgg..',
    '...ggg...',
    '....g....',
    '....g....'
  ];

  // 4. Retro Walking Companion Bot
  const BOT_WALK = [
    [
      '...l....',
      '...w....',
      '.wwwwww.',
      'wwbwwbww',
      'wwwwwwww',
      '.wwwwww.',
      '.w.ww.w.',
      '.w....w.'
    ],
    [
      '...l....',
      '...w....',
      '.wwwwww.',
      'wwbwwbww',
      'wwwwwwww',
      '.wwwwww.',
      '..wwww..',
      '..w..w..'
    ]
  ];

  const TITLE = 'VIBE CODING';
  const ROLES = ['FLOW STATE', 'AI AGENT CREW', 'PROMPT TO PROD', 'NATURAL LANGUAGE'];
  const RT0 = 1.4, CY = 3.6;

  // ─── Deterministic Seeded PRNG (Mulberry32) ─────────────────────
  function mulberry(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Pre-calculate floating ember energy tokens
  const EMBERS = (() => {
    const r = mulberry(42), out = [];
    for (let i = 0; i < 48; i++) {
      out.push({
        x: Math.floor(r() * W),
        y: Math.floor(r() * (H - 24)),
        speed: 0.3 + r() * 0.8,
        size: r() > 0.85 ? 2 : 1,
        phase: r() * 6.28
      });
    }
    return out;
  })();

  // ─── Drawing Primitives ─────────────────────────────────────────
  function R(c, x, y, w, h, col) {
    c.fillStyle = col;
    c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function drawBubble(c, x, y, w, h, bg, border) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    // 2px rounded corners border
    R(c, x + 2, y, w - 4, h, border);
    R(c, x, y + 2, w, h - 4, border);
    R(c, x + 1, y + 1, w - 2, h - 2, border);
    // Fill
    R(c, x + 2, y + 1, w - 4, h - 2, bg);
    R(c, x + 1, y + 2, w - 2, h - 4, bg);
  }

  function drawText(c, str, x, y, s, colFn, limit, adv) {
    if (!str) return x;
    let cx = x;
    const len = limit !== undefined ? Math.min(str.length, limit) : str.length;
    for (let i = 0; i < len; i++) {
      const ch = str[i].toUpperCase();
      const g = FONT[ch] || FONT[' '];
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

  function sprite(c, rows, x, y, flip, map, scale = 1) {
    if (!rows || !rows.length || !rows[0]) return;
    const w = rows[0].length;
    for (let r = 0; r < rows.length; r++) {
      if (!rows[r]) continue;
      for (let q = 0; q < w; q++) {
        const ch = rows[r][flip ? w - 1 - q : q];
        if (ch && ch !== '.' && map[ch]) {
          R(c, x + q * scale, y + r * scale, scale, scale, map[ch]);
        }
      }
    }
  }

  const blink = (t, hz) => Math.floor(t * hz * 2) % 2 === 0;

  // ─── Master Frame Renderer ──────────────────────────────────────
  function drawFrame(c, t, themeName) {
    t = Math.max(0, Number.isFinite(t) ? t : 0);
    const P = PAL[themeName] || PAL.dark;

    c.clearRect(0, 0, W, H);
    R(c, 0, 0, W, H, P.bg);

    // 1. Floating Warm Ember Sparks
    for (const em of EMBERS) {
      const ey = ((em.y - t * 18 * em.speed) % (H - 24) + (H - 24)) % (H - 24);
      const ex = em.x + Math.sin(t * 2 + em.phase) * 4;
      const pulse = Math.floor((Math.sin(t * 3 + em.phase) + 1) * 1.49);
      const col = P.st[Math.min(3, Math.max(0, pulse))];
      R(c, ex, ey, em.size, em.size, col);
    }

    // 2. "VIBE CODING" Typography on ONE SINGLE LINE
    // Positioned cleanly on the left side, ending well before the monitor
    const tx = 22;
    const ty = 28;
    let vis = 0;
    for (let i = 0; i < TITLE.length; i++) {
      if (t >= 0.15 + i * 0.08) vis = i + 1;
    }

    // 3D Shadow
    drawText(c, TITLE, tx + 2, ty + 2, 2, () => P.shadow, vis, 14);
    drawText(c, TITLE, tx + 1, ty + 1, 2, () => P.orangeD, vis, 14);
    // Face (Electric Orange Gradient)
    drawText(c, TITLE, tx, ty, 2, (row) => (row < 2 ? P.ink : row < 5 ? P.orangeL : P.orange), vis, 14);

    // Subtle Glowing Divider below "VIBE CODING"
    if (t >= 1.0) {
      const len = Math.min(156, Math.floor((t - 1.0) * 240));
      R(c, tx, 50, len, 2, P.orange);
      R(c, tx + len, 50, 3, 2, P.orangeL);
    }

    // 3. Subheading & Bottom Text (Significantly Increased Size as requested!)
    let mode = -1, local = 0;
    if (t >= RT0) {
      const tt = t - RT0;
      const n = Math.floor(tt / CY);
      mode = n % ROLES.length;
      local = tt - n * CY;
    }

    // Kicker line above the cycling role
    drawText(c, 'THE AI-FIRST WORKFLOW', tx, 62, 1, () => P.ink2, 22, 7);

    // Main cycling tagline with increased size (Scale 1.8 for bold readability!)
    if (mode >= 0) {
      const word = ROLES[mode];
      const L = word.length;
      let k = Math.min(L, Math.floor(local / 0.05) + 1);
      if (local > 2.8) k = Math.max(0, L - Math.floor((local - 2.8) / 0.03));
      const ex = drawText(c, word, tx, 76, 1.8, () => P.orangeL, k, 11);
      if (blink(t, 2.5)) R(c, ex + 2, 76, 3, 12, P.orange);

      // Mode indicators (4 larger glowing pills)
      for (let i = 0; i < ROLES.length; i++) {
        R(c, tx + i * 16, 98, 12, 3, i === mode ? P.orange : P.dim);
      }
    }

    // Secondary feature badge pill
    drawBubble(c, tx, 114, 172, 22, P.bubbleAI, P.bubbleBorder);
    drawText(c, '● MULTI-AGENT STUDIO', tx + 8, 120, 1, () => P.ink, 22, 7);

    // Micro architectural spec
    drawText(c, 'ARCHITECTURE & INTENT', tx, 146, 1, () => P.dim, 24, 6);

    // 4. The AI Workstation & TV Monitor (x=232 to 620, stays in that exact right-side area)
    const MX = 232, MY = 10, MW = 388, MH = 144;

    // Monitor frame with retro beveled border
    R(c, MX, MY, MW, MH, P.orangeD);
    R(c, MX + 1, MY + 1, MW - 2, MH - 2, P.dim);
    R(c, MX + 2, MY + 2, MW - 4, MH - 4, P.bgMonitor);

    // Terminal Titlebar (y=12 to 26)
    R(c, MX + 2, MY + 2, MW - 4, 14, P.terminalBar);
    // Window control lights
    R(c, MX + 8, MY + 6, 4, 4, '#ef4444');
    R(c, MX + 16, MY + 6, 4, 4, P.orangeL);
    R(c, MX + 24, MY + 6, 4, 4, P.gpt);

    // Terminal title text in fine micro-font
    drawText(c, 'VIBE CHAT v2.6 · MULTI-AGENT STUDIO', MX + 36, MY + 5, 1, () => P.ink2, 35, 6);

    // Continuous Chat Loop Cycle (10.5 seconds per prompt -> response loop)
    const chatCycle = 10.5;
    const clt = t % chatCycle;

    // Status Pill in top right of monitor header
    let statusLabel = '● PROMPTING';
    let statusCol = P.orangeL;
    if (clt >= 2.8 && clt < 5.0) {
      statusLabel = '● REASONING';
      statusCol = P.claudeL;
    } else if (clt >= 5.0 && clt < 9.0) {
      statusLabel = '● STREAMING';
      statusCol = P.gptL;
    } else if (clt >= 9.0) {
      statusLabel = '● VERIFIED';
      statusCol = P.geminiL;
    }
    drawText(c, statusLabel, MX + MW - 96, MY + 5, 1, () => statusCol, 12, 6);

    // Divider line below header
    R(c, MX + 2, MY + 16, MW - 4, 1, P.dim);

    // ─── Inside Chat Screen: Real Chatbot Conversation Experience ───
    const chatInnerX = MX + 10;
    const chatInnerW = MW - 20;

    // A) USER MESSAGE BUBBLE (y=32 to 54)
    drawBubble(c, chatInnerX, 32, chatInnerW, 24, P.bubbleUser, P.bubbleBorder);
    // User avatar badge
    R(c, chatInnerX + 6, 37, 28, 14, P.orangeD);
    drawText(c, 'USER', chatInnerX + 9, 41, 1, () => P.ink, 4, 6);
    // User Prompt text (types character by character)
    const promptStr = '"Build 3D WebGL hero with GSAP"';
    const pLen = Math.min(promptStr.length, Math.floor(clt * 11));
    const pxEnd = drawText(c, promptStr, chatInnerX + 40, 41, 1, () => P.ink, pLen, 6);
    if (clt < 2.8 && blink(t, 3.5)) {
      R(c, pxEnd + 1, 40, 2, 8, P.orange);
    }

    // B) AI AGENT WORKING / LOADING STATE (2.8s to 5.0s)
    // Directly addresses user request: "make sure the ai working and loading perfectly as well small so it feels like talking to chatbot"
    if (clt >= 2.8 && clt < 5.0) {
      drawBubble(c, chatInnerX, 62, chatInnerW, 26, P.bubbleAI, P.bubbleBorder);
      // AI Badge
      R(c, chatInnerX + 6, 68, 44, 14, P.dim);
      drawText(c, 'AI CREW', chatInnerX + 9, 72, 1, () => P.claudeL, 7, 6);

      // Bouncing typing indicator dots (● ● ●) like modern chatbots!
      const dotBaseY = 74;
      const d1 = Math.round(Math.sin(t * 9) * 2);
      const d2 = Math.round(Math.sin(t * 9 + 1.2) * 2);
      const d3 = Math.round(Math.sin(t * 9 + 2.4) * 2);
      R(c, chatInnerX + 56, dotBaseY + d1, 3, 3, P.claudeL);
      R(c, chatInnerX + 62, dotBaseY + d2, 3, 3, P.orangeL);
      R(c, chatInnerX + 68, dotBaseY + d3, 3, 3, P.gptL);

      // Small reasoning status text
      const thinkDots = '.'.repeat(1 + (Math.floor(clt * 3) % 3));
      drawText(c, 'Synthesizing shaders & GSAP timeline' + thinkDots, chatInnerX + 78, 72, 1, () => P.ink2, 38, 6);
    }

    // C) AI AGENT RESPONSE BUBBLE (5.0s to 10.5s)
    if (clt >= 5.0) {
      drawBubble(c, chatInnerX, 62, chatInnerW, 62, P.bubbleAI, P.bubbleBorder);
      // AI Header
      R(c, chatInnerX + 6, 68, 44, 14, P.dim);
      drawText(c, 'AI CREW', chatInnerX + 9, 72, 1, () => P.gptL, 7, 6);

      // Code Token Stream Line 1
      const s1 = '> const canvas = new WebGLCanvas({ fps: 60 });';
      const s1Len = Math.min(s1.length, Math.floor((clt - 5.0) * 16));
      drawText(c, s1, chatInnerX + 56, 72, 1, () => P.ink, s1Len, 6);

      // Code Token Stream Line 2
      if (clt >= 6.4) {
        const s2 = '> gsap.to(".hero-mesh", { orbit: 360, ease: "expo" });';
        const s2Len = Math.min(s2.length, Math.floor((clt - 6.4) * 18));
        drawText(c, s2, chatInnerX + 10, 88, 1, () => P.ink2, s2Len, 6);
      }

      // Verification / CWV Metric Line 3
      if (clt >= 7.8) {
        const s3 = '✓ 100/100 Core Web Vitals · Zero layout shift';
        const s3Len = Math.min(s3.length, Math.floor((clt - 7.8) * 20));
        drawText(c, s3, chatInnerX + 10, 102, 1, () => P.gptL, s3Len, 6);
      }

      // Live Runtime Verified Chip
      if (clt >= 9.2) {
        drawText(c, '[ READY: 60FPS RUNTIME DEPLOYED IN 1.2S ]', chatInnerX + 10, 115, 1, () => P.orangeL, 40, 6);
      }
    }

    // D) Subtle Audio Spectrum / Vibe Frequency Bar at Bottom of Monitor (y=134 to 142)
    const waveAmp = (clt >= 5.0 && clt < 9.2) ? 6 : 2;
    for (let gx = 0; gx < 56; gx++) {
      const gv = Math.sin(t * 8 + gx * 0.4) * Math.cos(t * 4 + gx * 0.2);
      const gh = Math.round(Math.abs(gv) * waveAmp);
      const wCol = (clt >= 5.0 && clt < 9.2) ? P.gptL : P.orange;
      R(c, chatInnerX + 10 + gx * 6, MY + MH - 6 - gh, 2, gh + 1, wCol);
    }

    // Monitor stand
    R(c, MX + Math.round(MW / 2) - 18, MY + MH, 36, 12, P.line);
    R(c, MX + Math.round(MW / 2) - 34, MY + MH + 10, 68, 4, P.line);

    // 5. Desk, Workstation Floor
    R(c, 218, 164, 416, 2, P.orangeL);
    R(c, 218, 166, 416, 3, P.orangeD);
    R(c, 218, 169, 416, 5, P.dim);
    // Desk legs
    R(c, 226, 174, 5, 12, P.line);
    R(c, 622, 174, 5, 12, P.line);
    // Floor boundary
    R(c, 0, 186, W, 1, P.dim);

    // 6. The Multi-Agent AI Bots in Action (Scaled 2x for crisp presence)
    // A) ChatGPT Bot (Green Bot at keyboard typing prompts)
    const isGptTyping = clt < 2.8;
    const gptBounce = isGptTyping ? Math.sin(t * 14) * 2 : 0;
    sprite(c, CHATGPT_BOT, 216, Math.round(144 + gptBounce), false, {
      g: P.gpt,
      w: P.ink,
      b: '#042f2e'
    }, 2);

    // ChatGPT typing sparks onto keyboard during prompt phase
    if (isGptTyping && blink(t, 6)) {
      R(c, 234, 156, 3, 2, P.gptL);
      R(c, 239, 154, 2, 2, P.gptL);
    }

    // B) Claude Bot (Warm Amber Spark hovering beside workstation)
    const claudeFloatY = 48 + Math.sin(t * 3.5) * 4;
    sprite(c, CLAUDE_BOT, 206, Math.round(claudeFloatY), false, {
      o: P.claude,
      a: P.claudeL
    }, 2);
    // Claude thinking aura during agent thinking phase
    const isClaudeThinking = clt >= 2.8 && clt < 5.0;
    if (isClaudeThinking || blink(t, 2)) {
      R(c, 210, Math.round(claudeFloatY - 4), 2, 2, P.claudeL);
      R(c, 214, Math.round(claudeFloatY - 6), 3, 3, P.orangeL);
    }

    // C) Gemini Bot (Radiant Star Hovering SAFELY ABOVE the Monitor)
    // Positioned completely clear of the monitor header and text!
    const geminiHoverY = 4 + Math.sin(t * 2.8 + 1.2) * 2.5;
    sprite(c, GEMINI_STAR, 606, Math.round(geminiHoverY), false, {
      g: P.gemini,
      w: P.geminiL,
      s: P.orangeL
    }, 1.5);
    // Gemini radiant data beam down during streaming phase
    const isGeminiStreaming = clt >= 5.0 && clt < 9.0;
    if (isGeminiStreaming || blink(t, 3)) {
      R(c, 612, Math.round(geminiHoverY + 14), 1, 6, P.geminiL);
    }

    // D) Coffee Mug with rising steam
    R(c, 608, 150, 10, 10, P.ink);
    R(c, 618, 152, 2, 6, P.ink);
    R(c, 610, 152, 6, 2, P.orange);
    for (let k = 0; k < 2; k++) {
      const ph = (t * 5 + k * 4) % 12;
      const sy = 146 - ph;
      const sx = 612 + (k === 1 ? 2 : 0) + Math.round(Math.sin(t * 3 + k));
      R(c, sx, sy, 1, 2, ph < 6 ? P.orangeL : P.dim);
    }

    // E) Walking companion bot across the floor
    const u = ((t % 16) + 16) % 16 / 16;
    const tri = u < 0.5 ? u * 2 : (1 - u) * 2;
    const bx = Math.round(-16 + tri * (W + 12));
    const botLen = (BOT_WALK && BOT_WALK.length) || 1;
    const f = Math.abs(Math.floor(t * 6)) % botLen;
    if (BOT_WALK && BOT_WALK[f]) {
      sprite(c, BOT_WALK[f], bx, 172, u >= 0.5, {
        w: P.ink,
        b: P.orange,
        l: P.orangeL
      }, 1.5);
    }
  }

  // ─── Setup DOM Elements ─────────────────────────────────────────
  const cv = document.createElement('canvas');
  cv.style.cssText = 'display:block;width:100%;height:auto;aspect-ratio:640/192;image-rendering:pixelated;image-rendering:crisp-edges';
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
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function size() {
    const dpr = window.devicePixelRatio || 1;
    const cw = el.clientWidth || W;
    const s = Math.max(1, (cw * dpr) / W);
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
    if (!visible || document.hidden || now - last < 33) return; // 30fps retro pixel cadence
    last = now;
    paint(Math.max(0, (now - t0) / 1000));
  }

  function still() {
    paint(RT0 + 2.5);
  }

  // Observers & Events
  let ro = null, io = null;
  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => size());
    ro.observe(el);
  } else {
    window.addEventListener('resize', size);
  }

  if (typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
  }

  size();

  if (mq && mq.matches) {
    still();
  } else {
    raf = requestAnimationFrame(loop);
  }

  // Cleanup on Astro page change or unmount
  function cleanup() {
    alive = false;
    if (raf) cancelAnimationFrame(raf);
    if (ro) ro.disconnect();
    if (io) io.disconnect();
    delete el.dataset.vibePosterActive;
  }

  document.addEventListener('astro:before-swap', cleanup, { once: true });
}
