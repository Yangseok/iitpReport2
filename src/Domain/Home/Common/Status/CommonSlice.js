import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  searchKeyword: '',
  selectKeyword: {},
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
    },
    setSelectKeyword: (state, action) => {
      state.selectKeyword = action.payload;
    }
  },
});

export const { setLoading, setSearchKeyword, setSelectKeyword } = commonSlice.actions;
export const getLoading = (state) => state.common.loading;
export const getSearchKeyword = (state) => state.common.searchKeyword;
export const getSelectKeyword = (state) => state.common.selectKeyword;
export default commonSlice.reducer;
