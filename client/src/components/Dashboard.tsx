import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TransactionList from './TransactionList';
import Charts from './Charts';
import { RootState, AppDispatch } from '../store';
import { fetchTransactions } from '../store/transactionsSlice';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, status, error } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Financial Dashboard</h1>
      {transactions.length > 0 ? (
        <>
          <Charts />
          <TransactionList />
        </>
      ) : (
        <p>No transactions found. Add some transactions to see your financial data!</p>
      )}
    </div>
  );
};

export default Dashboard;
