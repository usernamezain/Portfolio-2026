export interface SEOConfig {
  siteUrl: string;
  siteName: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  canonicalUrl: string;
  author: string;
  handle: string;
  keywords: string[];
  ogImage: string;
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
}

export const seoConfig: SEOConfig = {
  siteUrl: "https://zainalidev.com",
  siteName: "Zain Ali Developer (zainalidev) | Official Portfolio",
  defaultTitle: "Zain Ali Developer (zainalidev) | Senior Full Stack Developer & Creative Technologist",
  titleTemplate: "%s | Zain Ali Developer",
  defaultDescription: "Official portfolio of Zain Ali Developer (zainalidev / Zain Ali Mughal). Senior Full Stack Developer with 7+ years of experience engineering scalable web platforms, custom Chrome extensions, developer tools, React, Next.js, Node.js, and 3D WebGL experiences optimized for 100/100 Core Web Vitals.",
  canonicalUrl: "https://zainalidev.com",
  author: "Zain Ali Mughal",
  handle: "@zainalidev",
  keywords: [
    // Primary Identity & Target Queries
    "Zain Ali Developer",
    "zain ali dev",
    "who is zainalidev",
    "who is zain ali developer",
    "who is zain ali",
    "zainalidev",
    "Zain Ali Mughal",
    "Zain Mughal",
    "Zain Ali Mughal Dev",
    "mughal dev",
    "mughal.dev",
    "who is zain ali mughal dev",
    // Vibe Coding & Modern AI-First Engineering
    "what is vibe coding",
    "vibe coding",
    "vibe coding software engineering",
    "vibe coding guide",
    "vibe coding zain ali",
    "ai first software development",
    "multi-agent ai development",
    "ai engineer portfolio",
    // Core Engineering Stack
    "senior full stack developer",
    "full stack developer portfolio",
    "chrome extension developer",
    "react next.js developer",
    "node.js architect",
    "astro framework developer",
    "typescript engineer",
    "gsap motion developer",
    "three.js webgl portfolio",
    "core web vitals optimization expert",
    "high performance frontend developer"
  ],
  ogImage: "https://zainalidev.com/og-image.png",
  social: {
    github: "https://github.com/usernamezain",
    linkedin: "https://www.linkedin.com/in/zainali-mughal",
    twitter: "https://x.com/zainalidev"
  },
};

/**
 * Builds high-authority JSON-LD Structured Data Schema Graph for Home & Global Context
 * Designed to claim Google Knowledge Panels, Rich Sitelinks, and #1 rank for personal & developer search queries.
 */
