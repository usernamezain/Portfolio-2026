/**
 * MascotCrew - Wander and Text Interaction System
 * Pure vanilla JS, zero dependencies. Supports Ghost, Gemini, and ChatGPT pixel mascots.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MascotCrew = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------- Pixel Art Data (14x14 Grids) ---------- */
  const BODY = [
    '     ####     ',
    '   ########   ',
    '  ##########  ',
    ' ############ ',
    ' ############ ',
    ' ############ ',
    '##############',
    '##############',
    '##############',
    '##############',
    '##############',
    '##############'
  ];
  const FEET_A = ['## ## ## ## ##', '## ## ## ## ##'];
  const FEET_B = [' ## ## ## ## #', ' ## ## ## ## #'];

  const STAR = [
    '      ##      ', '      ##      ', '     ####     ', '     ####     ', '    ######    ',
    '  ##########  ', '##############', '##############', '  ##########  ', '    ######    ',
    '     ####     ', '     ####     ', '      ##      ', '      ##      '
  ];
  const HEX = [
    '     ####     ', '   ########   ', ' ############ ', '##############', '##############',
    '##############', '##############', '##############', '##############', '##############',
    ' ############ ', '   ########   ', '     ####     '
  ];
  const HEX_IN = [
    '     ####     ', '    ######    ', '   ########   ', '   ########   ', '   ########   ',
    '    ######    ', '     ####     '
  ];
  const GITHUB_CAT = [
    '  ##      ##  ',
    ' ####    #### ',
    '##############',
    '##############',
    '##############',
    '##############',
    '##############',
    ' ############ ',
    '  ##########  ',
    '  ##########  ',
    ' ############ ',
    '##  ######  ##',
    '##          ##'
  ];

  const rects = (rows, y0, fill) =>
    rows
      .map((row, i) => {
        let o = '',
          x = 0;
        while (x < row.length) {
          if (row[x] !== '#') {
            x++;
            continue;
          }
          let w = 0;
          while (row[x + w] === '#') w++;
          o += `<rect x="${x}" y="${y0 + i}" width="${w}" height="1" fill="${fill}"/>`;
          x += w;
        }
        return o;
      })
      .join('');

  const eyeShape = x =>
    `<rect x="${x + 1}" y="3" width="2" height="5"/><rect x="${x}" y="4" width="4" height="3"/>`;

  /* ---------- Helper Utilities ---------- */
  const rnd = (a, b) => a + Math.random() * (b - a);
  const rint = (a, b) => Math.floor(rnd(a, b + 1));
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Embedded Stylesheet ---------- */
  const STYLE_ID = 'mascot-crew-styles';
  const CSS_TEXT = `
    .pg { position: fixed; left: 0; top: 0; z-index: 9999; pointer-events: none; will-change: transform; }
    .pop, .pg-pop { transition: transform .28s steps(5), opacity .28s steps(5); transform-origin: 50% 80%; }
    .pop.out, .pg-pop.out { transform: scale(.15) rotate(-12deg); opacity: 0; }
    .mk svg { display: block; overflow: visible; shape-rendering: crispEdges; animation: pg-bob .5s steps(1) infinite; }
    @keyframes pg-bob { 0%, 49% { transform: translateY(0); } 50%, 100% { transform: translateY(-8%); } }
    .mk .tw { transform-box: fill-box; transform-origin: 50% 50%; animation: pg-tw 1s steps(1) infinite; }
    @keyframes pg-tw { 0%, 49% { transform: scale(1); } 50%, 100% { transform: scale(1.1); } }
    .mk .br { transform-box: fill-box; transform-origin: 50% 50%; animation: pg-br 1s steps(1) infinite; }
    @keyframes pg-br { 0%, 49% { transform: scaleY(1); } 50%, 100% { transform: scaleY(.94); } }
    .mk .eyes { transform-box: fill-box; transform-origin: 50% 60%; animation: pg-bl 4s steps(1) infinite; }
    @keyframes pg-bl { 0%, 94% { transform: scaleY(1); } 95%, 100% { transform: scaleY(.1); } }
    .mk .fa { animation: pg-fa .5s steps(1) infinite; }
    .mk .fb { animation: pg-fb .5s steps(1) infinite; }
    @keyframes pg-fa { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
    @keyframes pg-fb { 0%, 49% { opacity: 0; } 50%, 100% { opacity: 1; } }
    .pg.blink .eyes { transform: scaleY(.1); }
    .mascot-word { display: inline-block; white-space: nowrap; }
    .mascot-char { display: inline-block; will-change: transform; pointer-events: none; }
    @media (prefers-reduced-motion: reduce) {
      .mk svg, .mk .tw, .mk .br, .mk .eyes, .mk .fa, .mk .fb { animation: none !important; }
      .mk .fb { opacity: 0 !important; }
    }
  `;

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS_TEXT;
    document.head.appendChild(style);
  }

  function removeStyles() {
    const el = document.getElementById(STYLE_ID);
    if (el) el.remove();
  }

  /* ---------- Mascot Definitions ---------- */
  const MASCOT_DEFS = {
    ghost: {
      name: 'ghost',
      glow: '#ff3b3b88',
      cls: '',
      buildSvg(size) {
        return `<svg viewBox="0 0 14 14" width="${size}" height="${size}" aria-hidden="true">
          ${rects(BODY, 0, '#ff3b3b')}
          <g class="fa">${rects(FEET_A, 12, '#ff3b3b')}</g>
          <g class="fb">${rects(FEET_B, 12, '#ff3b3b')}</g>
          <g class="eyes" fill="#ffffff">${eyeShape(2)}${eyeShape(8)}</g>
          <g fill="#2a5cff" class="pg-pupils">
            <rect class="p" data-base-x="2" x="2" y="5" width="2" height="2"/>
            <rect class="p" data-base-x="8" x="8" y="5" width="2" height="2"/>
          </g>
        </svg>`;
      },
      look(_root, pupils, dir) {
        const dx = dir < 0 ? 0 : dir > 0 ? 2 : 1;
        pupils.forEach(p => {
          const bx = parseInt(p.getAttribute('data-base-x') || '0', 10);
          p.setAttribute('x', String(bx + dx));
        });
      }
    },
    gemini: {
      name: 'gemini',
      glow: '#9b72cb99',
      cls: 'tw',
      buildSvg(size) {
        const id = 'gemini-grad-' + Math.random().toString(36).slice(2, 8);
        const eyes = [[4, 6], [8, 6]]
          .map(
            ([ex, ey]) =>
              `<rect x="${ex}" y="${ey}" width="2" height="2" fill="#fff"/>` +
              `<rect class="p" data-base-x="${ex}" x="${ex + 1}" y="${ey}" width="1" height="2" fill="#1b1f3b"/>`
          )
          .join('');
        return `<svg viewBox="0 0 14 14" width="${size}" height="${size}" aria-hidden="true">
          <defs>
            <linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="14" y2="14">
              <stop offset="0%" stop-color="#4285f4"/>
              <stop offset="55%" stop-color="#9b72cb"/>
              <stop offset="100%" stop-color="#d96570"/>
            </linearGradient>
          </defs>
          <g class="tw">${rects(STAR, 0, `url(#${id})`)}</g>
          <g class="eyes">${eyes}</g>
        </svg>`;
      },
      look(_root, pupils, dir) {
        const dx = dir < 0 ? 0 : 1;
        pupils.forEach(p => {
          const bx = parseInt(p.getAttribute('data-base-x') || '0', 10);
          p.setAttribute('x', String(bx + dx));
        });
      }
    },
    chatgpt: {
      name: 'chatgpt',
      glow: '#10a37f99',
      cls: 'br',
      buildSvg(size) {
        const eyes = [[4, 5], [8, 5]]
          .map(
            ([ex, ey]) =>
              `<rect x="${ex}" y="${ey}" width="2" height="2" fill="#fff"/>` +
              `<rect class="p" data-base-x="${ex}" x="${ex + 1}" y="${ey}" width="1" height="2" fill="#0b3d31"/>`
          )
          .join('');
        return `<svg viewBox="0 0 14 14" width="${size}" height="${size}" aria-hidden="true">
          <g class="br">${rects(HEX, 0, '#10a37f')}${rects(HEX_IN, 3, '#0b5c48')}</g>
          <g class="eyes">${eyes}</g>
        </svg>`;
      },
      look(_root, pupils, dir) {
        const dx = dir < 0 ? 0 : 1;
        pupils.forEach(p => {
          const bx = parseInt(p.getAttribute('data-base-x') || '0', 10);
          p.setAttribute('x', String(bx + dx));
        });
      }
    },
    github: {
      name: 'github',
      glow: '#a371f7aa',
      cls: 'tw',
      buildSvg(size) {
        const eyes = [[3, 4], [9, 4]]
          .map(
            ([ex, ey]) =>
              `<rect x="${ex}" y="${ey}" width="2" height="2" fill="#161b22"/>` +
              `<rect class="p" data-base-x="${ex}" x="${ex + 1}" y="${ey}" width="1" height="2" fill="#58a6ff"/>`
          )
          .join('');
        return `<svg viewBox="0 0 14 14" width="${size}" height="${size}" aria-hidden="true">
          <g class="tw">
            ${rects(GITHUB_CAT, 0, '#f0f6fc')}
            <rect x="2" y="1" width="2" height="1" fill="#f43f5e"/>
            <rect x="10" y="1" width="2" height="1" fill="#f43f5e"/>
            <rect x="6" y="6" width="2" height="1" fill="#f43f5e"/>
            <rect x="0" y="6" width="2" height="1" fill="#8b949e"/>
            <rect x="12" y="6" width="2" height="1" fill="#8b949e"/>
          </g>
          <g class="eyes">${eyes}</g>
        </svg>`;
      },
      look(_root, pupils, dir) {
        const dx = dir < 0 ? 0 : 1;
        pupils.forEach(p => {
          const bx = parseInt(p.getAttribute('data-base-x') || '0', 10);
          p.setAttribute('x', String(bx + dx));
        });
      }
    }
  };

  /* ---------- State Variables ---------- */
  let activeMascots = [];
  let isRunning = false;
  let rafId = null;
  let activeConfig = null;
  let boundListeners = [];

  // Text interaction state
  let targetElements = [];
  let splitElementsMap = new Map(); // element -> { replacements: [], letters: [], charCount: number, lastNearTime: number, rect: DOMRect }
  let allActiveLetters = [];
  let totalSplitChars = 0;
  const MAX_SPLIT_CHARS = 1500;
  const PROXIMITY_SPLIT_RADIUS = 60; // px
  const IDLE_RESTORE_TIME = 1500; // ms

  /* ---------- Mascot Spawn & Behavior Loop ---------- */
  function createMascot(typeKey, config, startDelay, containerSelector) {
    const def = MASCOT_DEFS[typeKey.toLowerCase()] || MASCOT_DEFS.ghost;
    const size = config.size;

    const containerEl = containerSelector ? document.querySelector(containerSelector) : null;
    // Strict isolation: if a specific section was targeted but not found, abort creation!
    if (containerSelector && !containerEl) {
      return null;
    }

    const root = document.createElement('div');
    root.className = 'pg mk';
    root.setAttribute('role', 'presentation');
    root.setAttribute('data-mascot-ignore', 'true');
    root.style.setProperty('--glow', def.glow);
    root.innerHTML = `<div class="pop out">${def.buildSvg(size)}</div>`;

    if (containerEl) {
      const compPos = window.getComputedStyle(containerEl).position;
      if (compPos === 'static') {
        containerEl.style.position = 'relative';
      }
      root.style.cssText = 'position: absolute; left: 0; top: 0; z-index: 10; pointer-events: none; will-change: transform;';
      containerEl.appendChild(root);
    } else {
      document.body.appendChild(root);
    }

    const pop = root.firstElementChild;
    const pupils = root.querySelectorAll('.p');
    const eyes = root.querySelector('.eyes');

    if (eyes && def.name !== 'ghost') {
      eyes.style.animationDelay = `-${rnd(0, 4).toFixed(2)}s`;
    }

    const state = {
      name: def.name,
      root,
      pop,
      size,
      x: 0,
      y: 0,
      cx: 0,
      cy: 0,
      startX: 0,
      startY: 0,
      destX: 0,
      destY: 0,
      startTime: 0,
      duration: 0,
      moving: false,
      visible: false,
      alive: true,
      stopSignal: false,
      blinkTimeout: null
    };

    if (def.name === 'ghost') {
      const scheduleBlink = () => {
        if (!state.alive) return;
        root.classList.add('blink');
        setTimeout(() => root.classList.remove('blink'), 120);
        state.blinkTimeout = setTimeout(scheduleBlink, rnd(1800, 5000));
      };
      scheduleBlink();
    }

    const getBounds = () => {
      if (containerEl) {
        const w = containerEl.clientWidth || containerEl.offsetWidth || 320;
        const h = containerEl.clientHeight || containerEl.offsetHeight || 300;
        const minX = config.edge;
        const maxX = Math.max(minX + 1, w - config.size - config.edge);
        const minY = config.edge + 24; // keep mascot safely below section titles
        const maxY = Math.max(minY + 1, h - config.size - config.edge - 12);
        return { minX, maxX, minY, maxY };
      }

      let minX = config.edge;
      let maxX = window.innerWidth - config.size - config.edge;
      let topOffset = config.edge;
      const minY = Math.min(topOffset, window.innerHeight - config.size - config.edge - 30);
      const maxY = Math.max(minY + 1, window.innerHeight - config.size - config.edge);
      return { minX, maxX, minY, maxY };
    };

    const spot = () => {
      const { minX, maxX, minY, maxY } = getBounds();
      return [
        rnd(minX, Math.max(minX + 1, maxX)),
        rnd(minY, Math.max(minY + 1, maxY))
      ];
    };

    const place = (nx, ny, ms = 0) => {
      root.style.transition = ms ? `transform ${ms}ms linear` : 'none';
      root.style.transform = `translate(${nx}px, ${ny}px)`;
      state.x = nx;
      state.y = ny;
      state.cx = nx + size / 2;
      state.cy = ny + size / 2;
    };

    state.place = place;
    state.getBounds = getBounds;

    const look = dir => {
      def.look(root, pupils, dir);
    };

    async function walkTo(tx, ty) {
      if (!state.alive || state.stopSignal) return;
      const dist = Math.hypot(tx - state.x, ty - state.y);
      const ms = Math.max(400, (dist / config.speed) * 1000);

      look(tx - state.x);
      state.startX = state.x;
      state.startY = state.y;
      state.destX = tx;
      state.destY = ty;
      state.startTime = performance.now();
      state.duration = ms;
      state.moving = true;

      if (prefersReduced()) {
        place(tx, ty, 0);
        state.moving = false;
        await sleep(300);
        return;
      }

      place(tx, ty, ms);
      await sleep(ms);
      state.moving = false;
      state.x = tx;
      state.y = ty;
      state.cx = tx + size / 2;
      state.cy = ty + size / 2;
      look(1);
    }

    // Wandering lifecycle
    (async function life() {
      await sleep(startDelay);
      while (state.alive && !state.stopSignal) {
        const [sx, sy] = spot();
        place(sx, sy, 0);
        look(1);
        await sleep(60);

        if (!state.alive || state.stopSignal) break;
        pop.classList.remove('out');
        state.visible = true;
        await sleep(500);

        for (let i = rint(...config.hopsBeforeVanish); i--; ) {
          if (!state.alive || state.stopSignal) break;
          await sleep(rnd(...config.pauseFor));
          if (!state.alive || state.stopSignal) break;
          const [tx, ty] = spot();
          await walkTo(tx, ty);
        }

        if (!state.alive || state.stopSignal) break;
        await sleep(rnd(...config.pauseFor));
        pop.classList.add('out');
        state.visible = false;
        await sleep(rnd(...config.hiddenFor));
      }
    })();

    return state;
  }

  /* ---------- Text Splitting & Restoration (Lazy & Reversible) ---------- */

  // Test if an element or its ancestor matches ignored containers
  function isIgnored(elem) {
    if (!elem || elem.nodeType !== Node.ELEMENT_NODE) return true;
    return !!elem.closest(
      'script, style, pre, code, textarea, input, select, svg, canvas, [contenteditable="true"], [data-mascot-ignore], .pg, .mk'
    );
  }

  function splitElementIntoLetters(element) {
    if (splitElementsMap.has(element)) return;

    // Cache original accessibility label
    if (!element.hasAttribute('aria-label')) {
      element.setAttribute('aria-label', (element.textContent || '').trim());
      element.dataset.mascotAriaSet = 'true';
    }

    // Collect eligible text nodes directly
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.parentNode || isIgnored(node.parentElement)) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let current;
    while ((current = walker.nextNode())) {
      textNodes.push(current);
    }

    const replacements = [];
    const elementLetters = [];
    let charCount = 0;

    textNodes.forEach(textNode => {
      const parent = textNode.parentNode;
      if (!parent) return;

      const rawText = textNode.nodeValue;
      if (!rawText) return;

      // Split raw text into words and whitespace
      const tokens = rawText.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      const nodeSpans = [];

      tokens.forEach(token => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          // Whitespace token preserved in-flow
          const spaceSpan = document.createElement('span');
          spaceSpan.className = 'mascot-char';
          spaceSpan.setAttribute('aria-hidden', 'true');
          spaceSpan.style.whiteSpace = 'pre';
          spaceSpan.textContent = token;
          nodeSpans.push(spaceSpan);
          frag.appendChild(spaceSpan);
        } else {
          // Word token: wrap in word span to prevent mid-word wrapping
          const wordSpan = document.createElement('span');
          wordSpan.className = 'mascot-word';
          wordSpan.setAttribute('aria-hidden', 'true');

          for (let i = 0; i < token.length; i++) {
            const ch = token[i];
            const charSpan = document.createElement('span');
            charSpan.className = 'mascot-char';
            charSpan.setAttribute('aria-hidden', 'true');
            charSpan.textContent = ch;
            wordSpan.appendChild(charSpan);
            nodeSpans.push(charSpan);
          }
          frag.appendChild(wordSpan);
        }
      });

      replacements.push({
        parent,
        origText: rawText,
        spans: nodeSpans,
        placeholder: frag.firstChild
      });

      parent.replaceChild(frag, textNode);
    });

    // Compute and cache letter centers
    element.querySelectorAll('.mascot-char').forEach(span => {
      // Exclude pure whitespace for movement to keep render lightning-fast
      if (!span.textContent.trim()) return;

      const rect = span.getBoundingClientRect();
      const letterData = {
        span,
        element,
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
        curX: 0,
        curY: 0,
        targetX: 0,
        targetY: 0,
        applied: false
      };
      elementLetters.push(letterData);
      allActiveLetters.push(letterData);
      charCount++;
    });

    totalSplitChars += charCount;
    splitElementsMap.set(element, {
      replacements,
      letters: elementLetters,
      charCount,
      lastNearTime: performance.now(),
      rect: element.getBoundingClientRect()
    });
  }

  function restoreElement(element) {
    const data = splitElementsMap.get(element);
    if (!data) return;

    // Remove letter records from active set
    const letterSet = new Set(data.letters);
    allActiveLetters = allActiveLetters.filter(l => !letterSet.has(l));
    totalSplitChars = Math.max(0, totalSplitChars - data.charCount);

    // Revert each split text node back to exact original text node
    data.replacements.forEach(rep => {
      const textNode = document.createTextNode(rep.origText);
      const firstSpan = rep.spans[0];
      if (firstSpan && firstSpan.parentNode) {
        firstSpan.parentNode.insertBefore(textNode, firstSpan);
      } else if (rep.parent) {
        rep.parent.appendChild(textNode);
      }

      rep.spans.forEach(s => {
        // Also remove word wrapper if empty
        const p = s.parentElement;
        s.remove();
        if (p && p.classList.contains('mascot-word') && !p.hasChildNodes()) {
          p.remove();
        }
      });
    });

    // Clean up accessibility label
    if (element.dataset.mascotAriaSet === 'true') {
      element.removeAttribute('aria-label');
      delete element.dataset.mascotAriaSet;
    }

    splitElementsMap.delete(element);
  }

  function restoreAllSplitElements() {
    splitElementsMap.forEach((_, elem) => {
      restoreElement(elem);
    });
    splitElementsMap.clear();
    allActiveLetters = [];
    totalSplitChars = 0;
  }

  function refreshLetterCoordinates() {
    splitElementsMap.forEach((data, elem) => {
      data.rect = elem.getBoundingClientRect();
      data.letters.forEach(letter => {
        if (letter.span.isConnected) {
          const r = letter.span.getBoundingClientRect();
          letter.cx = r.left + r.width / 2;
          letter.cy = r.top + r.height / 2;
        }
      });
    });
  }

  /* ---------- RAF Loop (Mascot Tracking + Text Push + Lerp) ---------- */
  function onFrame(now) {
    if (!isRunning) return;

    // Check prefers-reduced-motion dynamically
    const motionReduced = prefersReduced();

    // 1. Update mascot positions
    activeMascots.forEach(m => {
      if (m.moving && m.duration > 0) {
        const elapsed = now - m.startTime;
        const progress = Math.min(1, elapsed / m.duration);
        m.x = m.startX + (m.destX - m.startX) * progress;
        m.y = m.startY + (m.destY - m.startY) * progress;
        m.cx = m.x + m.size / 2;
        m.cy = m.y + m.size / 2;
        if (progress >= 1) m.moving = false;
      }
    });

    // 2. Text interaction (only if enabled, motion allowed, and mascots visible)
    if (activeConfig && activeConfig.textInteraction && !motionReduced) {
      const radius = activeConfig.radius || 28;
      const maxShift = Math.min(2, activeConfig.maxShift || 2); // Hard cap 2px

      // Proximity check on candidate elements
      targetElements.forEach(elem => {
        if (isIgnored(elem)) return;
        const rect = elem.getBoundingClientRect();

        let nearAnyMascot = false;
        activeMascots.forEach(m => {
          if (!m.visible) return;
          const clampX = Math.max(rect.left, Math.min(m.cx, rect.right));
          const clampY = Math.max(rect.top, Math.min(m.cy, rect.bottom));
          const dist = Math.hypot(m.cx - clampX, m.cy - clampY);
          if (dist <= PROXIMITY_SPLIT_RADIUS) {
            nearAnyMascot = true;
          }
        });

        if (nearAnyMascot) {
          if (!splitElementsMap.has(elem)) {
            const textLen = (elem.textContent || '').length;
            if (totalSplitChars + textLen <= MAX_SPLIT_CHARS) {
              splitElementIntoLetters(elem);
            }
          } else {
            const data = splitElementsMap.get(elem);
            if (data) data.lastNearTime = now;
          }
        }
      });

      // Calculate pushes for all active letters
      allActiveLetters.forEach(letter => {
        let pushX = 0;
        let pushY = 0;

        activeMascots.forEach(m => {
          if (!m.visible) return;
          const dx = letter.cx - m.cx;
          const dy = letter.cy - m.cy;
          const dist = Math.hypot(dx, dy);

          if (dist < radius && dist > 0.001) {
            const strength = (1 - dist / radius) * maxShift;
            pushX += (dx / dist) * strength;
            pushY += (dy / dist) * strength;
          }
        });

        // Clamp combined shift to maxShift (strictly <= 2px)
        const combinedMag = Math.hypot(pushX, pushY);
        if (combinedMag > maxShift) {
          pushX = (pushX / combinedMag) * maxShift;
          pushY = (pushY / combinedMag) * maxShift;
        }

        letter.targetX = pushX;
        letter.targetY = pushY;

        // Ease with lerp (~0.25 per frame in both directions)
        letter.curX += (letter.targetX - letter.curX) * 0.25;
        letter.curY += (letter.targetY - letter.curY) * 0.25;

        // Snap threshold to prevent lingering tiny decimals
        if (Math.abs(letter.targetX) < 0.001 && Math.abs(letter.curX) < 0.01) {
          letter.curX = 0;
        }
        if (Math.abs(letter.targetY) < 0.001 && Math.abs(letter.curY) < 0.01) {
          letter.curY = 0;
        }

        // Apply via transform only (zero layout shift)
        if (letter.curX === 0 && letter.curY === 0) {
          if (letter.applied) {
            letter.span.style.transform = '';
            letter.applied = false;
          }
        } else {
          letter.span.style.transform = `translate(${letter.curX.toFixed(2)}px, ${letter.curY.toFixed(2)}px)`;
          letter.applied = true;
        }
      });

      // Idle element restoration (no mascot near for ~1.5s and letters at 0)
      splitElementsMap.forEach((data, elem) => {
        if (now - data.lastNearTime > IDLE_RESTORE_TIME) {
          const allZero = data.letters.every(l => l.curX === 0 && l.curY === 0);
          if (allZero) {
            restoreElement(elem);
          }
        }
      });
    }

    rafId = requestAnimationFrame(onFrame);
  }

  /* ---------- Event Handlers ---------- */
  function onScrollOrResize() {
    requestAnimationFrame(() => {
      refreshLetterCoordinates();
      activeMascots.forEach(m => {
        if (!m.alive || typeof m.getBounds !== 'function') return;
        const { minX, maxX, minY, maxY } = m.getBounds();
        const clampedX = Math.max(minX, Math.min(m.x, maxX));
        const clampedY = Math.max(minY, Math.min(m.y, maxY));
        if (clampedX !== m.x || clampedY !== m.y) {
          m.place(clampedX, clampedY, 0);
        }
      });
    });
  }

  function onVisibilityChange() {
    if (document.hidden) {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    } else if (isRunning && !rafId) {
      rafId = requestAnimationFrame(onFrame);
    }
  }

  /* ---------- Public API ---------- */
  const MascotCrew = {
    start(opts = {}) {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;

      // STRICT: Mascots only run on the home page!
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      const isHomePage = currentPath === '/' || currentPath.endsWith('/index.html');
      if (!isHomePage) return;

      // Safe for SPAs & hot reload: destroy existing instance cleanly first
      if (isRunning || activeMascots.length > 0) {
        this.destroy();
      }

      ensureStyles();

      // Section assignments: Ghost -> #about, Gemini -> #stack, ChatGPT -> #projects, GitHub -> #faq
      const assignments = opts.assignments || [
        { mascot: 'ghost', container: '#about' },
        { mascot: 'gemini', container: '#stack' },
        { mascot: 'chatgpt', container: '#projects' },
        { mascot: 'github', container: '#faq' }
      ];

      activeConfig = {
        assignments,
        textInteraction: false,
        selectors: opts.selectors || 'h1, h2, h3, h4, p, li, blockquote, figcaption, a',
        radius: opts.radius || 28,
        maxShift: Math.min(2, opts.maxShift || 2),
        size: opts.size || 20,
        speed: opts.speed || 55,
        hopsBeforeVanish: opts.hopsBeforeVanish || [1, 3],
        hiddenFor: opts.hiddenFor || [2500, 7000],
        pauseFor: opts.pauseFor || [500, 1800],
        edge: opts.edge || 12
      };

      // Spawn each mascot specifically contained inside its own section
      activeMascots = activeConfig.assignments.map((item, i) =>
        createMascot(item.mascot, activeConfig, i * 400, item.container)
      ).filter(Boolean);

      // Bind scroll, resize, visibility
      window.addEventListener('scroll', onScrollOrResize, { passive: true });
      window.addEventListener('resize', onScrollOrResize, { passive: true });
      document.addEventListener('visibilitychange', onVisibilityChange);

      boundListeners = [
        () => window.removeEventListener('scroll', onScrollOrResize),
        () => window.removeEventListener('resize', onScrollOrResize),
        () => document.removeEventListener('visibilitychange', onVisibilityChange)
      ];

      isRunning = true;
      rafId = requestAnimationFrame(onFrame);
    },

    stop() {
      isRunning = false;

      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      // Mascots vanish immediately
      activeMascots.forEach(m => {
        m.stopSignal = true;
        m.visible = false;
        if (m.pop) m.pop.classList.add('out');
        if (m.blinkTimeout) clearTimeout(m.blinkTimeout);
      });

      // Restore all text nodes immediately (zero lingering spans)
      restoreAllSplitElements();
    },

    destroy() {
      this.stop();

      // Remove mascot elements from DOM
      activeMascots.forEach(m => {
        m.alive = false;
        if (m.root && m.root.parentNode) {
          m.root.parentNode.removeChild(m.root);
        }
      });
      activeMascots = [];

      // Purge any lingering mascot nodes anywhere in document
      if (typeof document !== 'undefined') {
        document.querySelectorAll('.pg.mk').forEach(el => el.remove());
      }

      // Unbind event listeners
      boundListeners.forEach(unbind => unbind());
      boundListeners = [];

      // Remove stylesheet
      removeStyles();

      targetElements = [];
      activeConfig = null;
    }
  };

  if (typeof window !== 'undefined') {
    window.MascotCrew = MascotCrew;
  }

  return MascotCrew;
});

const MascotCrewExport = typeof window !== 'undefined' && window.MascotCrew ? window.MascotCrew : undefined;
export { MascotCrewExport as MascotCrew };
export default MascotCrewExport;

