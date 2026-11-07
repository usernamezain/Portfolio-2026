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
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date(),
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

