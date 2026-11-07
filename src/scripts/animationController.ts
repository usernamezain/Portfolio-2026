import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import Lenis from 'lenis';

/**
 * ZAIN ALI DEVELOPER (zainalidev)
 * Unified High-Performance Motion Controller
 * Orchestrates GSAP, Lenis, and Anime.js with zero collisions.
 */

// Global singletons to prevent memory leaks or duplicate listeners
let lenisInstance: Lenis | null = null;
let isInitialized = false;

export function initMotionSystem() {
  if (isInitialized && typeof window !== 'undefined') return;
  isInitialized = true;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  /* ==========================================================================
     1. PRELOADER & INITIALIZATION
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloader-counter');
  const barEl = document.getElementById('preloader-bar');
  const charEls = document.querySelectorAll('.p-char');

  // Preloader counter object for Anime.js interpolation
  const counterObj = { count: 0 };

  const dismissPreloader = () => {
    if (!preloader) return;
    
    // Smooth GSAP exit transition
    gsap.to(preloader, {
      opacity: 0,
      scale: 0.98,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => {
        preloader.classList.add('preloader-hidden');
        preloader.style.display = 'none';
        
        // Start Hero Entrance Animation once preloader leaves
        playHeroEntrance();
      }
    });
  };

  if (reduceMotion || !preloader) {
    if (preloader) {
      preloader.classList.add('preloader-hidden');
      preloader.style.display = 'none';
    }
    // Make sure all reveal elements are fully visible immediately
    document.querySelectorAll('[data-hero], [data-reveal]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
    });
    document.querySelectorAll('[data-rule]').forEach((el) => {
      (el as HTMLElement).style.transform = 'scaleX(1)';
    });
    return;
  }

  // Preloader animation powered by Anime.js
  const preloaderTimeline = anime.timeline({
    easing: 'easeOutExpo',
    complete: () => {
      setTimeout(dismissPreloader, 100);
    }
  });

  if (charEls.length) {
    preloaderTimeline.add({
      targets: charEls,
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(40),
      duration: 350,
      easing: 'easeOutCubic'
    }, 0);
  }

  preloaderTimeline.add({
    targets: counterObj,
    count: 100,
    duration: 800,
    easing: 'easeInOutQuad',
    update: () => {
      const val = Math.round(counterObj.count);
      if (counterEl) counterEl.textContent = val < 10 ? `0${val}%` : `${val}%`;
      if (barEl) barEl.style.width = `${val}%`;
    }
  }, 50);

  // Fallback safety timeout: Preloader will never trap the user
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('preloader-hidden')) {
      dismissPreloader();
    }
  }, 2000);

  /* ==========================================================================
     2. LENIS + GSAP COEXISTENCE (Single unified RAF loop)
     ========================================================================== */
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  ScrollTrigger.config({ ignoreMobileResize: true });

  lenisInstance = new Lenis({
    autoRaf: false,
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false, // native smooth inertia on touch devices
    wheelMultiplier: 1.0,
  });

  // Synchronize Lenis scroll positions with ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // GSAP Ticker drives Lenis (No dual RAF loops = 0 collisions)
  gsap.ticker.add((time: number) => {
    lenisInstance?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* ==========================================================================
     3. SMOOTH ANCHOR NAVIGATION
     ========================================================================== */
  const navHeight = 60;
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      if (href === '#top') {
        lenisInstance?.scrollTo(0, { duration: 1.0 });
      } else {
        lenisInstance?.scrollTo(target as HTMLElement, {
          offset: -navHeight,
          duration: 1.0,
        });
      }
      history.pushState(null, '', href);
    });
  });

  /* ==========================================================================
     4. READING PROGRESS BAR
     ========================================================================== */
  const progressBar = document.querySelector('.progress-bar') as HTMLElement | null;
  if (progressBar) {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressBar.style.transform = `scaleX(${self.progress.toFixed(4)})`;
      },
    });
  }

  /* ==========================================================================
     5. BLUR-IN TYPOGRAPHY & SCROLL REVEALS
     ========================================================================== */
  const TEXT_SELECTORS = 'h1,h2,h3,p,.mono,.post-tag,.chip,.link,.btn';

  function splitWords(el: Element): HTMLElement[] {
    const words: HTMLElement[] = [];
    const walk = (node: Node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          const text = n.textContent || '';
          text.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
              return;
            }
            const s = document.createElement('span');
            s.className = 'w';
            s.textContent = part;
            frag.appendChild(s);
            words.push(s);
          });
          n.parentNode?.replaceChild(frag, n);
        } else if (
          n.nodeType === 1 &&
          (n as HTMLElement).getAttribute('aria-hidden') !== 'true' &&
          (n as HTMLElement).tagName.toLowerCase() !== 'svg'
        ) {
          walk(n);
        }
      });
    };
    walk(el);
    return words;
  }

  function prepareElement(item: Element): HTMLElement[] {
    const targets = item.matches(TEXT_SELECTORS)
      ? [item]
      : Array.from(item.querySelectorAll(TEXT_SELECTORS));
    const processed: Element[] = [];
    let words: HTMLElement[] = [];

    targets.forEach((el) => {
      if (processed.some((d) => d.contains(el))) return;
      processed.push(el);

      if (/(^|\s)(btn|chip|link)(\s|$)/.test(el.className)) {
        Array.from(el.childNodes).forEach((n) => {
          if (n.nodeType === 3 && n.textContent?.trim()) {
            const wrap = document.createElement('span');
            n.parentNode?.replaceChild(wrap, n);
            wrap.appendChild(n);
          }
        });
      }
      words = words.concat(splitWords(el));
    });

    gsap.set(item, { opacity: 0 });
    gsap.set(words, { opacity: 0 });
    return words;
  }

  const blurAmount = isTouchDevice ? 'blur(3px)' : 'blur(5px)';

  function playReveal(item: Element, words: HTMLElement[], delay = 0) {
    gsap.to(item, {
      opacity: 1,
      duration: 0.4,
      ease: 'power1.out',
      delay,
    });

    if (words.length > 0) {
      gsap.fromTo(
        words,
        { opacity: 0, filter: blurAmount },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power2.out',
          stagger: Math.min(0.025, 0.5 / words.length),
          delay,
          immediateRender: false,
          force3D: false,
          onComplete: () => {
            gsap.set(words, { clearProps: 'filter' });
          },
        }
      );
    }
  }

  function playHeroEntrance() {
    const heroItems = document.querySelectorAll('[data-hero]');
    heroItems.forEach((item, index) => {
      const words = prepareElement(item);
      playReveal(item, words, 0.05 + index * 0.12);
    });
  }

  // Batch ScrollTrigger for section items
  const pendingWordsMap = new Map<Element, HTMLElement[]>();
  document.querySelectorAll('[data-reveal]').forEach((item) => {
    pendingWordsMap.set(item, prepareElement(item));
  });

  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      batch.forEach((item, i) => {
        const words = pendingWordsMap.get(item) || [];
        playReveal(item, words, i * 0.07);
      });
    },
  });

  // Dividers scaleX drawing animation
  gsap.set('[data-rule]', { scaleX: 0 });
  ScrollTrigger.batch('[data-rule]', {
    start: 'top 92%',
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        scaleX: 1,
        duration: 0.65,
        ease: 'power2.out',
        overwrite: true,
      });
    },
  });

  /* ==========================================================================
     6. ACTIVE NAV LINK TRACKING
     ========================================================================== */
  const navLinksMap: Record<string, HTMLElement> = {};
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      navLinksMap[href] = link as HTMLElement;
    }
  });

  Object.entries(navLinksMap).forEach(([id, linkEl]) => {
    const section = document.querySelector(id);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) {
          Object.values(navLinksMap).forEach((el) => el.removeAttribute('aria-current'));
          linkEl.setAttribute('aria-current', 'true');
        } else {
          linkEl.removeAttribute('aria-current');
        }
      },
    });
  });

  /* ==========================================================================
     7. ANIME.JS INTERACTIVE MICRO-PHYSICS (Zero Collision)
     Scoped specifically to user interactions (hover, click) without touching scroll.
     ========================================================================== */
  // Interactive chips / badges subtle elasticity
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('mouseenter', () => {
      anime({
        targets: chip,
        translateY: -2,
        scale: 1.02,
        duration: 250,
        easing: 'easeOutElastic(1, .8)',
      });
    });
    chip.addEventListener('mouseleave', () => {
      anime({
        targets: chip,
        translateY: 0,
        scale: 1.0,
        duration: 200,
        easing: 'easeOutQuad',
      });
    });
  });

  // Project cards interactive lift
  document.querySelectorAll('.project-card').forEach((card) => {
    const arrow = card.querySelector('.card-arrow');
    card.addEventListener('mouseenter', () => {
      if (arrow) {
        anime({
          targets: arrow,
          translateX: 3,
          translateY: -3,
          duration: 220,
          easing: 'easeOutQuad',
        });
      }
    });
    card.addEventListener('mouseleave', () => {
      if (arrow) {
        anime({
          targets: arrow,
          translateX: 0,
          translateY: 0,
          duration: 180,
          easing: 'easeOutQuad',
        });
      }
    });
  });

  /* ==========================================================================
     8. FAQ ACCORDION WITH BUTTERY SMOOTH EXPANSION & BLUR-IN TYPOGRAPHY
     ========================================================================== */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const trigger = item.querySelector('.faq-question') as HTMLButtonElement | null;
    const collapse = item.querySelector('.faq-answer-collapse') as HTMLElement | null;
    const inner = item.querySelector('.faq-answer-inner') as HTMLElement | null;
    const textEl = item.querySelector('.faq-text') as HTMLElement | null;
    const icon = item.querySelector('.faq-chevron') as HTMLElement | null;

    if (!trigger || !collapse || !inner || !textEl) return;

    let isBusy = false;

    trigger.addEventListener('click', () => {
      if (isBusy) return;
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      if (!isExpanded) {
        // OPENING FAQ ACCORDION SMOOTHLY
        isBusy = true;
        trigger.setAttribute('aria-expanded', 'true');

        // Reveal panel to calculate natural height
        collapse.style.display = 'block';
        collapse.style.height = 'auto';
        const targetHeight = inner.offsetHeight;
        collapse.style.height = '0px';

        // Rotate Chevron Icon with spring feel
        if (icon) {
          gsap.to(icon, {
            rotate: 180,
            duration: 0.4,
            ease: 'back.out(1.6)',
          });
        }

        // Smooth Height Expansion (synchronized with Lenis)
        gsap.to(collapse, {
          height: targetHeight,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          onUpdate: () => {
            lenisInstance?.resize();
          },
          onComplete: () => {
            collapse.style.height = 'auto';
            isBusy = false;
            ScrollTrigger.refresh();
            lenisInstance?.resize();
          },
        });

        // Buttery Smooth Text Blur-In Animation
        gsap.fromTo(
          textEl,
          {
            opacity: 0,
            filter: 'blur(10px)',
            y: 10,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.5,
            delay: 0.08,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(textEl, { clearProps: 'filter' });
            },
          }
        );
      } else {
        // CLOSING FAQ ACCORDION SMOOTHLY
        isBusy = true;
        trigger.setAttribute('aria-expanded', 'false');

        // Lock starting height
        collapse.style.height = `${collapse.offsetHeight}px`;

        // Rotate Chevron Icon Back
        if (icon) {
          gsap.to(icon, {
            rotate: 0,
            duration: 0.35,
            ease: 'power2.out',
          });
        }

        // Smooth text blur-out
        gsap.to(textEl, {
          opacity: 0,
          filter: 'blur(6px)',
          y: -6,
          duration: 0.25,
          ease: 'power2.in',
        });

        // Smooth Height Collapse
        gsap.to(collapse, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.inOut',
          onUpdate: () => {
            lenisInstance?.resize();
          },
          onComplete: () => {
            collapse.style.display = 'none';
            gsap.set(textEl, { clearProps: 'all' });
            isBusy = false;
            ScrollTrigger.refresh();
            lenisInstance?.resize();
          },
        });
      }
    });
  });

  // Refresh triggers on font load
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
      lenisInstance?.resize();
    });
  }

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
    lenisInstance?.resize();
  });
}

/**
 * Fast Dark/Light Theme Switcher
 * Zero FOUC, updates documentElement attribute and persists to localStorage.
 */
export function initThemeToggle() {
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  function updateAriaLabel() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    themeBtn?.setAttribute(
      'aria-label',
      isDark ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  themeBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch (e) {
      // Storage access blocked or restricted
    }
    updateAriaLabel();
  });

  updateAriaLabel();
}

