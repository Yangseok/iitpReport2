import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedList: [],

  bigIct: '',
  middleIct: '',
  smallIct: '',
  detailIct: '',

  bigIctTmp: '',
  middleIctTmp: '',
  smallIctTmp: '',
  detailIctTmp: '',

  bigIctList: [],
  middleIctList: [],
  smallIctList: [],
  detailIctList: [],

  startYear: 0,
  endYear: 0,
};

export const demandSlice = createSlice({
  name: 'demand',
  initialState,
  reducers: {
    setSelectedList: (state, action) => {
      state.selectedList = action.payload;
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
    setDetailIct: (state, action) => {
      state.detailIct = action.payload;
    },

    setBigIctTmp: (state, action) => {
      state.bigIctTmp = action.payload;
    },
    setMiddleIctTmp: (state, action) => {
      state.middleIctTmp = action.payload;
    },
    setSmallIctTmp: (state, action) => {
      state.smallIctTmp = action.payload;
    },
    setDetailIctTmp: (state, action) => {
      state.detailIctTmp = action.payload;
    },

    setBigIctList: (state, action) => {
      state.bigIctList = action.payload;
    },
    setMiddleIctList: (state, action) => {
      state.middleIctList = action.payload;
    },
    setSmallIctList: (state, action) => {
      state.smallIctList = action.payload;
    },
    setDetailIctList: (state, action) => {
      state.detailIctList = action.payload;
    },

    setStartYear: (state, action) => {
      state.startYear = action.payload;
    },
    setEndYear: (state, action) => {
      state.endYear = action.payload;
    },
  },
});

export const { setSelectedList, setBigIct, setMiddleIct, setSmallIct, setDetailIct, setBigIctTmp, setMiddleIctTmp, setSmallIctTmp, setDetailIctTmp, setBigIctList, setMiddleIctList, setSmallIctList, setDetailIctList, setStartYear, setEndYear } = demandSlice.actions;

export const getSelectedList = (state) => state.demand.selectedList;
export const getBigIct = (state) => state.demand.bigIct;
export const getMiddleIct = (state) => state.demand.middleIct;
export const getSmallIct = (state) => state.demand.smallIct;
export const getDetailIct = (state) => state.demand.detailIct;
export const getBigIctTmp = (state) => state.demand.bigIctTmp;
export const getMiddleIctTmp = (state) => state.demand.middleIctTmp;
export const getSmallIctTmp = (state) => state.demand.smallIctTmp;
export const getDetailIctTmp = (state) => state.demand.detailIctTmp;
export const getBigIctList = (state) => state.demand.bigIctList;
export const getMiddleIctList = (state) => state.demand.middleIctList;
export const getSmallIctList = (state) => state.demand.smallIctList;
export const getDetailIctList = (state) => state.demand.detailIctList;
export const getStartYear = (state) => state.demand.startYear;
export const getEndYear = (state) => state.demand.endYear;

export default demandSlice.reducer;