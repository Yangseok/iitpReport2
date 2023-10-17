import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'Assets/Css/Login.css';
import Layout from 'Domain/Home/Common/Layout/Main';
import Tail from 'Domain/Home/Common/Componet/Base/Tail';
import Button from 'Domain/Home/Common/Componet/Button';
import * as commonAPI from 'Domain/Home/Common/API/Call';
import { useDispatch } from 'react-redux';
import { setLoading, setAccount } from 'Domain/Home/Common/Status/CommonSlice';
import { setMsg, setShow } from 'Domain/Home/Common/Status/MsgSlice';
import common from 'Utill';
import { useEffect } from 'react';

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');

  const handleLogin = async (e) => {
    console.log(id, passwd);
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await commonAPI.login(id,passwd);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }

    const accessToken = data?.data?.accesstoken ?? '';
    const userName = data?.data?.username ?? '';

    if (accessToken !== '') {
      const account = {
        isLogin: true,
        id: id,
        accessToken: accessToken,
        userName: userName,
      };
      const redirect = common.getUrlParams()?.redirect ?? '';
      dispatch(setAccount(account));
      localStorage.setItem('account', JSON.stringify(account));
      if (['/',''].indexOf(redirect) === -1) {
        document.location.replace(decodeURI(redirect));
      } else {
        navigate('/');
      }
    } else {
      dispatch(setMsg({
        title: '알림',
        msg: '아이디 패스워드를 확인해주세요.',
        btnCss: ['inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'],
        btnTxt: ['확인'],
        btnEvent: ['close']
      }));
      dispatch(setShow(true));
    }

    e.preventDefault();
    return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <Layout>
      <section className='login_sec01'>
        <div className='container'>
          <div className='login_wrap'>
            <h2 className='mb-4'>GUEST LOGIN</h2>
            <form onSubmit={onSubmit}>
              <label htmlFor='user_id'>아이디</label>
              <input type='text' name='user_id' id='user_id' onChange={e => setId(e.target.value)} value={id} placeholder='아이디' />
              <label htmlFor='password'>비밀번호</label>
              <input type='password' name='password' id='password' onChange={e => setPasswd(e.target.value)} value={passwd} placeholder='비밀번호' />
              {/* 로그인 불가시,
              <span>아이디 또는 비밀번호를 확인해주세요.</span> */}
              <Button type='submit' onClick={handleLogin} name='로그인' />
            </form>
          </div>
        </div>
        <div className='visual_bg_deco' aria-hidden='true'>
          <div></div><div></div><div></div>
        </div>
      </section>
      <Tail />
    </Layout>
  );
}
