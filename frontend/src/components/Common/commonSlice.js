import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../Common/http-common';

export const getPerfumeDetail = createAsyncThunk(
  'GET_PERFUME_DETAIL',
  async (pId, { rejectWithValue }) => {
    const userId = localStorage.getItem('userId');
    const uId = userId ? userId : '';
    try {
      const response = await axios.get('/perfume', {
        params: {
          uId,
          pId,
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    currentPerfume: {},
    isError: false,
  },
  reducers: {
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: {
    [getPerfumeDetail.fulfilled]: (state, action) => {
      state.currentPerfume = action.payload.data;
    },
  },
});

export const { setIsError } = commonSlice.actions;
export default commonSlice.reducer;
