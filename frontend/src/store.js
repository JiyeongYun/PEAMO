import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './components/AuthComponents/authSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
});

const store = configureStore({
  reducer: {
    rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
