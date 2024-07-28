import mongoose, { Schema, Document } from 'mongoose';

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
  description: { type: String, required: true }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
