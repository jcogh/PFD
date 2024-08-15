import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface UserPayload {
	userId: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: UserPayload;
			jwtSecret?: string;
			encryptionKey?: string;
		}
	}
}

export const auth = async (req: any, res: any, next: any) => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '');
		console.log('Received token:', token);

		if (!token) {
			throw new Error('No token provided');
		}

		// First, decode the token without verification to get the userId
		const decoded = jwt.decode(token);
		if (!decoded || typeof decoded === 'string' || !decoded.userId) {
			throw new Error('Invalid token structure');
		}

		// Find the user and get their specific JWT secret
		const user = await User.findById(decoded.userId);
		if (!user) {
			throw new Error('User not found');
		}

		// Now verify the token with the user-specific secret
		const verified = jwt.verify(token, user.jwtSecret);
		console.log('Verified token payload:', verified);

		req.user = { userId: user._id.toString(), email: user.email };
		req.token = token;
		next();
	} catch (error: any) {
		console.error('Auth error:', error.message);
		res.status(401).send({ error: 'Please authenticate.' });
	}
};
