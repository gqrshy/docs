import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { products, effectivePrice, currency } from '../../data/products';

// Server-side only (Vercel serverless function)
export const prerender = false;

const STRIPE_SECRET_KEY = import.meta.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY || '';
const SITE_URL = import.meta.env.SITE_URL || process.env.SITE_URL || 'https://www.gashistudios.site';

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' }
	});

interface CartItem {
	id: string;
	qty: number;
}

export const POST: APIRoute = async ({ request }) => {
	if (!STRIPE_SECRET_KEY) {
		return json({ error: 'Stripe is not configured (missing STRIPE_SECRET_KEY)' }, 503);
	}

	let items: CartItem[];
	try {
		const body = await request.json();
		items = Array.isArray(body?.items) ? body.items : [];
	} catch {
		return json({ error: 'Invalid JSON body' }, 400);
	}

	// Validate against the server-side catalog — never trust client prices
	const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
	for (const item of items) {
		const product = products.find(p => p.id === item.id && p.price > 0);
		const qty = Math.floor(Number(item.qty));
		if (!product || !Number.isFinite(qty) || qty < 1 || qty > 10) continue;

		if (product.stripePriceId) {
			lineItems.push({ price: product.stripePriceId, quantity: qty });
		} else {
			lineItems.push({
				quantity: qty,
				price_data: {
					currency,
					unit_amount: Math.round(effectivePrice(product) * 100),
					product_data: {
						name: product.name,
						description: product.tagline,
						...(product.image ? { images: [`${SITE_URL}${product.image}`] } : {})
					}
				}
			});
		}
	}

	if (lineItems.length === 0) {
		return json({ error: 'Cart is empty or contains no purchasable items' }, 400);
	}

	try {
		const stripe = new Stripe(STRIPE_SECRET_KEY);
		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			line_items: lineItems,
			success_url: `${SITE_URL}/?checkout=success`,
			cancel_url: `${SITE_URL}/?checkout=cancel`,
			allow_promotion_codes: true
		});
		return json({ url: session.url });
	} catch (err) {
		console.error('Stripe checkout error:', err);
		return json({ error: 'Failed to create checkout session' }, 500);
	}
};
