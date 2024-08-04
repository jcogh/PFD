import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTransactions, Transaction } from '../store/transactionsSlice';

const TransactionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, status, error } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading transactions...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading transactions: {error}</div>;
  }

  if (transactions.length === 0) {
    return <div>No transactions found.</div>;
  }

  return (
    <div>
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((transaction: Transaction) => (
          <li key={transaction._id}>
            {transaction.category} - ${transaction.amount} ({transaction.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
