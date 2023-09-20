import { createSlice } from '@reduxjs/toolkit';
import { items } from 'Domain/Home/Discovery/Data/FilterItems';

const initialState = {
  searchKeyword: '',
  tmpSearchKeyword: '',
  selectKeyword: {},
  searchKeywordResult: {},
  searchKeywordReset: false,
  filterActive: items,
  searchDetailData: {},
  fileName: null,
  fileKeywordList: [],
};

export const discoverySlice = createSlice({
  name: 'discovery',
  initialState,
  reducers: {
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
    setFileKeywordList:  (state, action) => {
      state.fileKeywordList = action.payload;
    },
    setFileName:  (state, action) => {
      state.fileName = action.payload;
    },
  },
});

export const { setSearchKeyword, setSelectKeyword, setSearchKeywordResult, setSearchKeywordReset, setTmpSearchKeyword, setFilterActive, setSearchDetailData, setFileKeywordList, setFileName } = discoverySlice.actions;

export const getSearchKeyword = (state) => state.discovery.searchKeyword;
export const getTmpSearchKeyword = (state) => state.discovery.tmpSearchKeyword;
export const getSelectKeyword = (state) => state.discovery.selectKeyword;
export const getSearchKeywordResult = (state) => state.discovery.searchKeywordResult;
export const getSearchKeywordReset = (state) => state.discovery.searchKeywordReset;
export const getFilterActive = (state) => state.discovery.filterActive;
export const getSearchDetailData = (state) => state.discovery.searchDetailData;
export const getFileKeywordList = (state) => state.discovery.fileKeywordList;
export const getFileName = (state) => state.discovery.fileName;

export default discoverySlice.reducer;