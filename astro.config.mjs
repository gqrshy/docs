// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://gashistudios.site',
	markdown: {
		shikiConfig: {
			theme: 'one-dark-pro',
			wrap: true,
		},
	},
});
