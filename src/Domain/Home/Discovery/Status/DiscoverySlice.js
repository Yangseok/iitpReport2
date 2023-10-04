import { createSlice } from '@reduxjs/toolkit';
import { items } from 'Domain/Home/Discovery/Data/FilterItems';

const initialState = {
  filterActive: items,
  searchDetailData: {},
  initalFilter: false,
  initalSearch: false,  
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
    setInitalFilter:  (state, action) => {
      state.initalFilter = action.payload;
    },
    setInitalSearch:  (state, action) => {
      state.initalSearch = action.payload;
    },
  },
});

export const { setFilterActive, setSearchDetailData, setInitalFilter, setInitalSearch } = discoverySlice.actions;

export const getFilterActive = (state) => state.discovery.filterActive;
export const getSearchDetailData = (state) => state.discovery.searchDetailData;
export const getInitalFilter = (state) => state.discovery.initalFilter;
export const getInitalSearch = (state) => state.discovery.initalSearch;

export default discoverySlice.reducer;