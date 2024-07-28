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

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
		if (err) return res.sendStatus(403);
		req.user = user as UserPayload;
		next();
	});
};
