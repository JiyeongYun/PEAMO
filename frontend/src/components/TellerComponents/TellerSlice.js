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

const tellerSlice = createSlice({
  name: 'teller',
  initialState: {
    season: null,
    gender: null,
    mainCategory: null,
    subCategory: null,
    dislikeCategory: null,
  },
  reducers: {
    addSeason(state, action) {
      state.season = action.payload;
    },
    addGender(state, action) {
      state.gender = action.payload;
    },
    addMainCategory(state, action) {
      state.mainCategory = action.payload;
    },
    addSubCategory(state, action) {
      state.subCategory = action.payload;
    },
    addDislikeCategory(state, action) {
      state.dislikeCategory = action.payload;
    },
  },
});

export const {
  addSeason,
  addGender,
  addMainCategory,
  addSubCategory,
  addDislikeCategory,
} = tellerSlice.actions;

export default tellerSlice.reducer;
