import React from 'react';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

const transactions: Transaction[] = [
  { id: 1, date: '2023-07-01', description: 'Salary', amount: 5000, type: 'income' },
  { id: 2, date: '2023-07-02', description: 'Rent', amount: 1500, type: 'expense' },
  { id: 3, date: '2023-07-03', description: 'Groceries', amount: 200, type: 'expense' },
  { id: 4, date: '2023-07-04', description: 'Freelance Work', amount: 1000, type: 'income' },
  { id: 5, date: '2023-07-05', description: 'Utilities', amount: 150, type: 'expense' },
];

const TransactionList: React.FC = () => {
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
            <tr key={transaction.id} className="border-b border-selection">
              <td className="py-2 text-sm">{transaction.date}</td>
              <td className="py-2">{transaction.description}</td>
              <td className={`py-2 text-right ${transaction.type === 'income' ? 'text-green' : 'text-red'}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
