import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		// Create new user
		const newUser = new User({ name, email, password });
		await newUser.save();

		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error registering user', error });
	}
});

// User login
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// Check password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// Create and sign JWT
		const token = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET as string,
			{ expiresIn: '1h' }
		);

		res.json({ token, userId: user._id });
	} catch (error) {
		res.status(500).json({ message: 'Error logging in', error });
	}
});

export default router;
