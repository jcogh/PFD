import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { auth } from '../middleware/auth';
import crypto from 'crypto';

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const jwtSecret = crypto.randomBytes(64).toString('hex');
		const encryptionKey = crypto.randomBytes(32).toString('hex');

		const newUser = new User({
			name,
			email,
			password,
			jwtSecret,
			encryptionKey
		});
		await newUser.save();

		const token = jwt.sign(
			{ userId: newUser._id.toString(), email: newUser.email },
			jwtSecret,
			{ expiresIn: '1h' }
		);

		res.status(201).json({ message: 'User registered successfully', token });
	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).json({ message: 'Error registering user', error: error instanceof Error ? error.message : 'An unknown error occurred' });
	}
});

// User login
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || !(await user.comparePassword(password))) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ userId: user._id.toString() },
			user.jwtSecret, // Make sure you're using the user-specific JWT secret
			{ expiresIn: '1h' }
		);

		console.log('Generated token:', token);
		res.json({ user: { id: user._id, email: user.email }, token });
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Error logging in' });
	}
});

// Get user profile
router.get('/me', auth, async (req, res) => {
	res.json(req.user);
});

export default router;
