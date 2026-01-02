import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "cobbleranked_api";
if (!MONGODB_URI) {
  console.warn("MONGODB_URI not set - API will return demo data");
}
let cachedClient = null;
let cachedDb = null;
async function connectToDatabase() {
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

export { connectToDatabase as c };
