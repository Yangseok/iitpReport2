import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '알림',
  msg: '',
  btnCss: ["inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"],
  btnTxt: ["확인"],
  btnEvent: [],
  show: false,
};

export const msgSlice = createSlice({
  name: 'msg',
  initialState,
  reducers: {
    setMsg: (state, action) => {
      state.title = action.payload?.title ?? '알림';
      state.msg = action.payload?.msg ?? '';
      state.btnCss = action.payload?.btnCss ?? [];
      state.btnTxt = action.payload?.btnTxt ?? ["확인"];
      state.btnEvent = action.payload?.btnEvent ?? [];
    },
    setShow: (state, action) => {
      state.show = action.payload;
    }
  },
});

export const { setMsg, setShow } = msgSlice.actions;
export const getShow = (state) => state.msg.show;
export const getMsg = (state) => state.msg;
export default msgSlice.reducer;
