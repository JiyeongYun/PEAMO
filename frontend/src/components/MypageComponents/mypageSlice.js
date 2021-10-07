import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../Common/http-common';

export const getMyPerfume = createAsyncThunk(
  'GET_MY_PERFUME',
  async (_, { rejectWithValue }) => {
    const uid = localStorage.getItem('userId');
    try {
      const response = await axios.post('/user/mypage', {
        uid,
      });
      return response;
    } catch (error) {
      return error;
    }
  }
);

const mypageSlice = createSlice({
  name: 'mypage',
  initialState: {
    myPerfume: [],
  },
  extraReducers: {
    [getMyPerfume.fulfilled]: (state, action) => {
      state.myPerfume = action.payload.data.perfumeList;
    },
  },
});

export default mypageSlice.reducer;
