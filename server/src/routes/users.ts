import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { auth } from '../middleware/auth';

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

		// Generate JWT token
		const token = jwt.sign(
			{ userId: newUser._id.toString(), email: newUser.email },
			process.env.JWT_SECRET as string,
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
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}
		const token = jwt.sign(
			{ userId: user._id.toString(), email: user.email },
			process.env.JWT_SECRET as string,
			{ expiresIn: '1h' }
		);
		res.json({ user: { id: user._id, email: user.email }, token });
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Error logging in', error: error instanceof Error ? error.message : 'An unknown error occurred' });
	}
});

// Get user profile
router.get('/me', auth, async (req, res) => {
	res.json(req.user);
});

export default router;
