import mongoose, { Schema, Document } from 'mongoose';
import { encrypt, decrypt } from '../utils/encryption';
import { categorizeExpense } from '../utils/categorization';

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  description: string;
}

const TransactionSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true, set: encrypt, get: decrypt }
});

TransactionSchema.pre<ITransaction>('save', function(next) {
  if (this.isModified('description')) {
    this.category = categorizeExpense(this.description);
  }
  next();
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
