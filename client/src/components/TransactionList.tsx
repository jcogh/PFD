import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTransactions, Transaction } from '../store/transactionsSlice';

const TransactionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, status } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading transactions</div>;
  }

  return (
    <div>
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((transaction: Transaction) => (
          <li key={transaction._id}>
            {transaction.description} - ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
