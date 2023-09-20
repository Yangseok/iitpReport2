import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  searchKeyword: '',
  tmpSearchKeyword: '',
  selectKeyword: {},
  searchKeywordResult: {},
  searchKeywordReset: false,
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
    setTmpSearchKeyword: (state, action) => {
      state.tmpSearchKeyword = action.payload;
    },
    setSelectKeyword: (state, action) => {
      state.selectKeyword = action.payload;
    },
    setSearchKeywordResult: (state, action) => {
      state.searchKeywordResult = action.payload;
    },
    setSearchKeywordReset: (state, action) => {
      state.searchKeywordReset = action.payload;
    },
  },
});

export const { setLoading, setSearchKeyword, setSelectKeyword, setSearchKeywordResult, setSearchKeywordReset, setTmpSearchKeyword } = commonSlice.actions;

export const getLoading = (state) => state.common.loading;
export const getSearchKeyword = (state) => state.discovery.searchKeyword;
export const getTmpSearchKeyword = (state) => state.discovery.tmpSearchKeyword;
export const getSelectKeyword = (state) => state.discovery.selectKeyword;
export const getSearchKeywordResult = (state) => state.discovery.searchKeywordResult;
export const getSearchKeywordReset = (state) => state.discovery.searchKeywordReset;

export default commonSlice.reducer;
