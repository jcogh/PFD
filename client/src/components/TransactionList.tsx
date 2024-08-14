import React from 'react';

interface Transaction {
  _id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-4 text-comment">
        No transactions available. Please upload a CSV file to see transactions.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-selection">
            <th className="pb-2 text-sm font-semibold text-comment">Date</th>
            <th className="pb-2 text-sm font-semibold text-comment">Description</th>
            <th className="pb-2 text-sm font-semibold text-comment text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="border-b border-selection">
              <td className="py-2 text-sm">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="py-2">{transaction.description}</td>
              <td className={`py-2 text-right ${transaction.type === 'income' ? 'text-green' : 'text-red'}`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