export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://zainalidev.com/#person",
        "name": "Zain Ali Mughal",
        "alternateName": [
          "zainalidev",
          "Zain Ali Developer",
          "zain ali dev",
          "Zain Mughal",
          "Zain Ali",
          "mughal.dev",
          "Mughal Dev"
        ],
        "givenName": "Zain",
        "familyName": "Ali Mughal",
        "additionalName": "Ali",
        "jobTitle": "Senior Full Stack Developer & Creative Software Architect",
        "disambiguatingDescription": "Zain Ali Developer (zainalidev / Zain Ali Mughal) is a Senior Full Stack Engineer with 7+ years of experience engineering scalable web platforms, Chrome extensions, developer tools, and motion-rich WebGL/GSAP applications.",
        "description": "Zain Ali Developer (zainalidev / Zain Ali Mughal) is an experienced Senior Full Stack Developer and Creative Technologist specializing in React, Next.js, Node.js, TypeScript, Astro, WebGL, and high-performance zero-layout-shift architectures.",
        "url": "https://zainalidev.com",
        "image": {
          "@type": "ImageObject",
          "url": "https://zainalidev.com/og-image.png",
          "caption": "Zain Ali Developer (zainalidev) Official Identity"
        },
        "sameAs": [
          "https://github.com/usernamezain",
          "https://www.linkedin.com/in/zainali-mughal",
          "https://x.com/zainalidev",
          "https://www.ultimate-empire.online/",
          "https://mughal-dev-web-portfolio.vercel.app/"
        ],
        "knowsAbout": [
          "Full Stack Web Development",
          "Software Architecture & Systems Design",
          "Chrome Extensions (Manifest V3)",
          "Vibe Coding & AI-Assisted Engineering",
          "Developer Tools & CLI Development",
          "React 19 & Next.js 15",
          "Node.js & Express.js",
          "TypeScript & Modern JavaScript",
          "PostgreSQL, Supabase & Neon",
          "Astro Framework Architecture",
          "GSAP (GreenSock) Animation Platform",
          "Three.js & WebGL 3D Shaders",
          "Google Core Web Vitals Optimization (100/100 LCP, CLS, INP)"
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Full Stack Software Engineer",
          "occupationLocation": {
            "@type": "Country",
            "name": "Global / Remote"
          },
          "skills": "React, Next.js, Node.js, TypeScript, Astro, GSAP, WebGL, Three.js, PostgreSQL, Docker, Core Web Vitals"
        },
        "knowsLanguage": ["English", "Urdu", "Punjabi"],
        "nationality": {
          "@type": "Country",
          "name": "Pakistan"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://zainalidev.com/#website",
        "url": "https://zainalidev.com",
        "name": "Zain Ali Developer (zainalidev) Official Website",
        "alternateName": [
          "zainalidev",
          "Zain Ali Dev",
          "Zain Ali Developer Portfolio",
          "Zain Ali Mughal Dev Portfolio"
        ],
        "description": "Official website and creative developer portfolio of Zain Ali Mughal (zainalidev). Featuring verified software case studies, interactive tech stack, and engineering notes.",
        "publisher": {
          "@id": "https://zainalidev.com/#person"
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://zainalidev.com/blog?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://zainalidev.com/#profilepage",
        "url": "https://zainalidev.com",
        "name": "About Zain Ali Developer (zainalidev / Zain Ali Mughal)",
        "isPartOf": {
          "@id": "https://zainalidev.com/#website"
        },
        "mainEntity": {
          "@id": "https://zainalidev.com/#person"
        },
        "description": "Full portfolio, verified production work, and technical biography of creative software engineer Zain Ali."
      },
      {
        "@type": "FAQPage",
        "@id": "https://zainalidev.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is zainalidev?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "zainalidev is the official professional moniker of Zain Ali Mughal, a senior full-stack engineer and creative developer with 7+ years of experience engineering scalable web platforms, Chrome extensions, and high-performance WebGL/GSAP applications."
            }
          },
          {
            "@type": "Question",
            "name": "Who is Zain Ali Developer (Zain Ali Mughal)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Zain Ali Mughal, widely recognized online as Zain Ali Developer or zainalidev, is a software architect and creative developer known for 100/100 Core Web Vitals, zero layout shift architectures, and fluid motion physics."
            }
          },
          {
            "@type": "Question",
            "name": "What is Vibe Coding and how does Zain Ali use it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vibe Coding is an AI-first software engineering paradigm where human developers operate at the high-leverage tier of intent, architecture, and taste, while frontier AI models (Claude, GPT, Gemini) assemble boilerplate code in real-time. Zain Ali applies production-grade vibe coding with strict type systems, atomic test loops, and zero-compromise architectural standards."
            }
          },
          {
            "@type": "Question",
            "name": "What technologies does Zain Ali Developer specialize in?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Zain Ali specializes in React 19, Next.js 15, Node.js, TypeScript, Astro 5, PostgreSQL, Supabase, GSAP 3, Three.js, WebGL shaders, Anime.js, and Lenis smooth scrolling."
            }
          },
          {
            "@type": "Question",
            "name": "How can I contact or hire Zain Ali Developer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can contact Zain Ali directly via email at me@zainalidev.com or submit a collaboration inquiry through the interactive contact section at https://zainalidev.com/#contact."
            }
          }
        ]
      }
    ]
  };
}
