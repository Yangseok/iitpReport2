import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as commonAPI from 'Domain/Home/Common/API/Call';

export default function PaperAPIButton(props) {
  const loginTest = async () => {
    const apiFn = async () => {
      const data = await commonAPI.login('test','eogksalsrnr1!');
      console.log(data?.data);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="로그인" onClick={() => loginTest()} /></li>
    </>
  );
}