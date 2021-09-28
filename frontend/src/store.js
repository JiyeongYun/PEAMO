import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/AuthComponents/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
