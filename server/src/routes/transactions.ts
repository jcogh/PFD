import express from 'express';
import Transaction, { ITransaction } from '../models/Transaction';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all transactions for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user!.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
});

// Add a new transaction
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

// Update a transaction
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

// Delete a transaction
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

export default router;
