import React from 'react';
import 'Assets/Css/Login.css';
import Layout from 'Domain/Home/Common/Layout/Main';
import Button from 'Domain/Home/Common/Componet/Button';

export default function Main() {
  return (
    <Layout>
      <section className='login_sec01'>
        <div className='container'>
          <div className='login_wrap'>
            <h2 className='mb-4'>GUEST LOGIN</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor='user_id'>아이디</label>
              <input type='text' name='user_id' id='user_id' value='' placeholder='아이디' />
              <label htmlFor='password'>비밀번호</label>
              <input type='password' name='password' id='password' value='' placeholder='비밀번호' />
              {/* 로그인 불가시,
              <span>아이디 또는 비밀번호를 확인해주세요.</span> */}
              <Button type='submit' name='로그인' />
            </form>
          </div>
        </div>
        <div className='visual_bg_deco' aria-hidden='true'>
          <div></div><div></div><div></div>
        </div>
      </section>
    </Layout>
  );
}
