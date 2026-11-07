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
    instagram: string;
    whatsapp: string;
  };
}

export const seoConfig: SEOConfig = {
  siteUrl: "https://zainalidev.com",
  siteName: "Zain Ali Developer (zainalidev) | Creative Developer Portfolio",
  defaultTitle: "Zain Ali Developer (zainalidev) | Zain Ali Mughal — Creative Developer",
  titleTemplate: "%s | Zain Ali Developer",
  defaultDescription: "Official portfolio of Zain Ali Developer (zainalidev / Zain Ali Mughal). Senior Creative Frontend Developer specializing in ultra-fast Astro websites, GSAP animations, Anime.js, Lenis smooth scroll, and 3D WebGL experiences.",
  canonicalUrl: "https://zainalidev.com",
  author: "Zain Ali Mughal",
  handle: "@daily_hack.dev",
  keywords: [
    "Zain Ali Develoepr",
    "Zain Ali Developer",
    "zainalidev",
    "who is zainalidev",
    "who si zainalidev",
    "who is zain ali mughal dev",
    "Zain Ali Mughal",
    "Zain Mughal",
    "Zain Mughal creative developer",
    "zainalidev portfolio",
    "mughal dev",
    "creative developer",
    "creative frontend developer",
    "GSAP developer",
    "Anime js developer",
    "Astro speed developer",
    "Three.js portfolio",
    "best creative portfolio",
  ],
  ogImage: "https://zainalidev.com/og-image.png",
  social: {
    github: "https://github.com/usernamezain",
    linkedin: "https://www.linkedin.com/in/mughal-dev-471975400/",
    instagram: "https://instagram.com/daily_hack.dev",
    whatsapp: "https://whatsapp.com/channel/0029VbBUVv35fM5eAnXw3w2D",
  },
};

/**
 * Builds high-authority JSON-LD Structured Data Schema Graph
 * Designed specifically to claim Google Knowledge Panels, Rich Snippets,
 * and #1 rank for personal & developer search queries.
 */
export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://zainalidev.com/#person",
        "name": "Zain Ali",
        "alternateName": [
          "zainalidev",
          "Zain Ali Mughal",
          "Zain Mughal",
          "Zain Ali Developer",
          "Zain Ali Develoepr",
          "mughal.dev",
          "Mughal Dev"
        ],
        "givenName": "Zain",
        "familyName": "Ali Mughal",
        "jobTitle": "Senior Creative Developer & Frontend Engineer",
        "disambiguatingDescription": "Zain Ali Developer (zainalidev) is an acclaimed creative frontend engineer celebrated for ultra-performance web architectures, GSAP scroll sequences, Anime.js physics, and Three.js 3D web applications.",
        "description": "Zain Ali Developer (zainalidev / Zain Ali Mughal) is a creative software engineer building fast, responsive, and animated modern digital experiences.",
        "url": "https://zainalidev.com",
        "image": "https://zainalidev.com/og-image.png",
        "sameAs": [
          "https://github.com/usernamezain",
          "https://www.linkedin.com/in/mughal-dev-471975400/",
          "https://instagram.com/daily_hack.dev",
          "https://whatsapp.com/channel/0029VbBUVv35fM5eAnXw3w2D",
          "https://www.ultimate-empire.online/",
          "https://mughal-dev-web-portfolio.vercel.app/"
        ],
        "knowsAbout": [
          "Astro Framework",
          "Web Performance Optimization",
          "Core Web Vitals",
          "GSAP (GreenSock Animation Platform)",
          "ScrollTrigger",
          "Anime.js",
          "Lenis Smooth Scrolling",
          "Three.js & WebGL",
          "React & Next.js",
          "TypeScript & JavaScript",
          "SEO Optimization"
        ],
        "knowsLanguage": ["English", "Urdu", "Punjabi"],
        "nationality": "Pakistani"
      },
      {
        "@type": "WebSite",
        "@id": "https://zainalidev.com/#website",
        "url": "https://zainalidev.com",
        "name": "Zain Ali Developer (zainalidev) Portfolio",
        "alternateName": [
          "zainalidev",
          "Zain Ali Develoepr",
          "Zain Ali Mughal Dev",
          "Zain Mughal Portfolio"
        ],
        "description": "Official website and creative developer portfolio of Zain Ali Mughal (zainalidev).",
        "publisher": {
          "@id": "https://zainalidev.com/#person"
        },
        "inLanguage": "en-US"
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
        "description": "Full portfolio, verified work, and biography of creative developer Zain Ali."
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
              "text": "zainalidev is the official professional moniker of Zain Ali (Zain Ali Mughal), a top creative frontend engineer specializing in fast websites, GSAP animations, Anime.js, and Three.js."
            }
          },
          {
            "@type": "Question",
            "name": "Who is Zain Ali Mughal (Zain Ali Developer)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Zain Ali Mughal, widely recognized as Zain Ali Developer or zainalidev, is a creative software engineer building world-class websites with smooth motion, zero layout shift, and #1 speed optimization."
            }
          },
          {
            "@type": "Question",
            "name": "Who si zainalidev or who is zain ali mughal dev?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Whether typed as 'who is zainalidev', 'who si zainalidev' or 'who is zain ali mughal dev', this refers to Zain Ali Mughal, a senior creative developer known for high performance web development and animation mastery."
            }
          },
          {
            "@type": "Question",
            "name": "What technologies does Zain Ali Developer use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Zain Ali utilizes Astro, React, TypeScript, GSAP, Anime.js, Lenis, and Three.js to construct ultra-fast, visually captivating web experiences."
            }
          }
        ]
      }
    ]
  };
}
