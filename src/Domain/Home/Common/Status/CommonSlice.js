import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = commonSlice.actions;
export const getLoading = (state) => state.common.loading;
export default commonSlice.reducer;
