import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  api.post('/users/login', { email, password });

export const register = (name: string, email: string, password: string) =>
  api.post('/users/register', { name, email, password });

export const fetchTransactions = () =>
  api.get('/transactions');

export const createTransaction = (transactionData: any) =>
  api.post('/transactions', transactionData);

export const updateTransaction = (id: string, transactionData: any) =>
  api.put(`/transactions/${id}`, transactionData);

export const deleteTransaction = (id: string) =>
  api.delete(`/transactions/${id}`);

export default api;
