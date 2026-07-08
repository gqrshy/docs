// GashiStudios product catalog — single source of truth for the store.
// Prices are placeholders until Stripe products are finalized.
// To enable real checkout: set STRIPE_SECRET_KEY in env and (optionally)
// set `stripePriceId` per product to use pre-created Stripe Prices.

export type ProductCategory = 'mods' | 'plugins' | 'libraries';

export interface Product {
	id: string;
	name: string;
	tagline: string;
	description: string;
	category: ProductCategory;
	tags: string[];
	mcVersions: string[];
	platforms: string[];
	/** USD. 0 = free (Docs/Download CTA instead of Add to cart) */
	price: number;
	/** Discounted price while sale is active */
	salePrice?: number;
	/** Pre-created Stripe Price ID (optional — falls back to price_data) */
	stripePriceId?: string;
	docsUrl?: string;
	downloadUrl?: string;
	image?: string;
	/** CSS gradient for the card visual when no image */
	gradient: string;
	featured: boolean;
	reviews?: number;
}

export const saleConfig = {
	active: true,
	label: 'SUMMER SALE IS HERE!',
	percent: 10,
	/** ISO date — countdown target. Banner hides itself after this. */
	endsAt: '2026-07-31T23:59:59+09:00'
};

export const currency = 'usd';

export const products: Product[] = [
	{
		id: 'cobbleranked',
		name: 'CobbleRanked',
		tagline: 'Competitive ranked battles for Cobblemon',
		description:
			'Competitive Pokemon battle system for Cobblemon servers. ELO rating, tiers, seasons, leaderboards, cross-server matchmaking and full GUI — everything a battle server needs.',
		category: 'mods',
		tags: ['Cobblemon', 'PvP', 'Ranked', 'GUI'],
		mcVersions: ['1.21.1'],
		platforms: ['Fabric'],
		price: 19.99,
		salePrice: 17.99,
		docsUrl: '/docs/cobbleranked/',
		image: '/cobbleranked.png',
		gradient: 'linear-gradient(135deg, #c4b5fd, #8b5cf6)',
		featured: true,
		reviews: 50
	},
	{
		id: 'gashilibs',
		name: 'GashiLibs',
		tagline: 'Shared utility library for our mods',
		description:
			'Shared utility library powering GashiStudios mods and addons. Database access, UI toolkit, and common helpers. Free to use as a dependency.',
		category: 'libraries',
		tags: ['Library', 'API', 'Database'],
		mcVersions: ['1.21.1'],
		platforms: ['Fabric'],
		price: 0,
		docsUrl: '/docs/gashilibs/',
		gradient: 'linear-gradient(135deg, #93c5fd, #3b82f6)',
		featured: true
	},
	{
		id: 'maillib',
		name: 'MailLib',
		tagline: 'In-game mail system library',
		description:
			'In-game mail system library. Send, receive, and manage mail between players — with attachments and offline delivery. Free to use as a dependency.',
		category: 'libraries',
		tags: ['Library', 'Mail', 'API'],
		mcVersions: ['1.21.1'],
		platforms: ['Fabric'],
		price: 0,
		docsUrl: '/docs/maillib/',
		gradient: 'linear-gradient(135deg, #f9a8d4, #ec4899)',
		featured: true
	}
];

export function effectivePrice(p: Product): number {
	return saleConfig.active && p.salePrice != null ? p.salePrice : p.price;
}
