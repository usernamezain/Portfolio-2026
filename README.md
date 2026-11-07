# Zain Ali Developer (`zainalidev`) — High-Performance Portfolio

> **Speed #1 Optimized Creative Developer Portfolio** built with **Astro 5**, **GSAP**, **Anime.js**, and **Lenis**.
> Engineered for 100/100 Core Web Vitals, zero layout shift (CLS: 0), zero animation library collisions, and aggressive SEO optimization to rank **#1** for `"Zain Ali Developer"`, `"zainalidev"`, `"who is zainalidev"`, `"who si zainalidev"`, and `"who is zain ali mughal dev"`.

---

## ⚡ Performance & Architecture Highlights

1. **#1 Speed Optimization & Instant Paints**:
   - Built on **Astro 5** with zero unnecessary client hydration.
   - **Inlined Critical CSS**: Styles are bundled and delivered in `<head>` to prevent render-blocking stylesheets.
   - **Zero FOUC Theme Guard**: Inline execution in `<head>` applies dark/light mode before the first pixel renders.
   - **Zero-JS SVG Icons**: Inline SVG components with 1.5 stroke width, eliminating icon fonts or external icon library runtime overhead.

2. **Collision-Free Unified Motion System**:
   - **Lenis**: Virtual smooth scrolling with normalized touch inertia.
   - **GSAP 3 + ScrollTrigger**: Directly drives the central animation ticker and synchronizes Lenis with `gsap.ticker.add((time) => lenis.raf(time * 1000))` and `ScrollTrigger.update`. Single RAF loop ensures 0 CPU thrashing and accurate scroll triggers.
   - **Anime.js 3**: Scoped specifically to micro-interactions, elastic hover physics, preloader counter timelines, and FAQ accordion transitions without conflicting with GSAP's scroll coordinates.
   - **Adaptive Blur-in Typography**: GPU-accelerated word reveals with automatic property cleanup (`clearProps: 'filter'`) on completion to keep scrolling lightweight.

3. **High-Tech Preloader**:
   - Futuristic `[zainalidev]` terminal initialization.
   - High-precision numerical counter (`00% -> 100%`) and glowing laser progress track driven by Anime.js.
   - Graceful GSAP exit curtain that seamlessly hands off to the Hero section.
   - Full accessibility fallback and reduced-motion bypass (`prefers-reduced-motion: reduce`).

4. **SEO #1 Dominance & Semantic Architecture**:
   - **Target Primary Keywords**:
     - `"Zain Ali Developer"` / `"Zain Ali Develoepr"` (common typo capture)
     - `"zainalidev"`
     - `"who is zainalidev"` / `"who si zainalidev"`
     - `"who is zain ali mughal dev"`
     - `"Zain Ali Mughal"`
   - **Multi-Schema JSON-LD Graph**:
     - `Person` schema with aliases, job title, social handles (GitHub, LinkedIn, Instagram, WhatsApp), and skill taxonomy.
     - `WebSite` schema with canonical author linkage.
     - `ProfilePage` schema.
     - `FAQPage` schema explicitly answering "Who is zainalidev?" and related queries to capture Google Knowledge Panels & Featured Snippets.
   - **Automated Sitemap & Robots.txt**:
     - Generated with `@astrojs/sitemap` at `sitemap-index.xml`.
     - `robots.txt` granting full crawler access.

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/)
- **Motion & Scroll**: [GSAP 3](https://greensock.com/gsap/), [ScrollTrigger](https://greensock.com/scrolltrigger/), [Lenis](https://lenis.darkroom.engineering/)
- **Micro-Interactions**: [Anime.js](https://animejs.com/)
- **Typography**: [Manrope](https://fonts.google.com/specimen/Manrope), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Icons**: Custom SVG components matching Lucide 1.5 stroke specs
- **SEO & Sitemaps**: `@astrojs/sitemap`, Open Graph, Twitter Cards, Schema.org JSON-LD

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` (tested on Node `v25.2.1`)
- npm `v9+`

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
# Starts local development server at http://localhost:4321
```

### Production Build
```bash
npm run build
# Compiles static site into /dist with bundled chunks and sitemap
```

### Preview Production Build
```bash
npm run preview
# Serves the compiled /dist folder locally
```

---

## 📂 Project Structure

```text
Personal-Portfolio/
├── public/
│   ├── favicon.svg          # Custom ZM SVG favicon
│   ├── og-image.svg         # Open Graph social preview banner
│   └── robots.txt           # Crawler instructions & sitemap link
├── src/
│   ├── components/
│   │   ├── About.astro      # Developer bio, philosophy & languages
│   │   ├── Blog.astro       # Technical guides & notes
│   │   ├── Contact.astro    # Social links & WhatsApp community
│   │   ├── Experience.astro # Career milestones & engineering history
│   │   ├── FaqKnowledge.astro# Interactive FAQ targeting search queries
│   │   ├── Footer.astro     # Copyright & back-to-top anchor
│   │   ├── Header.astro     # Sticky nav & dark/light theme switch
│   │   ├── Hero.astro       # Lede, available pill & primary CTAs
│   │   ├── Icon.astro       # Lightweight 0-JS SVG icon engine
│   │   ├── Preloader.astro  # Futuristic terminal loader
│   │   ├── Projects.astro   # Selected works with external links
│   │   ├── SEO.astro        # Meta tags, OpenGraph & JSON-LD schemas
│   │   └── TechStack.astro  # Skill chips with Anime.js elasticity
│   ├── data/
│   │   ├── portfolio.ts     # Central portfolio content & projects
│   │   └── seo.ts           # SEO keywords, schema graph generator
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML layout, FOUC guard, scripts
│   ├── pages/
│   │   └── index.astro      # Main single-page portfolio
│   ├── scripts/
│   │   └── animationController.ts # Unified GSAP + Lenis + Anime.js logic
│   └── styles/
│       └── global.css       # Token system, 4px grid & responsive styles
├── astro.config.mjs         # Astro configuration & sitemap integration
├── package.json             # Scripts & dependencies
└── tsconfig.json            # Strict TypeScript configuration
```

---

## 📄 License
MIT © [Zain Ali Mughal](https://zainalidev.com)
