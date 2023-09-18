import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as viewCallAPI from 'Domain/Home/Discovery/API/ViewCall';

export default function ViewAPIButton(props) {
  const company1ViewTest = async () => {
    const apiFn = async () => {
      const data = await viewCallAPI.company1View();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const company2ViewTest = async () => {
    const apiFn = async () => {
      const data = await viewCallAPI.company2View();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const company4ViewTest = async () => {
    const apiFn = async () => {
      const data = await viewCallAPI.company4View();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const company5ViewTest = async () => {
    const apiFn = async () => {
      const data = await viewCallAPI.company5View();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const company6ViewTest = async () => {
    const apiFn = async () => {
      const data = await viewCallAPI.company6View();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="상세 페이지(기술수요조사서 전체 현황)" onClick={company1ViewTest} /></li>
      <li className='mb-1'><Button text="상세 페이지(수요뱅킹 공고 목록)" onClick={company2ViewTest} /></li>
      <li className='mb-1'><Button text="상세 페이지(수요뱅킹 조회)" onClick={company4ViewTest} /></li>
      <li className='mb-1'><Button text="상세 페이지(수요뱅킹 조회 목록 다운로드)" onClick={company5ViewTest} /></li>
      <li className='mb-1'><Button text="상세 페이지(유사기술수요조사서)" onClick={company6ViewTest} /></li>
    </>
  );
}