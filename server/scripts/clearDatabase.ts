// server/scripts/clearDatabase.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
const result = dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

if (result.error) {
	console.error('Error loading .env file:', result.error);
}

console.log('Loaded environment variables:', process.env);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const clearDatabase = async () => {
	if (!process.env.MONGODB_URI) {
		console.error('MONGODB_URI is not defined in the environment variables');
		return;
	}

	try {
		console.log('Attempting to connect to database...');
		await mongoose.connect(process.env.MONGODB_URI);

		console.log('Connected to the database');

		// Get all collections
		const collections = await mongoose.connection.db.collections();

		// Loop through each collection and delete all documents
		for (let collection of collections) {
			const deleted = await collection.deleteMany({});
			console.log(`Cleared ${deleted.deletedCount} documents from ${collection.collectionName}`);
		}

		console.log('All collections have been cleared');
	} catch (error) {
		console.error('Error clearing the database:', error);
	} finally {
		await mongoose.connection.close();
		console.log('Database connection closed');
	}
};

clearDatabase();
