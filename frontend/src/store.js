import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './components/AuthComponents/authSlice';
import MyPageReducer from './components/MypageComponents/MyPageSlice';
import TellerSlice from './components/TellerComponents/TellerSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  mypage: MyPageReducer,
  teller: TellerSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
