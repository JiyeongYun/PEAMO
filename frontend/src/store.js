import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './components/AuthComponents/authSlice';
import CommonReducer from './components/Common/commonSlice';
import TellerReducer from './components/TellerComponents/TellerSlice';
import MypageReducer from './components/MypageComponents/mypageSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  common: CommonReducer,
  teller: TellerReducer,
  mypage: MypageReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
