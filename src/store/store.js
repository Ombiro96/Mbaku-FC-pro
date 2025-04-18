import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tournamentsReducer from '../features/auth/tournamentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tournaments: tournamentsReducer,
  },
});