import type { ImageMetadata } from 'astro';

// Project image mockups and screenshots
import sadiaHeroImg from '../assets/images/projects/sadia-graphics-hero.png';
import fluxImg from '../assets/images/projects/flux.png';
import aversanosImg from '../assets/images/projects/aversanos-restaurant.jpg';
import zestImg from '../assets/images/projects/zest-app.png';
import ultimateEmpireImg from '../assets/images/projects/ultimate-empire.svg';
import nrnMediaImg from '../assets/images/projects/nrn-media.png';
import kitchenEcommerceImg from '../assets/images/projects/kitchen-ecommerce.svg';
import neoBrutalistImg from '../assets/images/projects/neo-brutilisam.png';
import mughalDevImg from '../assets/images/projects/mughal-dev.svg';
import vibespaceImg from '../assets/images/projects/vibespace-3d.svg';
import textDrawingCanvasImg from '../assets/images/projects/draw-text-canvas.png';
import flowerCanvasImg from '../assets/images/projects/flower-canvas.png';
import wallFlyImg from '../assets/images/projects/oroject-wallpeprs-app.png';
import frogerMemeImg from '../assets/images/projects/meme-gen-app.png';
import scatterDotsImg from '../assets/images/projects/scatter-dots-canvas.svg';

import pixelatedPortfolioImg from '../assets/images/projects/pixelated-portfolio.png';
import ayeshaPortfolioImg from '../assets/images/projects/ayesha-portfolio.png';
import zainNextjsPortfolioImg from '../assets/images/projects/zain-nextjs-portfolio.jpg';
import quirkGithubImg from '../assets/images/projects/quirk-github.jpg';
import terminalManagerImg from '../assets/images/projects/terminal-manager.png';
import vibeInspectorImg from '../assets/images/projects/vibe-inspector.png';
import aniSkillsImg from '../assets/images/projects/ani-skills.png';
import pookieBotImg from '../assets/images/projects/pookie-bot.png';
import eGitImg from '../assets/images/projects/e-git-zain.svg';
import stackRayImg from '../assets/images/projects/stack-ray.png';
import devpulseImg from '../assets/images/projects/devpulse-extension.svg';
import omnichatImg from '../assets/images/projects/omnichat-ai.svg';
import fastcliImg from '../assets/images/projects/fastcli-scaffold.svg';
import gokuCcImg from '../assets/images/projects/goku-cc.jpg';

export interface ProjectGalleryItem {
  title: string;
  caption: string;
  image: ImageMetadata;
}

