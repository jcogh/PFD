import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
