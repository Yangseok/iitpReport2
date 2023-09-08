import { createSlice } from '@reduxjs/toolkit';
import { items } from 'Domain/Home/Discovery/Data/FilterItems';

const initialState = {
  loading: false,
  searchKeyword: '',
  tmpSearchKeyword: '',
  selectKeyword: {},
  searchKeywordResult: {},
  searchKeywordReset: false,
  filterActive: items,
  searchDetailData: {},
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
    setFilterActive:  (state, action) => {
      state.filterActive = action.payload;
    },
    setSearchDetailData:  (state, action) => {
      state.searchDetailData = action.payload;
    },
  },
});

export const { setLoading, setSearchKeyword, setSelectKeyword, setSearchKeywordResult, setSearchKeywordReset, setTmpSearchKeyword, setFilterActive, setSearchDetailData } = commonSlice.actions;
export const getLoading = (state) => state.common.loading;
export const getSearchKeyword = (state) => state.common.searchKeyword;
export const getTmpSearchKeyword = (state) => state.common.tmpSearchKeyword;
export const getSelectKeyword = (state) => state.common.selectKeyword;
export const getSearchKeywordResult = (state) => state.common.searchKeywordResult;
export const getSearchKeywordReset = (state) => state.common.searchKeywordReset;
export const getFilterActive = (state) => state.common.filterActive;
export const getSearchDetailData = (state) => state.common.searchDetailData;
export default commonSlice.reducer;
