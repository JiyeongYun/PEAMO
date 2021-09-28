import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'LOGIN',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/user/oauth2/authorization/kakao',
        {
          params: {
            code,
          },
        }
      );
      localStorage.setItem('token', response.data);
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
      const response = await axios.get('/v1/user/logout', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
