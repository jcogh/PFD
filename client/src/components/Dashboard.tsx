import React from 'react';
import { BarChart, LineChart } from './Charts';
import TransactionList from './TransactionList';

const Dashboard: React.FC = () => {
  const barChartData = [300, 450, 600, 470, 200];
  const lineChartData = [65, 59, 80, 81, 56, 55, 40];
  const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

  return (
    <div className="min-h-screen p-6 bg-background text-magenta">
      <h1 className="mb-6 text-3xl font-bold text-purple">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-4 rounded-lg bg-currentLine">
          <h2 className="mb-4 text-xl font-semibold text-cyan">Statistics</h2>
          <BarChart
            data={barChartData}
            labels={chartLabels}
            colors={['#9ece6a', '#7aa2f7', '#bb9af7', '#f7768e', '#e0af68']}
          />
        </div>

        <div className="p-4 rounded-lg bg-currentLine">
          <h2 className="mb-4 text-xl font-semibold text-cyan">Trends</h2>
          <LineChart
            data={lineChartData}
            labels={chartLabels}
            color="#7dcfff"
          />
        </div>
      </div>

      <div className="p-4 mt-6 rounded-lg bg-currentLine">
        <h2 className="mb-4 text-xl font-semibold text-cyan">Recent Activity</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="w-2 h-2 mr-2 rounded-full bg-green"></span>
            New user registered
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 mr-2 rounded-full bg-yellow"></span>
            Report generated
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 mr-2 rounded-full bg-red"></span>
            Error in data processing
          </li>
        </ul>
      </div>

      <div className="p-4 mt-6 rounded-lg bg-currentLine">
        <h2 className="mb-4 text-xl font-semibold text-cyan">Recent Transactions</h2>
        <TransactionList />
      </div>

      <button className="px-4 py-2 mt-6 text-background bg-purple rounded hover:bg-blue focus:ring-2 focus:ring-cyan transition-colors duration-200">
        Refresh Data
      </button>
    </div>
  );
};

export default Dashboard;
