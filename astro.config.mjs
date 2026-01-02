// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	site: 'https://gashistudios.site',
	output: 'static',
	adapter: vercel(),
	markdown: {
		shikiConfig: {
			theme: 'one-dark-pro',
			wrap: true,
		},
	},
});
