import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as mainAPI from 'Domain/Home/Main/API/Call';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';

export default function MainAPIButton(props) {

  const recommendTest = async () => {
    const apiFn = async () => {
      const data = await mainAPI.recommend();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const dataCountTest = async () => {
    const apiFn = async () => {
      const data = await mainAPI.dataCount();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const autocompleteTest = async () => {
    const apiFn = async () => {
      const data = await mainAPI.autocomplete('아이');
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const searchAllTest = async () => {
    const apiFn = async () => {
      const data = await discoveryAPI.searchAll('아이',4);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const searchCountTest = async () => {
    const apiFn = async () => {
      const data = await discoveryAPI.searchCount('search','아이');
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="메인 추천검색어 콜" onClick={recommendTest} /></li>
      <li className='mb-1'><Button text="전체 데이터 현황" onClick={dataCountTest} /></li>
      <li className='mb-1'><Button text="자동완성" onClick={autocompleteTest} /></li>
      <li className='mb-1'><Button text="통합검색" onClick={searchAllTest} /></li>
      <li className='mb-1'><Button text="검색카운트" onClick={searchCountTest} /></li>
    </>
  );
}