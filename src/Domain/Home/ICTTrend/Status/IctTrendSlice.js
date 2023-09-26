import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',

  keywordTrend: '',
  startYear: 0,
  endYear: 0,

  bigIct: '',
  middleIct: '',
  smallIct: '',

  issueKeyword: '',
  singleYear: 0,
};

export const ictTrendSlice = createSlice({
  name: 'ictTrend',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    
    setKeywordTrend: (state, action) => {
      state.keywordTrend = action.payload;
    },
    setStartYear: (state, action) => {
      state.startYear = action.payload;
    },
    setEndYear: (state, action) => {
      state.endYear = action.payload;
    },
    
    setBigIct: (state, action) => {
      state.bigIct = action.payload;
    },
    setMiddleIct: (state, action) => {
      state.middleIct = action.payload;
    },
    setSmallIct: (state, action) => {
      state.smallIct = action.payload;
    },
    
    setIssueKeyword: (state, action) => {
      state.issueKeyword = action.payload;
    },
    setSingleYear: (state, action) => {
      state.singleYear = action.payload;
    },
  },
});

export const { setCategory, setKeywordTrend, setStartYear, setEndYear, setBigIct, setMiddleIct, setSmallIct, setIssueKeyword, setSingleYear } = ictTrendSlice.actions;

export const getCategory = (state) => state.ictTrend.category;
export const getKeywordTrend = (state) => state.ictTrend.keywordTrend;
export const getStartYear = (state) => state.ictTrend.startYear;
export const getEndYear = (state) => state.ictTrend.endYear;
export const getBigIct = (state) => state.ictTrend.bigIct;
export const getMiddleIct = (state) => state.ictTrend.middleIct;
export const getSmallIct = (state) => state.ictTrend.smallIct;
export const getIssueKeyword = (state) => state.ictTrend.issueKeyword;
export const getSingleYear = (state) => state.ictTrend.singleYear;

export default ictTrendSlice.reducer;