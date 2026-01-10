// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	site: 'https://gashistudios.site',
	output: 'server',
	adapter: vercel({
		// Enable ISR for static pages
		isr: true,
	}),
	markdown: {
		shikiConfig: {
			theme: 'github-light',
			wrap: true,
		},
	},
});
