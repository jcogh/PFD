import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchTransactions } from '../store/transactionsSlice';

const API_URL = process.env.REACT_APP_API_URL;

const CSVImport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

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
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);

      const response = await axios.post(`${API_URL}/api/import/csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('CSV upload response:', response.data);
      setUploadStatus(`Upload successful. ${response.data.count} transactions imported.`);
      dispatch(fetchTransactions());
    } catch (error: any) {
      console.error('Error uploading CSV:', error.response?.data || error.message);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default CSVImport;
