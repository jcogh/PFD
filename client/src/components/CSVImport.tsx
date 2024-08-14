import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; // Import AppDispatch
import { fetchTransactions } from '../store/transactionsSlice';

const CSVUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/import/csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    }
  };

  return (
    <div className="p-4 bg-currentLine rounded-lg">
      <h2 className="text-xl font-semibold text-cyan mb-4">Import Transactions</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple file:text-background
                  hover:file:bg-blue"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-purple text-background rounded hover:bg-blue focus:outline-none focus:ring-2 focus:ring-cyan"
      >
        Upload CSV
      </button>
      {uploadStatus && <p className="mt-2 text-sm text-cyan">{uploadStatus}</p>}
    </div>
  );
};

export default CSVUpload;
