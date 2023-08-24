import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  searchKeyword: '',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    }
  },
});

export const { setLoading, setSearchKeyword } = commonSlice.actions;
export const getLoading = (state) => state.common.loading;
export const getSearchKeyword = (state) => state.common.searchKeyword;
export default commonSlice.reducer;
