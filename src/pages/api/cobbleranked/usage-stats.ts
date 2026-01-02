import type { APIRoute } from 'astro';
import { connectToDatabase, isMongoConfigured } from '../../../lib/mongodb';

// Disable prerendering for this API route (server-side only)
export const prerender = false;

const API_KEY = import.meta.env.COBBLERANKED_API_KEY || process.env.COBBLERANKED_API_KEY || '';

function validateApiKey(request: Request): boolean {
	if (!API_KEY) return true; // No key configured = allow all
	const providedKey = request.headers.get('X-API-Key');
	return providedKey === API_KEY;
}

// POST: Receive data from CobbleRanked server
export const POST: APIRoute = async ({ request }) => {
	// Validate API key
	if (!validateApiKey(request)) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const data = await request.json();

		const connection = await connectToDatabase();
		if (!connection) {
			return new Response(JSON.stringify({ error: 'Database not configured' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const { db } = connection;
		const collection = db.collection('usage_stats');

		// Upsert based on serverId
		await collection.updateOne(
			{ serverId: data.serverId || 'default' },
			{
				$set: {
					...data,
					updatedAt: new Date()
				}
			},
			{ upsert: true }
		);

		return new Response(JSON.stringify({ success: true, message: 'Usage stats saved' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error saving usage stats:', error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

// GET: Retrieve usage stats for demo pages
export const GET: APIRoute = async ({ url }) => {
	const serverId = url.searchParams.get('serverId') || 'default';
	const season = url.searchParams.get('season');
	const format = url.searchParams.get('format');

	try {
		const connection = await connectToDatabase();

		if (!connection) {
			// Return demo data if MongoDB not configured
			return new Response(JSON.stringify(getDemoData()), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
		}

		const { db } = connection;
		const collection = db.collection('usage_stats');

		const data = await collection.findOne({ serverId });

		if (!data) {
			return new Response(JSON.stringify(getDemoData()), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
		}

		// Handle both CobbleRanked format (formats at top level) and demo format (nested seasons)
		let result: any = data;

		if (format) {
			// CobbleRanked sends: { serverId, seasonName, formats: { SINGLES: { format, tiers: { "1500+": {...} } } } }
			if (data.formats?.[format]?.tiers) {
				result = {
					serverId: data.serverId,
					timestamp: data.timestamp,
					season: data.seasonName,
					format,
					tiers: data.formats[format].tiers
				};
			}
			// Demo data format: { seasons: { Season4: { formats: { SINGLES: { tiers: {...} } } } } }
			else if (season && data.seasons?.[season]?.formats?.[format]?.tiers) {
				result = {
					serverId: data.serverId,
					timestamp: data.timestamp,
					season,
					format,
					tiers: data.seasons[season].formats[format].tiers
				};
			}
		}

		return new Response(JSON.stringify(result), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	} catch (error) {
		console.error('Error fetching usage stats:', error);
		return new Response(JSON.stringify(getDemoData()), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	}
};

// OPTIONS: Handle CORS preflight
export const OPTIONS: APIRoute = async () => {
	return new Response(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, X-API-Key'
		}
	});
};

function getDemoData() {
	return {
		serverId: 'demo',
		timestamp: Date.now(),
		isDemo: true,
		seasons: {
			'Season4': {
				formats: {
					'SINGLES': {
						tiers: {
							'1500+': {
								minElo: 1500,
								maxElo: null,
								totalBattles: 150,
								totalPokemon: 10,
								species: [
									{
										species: 'Ogerpon-Wellspring',
										usagePercent: 32.58,
										count: 48,
										moves: { 'Ivy Cudgel': 100.0, 'Horn Leech': 78.55, 'Swords Dance': 75.88, 'Superpower': 34.48, 'U-turn': 30.41 },
										items: { 'Wellspring Mask': 100.0 },
										abilities: { 'Water Absorb': 100.0 },
										teammates: { 'Moltres': 18.99, 'Ironvaliant': 18.13, 'Dragapult-Ultra': 17.47 },
										evSpreads: { 'Jolly:0/252/0/0/4/252': 36.15, 'Jolly:4/252/0/0/0/252': 20.03 }
									},
									{
										species: 'Alomomola',
										usagePercent: 30.09,
										count: 45,
										moves: { 'Flip Turn': 95.2, 'Wish': 92.4, 'Protect': 88.1, 'Scald': 45.3 },
										items: { 'Heavy-Duty Boots': 78.4, 'Leftovers': 21.6 },
										abilities: { 'Regenerator': 100.0 },
										teammates: { 'Ogerpon-Wellspring': 22.1, 'Corviknight': 18.4 },
										evSpreads: { 'Bold:252/0/252/0/4/0': 45.2 }
									},
									{
										species: 'Gengar-Ultra',
										usagePercent: 26.66,
										count: 40,
										moves: { 'Shadow Ball': 98.5, 'Sludge Wave': 78.2, 'Focus Blast': 62.4, 'Nasty Plot': 45.1 },
										items: { 'Choice Specs': 52.3, 'Life Orb': 38.2 },
										abilities: { 'Cursed Body': 100.0 },
										teammates: { 'Landorus-Therian': 28.4 },
										evSpreads: { 'Timid:0/0/0/252/4/252': 68.4 }
									},
									{
										species: 'Landorus-Therian',
										usagePercent: 24.96,
										count: 37,
										moves: { 'Earthquake': 99.1, 'U-turn': 85.4, 'Stealth Rock': 72.3, 'Stone Edge': 45.8 },
										items: { 'Rocky Helmet': 45.8, 'Leftovers': 32.1 },
										abilities: { 'Intimidate': 99.2 },
										teammates: { 'Corviknight': 32.1 },
										evSpreads: { 'Impish:252/0/252/0/4/0': 52.3 }
									},
									{
										species: 'Ironvaliant',
										usagePercent: 23.58,
										count: 35,
										moves: { 'Close Combat': 92.4, 'Moonblast': 88.2, 'Swords Dance': 65.1, 'Knock Off': 42.3 },
										items: { 'Booster Energy': 78.4 },
										abilities: { 'Quark Drive': 100.0 },
										teammates: { 'Ogerpon-Wellspring': 25.4 },
										evSpreads: { 'Jolly:0/252/0/0/4/252': 58.2 }
									}
								]
							}
						}
					}
				}
			}
		}
	};
}
