import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://zainalidev.com',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/private'),
      serialize(item) {
        if (item.url === 'https://zainalidev.com/' || item.url === 'https://zainalidev.com') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (item.url.includes('/projects') || item.url.includes('/project')) {
          item.changefreq = 'weekly';
          item.priority = 0.95;
        } else if (item.url.includes('/blog/')) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else if (item.url.includes('/blog')) {
          item.changefreq = 'daily';
          item.priority = 0.9;
        } else {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        }
        item.lastmod = new Date();
        return item;
      },
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['gsap', 'animejs', 'lenis', 'lucide-astro'],
    },
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('node_modules/animejs')) {
              return 'vendor-anime';
            }
            if (id.includes('node_modules/lenis')) {
              return 'vendor-lenis';
            }
          },
        },
      },
    },
  },
});

