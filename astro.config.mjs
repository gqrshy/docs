// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'CobbleRanked',
			logo: {
				src: './src/assets/gashistudios.png',
			},
			social: [
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/gashistudios' },
			],
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Requirements', slug: 'getting-started/requirements' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Commands', slug: 'getting-started/commands' },
					],
				},
				{
					label: 'Features',
					items: [
						{ label: 'Overview', slug: 'features/overview' },
						{ label: 'Ranked Battles', slug: 'features/ranked-battles' },
						{ label: 'Casual Battles', slug: 'features/casual-battles' },
						{ label: 'Battle Formats', slug: 'features/battle-formats' },
						{ label: 'ELO System', slug: 'features/elo-system' },
						{ label: 'Seasons', slug: 'features/seasons' },
						{ label: 'Leaderboards', slug: 'features/leaderboards' },
						{ label: 'Turn Timer', slug: 'features/turn-timer' },
						{ label: 'Battle Camera', slug: 'features/battle-camera' },
					],
				},
				{
					label: 'Configuration',
					items: [
						{ label: 'Overview', slug: 'configuration/overview' },
						{ label: 'Main Config', slug: 'configuration/config' },
						{ label: 'Arenas', slug: 'configuration/arenas' },
						{ label: 'Blacklist', slug: 'configuration/blacklist' },
						{ label: 'Rewards', slug: 'configuration/rewards' },
						{ label: 'GUI', slug: 'configuration/gui' },
						{ label: 'Languages', slug: 'configuration/languages' },
					],
				},
				{
					label: 'Integration',
					items: [
						{ label: 'Overview', slug: 'integration/overview' },
						{ label: 'GashiLibs', slug: 'integration/gashilibs' },
						{ label: 'MailLib', slug: 'integration/maillib' },
						{ label: 'LuckPerms', slug: 'integration/luckperms' },
						{ label: 'Placeholders', slug: 'integration/placeholders' },
					],
				},
				{
					label: 'Advanced',
					items: [
						{ label: 'Overview', slug: 'advanced/overview' },
						{ label: 'Database', slug: 'advanced/database' },
						{ label: 'Cross-Server', slug: 'advanced/cross-server' },
					],
				},
				{
					label: 'Support',
					items: [
						{ label: 'FAQ', slug: 'support/faq' },
						{ label: 'Troubleshooting', slug: 'support/troubleshooting' },
					],
				},
			],
		}),
	],
});
