import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fileName: null,
  fileKeywordList: [],

  projectTitle: '',
  keywordKor: '',
  keywordEng: '',
  researchGoal: '',
  researchDescription: '',
  expectationEffectiveness: '',
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

    setProjectTitle:  (state, action) => {
      state.projectTitle = action.payload;
    },
    setKeywordKor:  (state, action) => {
      state.keywordKor = action.payload;
    },
    setKeywordEng:  (state, action) => {
      state.keywordEng = action.payload;
    },
    setResearchGoal:  (state, action) => {
      state.researchGoal = action.payload;
    },
    setResearchDescription:  (state, action) => {
      state.researchDescription = action.payload;
    },
    setExpectationEffectiveness:  (state, action) => {
      state.expectationEffectiveness = action.payload;
    },
  },
});

export const { setFileKeywordList, setFileName, setProjectTitle, setKeywordKor, setKeywordEng, setResearchGoal, setResearchDescription, setExpectationEffectiveness } = discoverySaveSlice.actions;

export const getFileKeywordList = (state) => state.discoverySave.fileKeywordList;
export const getFileName = (state) => state.discoverySave.fileName;

export const getProjectTitle = (state) => state.discoverySave.projectTitle;
export const getKeywordKor = (state) => state.discoverySave.keywordKor;
export const getKeywordEng = (state) => state.discoverySave.keywordEng;
export const getResearchGoal = (state) => state.discoverySave.researchGoal;
export const getResearchDescription = (state) => state.discoverySave.researchDescription;
export const getExpectationEffectiveness = (state) => state.discoverySave.expectationEffectiveness;

export default discoverySaveSlice.reducer;