import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../Common/http-common';

export const getPerfumeDetail = createAsyncThunk(
  'GET_PERFUME_DETAIL',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get('/perfume', {
        params: {
          id,
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
  },
  extraReducers: {
    [getPerfumeDetail.fulfilled]: (state, action) => {
      state.currentPerfume = action.payload.data;
    },
  },
});

export default commonSlice.reducer;
