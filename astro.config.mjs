// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'GashiStudios',
			logo: {
				src: './src/assets/gashistudios.png',
				replacesTitle: false,
			},
			social: [
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/VVVvBTqqyP' },
			],
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'CobbleRanked',
					items: [
						{ label: 'Overview', slug: 'cobbleranked' },
						{
							label: 'Getting Started',
							items: [
								{ label: 'Introduction', slug: 'cobbleranked/getting-started/introduction' },
								{ label: 'Installation', slug: 'cobbleranked/getting-started/installation' },
								{ label: 'Requirements', slug: 'cobbleranked/getting-started/requirements' },
								{ label: 'Quick Start', slug: 'cobbleranked/getting-started/quick-start' },
								{ label: 'Commands', slug: 'cobbleranked/getting-started/commands' },
							],
						},
						{
							label: 'Features',
							items: [
								{ label: 'Overview', slug: 'cobbleranked/features/overview' },
								{ label: 'Ranked Battles', slug: 'cobbleranked/features/ranked-battles' },
								{ label: 'Casual Battles', slug: 'cobbleranked/features/casual-battles' },
								{ label: 'Battle Formats', slug: 'cobbleranked/features/battle-formats' },
								{ label: 'ELO System', slug: 'cobbleranked/features/elo-system' },
								{ label: 'Seasons', slug: 'cobbleranked/features/seasons' },
								{ label: 'Leaderboards', slug: 'cobbleranked/features/leaderboards' },
								{ label: 'Turn Timer', slug: 'cobbleranked/features/turn-timer' },
								{ label: 'Battle Camera', slug: 'cobbleranked/features/battle-camera' },
							],
						},
						{
							label: 'Configuration',
							items: [
								{ label: 'Overview', slug: 'cobbleranked/configuration/overview' },
								{ label: 'Main Config', slug: 'cobbleranked/configuration/config' },
								{ label: 'Arenas', slug: 'cobbleranked/configuration/arenas' },
								{ label: 'Blacklist', slug: 'cobbleranked/configuration/blacklist' },
								{ label: 'Rewards', slug: 'cobbleranked/configuration/rewards' },
								{ label: 'GUI', slug: 'cobbleranked/configuration/gui' },
								{ label: 'Languages', slug: 'cobbleranked/configuration/languages' },
							],
						},
						{
							label: 'Integration',
							items: [
								{ label: 'Overview', slug: 'cobbleranked/integration/overview' },
								{ label: 'LuckPerms', slug: 'cobbleranked/integration/luckperms' },
								{ label: 'Placeholders', slug: 'cobbleranked/integration/placeholders' },
							],
						},
						{
							label: 'Advanced',
							items: [
								{ label: 'Overview', slug: 'cobbleranked/advanced/overview' },
								{ label: 'Database', slug: 'cobbleranked/advanced/database' },
								{ label: 'Cross-Server', slug: 'cobbleranked/advanced/cross-server' },
							],
						},
						{
							label: 'Support',
							items: [
								{ label: 'FAQ', slug: 'cobbleranked/support/faq' },
								{ label: 'Troubleshooting', slug: 'cobbleranked/support/troubleshooting' },
							],
						},
					],
				},
				{
					label: 'GashiLibs',
					items: [
						{ label: 'Overview', slug: 'gashilibs' },
					],
				},
				{
					label: 'MailLib',
					items: [
						{ label: 'Overview', slug: 'maillib' },
					],
				},
			],
		}),
	],
});
