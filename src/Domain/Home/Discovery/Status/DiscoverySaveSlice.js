import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fileName: null,
  fileKeywordList: [],
};

export const discoverySaveSlice = createSlice({
  name: 'discoverySave',
  initialState,
  reducers: {
    setFileKeywordList:  (state, action) => {
      state.fileKeywordList = action.payload;
    },
    setFileName:  (state, action) => {
      state.fileName = action.payload;
    },
  },
});

export const { setFileKeywordList, setFileName } = discoverySaveSlice.actions;

export const getFileKeywordList = (state) => state.discoverySave.fileKeywordList;
export const getFileName = (state) => state.discoverySave.fileName;

export default discoverySaveSlice.reducer;