import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './components/AuthComponents/authSlice';
import MyPageReducer from './components/MyPageComponents/myPageSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  mypage: MyPageReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
