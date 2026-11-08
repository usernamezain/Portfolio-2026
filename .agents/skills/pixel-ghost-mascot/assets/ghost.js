/* ---------- settings ---------- */
const CONFIG = {
  size: 20,                 // px (width = height)
  body: '#ff3b3b',
  eye: '#ffffff',
  pupil: '#2a5cff',
  speed: 55,                // px per second while walking
  hopsBeforeVanish: [1, 3], // walks before it disappears
  hiddenFor: [2500, 7000],  // ms invisible
  pauseFor: [500, 1800],    // ms standing still between walks
  edge: 12                  // keep this far from viewport edges
};

/**
 * Initializes the pixel ghost mascot.
 * Returns a cleanup / destroy function that stops timers, removes event listeners,
 * and removes the DOM element so SPAs (Astro, Next.js, React, Vue, Vite) can unmount it.
 *
 * @param {Partial<typeof CONFIG>} [userConfig] Optional configuration overrides.
 * @returns {() => void} Cleanup function to stop animation and unmount mascot.
 */
function initPixelGhost(userConfig = {}) {
  // Avoid creating duplicate ghosts on hot reload or route change
  if (typeof window !== 'undefined' && window.__pixelGhostCleanup) {
    window.__pixelGhostCleanup();
  }

  // Merge runtime configuration
  const cfg = Object.assign({}, CONFIG, userConfig);

  let isAlive = true;
  let blinkTimeoutA = null;
  let blinkTimeoutB = null;
  const sleepTimers = new Set();

  /* ---------- pixel art (14x14 grid) ---------- */
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
    '##############',
  ];
  const FEET_A = ['## ## ## ## ##', '## ## ## ## ##'];
  const FEET_B = [' ## ## ## ## #', ' ## ## ## ## #'];

  const rects = (rows, y0, fill) => {
    let out = '';
    rows.forEach((row, i) => {
      let x = 0;
      while (x < row.length) {
        if (row[x] !== '#') { x++; continue; }
        let w = 0;
        while (row[x + w] === '#') w++;
        out += `<rect x="${x}" y="${y0 + i}" width="${w}" height="1" fill="${fill}"/>`;
        x += w;
      }
    });
    return out;
  };

  const eyeShape = x => `<rect x="${x + 1}" y="3" width="2" height="5"/><rect x="${x}" y="4" width="4" height="3"/>`;

  const svg = `
    <svg viewBox="0 0 14 14" width="${cfg.size}" height="${cfg.size}" aria-hidden="true">
      ${rects(BODY, 0, cfg.body)}
      <g class="fa">${rects(FEET_A, 12, cfg.body)}</g>
      <g class="fb">${rects(FEET_B, 12, cfg.body)}</g>
      <g class="eyes" fill="${cfg.eye}">${eyeShape(2)}${eyeShape(8)}</g>
      <g fill="${cfg.pupil}" id="pg-pupils">
        <rect class="p" x="2" y="5" width="2" height="2"/>
        <rect class="p" x="8" y="5" width="2" height="2"/>
      </g>
    </svg>`;

  /* ---------- build DOM ---------- */
  const root = document.createElement('div');
  root.className = 'pg';
  root.setAttribute('role', 'presentation');
  root.innerHTML = `<div class="pg-pop out">${svg}</div>`;
  document.body.appendChild(root);
  const pop = root.firstElementChild;
  const pupils = root.querySelectorAll('.p');

  /* ---------- helpers ---------- */
  const rnd = (a, b) => a + Math.random() * (b - a);
  const rint = (a, b) => Math.floor(rnd(a, b + 1));
  const sleep = ms => new Promise(r => {
    if (!isAlive) return r();
    const t = setTimeout(() => {
      sleepTimers.delete(t);
      r();
    }, ms);
    sleepTimers.add(t);
  });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let x = 0, y = 0;

  const place = (nx, ny, ms = 0) => {
    if (!isAlive) return;
    root.style.transition = ms ? `transform ${ms}ms linear` : 'none';
    root.style.transform = `translate(${nx}px, ${ny}px)`;
    x = nx; y = ny;
  };
  const randomSpot = () => {
    const e = cfg.edge, s = cfg.size;
    return [
      rnd(e, Math.max(e + 1, innerWidth - s - e)),
      rnd(e, Math.max(e + 1, innerHeight - s - e))
    ];
  };
  const look = dir => {               // -1 left, 0 centre, 1 right
    if (!isAlive) return;
    const dx = dir < 0 ? 0 : dir > 0 ? 2 : 1;
    pupils[0].setAttribute('x', 2 + (dx));
    pupils[1].setAttribute('x', 8 + (dx));
  };
  const lookY = up => {
    if (!isAlive) return;
    pupils.forEach(p => p.setAttribute('y', up ? 4 : 5));
  };

  /* random blinking */
  (function blink() {
    if (!isAlive) return;
    root.classList.add('blink');
    blinkTimeoutA = setTimeout(() => {
      if (!isAlive) return;
      root.classList.remove('blink');
    }, 120);
    blinkTimeoutB = setTimeout(blink, rnd(1800, 5000));
  })();

  /* ---------- behaviour loop ---------- */
  async function walkTo(tx, ty) {
    if (!isAlive) return;
    const dist = Math.hypot(tx - x, ty - y);
    const ms = Math.max(400, (dist / cfg.speed) * 1000);
    look(tx - x);
    lookY(ty < y - 20);
    if (reduce) { place(tx, ty); await sleep(300); return; }
    place(tx, ty, ms);
    await sleep(ms);
    if (!isAlive) return;
    look(0); lookY(false);
  }

  async function life() {
    while (isAlive) {
      // appear somewhere new
      const [sx, sy] = randomSpot();
      place(sx, sy);
      look(0);
      await sleep(60);
      if (!isAlive) break;
      pop.classList.remove('out');
      await sleep(500);

      // wander a few times
      const hops = rint(...cfg.hopsBeforeVanish);
      for (let i = 0; i < hops && isAlive; i++) {
        await sleep(rnd(...cfg.pauseFor));
        if (!isAlive) break;
        const [tx, ty] = randomSpot();
        await walkTo(tx, ty);
      }
      await sleep(rnd(...cfg.pauseFor));
      if (!isAlive) break;

      // vanish
      pop.classList.add('out');
      await sleep(rnd(...cfg.hiddenFor));
    }
  }

  // keep it inside the viewport if the window shrinks
  const onResize = () => {
    if (!isAlive) return;
    const [mx, my] = [innerWidth - cfg.size - cfg.edge, innerHeight - cfg.size - cfg.edge];
    if (x > mx || y > my) place(Math.min(x, mx), Math.min(y, my));
  };
  addEventListener('resize', onResize);

  life();

  /* ---------- cleanup / destroy function ---------- */
  function destroy() {
    isAlive = false;
    clearTimeout(blinkTimeoutA);
    clearTimeout(blinkTimeoutB);
    sleepTimers.forEach(t => clearTimeout(t));
    sleepTimers.clear();
    removeEventListener('resize', onResize);
    if (root && root.parentNode) {
      root.parentNode.removeChild(root);
    }
    if (typeof window !== 'undefined' && window.__pixelGhostCleanup === destroy) {
      delete window.__pixelGhostCleanup;
    }
  }

  if (typeof window !== 'undefined') {
    window.__pixelGhostCleanup = destroy;
  }

  return destroy;
}

// Auto-run when dropped into plain HTML via a regular <script> tag
if (typeof window !== 'undefined') {
  window.initPixelGhost = initPixelGhost;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPixelGhost());
  } else {
    initPixelGhost();
  }
}
