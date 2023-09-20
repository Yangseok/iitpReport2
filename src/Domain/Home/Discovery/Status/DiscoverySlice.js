import { createSlice } from '@reduxjs/toolkit';
import { items } from 'Domain/Home/Discovery/Data/FilterItems';

const initialState = {
  filterActive: items,
  searchDetailData: {},
  fileName: null,
  fileKeywordList: [],
};

export const discoverySlice = createSlice({
  name: 'discovery',
  initialState,
  reducers: {
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

export const { setFilterActive, setSearchDetailData, setFileKeywordList, setFileName } = discoverySlice.actions;

export const getFilterActive = (state) => state.discovery.filterActive;
export const getSearchDetailData = (state) => state.discovery.searchDetailData;
export const getFileKeywordList = (state) => state.discovery.fileKeywordList;
export const getFileName = (state) => state.discovery.fileName;

export default discoverySlice.reducer;