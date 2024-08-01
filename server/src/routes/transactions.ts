import express from 'express';
import Transaction, { ITransaction } from '../models/Transaction';
import { auth as authenticateToken } from '../middleware/auth';
import { categorizeExpense } from '../utils/categorization';

const router = express.Router();

// GET all transactions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user!.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
});

// GET a specific transaction
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user!.id });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction', error });
  }
});

// POST a new transaction
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newTransaction: ITransaction = new Transaction({
      ...req.body,
      user: req.user!.id
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error creating transaction', error });
  }
});

// PUT (update) a transaction
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user!.id },
      req.body,
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
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user!.id });
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting transaction', error });
  }
});

// POST a new transaction
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const category = categorizeExpense(description);
    const newTransaction: ITransaction = new Transaction({
      amount,
      type,
      description,
      category,
      user: req.user!.id
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error creating transaction', error });
  }
});

// PUT (update) a transaction
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const category = categorizeExpense(description);
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user!.id },
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

export default router;
