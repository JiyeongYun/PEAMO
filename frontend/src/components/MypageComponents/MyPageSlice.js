import { createSlice } from '@reduxjs/toolkit';

// export const getMyPerfume = createAsyncThunk('GET_MY_PERFUME', async (data, {rejectWithValue}) => {
//     try {
// const response = axios.

const myPageSlice = createSlice({
  name: 'myPage',
  initialState: {},
  extraReducers: {},
});

export default myPageSlice.reducer;
