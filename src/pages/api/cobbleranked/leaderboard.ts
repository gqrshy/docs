import type { APIRoute } from 'astro';
import { connectToDatabase, isMongoConfigured } from '../../../lib/mongodb';

// Disable prerendering for this API route (server-side only)
export const prerender = false;

const API_KEY = import.meta.env.COBBLERANKED_API_KEY || process.env.COBBLERANKED_API_KEY || '';

function validateApiKey(request: Request): boolean {
	if (!API_KEY) return true;
	const providedKey = request.headers.get('X-API-Key');
	return providedKey === API_KEY;
}

// POST: Receive data from CobbleRanked server
export const POST: APIRoute = async ({ request }) => {
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
		const collection = db.collection('leaderboard');

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

		return new Response(JSON.stringify({ success: true, message: 'Leaderboard saved' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error saving leaderboard:', error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

// GET: Retrieve leaderboard for demo pages
export const GET: APIRoute = async ({ url }) => {
	const serverId = url.searchParams.get('serverId') || 'default';
	const season = url.searchParams.get('season');
	const format = url.searchParams.get('format');

	try {
		const connection = await connectToDatabase();

		if (!connection) {
			return new Response(JSON.stringify(getDemoData()), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
		}

		const { db } = connection;
		const collection = db.collection('leaderboard');

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
		let result: any;

		if (format) {
			// CobbleRanked sends: { serverId, seasonName, formats: { SINGLES: { players: [...] } } }
			if (data.formats?.[format]?.players) {
				result = {
					serverId: data.serverId,
					timestamp: data.timestamp,
					season: data.seasonName,
					format,
					players: data.formats[format].players.map((p: any) => ({
						rank: p.rank,
						uuid: p.uuid,
						name: p.playerName,
						elo: p.elo,
						tier: p.tier,
						wins: p.wins,
						losses: p.losses,
						currentStreak: p.currentStreak,
						bestStreak: p.bestStreak
					}))
				};
			}
			// Demo data format: { seasons: { Season4: { formats: { SINGLES: { players: [...] } } } } }
			else if (season && data.seasons?.[season]?.formats?.[format]?.players) {
				result = {
					serverId: data.serverId,
					timestamp: data.timestamp,
					season,
					format,
					players: data.seasons[season].formats[format].players
				};
			}
			// Format has no data - return empty players array
			else {
				result = {
					serverId: data.serverId,
					timestamp: data.timestamp,
					season: data.seasonName,
					format,
					players: []
				};
			}
		} else {
			// No format specified - return raw data
			result = data;
		}

		return new Response(JSON.stringify(result), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	} catch (error) {
		console.error('Error fetching leaderboard:', error);
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
						players: [
							{ rank: 1, uuid: '069a79f4-44e9-4726-a5be-fca90e38aaf5', name: 'Notch', elo: 2847, tier: 'CHERISH', wins: 342, losses: 28, currentStreak: 15, bestStreak: 23 },
							{ rank: 2, uuid: '61699b2e-d327-4a01-9f1e-0ea8c3f06bc6', name: 'Dinnerbone', elo: 2695, tier: 'CHERISH', wins: 298, losses: 41, currentStreak: 8, bestStreak: 19 },
							{ rank: 3, uuid: '853c80ef-3c37-49fd-aa49-938b674adae6', name: 'jeb_', elo: 2534, tier: 'CHERISH', wins: 276, losses: 52, currentStreak: 12, bestStreak: 16 },
							{ rank: 4, uuid: 'f7c77d99-9f15-4a66-a87d-c4a51ef30d19', name: 'DragonSlayer', elo: 2412, tier: 'ULTRA', wins: 245, losses: 67, currentStreak: 5, bestStreak: 14 },
							{ rank: 5, uuid: 'e6b5c088-0680-44df-9571-6bd8c1f8d6f4', name: 'PokeMaster99', elo: 2356, tier: 'ULTRA', wins: 231, losses: 72, currentStreak: 3, bestStreak: 11 },
							{ rank: 6, uuid: 'a2080281-cf1a-4c05-a9f3-3b3a9d9a8589', name: 'CompetitiveKing', elo: 2198, tier: 'ULTRA', wins: 198, losses: 89, currentStreak: 7, bestStreak: 13 },
							{ rank: 7, uuid: '3b9f9b77-8e8e-4e8c-9f8d-8f8e8e8e8e8e', name: 'BattleQueen', elo: 2087, tier: 'ULTRA', wins: 187, losses: 95, currentStreak: 2, bestStreak: 9 },
							{ rank: 8, uuid: '4c0a0a88-9f9f-5f9d-0a9e-9a9f9f9f9f9f', name: 'ThunderBolt', elo: 1956, tier: 'GREAT', wins: 165, losses: 102, currentStreak: 4, bestStreak: 8 },
							{ rank: 9, uuid: '5d1b1b99-0a0a-6a0e-1b0f-0b0a0a0a0a0a', name: 'FireStorm', elo: 1834, tier: 'GREAT', wins: 152, losses: 118, currentStreak: 1, bestStreak: 7 },
							{ rank: 10, uuid: '6e2c2c00-1b1b-7b1f-2c1a-1c1b1b1b1b1b', name: 'IceBreaker', elo: 1756, tier: 'GREAT', wins: 143, losses: 125, currentStreak: 6, bestStreak: 10 },
							{ rank: 11, uuid: '7f3d3d11-2c2c-8c2a-3d2b-2d2c2c2c2c2c', name: 'ShadowHunter', elo: 1678, tier: 'GREAT', wins: 134, losses: 132, currentStreak: 0, bestStreak: 6 },
							{ rank: 12, uuid: '8a4e4e22-3d3d-9d3b-4e3c-3e3d3d3d3d3d', name: 'LightningFury', elo: 1589, tier: 'POKE', wins: 125, losses: 141, currentStreak: 2, bestStreak: 5 },
							{ rank: 13, uuid: '9b5f5f33-4e4e-0e4c-5f4d-4f4e4e4e4e4e', name: 'NaturePower', elo: 1512, tier: 'POKE', wins: 118, losses: 148, currentStreak: 1, bestStreak: 4 },
							{ rank: 14, uuid: '0c6a6a44-5f5f-1f5d-6a5e-5a5f5f5f5f5f', name: 'RockSolid', elo: 1445, tier: 'POKE', wins: 109, losses: 155, currentStreak: 3, bestStreak: 6 },
							{ rank: 15, uuid: '1d7b7b55-6a6a-2a6e-7b6f-6b6a6a6a6a6a', name: 'WaterWave', elo: 1378, tier: 'POKE', wins: 98, losses: 162, currentStreak: 0, bestStreak: 4 },
							{ rank: 16, uuid: '2e8c8c66-7b7b-3b7f-8c7a-7c7b7b7b7b7b', name: 'WindRider', elo: 1298, tier: 'PREMIER', wins: 89, losses: 171, currentStreak: 1, bestStreak: 3 },
							{ rank: 17, uuid: '3f9d9d77-8c8c-4c8a-9d8b-8d8c8c8c8c8c', name: 'EarthShaker', elo: 1234, tier: 'PREMIER', wins: 82, losses: 178, currentStreak: 0, bestStreak: 5 },
							{ rank: 18, uuid: '4a0e0e88-9d9d-5d9b-0e9c-9e9d9d9d9d9d', name: 'SteelGuard', elo: 1178, tier: 'PREMIER', wins: 75, losses: 185, currentStreak: 2, bestStreak: 4 },
							{ rank: 19, uuid: '5b1f1f99-0e0e-6e0c-1f0d-0f0e0e0e0e0e', name: 'PsychicMind', elo: 1123, tier: 'PREMIER', wins: 68, losses: 192, currentStreak: 1, bestStreak: 3 },
							{ rank: 20, uuid: '6c2a2a00-1f1f-7f1d-2a1e-1a1f1f1f1f1f', name: 'DarkKnight', elo: 1067, tier: 'PREMIER', wins: 61, losses: 199, currentStreak: 0, bestStreak: 2 }
						]
					}
				}
			}
		}
	};
}