export interface ProjectTechnicalSpec {
  framework: string;
  motionEngine?: string;
  scrollEngine?: string;
  styling: string;
  optimization: string;
  performanceScore?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  url: string;
  githubUrl?: string;
  image: ImageMetadata;
  gallery?: ProjectGalleryItem[];
  category: 'Creative Projects' | 'Open Source Projects';
  stats?: string;
  year?: string;
  client?: string;
  role?: string;
  timeline?: string;
  overview?: string;
  specs?: ProjectTechnicalSpec;
  keyFeatures?: string[];
  highlight?: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface TechCategory {
  title: string;
  skills: { name: string; icon: string }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const portfolioData = {
  name: "Zain Ali",
  fullName: "Zain Ali Mughal",
  handle: "zainalidev",
  title: "Full Stack Developer & Creative Technologist",
  tagline: "Engineering high-converting web applications, custom Chrome extensions, developer tools, and motion-rich WebGL experiences.",
  bio: [
    "I'm Zain Ali (widely known as zainalidev), a Full Stack Developer with 7+ years of hands-on experience building end-to-end software, custom developer tools, Chrome extensions, and high-performance web applications.",
    "My engineering stack spans full-stack JavaScript and TypeScript ecosystems: React, Next.js, and Astro on the frontend; Node.js, Express, and Prisma on the backend; relational and NoSQL databases (MongoDB, PostgreSQL, MySQL, Supabase, Neon); desktop apps with Electron and Tauri; plus high-fidelity motion (GSAP, Anime.js, Framer Motion) and 3D WebGL (Three.js).",
    "I actively leverage modern AI-assisted workflows (Cursor, Lovable, Antigravity IDE, Claude, ChatGPT) to prototype, optimize, and ship production software with exceptional speed, stability, and polish. Open for freelance contracts and full-stack software development worldwide."
  ],
  contact: {
    email: "devmughal8@gmail.com",
    github: "https://github.com/usernamezain",
    linkedin: "https://www.linkedin.com/in/zainali-mughal",
  },
  techCategories: [
    {
      title: "01 Frontend Technologies",
      skills: [
        { name: "React", icon: "atom" },
        { name: "Next.js", icon: "layout-template" },
        { name: "TypeScript", icon: "file-code" },
        { name: "JavaScript", icon: "braces" },
        { name: "HTML5", icon: "code" },
        { name: "CSS3", icon: "palette" },
        { name: "Tailwind CSS", icon: "wind" },
        { name: "Bootstrap", icon: "layers" },
        { name: "Astro", icon: "zap" },
        { name: "Vite", icon: "zap" },
      ],
    },
    {
      title: "02 Motion & Animation Systems",
      skills: [
        { name: "GSAP", icon: "activity" },
        { name: "ScrollTrigger", icon: "scroll-text" },
        { name: "Lenis", icon: "move-vertical" },
        { name: "Anime.js", icon: "play" },
        { name: "Framer Motion", icon: "film" },
        { name: "CSS Keyframes", icon: "sparkles" },
        { name: "SVG Animation", icon: "bezier" },
        { name: "Canvas 2D API", icon: "palette" },
      ],
    },
    {
      title: "03 3D & WebGL Graphics",
      skills: [
        { name: "Three.js", icon: "box" },
        { name: "React Three Fiber", icon: "boxes" },
        { name: "GLSL Shaders", icon: "cpu" },
        { name: "WebGL", icon: "sun" },
        { name: "3D Particle Systems", icon: "sparkles" },
      ],
    },
    {
      title: "04 Backend & Databases",
      skills: [
        { name: "Node.js", icon: "server" },
        { name: "Express", icon: "cpu" },
        { name: "MongoDB", icon: "database" },
        { name: "PostgreSQL", icon: "database" },
        { name: "MySQL", icon: "database" },
        { name: "Prisma", icon: "layers" },
        { name: "Supabase", icon: "zap" },
        { name: "Neon", icon: "database" },
        { name: "REST APIs", icon: "workflow" },
        { name: "WebSockets", icon: "radio" },
      ],
    },
    {
      title: "05 CMS & Headless Platforms",
      skills: [
        { name: "WordPress", icon: "globe" },
        { name: "WooCommerce", icon: "shopping-cart" },
        { name: "Custom WP Themes", icon: "layout-template" },
        { name: "Headless WordPress", icon: "code" },
        { name: "Shopify", icon: "shopping-bag" },
      ],
    },
    {
      title: "06 Desktop Apps, Extensions & Tools",
      skills: [
        { name: "Electron.js", icon: "box" },
        { name: "Chrome Extensions", icon: "puzzle" },
        { name: "Discord.js", icon: "bot" },
        { name: "CLI Development", icon: "terminal" },
      ],
    },
    {
      title: "07 AI-Assisted Development",
      skills: [
        { name: "Cursor AI", icon: "bot" },
        { name: "Lovable", icon: "sparkles" },
        { name: "Antigravity IDE", icon: "zap" },
        { name: "Kiro AI", icon: "bot" },
        { name: "Trae AI", icon: "bot" },
        { name: "ChatGPT", icon: "bot" },
        { name: "Claude", icon: "bot" },
        { name: "Gemini", icon: "sparkles" },
        { name: "v0.dev", icon: "code" },
        { name: "Bolt.new", icon: "zap" },
        { name: "Replit Agent", icon: "terminal" },
        { name: "Copilot", icon: "bot" },
        { name: "Phind", icon: "search" },
        { name: "Grok", icon: "bot" },
        { name: "Devin", icon: "bot" },
        { name: "Windsurf", icon: "wind" },
      ],
    },
  ],
  projects: [
    // -------------------------------------------------------------
    // CREATIVE PROJECTS (UI/UX, Client Platforms, Frontend Art)
    // -------------------------------------------------------------
    {
      slug: "sadia-graphics",
      title: "Sadia Aqeel — Brand Identity & Design Studio",
      subtitle: "Bespoke creative design portfolio engineered with an SVG loading ceremony, Lenis inertia kinematics, and zero-hydration Astro architecture.",
      description: "Expressive visual brand identity portfolio website engineered with Astro.js, Lenis smooth scrolling, kinetic GSAP timelines, and SVG animations designed to captivate luxury brand clients.",
      tags: ["Astro.js", "GSAP", "Lenis", "ScrollTrigger", "Tailwind CSS", "SVG Animation", "Open Source"],
      url: "https://sadia-graphics.vercel.app/",
      githubUrl: "https://github.com/usernamezain/Sadia-Aqeel-Portfolio",
      image: sadiaHeroImg,
      category: "Creative Projects",
      stats: "99/100 CWV · Sub-400ms FCP",
      year: "2026",
      client: "Sadia Aqeel (Visual Brand Identity Specialist)",
      role: "Lead Creative Frontend Architect",
      timeline: "3 Weeks",
      overview: "When elite brand identity designers seek corporate clients, static templates fail. We engineered this high-performance platform for Sadia Aqeel to transform passive visitors into paying brand clients through cognitive motion pacing, zero-friction Lenis inertia, and surgical typography hierarchy.",
      specs: {
        framework: "Astro.js (Static Site Generation with zero unnecessary JS hydration)",
        motionEngine: "GSAP 3 Core + ScrollTrigger (Hardware-accelerated matrix transforms)",
        scrollEngine: "Lenis (Unified inertia momentum normalized across macOS, iOS, Windows, Android)",
        styling: "Tailwind CSS + Custom Scoped CSS Architecture",
        optimization: "Next-gen SVG optimization, preconnect font pipelines, sub-second TTFB",
        performanceScore: "99/100 Mobile · 100/100 Desktop Google PageSpeed"
      },
      keyFeatures: [
        "Bespoke SVG loading ceremony with kinetic brand typography reveals",
        "Butter-smooth Lenis inertial scrolling running synchronously on a single RAF loop",
        "Interactive ScrollTrigger animations that react to the reader's exact scroll velocity",
        "Asymmetric case study grid with tactile hover physics and visual depth",
        "Lightweight, ultra-optimized asset pipeline with zero cumulative layout shift",
        "High-converting contact section with frictionless client intake paths"
      ],
      highlight: true,
    },
    {
      slug: "flux-app",
      title: "Flux — Realtime Project Management Platform",
      subtitle: "High-performance collaborative project management workspace engineered with a Supabase PostgreSQL backend, live WebSockets synchronization, and TailAdmin UI.",
      description: "Collaborative project management application built for internal engineering workflows. Features a Supabase PostgreSQL backend, live WebSockets data streaming, TailAdmin dashboard UI, interactive sprint tracking, and role-based permissions.",
      tags: ["React", "Supabase", "WebSockets", "Tailwind CSS", "PostgreSQL", "TailAdmin"],
      url: "https://pm-flux.vercel.app/",
      image: fluxImg,
      category: "Creative Projects",
      stats: "Live WebSockets · Supabase",
      year: "2026",
      client: "MughalDev0 Team Collaboration",
      role: "Co-Founder & Full Stack Architect",
      timeline: "4 Weeks",
      overview: "Flux is a high-velocity project management platform engineered to coordinate agile sprints, track open tasks, and monitor team velocity in real time. Powered by a robust Supabase backend with PostgreSQL and live WebSockets synchronization, Flux delivers instantaneous updates across active team members with zero polling overhead.",
      specs: {
        framework: "React + Vite (Optimized client state caching and fast render tree updates)",
        motionEngine: "Tailwind CSS hardware transitions and interactive drawer states",
        scrollEngine: "Native virtualized dashboard list scroll",
        styling: "Tailwind CSS + TailAdmin design system with responsive aesthetics",
        optimization: "Live bi-directional WebSockets streaming, sub-second query response, optimistic updates",
        performanceScore: "Sub-50ms WebSocket Broadcast Latency"
      },
      keyFeatures: [
        "Bi-directional WebSocket streaming for instant collaborative task and board updates",
        "Supabase backend with PostgreSQL data modeling and secure Row-Level Security (RLS)",
        "Comprehensive sprint dashboard: open tasks, completion velocity, and overdue metrics",
        "Interactive Kanban task boards with fluid drag-and-drop state transitions",
        "Multi-tenant organization settings with granular role-based access control (RBAC)",
        "Quick search command palette (Cmd+K) for rapid workspace navigation"
      ],
      highlight: true,
    },
    {
      slug: "aversano-italian-restaurant",
      title: "Aversano's Italian Restaurant & Bar",
      subtitle: "Bespoke hospitality web experience featuring interactive menu architecture, table reservations, and an AI dining concierge.",
      description: "Client hospitality web platform crafted for Aversano's Italian Restaurant. Features responsive menu exploration, banquet inquiries, table reservations, and an integrated Groq Llama 3.3 AI dining host.",
      tags: ["Astro", "Tailwind CSS", "GSAP", "AI Agent", "Groq Llama 3.3", "Hospitality"],
      url: "https://aversano.vercel.app/",
      image: aversanosImg,
      category: "Creative Projects",
      stats: "Commercial Dining · AI Host",
      year: "2025",
      client: "Aversano's Italian Dining & Historic Bar",
      role: "Lead Frontend Engineer & AI Integrator",
      timeline: "3 Weeks",
      overview: "A high-converting digital storefront and reservation engine engineered for Aversano's Italian Restaurant in Sumner, WA. Combines luxury culinary typography, responsive food menus, event banquet booking workflows, and an instant AI dining host answering dish and seating queries 24/7.",
      specs: {
        framework: "Astro + Zero-JS Island Architecture",
        motionEngine: "GSAP 3 hardware animations and smooth micro-interactions",
        scrollEngine: "Smooth native momentum scroll",
        styling: "Tailwind CSS with rich dark hospitality palette and custom typography",
        optimization: "Self-hosted font preloads, sub-350ms FCP, 100/100 Core Web Vitals",
        performanceScore: "99/100 Core Web Vitals"
      },
      keyFeatures: [
        "Interactive food and beverage menu directory with allergen and takeout filters",
        "Autonomous AI dining concierge powered by Groq Llama 3.3 answering menu and table queries",
        "Banquet hall inquiry pipeline and event reservation forms",
        "Rich local SEO geo-tagging and structured schema for Google Maps 3-pack visibility",
        "Sub-second page speeds engineered with Astro zero-runtime overhead"
      ],
      highlight: false,
    },
    {
      slug: "zest-keyboard-app",
      title: "Zest — Keyboard Automation Desktop App",
      subtitle: "Turn any 2-key combo into a direct system command that launches apps, executes scripts, or types text snippets instantly.",
      description: "Desktop shortcut automation suite built with Electron and React to solve context switching. Features visual keyboard mapping, multi-action macro chaining, script triggers, and sub-10ms hotkey dispatch.",
      tags: ["Electron", "React", "Node.js", "Desktop App", "Windows API", "Productivity"],
      url: "https://zest-soon.vercel.app/",
      image: zestImg,
      category: "Creative Projects",
      stats: "Electron Desktop · v1.0.0",
      year: "2026",
      client: "Zest Productivity Labs",
      role: "Creator & Full Stack Desktop Engineer",
      timeline: "4 Weeks",
      overview: "Zest is a lightweight desktop automation suite engineered to eliminate repetitive context switching. By binding custom multi-step actions to arbitrary two-key chords, users can launch IDEs, trigger PowerShell/Bash scripts, open URLs, and automate workspace setups in milliseconds.",
      specs: {
        framework: "Electron + React (Hardware-accelerated desktop UI)",
        motionEngine: "Tailwind CSS + CSS Keyframes",
        scrollEngine: "Native virtualized shortcuts directory",
        styling: "High-contrast neon green & obsidian dark desktop UI",
        optimization: "Native OS global hotkey hooks with zero idle CPU overhead",
        performanceScore: "Sub-10ms Hotkey Execution Latency"
      },
      keyFeatures: [
        "Visual interactive keyboard matrix for single and dual-key chord binding",
        "Multi-action chaining: launch apps, trigger shell scripts, and open URLs simultaneously",
        "Configurable micro-delays between chained macro operations",
        "Categorized shortcut folders and instant fuzzy search drawer",
        "Minimal system footprint running silently in the Windows system tray"
      ],
      highlight: false,
    },
    {
      slug: "ultimate-empire",
      title: "Ultimate Empire",
      subtitle: "Commercial web platform for social media growth education featuring high-converting funnel mechanics and kinetic typography.",
      description: "Commercial web platform for social media growth education featuring high-converting funnel mechanics, kinetic typography, and sub-second load times.",
      tags: ["React", "GSAP", "Lenis", "Tailwind CSS"],
      url: "https://www.ultimate-empire.online/",
      githubUrl: "https://github.com/usernamezain/ultimate-empire",
      image: ultimateEmpireImg,
      category: "Creative Projects",
      stats: "100/100 CWV",
      year: "2025",
      client: "Ultimate Empire Education",
      role: "Full Stack Engineer & Performance Specialist",
      timeline: "4 Weeks",
      overview: "A flagship commercial platform built for digital course delivery and social media growth acceleration. Designed to maximize conversion rates with sub-second page transitions, dynamic enrollment funnels, and frictionless mobile interactions.",
      specs: {
        framework: "React 18 + Vite (Optimized client bundle with code splitting)",
        motionEngine: "GSAP 3 + ScrollTrigger for scroll-synchronized timelines",
        scrollEngine: "Lenis smooth scrolling",
        styling: "Tailwind CSS with responsive dark palette",
        optimization: "Aggressive SVG compression and critical CSS inlining",
        performanceScore: "100/100 Core Web Vitals"
      },
      keyFeatures: [
        "Kinetic hero typography with dynamic stats ticker",
        "Streamlined enrollment checkout pipeline",
        "Lenis smooth inertia scrolling across all viewports",
        "Modular syllabus and course breakdown tabs"
      ],
      highlight: false,
    },
    {
      slug: "nrn-media",
      title: "NRN Media — Personal Brand Scaling Engine",
      subtitle: "High-status commercial client platform transforming personal founder brands into high-velocity 10x sales and lead engines.",
      description: "High-converting digital client platform engineered for NRN Media. Features responsive kinetic typography, social proof review carousels, discovery call booking pipelines, and sub-second load times.",
      tags: ["React", "GSAP", "Tailwind CSS", "Client Work", "Conversion Rate", "High Status UI"],
      url: "https://nrnmedia.com",
      image: nrnMediaImg,
      category: "Creative Projects",
      stats: "Commercial Client · Sub-400ms",
      year: "2025",
      client: "NRN Media Agency",
      role: "Lead Frontend Engineer & Performance Architect",
      timeline: "3 Weeks",
      overview: "Engineered to position executive founders and personal brands for maximum authority and high-ticket lead conversion. Features high-contrast dark visual pacing, fluid GSAP scroll interactions, and integrated scheduling funnels.",
      highlight: false,
    },
    {
      slug: "kitchen-accessories-ecommerce",
      title: "Alan — Kitchen Accessories E-Commerce Experience",
      subtitle: "Lightweight, responsive boutique culinary shop featuring hand-crafted UI/UX, smooth product carousels, and quick-cart drawer.",
      description: "Modern, handcrafted e-commerce storefront crafted for culinary accessories and artisan cookware. Built with pure HTML5, CSS3, and JavaScript, featuring responsive product filtering, quick-view modals, and zero framework bloat.",
      tags: ["HTML5", "CSS3", "JavaScript", "E-Commerce", "UI/UX Design", "Open Source"],
      url: "https://usernamezain.github.io/Ecomerece-Kitchen-Assesories-Ui-Ux/",
      githubUrl: "https://github.com/usernamezain/Ecomerece-Kitchen-Assesories-Ui-Ux",
      image: kitchenEcommerceImg,
      category: "Creative Projects",
      stats: "Pure Vanilla · Zero Bloat",
      year: "2024",
      client: "Culinary Retail Showcase",
      role: "UI/UX Designer & Frontend Engineer",
      timeline: "2 Weeks",
      overview: "A lightweight, hyper-fast e-commerce shopping interface showcasing responsive catalog layouts, interactive image galleries, and smooth shopping cart checkout interactions engineered in pure standard web technologies.",
      highlight: false,
    },
    {
      slug: "neo-brutalist-portfolio",
      title: "Neo-Brutalist Interactive Portfolio",
      subtitle: "Raw, playful scrapbook-style neo-brutalist developer portfolio featuring an interactive Leaflet.js journey map, retro terminal mode, and p5.js Snake game.",
      description: "Scrapbook-style neo-brutalist portfolio crafted with raw vanilla HTML5, CSS3, and JavaScript. Features interactive Leaflet.js journey mapping, retro terminal mode with p5.js Snake game, and physics-driven micro-interactions.",
      tags: ["HTML5", "CSS3", "JavaScript", "Leaflet.js", "p5.js", "Neo-Brutalism"],
      url: "https://zain-dev-seven.vercel.app/",
      githubUrl: "https://github.com/usernamezain/Neo-Brutalist-Portfolio",
      image: neoBrutalistImg,
      category: "Creative Projects",
      stats: "Raw Vanilla · 60 FPS",
      year: "2025",
      client: "Zain Ali Personal Showcase",
      role: "Lead Creative Frontend Architect",
      timeline: "2 Weeks",
      overview: "An experimental neo-brutalist personal showcase rejecting sterile minimalist templates in favor of high-contrast tactile scrapbook aesthetics. Engineered entirely in pure vanilla web standards without heavy frameworks, integrating dynamic Leaflet.js map journeys, an interactive retro terminal console, and an embedded p5.js arcade engine.",
      specs: {
        framework: "Vanilla HTML5 + Modern ES6+ JavaScript (Zero framework overhead)",
        motionEngine: "Vanilla CSS3 Keyframe Kinematics + Custom Physics Easing",
        scrollEngine: "Native high-performance hardware-accelerated scroll",
        styling: "Hand-crafted Neo-Brutalist CSS (Bold borders, stark drop shadows, vibrant accents)",
        optimization: "Zero third-party runtime bundles, async script streaming, sub-250ms LCP",
        performanceScore: "99/100 Core Web Vitals"
      },
      keyFeatures: [
        "Interactive Leaflet.js journey map with geo-located career milestones",
        "Retro CLI terminal overlay with custom shell commands and ASCII easter eggs",
        "Embedded p5.js classic retro Snake arcade game",
        "Tactile neo-brutalist sticker hover states and physics-based button offsets",
        "Pure vanilla architecture delivering near-instant page boot"
      ],
      highlight: false,
    },
    {
      slug: "mughal-dev-3d",
      title: "Mughal.Dev 3D Studio",
      subtitle: "Interactive creative engineering portfolio featuring WebGL GLSL shaders, orbital physics, and silky 60fps transitions.",
      description: "Interactive creative engineering portfolio featuring WebGL GLSL shaders, orbital physics, dynamic lighting, and silky 60fps transitions.",
      tags: ["React", "Three.js", "GSAP", "WebGL"],
      url: "https://mughal-dev-web-portfolio.vercel.app/",
      githubUrl: "https://github.com/usernamezain/mughal-dev-web-portfolio",
      image: mughalDevImg,
      category: "Creative Projects",
      stats: "60 FPS 3D",
      year: "2025",
      client: "Mughal.Dev Showcase",
      role: "Creative 3D Technologist",
      timeline: "3 Weeks",
      overview: "An experimental creative engineering showcase built to demonstrate high-performance 3D graphics in the browser. Features real-time particle simulation, custom fragment and vertex shaders, and interactive camera choreographies.",
      specs: {
        framework: "React + React Three Fiber + Three.js",
        motionEngine: "GSAP for camera timeline choreographies",
        scrollEngine: "Native passive scroll with WebGL buffer sync",
        styling: "Tailwind CSS + Custom GLSL Shaders",
        optimization: "Frustum culling, instanced meshes, and shader buffer re-use",
        performanceScore: "60 FPS WebGL Runtime"
      },
      keyFeatures: [
        "Real-time orbital 3D particle physics system",
        "Custom GLSL fragment shaders with reactive lighting",
        "Sub-second asset streaming and progressive canvas boot",
        "Responsive canvas scaling with high-DPI display calibration"
      ],
      highlight: false,
    },
    {
      slug: "vibespace-3d",
      title: "VibeSpace 3D Audio Visualizer",
      subtitle: "Interactive WebGL audio spatial experience processing real-time FFT frequencies with orbiting shader particles.",
      description: "Interactive WebGL audio spatial experience processing real-time FFT frequencies with orbiting shader particles and GSAP camera choreography.",
      tags: ["Three.js", "WebGL", "GLSL Shaders", "Web Audio API"],
      url: "https://vibespace-3d.vercel.app/",
      githubUrl: "https://github.com/usernamezain/vibespace-3d",
      image: vibespaceImg,
      category: "Creative Projects",
      stats: "WebGL Shaders · 60 FPS",
      year: "2026",
      client: "Creative Audio Lab",
      role: "Lead Creative Technologist",
      timeline: "2 Weeks",
      overview: "An immersive audio-reactive 3D playground that taps into the Web Audio API FFT analyzer to drive thousands of GPU particle instanced transforms in real-time.",
      specs: {
        framework: "Three.js + Vanilla WebGL",
        motionEngine: "Custom GLSL vertex shader displacement + GSAP camera controls",
        scrollEngine: "Pointer drag spatial orbit",
        styling: "Minimalist CSS UI overlay",
        optimization: "InstancedBufferGeometry for rendering 50,000+ audio particles at 60fps",
        performanceScore: "60 FPS Stable"
      },
      keyFeatures: [
        "Hardware-accelerated Web Audio API FFT spectrum analyzer",
        "Vertex shader frequency displacement mapping",
        "Orbital camera motion physics with velocity damping"
      ],
      highlight: false,
    },
    {
      slug: "text-drawing-canvas",
      title: "Text Drawing Canvas — Kinetic Typography Playground",
      subtitle: "Interactive HTML5 Canvas generative drawing tool creating organic dynamic typography trails in real time.",
      description: "Pure vanilla HTML5 Canvas 2D experiments exploring kinetic mouse-driven text paths. Generates proportional dynamic lettering with randomized angular velocity, stroke scaling, and physics easing.",
      tags: ["Canvas 2D", "JavaScript", "Generative Art", "Kinetic Type", "Open Source"],
      url: "https://usernamezain.github.io/Text-Drawing-Canvas/",
      githubUrl: "https://github.com/usernamezain/Text-Drawing-Canvas",
      image: textDrawingCanvasImg,
      category: "Creative Projects",
      stats: "Canvas 2D · 60 FPS",
      year: "2024",
      client: "Creative Code Experiment",
      role: "Creative Technologist",
      timeline: "1 Week",
      overview: "A generative browser canvas that treats text as fluid geometric brushstrokes. As the user drags across the screen, characters size and lean according to mouse acceleration and vector angle.",
      highlight: false,
    },
    {
      slug: "flower-canvas",
      title: "Flower Canvas — Generative Botanical Simulation",
      subtitle: "Interactive HTML5 canvas generative flora simulator blooming organic watercolour petals on click and hover.",
      description: "Algorithmic generative garden simulation rendered in HTML5 Canvas 2D. Generates dynamic organic flower stems, soft watercolour petal blurs, and interactive wind drift physics on pointer interaction.",
      tags: ["Canvas 2D", "JavaScript", "Generative Art", "Physics Simulation", "Open Source"],
      url: "https://usernamezain.github.io/Flower-Canvas/",
      githubUrl: "https://github.com/usernamezain/Flower-Canvas",
      image: flowerCanvasImg,
      category: "Creative Projects",
      stats: "Generative Art · 60 FPS",
      year: "2024",
      client: "Creative Code Experiment",
      role: "Creative Technologist",
      timeline: "1 Week",
      overview: "An ambient digital canvas demonstrating natural procedural growth algorithms. Each click triggers recursive stem branching and harmonic petal dispersion with soft motion blur aesthetics.",
      highlight: false,
    },
    {
      slug: "wallfly-wallpaper-hub",
      title: "WallFly — Interactive HD Wallpaper Hub",
      subtitle: "Curated anime and gaming digital wallpaper showcase with instant full-resolution preview and one-click downloads.",
      description: "Dark-themed digital wallpaper gallery crafted with vanilla web standards. Features high-res art asset prefetching, smooth pagination, responsive dark aesthetic, and instant local asset downloads.",
      tags: ["HTML5", "CSS3", "JavaScript", "Media Showcase", "Open Source"],
      url: "https://usernamezain.github.io/Wallpaper/",
      githubUrl: "https://github.com/usernamezain/Wallpaper",
      image: wallFlyImg,
      category: "Creative Projects",
      stats: "Interactive Hub · Fast Load",
      year: "2024",
      client: "Personal Showcase",
      role: "Frontend Engineer",
      timeline: "1 Week",
      overview: "A fast, lightweight multimedia viewer crafted during early web animation explorations. Designed with bold high-contrast buttons, responsive aspect ratio calibration, and smooth asset streaming.",
      highlight: false,
    },
    {
      slug: "froger-meme-generator",
      title: "Froger.dev — Canvas Meme Generator & Image Compositor",
      subtitle: "In-browser meme creation suite with local file uploading, URL image fetching, and custom typography rasterization.",
      description: "Interactive browser canvas meme generator built with pure vanilla JavaScript. Supports local image uploads, remote URL inputs, dynamic top/bottom caption rendering, resolution scaling, and instant PNG downloads.",
      tags: ["JavaScript", "HTML5 Canvas", "Image Processing", "Web App", "Open Source"],
      url: "https://usernamezain.github.io/Froger.dev/",
      githubUrl: "https://github.com/usernamezain/Froger.dev",
      image: frogerMemeImg,
      category: "Creative Projects",
      stats: "Canvas Compositor · Fast Export",
      year: "2024",
      client: "Web Utility Lab",
      role: "Frontend Engineer",
      timeline: "1 Week",
      overview: "A client-side image compositor that renders meme typography directly onto HTML5 canvas surfaces with adjustable font resolutions and zero external server dependencies.",
      highlight: false,
    },
    {
      slug: "scatter-dots-canvas",
      title: "Shape Shifter — Kinetic Particle Morphing Engine",
      subtitle: "Physics-driven HTML5 Canvas particle engine morphing thousands of floating dots into text, countdowns, and icons.",
      description: "Mathematical HTML5 Canvas particle simulation recreating the Shape Shifter experiment. Features real-time dot dispersal, keyboard command parsing (#countdown, #time, #rectangle), and deep link URL sharing (`?a=query`).",
      tags: ["Canvas 2D", "JavaScript", "Math & Physics", "Particle Simulation", "Open Source"],
      url: "https://usernamezain.github.io/Scatter-Dots-Canvas/",
      githubUrl: "https://github.com/usernamezain/Scatter-Dots-Canvas",
      image: scatterDotsImg,
      category: "Creative Projects",
      stats: "Particle Engine · URL Sharing",
      year: "2024",
      client: "Creative Engineering Study",
      role: "Creative Technologist",
      timeline: "2 Weeks",
      overview: "An algorithmic particle system where thousands of autonomous coordinates calculate vector paths to reconstruct geometric shapes, live clock digits, and custom typography on demand.",
      highlight: false,
    },
    {
      slug: "goku-cc-portfolio",
      title: "Goku CC — Creative 3D Developer Portfolio",
      subtitle: "Immersive 3D creative engineering showcase featuring Next.js 14, React Three Fiber, WebGL GLSL plasma shaders, and kinetic GSAP motion.",
      description: "Experimental creative 3D developer showcase engineered with Next.js 14, Three.js, and React Three Fiber. Features custom WebGL plasma shaders, electrical particle sparks, GSAP ScrollTrigger timeline choreography, and Lenis smooth scrolling.",
      tags: ["Next.js 14", "Three.js", "React Three Fiber", "GLSL Shaders", "GSAP", "Lenis", "Open Source"],
      url: "https://github.com/mughaldev0/Goku-CC-Creative-Developer-Portfolio",
      githubUrl: "https://github.com/mughaldev0/Goku-CC-Creative-Developer-Portfolio",
      image: gokuCcImg,
      category: "Creative Projects",
      stats: "Next.js 14 · R3F 3D",
      year: "2025",
      client: "Creative Engineering Showcase",
      role: "Lead Creative 3D Technologist",
      timeline: "3 Weeks",
      overview: "An anime-inspired creative developer portfolio pushing browser graphics to the bleeding edge. Combines interactive React Three Fiber 3D models with custom GLSL flame auras, smooth Lenis inertial scroll synchronization, and high-contrast editorial typography.",
      specs: {
        framework: "Next.js 14 App Router + React 18",
        motionEngine: "GSAP 3 Core + ScrollTrigger (Pinned horizontal gallery & split-text)",
        scrollEngine: "Lenis Smooth Scroll synchronized with RAF render ticker",
        styling: "Tailwind CSS with high-contrast monochrome and cobalt blue palette",
        optimization: "Frustum culling, progressive blur overlays, and sub-second asset hydration",
        performanceScore: "60 FPS WebGL Runtime"
      },
      keyFeatures: [
        "Interactive React Three Fiber 3D character canvas with dynamic stage lighting",
        "Custom WebGL GLSL fragment shaders simulating plasma flame aura effects",
        "Pinned horizontal scroll gallery and multi-directional GSAP menu drawer",
        "Layered gradual blur overlays creating cinematic optical depth",
        "Open-source repository free for developers under the MIT license"
      ],
      highlight: false,
    },

    // -------------------------------------------------------------
    // OPEN SOURCE PROJECTS (Developer Tools, CLIs, Extensions, Libraries)
    // -------------------------------------------------------------
    {
      slug: "pixelated-portfolio",
      title: "Pixelated Retro Matrix Portfolio",
      subtitle: "Monochromatic retro-futuristic developer showcase featuring 120fps HTML5 Canvas magnetic grid warping, GSAP animations, and text scramble decoding.",
      description: "Monochromatic retro-futuristic portfolio engineered with Astro 4, React 18, and GSAP 3. Features a 120fps magnetic grid canvas, text scramble decoders, virus cell menu overlay, and MIT-licensed open-source architecture.",
      tags: ["Astro", "React", "GSAP 3", "Canvas 2D", "Open Source", "Pixel Art"],
      url: "https://pixelated-portfolio-iota.vercel.app/",
      githubUrl: "https://github.com/usernamezain/Pixelated-Portfolio",
      image: pixelatedPortfolioImg,
      category: "Open Source Projects",
      stats: "Astro 4 · Open Source",
      year: "2025",
      client: "Open Source Community",
      role: "Lead Creative Architect",
      timeline: "3 Weeks",
      overview: "An open-source retro-futuristic developer matrix built around a strict monochromatic high-contrast design system. Features mathematical quadratic curve grid warping responding to mouse coordinates, GSAP 3 scroll-triggered card reveals, and an interactive 34px virus menu overlay.",
      specs: {
        framework: "Astro 4 + React 18 (Static generation with interactive islands)",
        motionEngine: "GSAP 3 + ScrollTrigger (Scrubbed scroll physics and matrix decoders)",
        scrollEngine: "Lenis Smooth Scroll",
        styling: "Vanilla CSS + Google Fonts Press Start 2P & Space Mono",
        optimization: "120fps hardware-accelerated 2D canvas with quadratic curve distortion",
        performanceScore: "100/100 Lighthouse Performance"
      },
      keyFeatures: [
        "160px Canvas Grid with magnetic mouse warping and quadratic curve distortion",
        "Dynamic text scramble decoder running randomized glyph substitution loops",
        "34px virus cell infection navigation overlay with top-left to bottom-right traversal",
        "Scrubbed GSAP ScrollTrigger project reveals synchronized 1-to-1 with scroll progress",
        "Completely open source and free for the developer community under MIT license"
      ],
      highlight: false,
    },
    {
      slug: "ayesha-developer-portfolio",
      title: "Ayesha — Editorial WordPress Developer Portfolio",
      subtitle: "Editorial developer portfolio engineered with massive oversized typography, GSAP ScrollTrigger depth-peel card stack, and an interactive Three.js constellation.",
      description: "Bespoke editorial client portfolio designed and engineered for Ayesha. Features massive headline typography, scroll-pinned GSAP depth-peel card reveals, Three.js ambient background effects, and open-source architecture.",
      tags: ["GSAP", "ScrollTrigger", "Three.js", "WordPress", "Open Source", "Editorial UI"],
      url: "https://ayeshoo-chuzi.vercel.app/",
      githubUrl: "https://github.com/usernamezain/wordpress-portfolio",
      image: ayeshaPortfolioImg,
      category: "Open Source Projects",
      stats: "GSAP · Open Source",
      year: "2025",
      client: "Ayesha (WordPress Specialist)",
      role: "Design Director & Creative Frontend Architect",
      timeline: "2 Weeks",
      overview: "An editorial showcase rejecting sterile developer templates. Built around bold, condensed, oversized headline typography ('I engineer WORDPRESS'), scroll-scrubbed card stacks, and a force-directed Three.js constellation web.",
      specs: {
        framework: "HTML5 + Modern ES6+ JavaScript",
        motionEngine: "GSAP 3 Core + ScrollTrigger (Pinned card depth-peel & scrubbed masks)",
        scrollEngine: "Smooth native momentum scroll with left-edge progress indicator",
        styling: "Vanilla CSS with fully tokenized light/dark theme switching",
        optimization: "Optimized SVG iconography, zero layout shift, responsive touch handling",
        performanceScore: "98/100 Core Web Vitals"
      },
      keyFeatures: [
        "Oversized mixed-weight headline typography with masked text reveals",
        "Pinned GSAP ScrollTrigger depth-peel card stack on desktop",
        "Interactive Three.js ambient particle constellation reactive to mouse velocity",
        "Magnetic marquee-style full-screen navigation menu",
        "Fully open-source template available for developers under MIT license"
      ],
      highlight: false,
    },
    {
      slug: "zain-nextjs-portfolio",
      title: "Zain Ali Mughal — Dark Motion Portfolio",
      subtitle: "Production developer showcase engineered with Next.js, GSAP ScrollTrigger, Lenis smooth scrolling, and Anime.js micro-interactions.",
      description: "Flagship dark portfolio engineered with Next.js, GSAP ScrollTrigger, Lenis smooth scrolling, and Anime.js. Features interactive cards, kinetic typography, multi-language internationalization, and MIT open-source architecture.",
      tags: ["Next.js", "GSAP", "ScrollTrigger", "Lenis", "Anime.js", "Open Source"],
      url: "https://zain-mughal-brown.vercel.app/en",
      githubUrl: "https://github.com/usernamezain/Portfolio",
      image: zainNextjsPortfolioImg,
      category: "Open Source Projects",
      stats: "Next.js · Open Source",
      year: "2025",
      client: "Zain Ali Mughal Showcase",
      role: "Full Stack Creative Architect",
      timeline: "3 Weeks",
      overview: "A high-fidelity dark-mode portfolio built with Next.js and kinetic animation libraries. Showcases full-stack engineering achievements through interactive Bento card choreography, Lenis inertial scrolling, and fluid GSAP timelines.",
      specs: {
        framework: "Next.js + React (Server-side rendering and client route prefetching)",
        motionEngine: "GSAP 3 Core + ScrollTrigger + Anime.js micro-physics",
        scrollEngine: "Lenis Smooth Inertial Scroll",
        styling: "Tailwind CSS with obsidian dark theme and starry particles",
        optimization: "Dynamic code-splitting, WebP asset streaming, zero layout shift",
        performanceScore: "99/100 Core Web Vitals"
      },
      keyFeatures: [
        "Lenis synchronized inertial scrolling integrated with GSAP ScrollTrigger",
        "Anime.js micro-interactions for tactile button responses and particle accents",
        "Multi-language internationalization routing (/en, /ur)",
        "Responsive media cards showcasing full-stack client deliverables",
        "Open source and freely available under the MIT license"
      ],
      highlight: false,
    },
    {
      slug: "quirk-github",
      title: "Quirk GitHub — Search Query Maker & Dork Builder",
      subtitle: "Advanced GitHub code search engine and security query builder designed to audit repositories for exposed secrets, API keys, and pipeline credentials.",
      description: "Advanced GitHub code search and security dork builder engineered with Astro and TypeScript. Helps security engineers and developers audit public repositories for leaked API tokens, database URIs, and exposed pipeline credentials before they get indexed.",
      tags: ["Astro", "TypeScript", "Tailwind CSS", "Security Tool", "GitHub API", "DevOps"],
      url: "https://quirk-github.vercel.app/",
      image: quirkGithubImg,
      category: "Open Source Projects",
      stats: "Security Scanner · v1.2",
      year: "2026",
      client: "Developer Security Community",
      role: "Lead Tools Engineer & Security Architect",
      timeline: "3 Weeks",
      overview: "Quirk GitHub is a precision search query synthesizer designed to audit code hygiene and identify exposed secrets before malicious actors can exploit them. Features target-locked organizational searches, global secret signature filters (OpenAI, AWS, Stripe, MongoDB), and one-click Gitleaks TOML export.",
      specs: {
        framework: "Astro v7 + TypeScript (Zero-JS static speed with interactive builder console)",
        motionEngine: "Tailwind CSS transitions",
        scrollEngine: "Native clean scroll",
        styling: "Geist & Geist Mono typography with warm dot-matrix terminal aesthetics",
        optimization: "Instant client-side query synthesis with zero network latency",
        performanceScore: "100/100 Core Web Vitals"
      },
      keyFeatures: [
        "Visual search query builder with target scope locking (User, Org, or Global)",
        "Pre-configured signature library for scanning API keys, OAuth tokens, and database URIs",
        "Instant Gitleaks TOML export for automated CI/CD pipeline code audits",
        "Safe and ethical security guidelines integrated directly into the builder flow",
        "Zero server-side retention: all query compilation runs locally in the browser"
      ],
      highlight: false,
    },
    {
      slug: "terminal-manager",
      title: "Terminal Manager — GPU Terminal & AI Agent Workspace",
      subtitle: "GPU-accelerated terminal workspace, AI agents hub, and shell automation environment engineered for Windows, macOS, and Linux.",
      description: "Cross-platform GPU-accelerated terminal workspace and autonomous AI agent execution environment. Features multi-split tabs, hardware-rendered ANSI buffers, shell workflow automation, and background task orchestrators.",
      tags: ["Electron", "Node.js", "TypeScript", "GPU Acceleration", "AI Agents", "Open Source"],
      url: "https://github.com/usernamezain/Terminal-Manager",
      githubUrl: "https://github.com/usernamezain/Terminal-Manager",
      image: terminalManagerImg,
      category: "Open Source Projects",
      stats: "GPU Accelerated · v0.1.0",
      year: "2026",
      client: "Developer Open Source",
      role: "Lead Systems Architect",
      timeline: "4 Weeks",
      overview: "An advanced terminal environment engineered to replace legacy command prompts with GPU-accelerated rendering and integrated AI agent workspaces. Provides developers with multi-shell sessions, custom keybindings, and automated background script watchers.",
      highlight: false,
    },
    {
      slug: "vibe-inspector",
      title: "Vibe Inspector — Live UI Inspector & AI Agent Sync",
      subtitle: "Click any element in Chrome, tweak it visually with live preview, and your AI assistant receives the exact element, source location, and annotations.",
      description: "Manifest V3 Chrome extension and Model Context Protocol (MCP) bridge. Enables developers to click any live web element, tweak CSS in real time, and automatically sync source locations and annotated code diffs directly back to AI coding agents.",
      tags: ["Chrome Extension", "Manifest V3", "TypeScript", "MCP Standard", "AI Tooling", "Open Source"],
      url: "https://github.com/usernamezain/vibe-inspector",
      githubUrl: "https://github.com/usernamezain/vibe-inspector",
      image: vibeInspectorImg,
      category: "Open Source Projects",
      stats: "Manifest V3 · MCP",
      year: "2026",
      client: "AI Developer Ecosystem",
      role: "Lead Extension Architect",
      timeline: "3 Weeks",
      overview: "Built to bridge visual browser inspections with agentic AI coding. Rather than manually copying CSS classes or guessing DOM hierarchies, Vibe Inspector packages live styles, viewport dimensions, and component source references into structured MCP contexts.",
      highlight: false,
    },
    {
      slug: "ani-skills",
      title: "ani-skills — The Ultimate AI Agent Skills Library",
      subtitle: "Over 3,048 production AI agent skills spanning 29 semantic namespaces across 8 frontier AI coding assistants.",
      description: "Official npm package and expansive open-source repository comprising 3,000+ battle-tested AI agent instructions, workflows, and skills. Fully compatible with Antigravity, Cursor, Claude, Lovable, ChatGPT, and Gemini.",
      tags: ["npm Package", "TypeScript", "AI Agents", "MCP", "Developer Tool", "Open Source"],
      url: "https://www.npmjs.com/package/ani-skills",
      githubUrl: "https://github.com/usernamezain/ANI-Skills",
      image: aniSkillsImg,
      category: "Open Source Projects",
      stats: "3,048+ Skills · v2.2.1 npm",
      year: "2026",
      client: "Global AI Developer Community",
      role: "Creator & Maintainer",
      timeline: "Ongoing",
      overview: "A monolithic, structured repository of production agent skills covering everything from full-stack Next.js scaffolding and database optimization to shader mathematics and security audits. Published on npm as `ani-skills`.",
      highlight: true,
    },
    {
      slug: "pookie-bot",
      title: "Pookie Bot — WhatsApp Automation Engine",
      subtitle: "High-performance modular WhatsApp automation bot built with Node.js and Baileys with 8-digit pairing code authentication.",
      description: "Modular WhatsApp automation bot engineered with Node.js and @whiskeysockets/baileys. Features 8-digit phone pairing authentication (no QR code required), anti-delete message recovery, media download utilities, and custom plugin architectures.",
      tags: ["Node.js", "Baileys", "WebSockets", "Automation", "Bot", "Open Source"],
      url: "https://github.com/usernamezain/Pookie-Bot",
      githubUrl: "https://github.com/usernamezain/Pookie-Bot",
      image: pookieBotImg,
      category: "Open Source Projects",
      stats: "Baileys v6.6 · Node.js 18+",
      year: "2025",
      client: "Open Source Community",
      role: "Lead Bot Engineer",
      timeline: "3 Weeks",
      overview: "A multi-device WhatsApp automation server engineered to handle high-frequency group messaging, automated media processing, and command routing using persistent state stores and lightweight VPS deployments.",
      highlight: false,
    },
    {
      slug: "e-git-zain",
      title: "e-git — All-in-One Git & GitHub Automation CLI",
      subtitle: "The terminal GitHub companion. Single-command stage, commit, and push with built-in secret scanning, TUI dashboard, and push time travel.",
      description: "Official global npm CLI tool (`e-git-zain`) unifying everyday git commands. Automatically scans for exposed API keys across 13 credential patterns, runs pre-push verification tests, manages PRs/Issues via an interactive TUI, and features push undo/redo time travel.",
      tags: ["npm Package", "Node.js", "CLI Tooling", "Git Automation", "Security Scanner", "Open Source"],
      url: "https://www.npmjs.com/package/e-git-zain",
      githubUrl: "https://github.com/usernamezain/e-git-zain",
      image: eGitImg,
      category: "Open Source Projects",
      stats: "33 Tests Pass · v4.0.2 npm",
      year: "2026",
      client: "Global Developer Community",
      role: "Author & Lead CLI Engineer",
      timeline: "Ongoing",
      overview: "Published on npm as `e-git-zain` and installed with `npm i -g e-git-zain`. Eliminates repetitive terminal commands with a single automated workflow (`e-git 'feat: message'`), pre-push secret shields, and interactive TUI branch/stash managers.",
      highlight: false,
    },
    {
      slug: "stack-ray",
      title: "StackRay — Site Profiler & Local AI Analyst",
      subtitle: "Premium high-contrast Manifest V3 Chrome Extension providing 15 visual inspection panels and local Gemini Nano summaries.",
      description: "Manifest V3 site profiling and design system analysis extension. Features 15 specialized panels detecting 15+ tech stack categories, DOM parameters, network timings, social card simulations, and on-device Gemini Nano AI summaries.",
      tags: ["Chrome Extension", "Manifest V3", "Gemini Nano", "TypeScript", "DevTools", "Open Source"],
      url: "https://github.com/usernamezain/Stack-Ray",
      githubUrl: "https://github.com/usernamezain/Stack-Ray",
      image: stackRayImg,
      category: "Open Source Projects",
      stats: "15 Profiling Panels · Manifest V3",
      year: "2026",
      client: "Web Developers & Security Researchers",
      role: "Lead Extension Architect",
      timeline: "4 Weeks",
      overview: "An all-in-one in-browser site profiler built to inspect any website's underlying frameworks, CDN signatures, CSS design tokens, and runtime network health without sending data to external third parties.",
      highlight: true,
    },
    {
      slug: "devpulse-extension",
      title: "DevPulse Pro Chrome Extension",
      subtitle: "Manifest V3 developer analytics extension providing inline pull-request merge velocity and commit heatmaps in GitHub & GitLab.",
      description: "Manifest V3 developer analytics extension providing inline pull-request merge velocity, commit density heatmaps, and Core Web Vitals audits directly inside GitHub & GitLab.",
      tags: ["Chrome Extension", "TypeScript", "Manifest V3", "Tailwind"],
      url: "https://github.com/usernamezain/devpulse-extension",
      githubUrl: "https://github.com/usernamezain/devpulse-extension",
      image: devpulseImg,
      category: "Open Source Projects",
      stats: "Manifest V3 · Open Source",
      year: "2026",
      client: "Open Source Developer Community",
      role: "Lead Extension Architect",
      timeline: "Ongoing",
      overview: "DevPulse Pro is an open-source Manifest V3 Chrome extension designed to streamline code review velocity. It injects non-blocking HUD overlays into GitHub PR pages to track review cycle times, automated linting bottlenecks, and commit density.",
      specs: {
        framework: "Chrome Extensions API (Manifest V3)",
        motionEngine: "Tailwind CSS hardware transitions",
        scrollEngine: "Non-blocking shadow DOM injection",
        styling: "Tailwind CSS with isolated Shadow DOM styling",
        optimization: "Event-driven background service worker with zero persistent idle memory",
        performanceScore: "Under 8ms content script injection latency"
      },
      keyFeatures: [
        "Manifest V3 compliant with event-driven background service workers",
        "Shadow DOM encapsulation preventing CSS contamination on GitHub",
        "Real-time PR merge velocity metrics and commit density heatmaps",
        "Direct export of sprint code velocity charts to Markdown and CSV"
      ],
      highlight: false,
    },
    {
      slug: "omnichat-ai",
      title: "OmniChat AI Multi-Agent Studio",
      subtitle: "Real-time AI orchestration workspace integrating Claude, GPT-4, and Gemini with streaming markdown artifact canvases.",
      description: "Real-time AI orchestration workspace integrating Claude, GPT-4, and Gemini with streaming markdown artifact canvases and multi-model consensus loops.",
      tags: ["Next.js 15", "TypeScript", "Node.js", "Supabase", "WebSockets"],
      url: "https://omnichat-ai-studio.vercel.app/",
      githubUrl: "https://github.com/usernamezain/omnichat-ai-studio",
      image: omnichatImg,
      category: "Open Source Projects",
      stats: "Realtime SSE · Open Source",
      year: "2026",
      client: "AI Engineering Studio",
      role: "Full Stack AI Systems Architect",
      timeline: "4 Weeks",
      overview: "An enterprise-grade multi-agent collaboration canvas. Enables developers to query Claude, GPT-4, and Gemini simultaneously, cross-examine hallucinations, and watch agents debate architecture in real-time streaming markdown splits.",
      specs: {
        framework: "Next.js 15 App Router + React Server Components",
        motionEngine: "Framer Motion streaming token layout transitions",
        scrollEngine: "Virtualized autoscroll markdown canvas",
        styling: "Tailwind CSS with dark studio IDE aesthetic",
        optimization: "Server-Sent Events (SSE) streaming with sub-20ms token latency",
        performanceScore: "100/100 Lighthouse Performance"
      },
      keyFeatures: [
        "Parallel multi-model streaming (Anthropic, OpenAI, Google)",
        "Interactive artifact canvas with live Markdown, diagrams, and code execution",
        "Supabase vector database integration for persistent semantic memory",
        "Real-time consensus and divergence analysis loops"
      ],
      highlight: false,
    },
    {
      slug: "fastcli-scaffold",
      title: "FastCLI Project Scaffolder",
      subtitle: "Sub-second Node.js developer CLI generating pre-configured Astro, React, and TypeScript stacks with automated performance budgets.",
      description: "Sub-second Node.js developer CLI generating pre-configured Astro, React, and TypeScript stacks with automated git hooks and 100/100 performance budgets.",
      tags: ["Node.js", "TypeScript", "CLI Tooling", "esbuild"],
      url: "https://github.com/usernamezain/fastcli-scaffold",
      githubUrl: "https://github.com/usernamezain/fastcli-scaffold",
      image: fastcliImg,
      category: "Open Source Projects",
      stats: "Sub-400ms Init · Open Source",
      year: "2026",
      client: "Open Source Community",
      role: "Lead CLI Architect",
      timeline: "2 Weeks",
      overview: "An open-source developer terminal utility engineered to bootstrap production-ready Astro, React, and GSAP boilerplate in under 400 milliseconds.",
      specs: {
        framework: "Node.js + TypeScript compiled with esbuild",
        motionEngine: "Terminal ANSI color sequences + spinners",
        scrollEngine: "Interactive CLI prompts via Prompts/Inquirer",
        styling: "Clean terminal UI with chalk and gradient-string",
        optimization: "Single binary bundle with zero runtime dependency bloat",
        performanceScore: "Sub-400ms initialization speed"
      },
      keyFeatures: [
        "Pre-wired with Lenis, GSAP, Tailwind, and Astro 5",
        "Automated Husky git pre-commit hooks and ESLint rules",
        "Zero-config deploy scripts for Vercel, Netlify, and Cloudflare Pages"
      ],
      highlight: false,
    },
  ],
  experience: [
    {
      role: "Senior Full Stack Developer & Software Architect",
      company: "Independent Freelance & Engineering Practice",
      period: "2021 — PRESENT",
      description: "Engineering scalable full-stack applications, custom Chrome extensions, high-converting commercial platforms, and WebGL experiences for global clients. Architecting performant frontends with React, Next.js, and Astro with strict 100/100 Core Web Vitals budgets.",
    },
    {
      role: "Frontend Engineer & UI Motion Specialist",
      company: "Creative Digital Studio",
      period: "2019 — 2021",
      description: "Designed and built interactive motion experiences with GSAP, Three.js, and CSS Grid. Optimized site speed, reducing cumulative layout shift to zero across client portfolios.",
    },
    {
      role: "Web Application Developer",
      company: "Software Solutions Co.",
      period: "2017 — 2019",
      description: "Developed full-stack web applications using Node.js, Express, MongoDB, and modern JavaScript. Implemented automated CI/CD and deployment pipelines.",
    },
  ],
  faqs: [
    {
      question: "Who is Zain Ali Developer (zainalidev)?",
      answer: "Zain Ali (widely known online as zainalidev and Zain Ali Mughal) is a Senior Full Stack Developer, Software Architect, and Creative Technologist with over 7+ years of experience engineering scalable web applications, custom Chrome extensions (Manifest V3), developer CLI tools, and motion-rich WebGL experiences.",
    },
    {
      question: "What technologies does Zain Ali specialize in?",
      answer: "His core tech stack includes React, Next.js 15, Astro, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Supabase, Tailwind CSS, GSAP, Anime.js, and Three.js / WebGL. He focuses on sub-second load times, 100/100 Core Web Vitals, and silky 60fps animations.",
    },
    {
      question: "Does Zain Ali build custom Chrome Extensions?",
      answer: "Yes. Zain Ali specializes in Manifest V3 Chrome Extension development with isolated Shadow DOM styling, background service workers, content script injection, and third-party API integrations (GitHub, GitLab, Supabase, OpenAI).",
    },
    {
      question: "What is Vibe Coding and does Zain Ali use it?",
      answer: "Vibe Coding is the modern AI-assisted software engineering workflow where the human developer acts as an architect and orchestrator while frontier AI models (Claude, ChatGPT, Gemini) generate code in a continuous flow state. Zain Ali uses and advocates for production-grade vibe coding with strict type systems and test automation.",
    },
    {
      question: "How can I contact or hire Zain Ali Developer (zainalidev)?",
      answer: "You can reach Zain Ali directly via email at devmughal8@gmail.com, GitHub (@usernamezain), or LinkedIn (linkedin.com/in/zainali-mughal).",
    },
  ],
  faq: [
    {
      question: "Who is Zain Ali Developer (zainalidev)?",
      answer: "Zain Ali (widely known online as zainalidev and Zain Ali Mughal) is a Senior Full Stack Developer, Software Architect, and Creative Technologist with over 7+ years of experience engineering scalable web applications, custom Chrome extensions (Manifest V3), developer CLI tools, and motion-rich WebGL experiences.",
    },
    {
      question: "What technologies does Zain Ali specialize in?",
      answer: "His core tech stack includes React, Next.js 15, Astro, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Supabase, Tailwind CSS, GSAP, Anime.js, and Three.js / WebGL. He focuses on sub-second load times, 100/100 Core Web Vitals, and silky 60fps animations.",
    },
    {
      question: "Does Zain Ali build custom Chrome Extensions?",
      answer: "Yes. Zain Ali specializes in Manifest V3 Chrome Extension development with isolated Shadow DOM styling, background service workers, content script injection, and third-party API integrations (GitHub, GitLab, Supabase, OpenAI).",
    },
    {
      question: "What is Vibe Coding and does Zain Ali use it?",
      answer: "Vibe Coding is the modern AI-assisted software engineering workflow where the human developer acts as an architect and orchestrator while frontier AI models (Claude, ChatGPT, Gemini) generate code in a continuous flow state. Zain Ali uses and advocates for production-grade vibe coding with strict type systems and test automation.",
    },
    {
      question: "How can I contact or hire Zain Ali Developer (zainalidev)?",
      answer: "You can reach Zain Ali directly via email at devmughal8@gmail.com, GitHub (@usernamezain), or LinkedIn (linkedin.com/in/zainali-mughal).",
    },
  ],
};