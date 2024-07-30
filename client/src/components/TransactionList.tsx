import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../store/transactionSlice';
import { RootState, AppDispatch } from '../store';

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

  return (
    <div className="transaction-list">
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.description} - ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
