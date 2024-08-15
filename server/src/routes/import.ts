import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import { auth } from '../middleware/auth';
import Transaction from '../models/Transaction';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/csv', auth, upload.single('file'), async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: 'No file uploaded' });
	}

	const results: any[] = [];

	try {
		await new Promise<void>((resolve, reject) => {
			fs.createReadStream(req.file!.path)
				.pipe(csv())
				.on('data', (data) => results.push(data))
				.on('end', () => resolve())
				.on('error', (error) => reject(error));
		});

		const transactions = results.map((row) => ({
			user: req.user!.userId,
			amount: parseFloat(row.amount),
			type: row.type,
			category: row.category,
			date: new Date(row.date),
			description: row.description
		}));

		await Transaction.insertMany(transactions);

		fs.unlinkSync(req.file!.path);

		res.status(200).json({ message: 'CSV imported successfully', count: transactions.length });
	} catch (error) {
		console.error('Error importing CSV:', error);
		res.status(500).json({ message: 'Error importing CSV', error: error instanceof Error ? error.message : 'An unknown error occurred' });
	}
});

export default router;
