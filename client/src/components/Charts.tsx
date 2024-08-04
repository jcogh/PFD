import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Transaction } from '../store/transactionsSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Charts: React.FC = () => {
  const { transactions, status } = useSelector((state: RootState) => state.transactions);

  if (status === 'loading') {
    return <div>Loading chart data...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading chart data</div>;
  }

  if (transactions.length === 0) {
    return <div>No transaction data available for chart</div>;
  }

  const chartData = transactions.reduce((acc: Record<string, number>, transaction: Transaction) => {
    const category = transaction.category;
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {});

  const data = Object.entries(chartData).map(([category, amount]) => ({ category, amount }));

  return (
    <div>
      <h2>Expense by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
