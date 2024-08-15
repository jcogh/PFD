import axios from 'axios';
import { store } from '../store'; // Make sure this path is correct

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// In api.ts
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    console.log('Current token in interceptor:', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchTransactions = async () => {
  console.log('Fetching transactions from:', `${API_URL}/transactions`);
  return api.get('/transactions')
    .then(response => {
      console.log('Transactions fetched successfully:', response.data);
      return response;
    })
    .catch(error => {
      console.error('Error fetching transactions:', error);
      throw error;
    });
};

export const login = (email: string, password: string) =>
  api.post('/users/login', { email, password });

export const register = (name: string, email: string, password: string) =>
  api.post('/users/register', { name, email, password });

export const createTransaction = (transactionData: any) =>
  api.post('/transactions', transactionData);

export const updateTransaction = (id: string, transactionData: any) =>
  api.put(`/transactions/${id}`, transactionData);

export const deleteTransaction = (id: string) =>
  api.delete(`/transactions/${id}`);

export const importCSV = (formData: FormData) =>
  api.post('/import/csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export default api;
