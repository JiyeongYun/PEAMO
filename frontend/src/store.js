import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './components/AuthComponents/authSlice';
import MyPageReducer from './components/MypageComponents/myPageSlice';
import CommonReducer from './components/Common/commonSlice';
import TellerReducer from './components/TellerComponents/TellerSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  mypage: MyPageReducer,
  common: CommonReducer,
  teller: TellerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
