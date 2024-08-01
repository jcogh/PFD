import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: UserPayload;
		}
	}
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return res.status(401).send({ error: 'Please authenticate.' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
		req.user = decoded;
		next();
	} catch (e) {
		res.status(401).send({ error: 'Please authenticate.' });
	}
};
