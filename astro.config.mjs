import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  site: 'https://www.gashistudios.site',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/')
    })
  ]
});
