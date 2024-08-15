import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { RootState, AppDispatch } from '../store';
import { fetchTransactions } from '../store/transactionsSlice';
import { logout } from '../store/authSlice';
import { BarChart, LineChart } from './Charts';
import TransactionList from './TransactionList';

const Dashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { transactions, status } = useSelector((state: RootState) => state.transactions);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  const barChartData = [300, 450, 600, 470, 200];
  const lineChartData = [65, 59, 80, 81, 56, 55, 40];
  const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !token) {
      setUploadStatus('Please select a file and ensure you are logged in.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/api/import/csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setUploadStatus(`Upload successful. ${response.data.count} transactions imported.`);
      dispatch(fetchTransactions());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setUploadStatus(`Upload failed: ${error.response?.data?.message || error.message}`);
      } else {
        setUploadStatus('Upload failed. Please try again.');
      }
      console.error('Error uploading CSV:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-6 bg-background text-magenta">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-background bg-purple rounded hover:bg-blue focus:outline-none focus:ring-2 focus:ring-cyan transition-colors duration-200"
        >
          Logout
        </button>
      </div>

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
        <h2 className="mb-4 text-xl font-semibold text-cyan">Import Transactions</h2>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={isUploading}
            className="text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-purple file:text-background
                      hover:file:bg-blue"
          />
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="px-4 py-2 text-background bg-purple rounded hover:bg-blue focus:ring-2 focus:ring-cyan transition-colors duration-200 disabled:opacity-50"
          >
            Upload CSV
          </button>
        </div>
        {uploadStatus && <p className="mt-2 text-sm text-cyan">{uploadStatus}</p>}
      </div>

      <div className="p-4 mt-6 rounded-lg bg-currentLine">
        <h2 className="mb-4 text-xl font-semibold text-cyan">Recent Transactions</h2>
        <TransactionList transactions={transactions} />
      </div>

      <button
        onClick={() => dispatch(fetchTransactions())}
        className="px-4 py-2 mt-6 text-background bg-purple rounded hover:bg-blue focus:ring-2 focus:ring-cyan transition-colors duration-200"
      >
        Refresh Data
      </button>
    </div>
  );
};

export default Dashboard;
