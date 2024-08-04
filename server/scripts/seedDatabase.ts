import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User';
import Transaction from '../src/models/Transaction';
import { encrypt } from '../src/utils/encryption';

dotenv.config();

const sampleTransactions = [
	{ amount: 1000, type: 'income', description: 'Salary', category: 'Work' },
	{ amount: 500, type: 'expense', description: 'Rent', category: 'Housing' },
	{ amount: 50, type: 'expense', description: 'Groceries', category: 'Food' },
	{ amount: 30, type: 'expense', description: 'Gas', category: 'Transportation' },
	{ amount: 100, type: 'expense', description: 'Electric Bill', category: 'Utilities' },
	{ amount: 200, type: 'income', description: 'Freelance Work', category: 'Work' },
	{ amount: 60, type: 'expense', description: 'Dinner', category: 'Food' },
	{ amount: 80, type: 'expense', description: 'Mobile Phone', category: 'Utilities' },
	{ amount: 150, type: 'expense', description: 'New Clothes', category: 'Shopping' },
	{ amount: 40, type: 'expense', description: 'Movie Night', category: 'Entertainment' },
];

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log('Connected to MongoDB');

		// Clear existing data
		await User.deleteMany({});
		await Transaction.deleteMany({});

		// Create a test user
		const user = new User({
			name: 'Test User',
			email: 'test@example.com',
			password: 'password123'
		});
		await user.save();
		console.log('Test user created');

		// Create transactions for the test user
		const transactions = sampleTransactions.map(transaction => ({
			...transaction,
			user: user._id,
			description: encrypt(transaction.description),
			date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Random date within last 30 days
		}));

		await Transaction.insertMany(transactions);
		console.log(`${transactions.length} sample transactions created`);

		console.log('Database seeded successfully');
	} catch (error) {
		console.error('Error seeding database:', error);
	} finally {
		await mongoose.disconnect();
		console.log('Disconnected from MongoDB');
	}
};

seedDatabase();
