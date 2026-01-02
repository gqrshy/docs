import { MongoClient, type Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

function getMongoUri(): string | undefined {
	// In Vercel serverless, process.env is available at runtime
	return process.env.MONGODB_URI;
}

function getMongoDb(): string {
	return process.env.MONGODB_DB || 'cobbleranked_api';
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db } | null> {
	const uri = getMongoUri();
	const dbName = getMongoDb();

	if (!uri) {
		console.warn('[MongoDB] MONGODB_URI not set - returning demo data');
		return null;
	}

	if (cachedClient && cachedDb) {
		console.log('[MongoDB] Using cached connection');
		return { client: cachedClient, db: cachedDb };
	}

	try {
		console.log('[MongoDB] Connecting to database:', dbName);
		const client = new MongoClient(uri);
		await client.connect();
		const db = client.db(dbName);

		cachedClient = client;
		cachedDb = db;

		console.log('[MongoDB] Connected successfully');
		return { client, db };
	} catch (error) {
		console.error('[MongoDB] Connection failed:', error);
		return null;
	}
}

export function isMongoConfigured(): boolean {
	return !!process.env.MONGODB_URI;
}
