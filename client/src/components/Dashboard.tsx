import React from 'react';
import TransactionList from './TransactionList';
import Charts from './Charts';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Financial Dashboard</h1>
      <Charts />
      <TransactionList />
    </div>
  );
};

export default Dashboard;
