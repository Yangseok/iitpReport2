import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  getMsg,
  getShow,
  setShow
} from 'Domain/Home/Common/Status/MsgSlice';
import ModalMsg from 'Domain/Home/Common/Componet/ModalMsg';

export default function ModalGlobalMsg() {
  const dispatch = useDispatch();
  const show = useSelector(getShow);
  const msg = useSelector(getMsg);
  const propSetShow = (bool) => {
    dispatch(setShow(bool));
  }

  return (
    <ModalMsg show={show} setShow={propSetShow} btnCss={msg.btnCss} btnTxt={msg.btnTxt} btnEvent={msg.btnEvent} msg={msg.msg} title={msg.title} />
  );
}
