import express from 'express';
import Transaction from '../models/Transaction';
import { auth } from '../middleware/auth';
import { categorizeExpense } from '../utils/categorization';
import logger from '../utils/logger';

const router = express.Router();

// GET all transactions
router.get('/', auth, async (req, res) => {
  logger.info('GET /api/transactions request received');
  try {
    const transactions = await Transaction.find({ user: req.user!.userId });
    logger.info(`Found ${transactions.length} transactions`);
    res.json(transactions);
  } catch (error) {
    logger.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
});

// GET a specific transaction
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user!.userId });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction', error });
  }
});

// POST a new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const category = categorizeExpense(description);
    const newTransaction = new Transaction({
      amount,
      type,
      description,
      category,
      user: req.user!.userId
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error creating transaction', error });
  }
});

// PUT (update) a transaction
router.put('/:id', auth, async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const category = categorizeExpense(description);
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user!.userId },
      { amount, type, description, category },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating transaction', error });
  }
});

// DELETE a transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user!.userId });
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting transaction', error });
  }
});

export default router;
