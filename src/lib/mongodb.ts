import { MongoClient, type Db } from 'mongodb';

const MONGODB_URI = import.meta.env.MONGODB_URI || process.env.MONGODB_URI;
const MONGODB_DB = import.meta.env.MONGODB_DB || process.env.MONGODB_DB || 'cobbleranked_api';

if (!MONGODB_URI) {
	console.warn('MONGODB_URI not set - API will return demo data');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db } | null> {
	if (!MONGODB_URI) {
		return null;
	}

	if (cachedClient && cachedDb) {
		return { client: cachedClient, db: cachedDb };
	}

	const client = new MongoClient(MONGODB_URI);
	await client.connect();
	const db = client.db(MONGODB_DB);

	cachedClient = client;
	cachedDb = db;

	return { client, db };
}

export function isMongoConfigured(): boolean {
	return !!MONGODB_URI;
}
