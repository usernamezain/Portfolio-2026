export interface Project {
  title: string;
  description: string;
  tags: string[];
  url: string;
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
  title: "Creative Developer & Senior Frontend Engineer",
  tagline: "I build custom portfolios, high-converting landing pages, and static websites with smooth, restrained animation.",
  bio: [
    "I'm Zain Ali (known online as zainalidev), a creative developer. I turn design concepts into blazingly fast, accessible websites and integrate motion where it guides the user rather than merely decorating.",
    "My core expertise centers on React, Next.js, and TypeScript on the frontend, GSAP and Lenis for fluid scroll physics and cinematic motion, Anime.js for micro-interactions, and Three.js for interactive 3D WebGL experiences. I also build open-source tools and CLI utilities. I speak English, Urdu, and Punjabi.",
    "I am open to high-impact freelance projects, design agency collaborations, and contract opportunities worldwide."
  ],
  contact: {
    email: "contact@zainalidev.com",
    github: "https://github.com/usernamezain",
    linkedin: "https://www.linkedin.com/in/mughal-dev-471975400/",
    instagram: "https://instagram.com/daily_hack.dev",
    whatsappChannel: "https://whatsapp.com/channel/0029VbBUVv35fM5eAnXw3w2D",
  },
  techCategories: [
    {
      title: "Frontend Engineering",
      skills: [
        { name: "JavaScript (ESNext)", icon: "braces" },
        { name: "TypeScript", icon: "file-code" },
        { name: "React", icon: "atom" },
        { name: "Astro (Speed #1)", icon: "zap" },
        { name: "Next.js", icon: "layout-template" },
        { name: "Vue 3", icon: "component" },
        { name: "Tailwind CSS", icon: "wind" },
        { name: "Modern CSS / CSS Modules", icon: "palette" },
      ],
    },
    {
      title: "Motion & Animation Systems",
      skills: [
        { name: "GSAP 3", icon: "activity" },
        { name: "ScrollTrigger", icon: "scroll-text" },
        { name: "Anime.js", icon: "play" },
        { name: "Lenis Smooth Scroll", icon: "move-vertical" },
        { name: "Framer Motion", icon: "film" },
      ],
    },
    {
      title: "3D & Creative WebGL",
      skills: [
        { name: "Three.js", icon: "box" },
        { name: "React Three Fiber", icon: "boxes" },
        { name: "GLSL Shaders", icon: "cpu" },
      ],
    },
    {
      title: "Tooling & Backend",
      skills: [
        { name: "Node.js", icon: "server" },
        { name: "GraphQL & REST APIs", icon: "workflow" },
        { name: "npm Packages & Monorepos", icon: "package" },
        { name: "CLI Development", icon: "terminal" },
      ],
    },
  ],
  projects: [
    {
      title: "Ultimate Empire",
      description: "Website for an organic social media growth course with high-converting layout and kinetic typography.",
      tags: ["React", "GSAP", "Lenis", "Tailwind"],
      url: "https://www.ultimate-empire.online/",
      highlight: true,
    },
    {
      title: "Mughal.Dev Portfolio",
      description: "Creative developer portfolio featuring interactive 3D elements, dynamic lighting, and silky smooth transitions.",
      tags: ["React", "Three.js", "GSAP", "WebGL"],
      url: "https://mughal-dev-web-portfolio.vercel.app/",
      highlight: true,
    },
    {
      title: "Beauty Studio by Aqsa",
      description: "Luxury salon web platform with smooth responsive choreography and micro-interactions.",
      tags: ["Vue 3", "Anime.js", "CSS Grid"],
      url: "https://beauty-studio-pro.vercel.app/",
    },
    {
      title: "Mughal Dev Bento",
      description: "Bento grid inspired digital showroom demonstrating modular card UI and physics-based interactions.",
      tags: ["React", "GSAP", "Anime.js"],
      url: "https://ui-ux-portfolio-rho.vercel.app/",
    },
    {
      title: "Chuzi Wisher",
      description: "Interactive greeting card generator delivering heartwarming customized animations for friends and family.",
      tags: ["JavaScript", "GSAP", "Lenis"],
      url: "https://chuzi-wisher.vercel.app/",
    },
    {
      title: "Bukhari Designers",
      description: "Agency website for global graphic design and UI/UX studio showcasing client case studies.",
      tags: ["React", "TypeScript", "Motion"],
      url: "https://www.bukharidesigns.com/",
    },
  ],
  experience: [
    {
      role: "Senior Frontend Developer & Creative Technologist",
      company: "Mughal Dev / Independent",
      period: "2026 – Present",
      description: "Architecting performance-first web applications and interactive client experiences. Directing animation pipelines (GSAP, Anime.js, Three.js) while maintaining sub-second load times and 100/100 Core Web Vitals.",
    },
    {
      role: "Web Developer",
      company: "Tech Startup Inc.",
      period: "2024 – 2025",
      description: "Engineered scalable modern React interfaces. Pioneered the integration of GSAP scroll sequences and WebGL micro-canvases to drive higher engagement and conversion metrics.",
    },
    {
      role: "Junior Frontend Developer",
      company: "Digital Web Studio",
      period: "2021 – 2024",
      description: "Developed modern responsive web applications, interactive e-commerce portals, and cross-browser accessible web interfaces.",
    },
  ],
  blogPosts: [
    {
      title: "Making Lenis and ScrollTrigger Work Together Without Lag",
      status: "Published Guide",
      description: "How to drive Lenis directly from GSAP's ticker to eliminate scroll stutter and keep ScrollTrigger coordinates 100% accurate.",
      readTime: "4 min read",
    },
    {
      title: "Coexistence: GSAP, Anime.js, and CSS Physics in Modern Astro",
      status: "Deep Dive",
      description: "Techniques to orchestrate multi-library animation stacks without collision, memory leaks, or main-thread blocking.",
      readTime: "6 min read",
    },
    {
      title: "Zero CLS and 100/100 Lighthouse on Astro Portfolios",
      status: "Performance",
      description: "Practical steps to optimize font loading, preloader dismissal, and critical rendering paths for instant paints.",
      readTime: "5 min read",
    },
  ],
  // SEO Keyword Q&A for Featured Snippets, Knowledge Graph, & Direct Search Intent
  faqs: [
    {
      question: "Who is zainalidev?",
      answer: "zainalidev is the official online moniker and brand of Zain Ali (Zain Ali Mughal), a senior creative frontend developer recognized for engineering high-performance websites, GSAP scroll animations, Anime.js interactive physics, and Three.js 3D web experiences.",
    },
    {
      question: "Who is Zain Ali Mughal (Zain Ali Developer)?",
      answer: "Zain Ali Mughal, widely searched as Zain Ali Developer or zainalidev, is a creative software engineer and frontend specialist based in Pakistan working globally. He builds lightning-fast websites using Astro, React, TypeScript, GSAP, and Anime.js.",
    },
    {
      question: "Who si zainalidev or Zain Ali Develoepr?",
      answer: "Whether searched as 'zainalidev', 'Zain Ali Developer', 'Zain Ali Develoepr' (common typo), or 'who is zain ali mughal dev', this refers to Zain Ali Mughal — a top-ranking creative web developer known for speed optimization and motion design.",
    },
    {
      question: "What animation libraries does Zain Ali Developer specialize in?",
      answer: "Zain specializes in GSAP (ScrollTrigger, Flip, Observer), Anime.js for complex UI physics and micro-interactions, Lenis for normalized smooth scrolling, and Three.js / React Three Fiber for WebGL experiences.",
    },
    {
      question: "How can I contact or hire Zain Ali Developer (zainalidev)?",
      answer: "You can connect with Zain Ali via his official channels: GitHub (@usernamezain), LinkedIn (in/mughal-dev-471975400), Instagram (@daily_hack.dev), or join the Mughal Dev WhatsApp community channel.",
    },
  ],
};
