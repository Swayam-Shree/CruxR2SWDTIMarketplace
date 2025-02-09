import { MongoClient, ObjectId } from 'mongodb';
import type { Db, Collection, ClientSession } from 'mongodb';

const uri = process.env.MONGO_URI as string;

const mongoClient = new MongoClient(uri);

let db: Db;
export let auctionsCollection: Collection;
export let usersCollection: Collection;
export let bidSession: ClientSession;

export function getObjectId(id: string) {
	return new ObjectId(id);
}

async function setup() {
	await mongoClient.connect();

	db = mongoClient.db('SWDTI');
	auctionsCollection = db.collection('auctions');
	usersCollection = db.collection('users');
	bidSession = mongoClient.startSession();
}

setup();