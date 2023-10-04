import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  ictKeyword: '',

  startYear: 0,
  endYear: 0,
  singleYear: 0,
};

export const ictTrendSlice = createSlice({
  name: 'ictTrend',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setIctKeyword: (state, action) => {
      state.ictKeyword = action.payload;
    },
    
    setStartYear: (state, action) => {
      state.startYear = action.payload;
    },
    setEndYear: (state, action) => {
      state.endYear = action.payload;
    },
    setSingleYear: (state, action) => {
      state.singleYear = action.payload;
    },
  },
});

export const { setCategory, setIctKeyword, setStartYear, setEndYear, setSingleYear } = ictTrendSlice.actions;

export const getCategory = (state) => state.ictTrend.category;
export const getIctKeyword = (state) => state.ictTrend.ictKeyword;
export const getStartYear = (state) => state.ictTrend.startYear;
export const getEndYear = (state) => state.ictTrend.endYear;
export const getSingleYear = (state) => state.ictTrend.singleYear;

export default ictTrendSlice.reducer;