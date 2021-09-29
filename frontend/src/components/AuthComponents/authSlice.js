import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../Common/http-common';

export const login = createAsyncThunk(
  'LOGIN',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/oauth2/authorization/kakao', {
        params: {
          code,
        },
      });
      localStorage.setItem('token', response.data.access_token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  'LOGOUT',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/logout');
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
