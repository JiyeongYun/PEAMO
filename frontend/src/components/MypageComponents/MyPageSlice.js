import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../Common/http-common';

export const getMyPerfume = createAsyncThunk(
  'GET_MY_PERFUME',
  async (_, { rejectWithValue }) => {
    try {
      const uid = localStorage.getItem('userId');
      const response = axios.post('/user/mypage', {
        uid,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const myPageSlice = createSlice({
  name: 'myPage',
  initialState: {
    myPerfume: [],
  },
  extraReducers: {
    [getMyPerfume.fulfilled]: (state, action) => {
      state.myPerfume = action.payload.data.perfumeList;
    },
  },
});

export default myPageSlice.reducer;
