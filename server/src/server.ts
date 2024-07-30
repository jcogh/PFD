import express from 'express';
import connectDB from './utils/database';
import transactionRoutes from './routes/transactions';
import userRoutes from './routes/users';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const startServer = async () => {
	try {
		await connectDB();

		app.use('/api/transactions', transactionRoutes);
		app.use('/api/users', userRoutes);

		app.use(errorHandler);

		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
	} catch (error) {
		logger.error('Failed to start server:', error);
		process.exit(1);
	}
};

startServer();
