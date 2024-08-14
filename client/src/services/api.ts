import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
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

export default api;
